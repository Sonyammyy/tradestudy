import { initHeader, getPrefs, setPref } from "../common/header.js";
import { load, save, KEYS } from "../common/storage.js";
import { categories, flashcards } from "../data/flashcards.js";

initHeader();

let known = load(KEYS.flashcards, {}); // { cardId: true }
let category = getPrefs().flashCategory ?? "전체";
let hideKnown = Boolean(getPrefs().flashHideKnown);
let order = flashcards.map((c) => c.id);
let index = 0;
let flipped = false;

const deck = () => {
  const byId = new Map(flashcards.map((c) => [c.id, c]));
  return order
    .map((id) => byId.get(id))
    .filter((c) => (category === "전체" || c.category === category) && !(hideKnown && known[c.id]));
};

/* ---------- 필터 ---------- */

function renderFilters() {
  const count = (cat) => flashcards.filter((c) => cat === "전체" || c.category === cat).length;
  document.getElementById("fc-filters").innerHTML = `
    <div class="fc-filters__chips" role="group" aria-label="카테고리">
      ${["전체", ...categories]
        .map((cat) => `<button type="button" class="chip${cat === category ? " is-active" : ""}" data-cat="${cat}" aria-pressed="${cat === category}">${cat} <span class="num">${count(cat)}</span></button>`)
        .join("")}
    </div>
    <div class="fc-filters__opts">
      <label class="check-row"><input type="checkbox" id="hide-known" ${hideKnown ? "checked" : ""}><span>외운 카드 숨기기</span></label>
      <button type="button" class="btn btn--outline btn--sm" id="shuffle">섞기</button>
      <button type="button" class="btn btn--ghost btn--sm" id="reset-order">순서대로</button>
    </div>`;

  document.querySelectorAll("[data-cat]").forEach((b) =>
    b.addEventListener("click", () => {
      category = b.dataset.cat;
      setPref("flashCategory", category);
      index = 0;
      flipped = false;
      renderAll();
    })
  );
  document.getElementById("hide-known").addEventListener("change", (e) => {
    hideKnown = e.target.checked;
    setPref("flashHideKnown", hideKnown);
    index = 0;
    flipped = false;
    renderAll();
  });
  document.getElementById("shuffle").addEventListener("click", () => {
    order = order
      .map((id) => [Math.random(), id])
      .sort((a, b) => a[0] - b[0])
      .map(([, id]) => id);
    index = 0;
    flipped = false;
    renderAll();
  });
  document.getElementById("reset-order").addEventListener("click", () => {
    order = flashcards.map((c) => c.id);
    index = 0;
    flipped = false;
    renderAll();
  });
}

/* ---------- 카드 ---------- */

function renderStage() {
  const cards = deck();
  const stage = document.getElementById("fc-stage");
  const pool = flashcards.filter((c) => category === "전체" || c.category === category);
  const knownCount = pool.filter((c) => known[c.id]).length;

  if (!cards.length) {
    stage.innerHTML = `<div class="empty">이 카테고리의 카드를 모두 외웠습니다 👏<br>'외운 카드 숨기기'를 끄면 다시 볼 수 있어요.</div>`;
    return;
  }
  index = Math.min(index, cards.length - 1);
  const c = cards[index];
  const isKnown = Boolean(known[c.id]);

  stage.innerHTML = `
    <div class="fc-meta">
      <span class="small num">${index + 1} / ${cards.length}</span>
      <span class="caption num">외움 ${knownCount} / ${pool.length}</span>
    </div>
    <div class="progress"><div class="progress__bar" style="width: ${((index + 1) / cards.length) * 100}%"></div></div>

    <button type="button" class="flashcard${flipped ? " is-flipped" : ""}${isKnown ? " is-known" : ""}" id="card" aria-label="${flipped ? "정답" : "문제"}: ${flipped ? c.back : c.front}. 눌러서 뒤집기">
      <span class="flashcard__inner">
        <span class="flashcard__face flashcard__front">
          <span class="flashcard__cat">${c.category}</span>
          <span class="flashcard__text">${c.front}</span>
          <span class="flashcard__hint caption">눌러서 정답 보기 · Space</span>
        </span>
        <span class="flashcard__face flashcard__back">
          <span class="flashcard__cat">정답</span>
          <span class="flashcard__text flashcard__text--answer">${c.back}</span>
          <span class="flashcard__hint caption">${c.front}</span>
        </span>
      </span>
    </button>

    <div class="fc-controls">
      <button type="button" class="btn btn--outline" id="prev" aria-label="이전 카드">← 이전</button>
      <button type="button" class="btn ${isKnown ? "btn--primary" : "btn--outline"}" id="known" aria-pressed="${isKnown}">${isKnown ? "✓ 외웠어요" : "외웠어요"}</button>
      <button type="button" class="btn btn--outline" id="next" aria-label="다음 카드">다음 →</button>
    </div>`;

  document.getElementById("card").addEventListener("click", flip);
  document.getElementById("prev").addEventListener("click", () => move(-1));
  document.getElementById("next").addEventListener("click", () => move(1));
  document.getElementById("known").addEventListener("click", toggleKnown);
}

function flip() {
  flipped = !flipped;
  const el = document.getElementById("card");
  el?.classList.toggle("is-flipped", flipped);
}

function move(d) {
  const n = deck().length;
  if (!n) return;
  index = (index + d + n) % n;
  flipped = false;
  renderStage();
}

function toggleKnown() {
  const c = deck()[index];
  if (!c) return;
  if (known[c.id]) delete known[c.id];
  else known[c.id] = true;
  save(KEYS.flashcards, known);
  // 숨기기 상태면 외운 카드는 빠지므로 같은 위치의 다음 카드가 보임
  flipped = false;
  renderStage();
  renderList();
}

document.addEventListener("keydown", (e) => {
  if (e.target.closest?.("input, textarea, select, dialog")) return;
  if (e.key === "ArrowRight") move(1);
  else if (e.key === "ArrowLeft") move(-1);
  else if (e.key === " " || e.key === "Spacebar") {
    e.preventDefault();
    flip();
  } else return;
});

/* ---------- 목록 ---------- */

function renderList() {
  const pool = flashcards.filter((c) => category === "전체" || c.category === category);
  document.getElementById("fc-list-count").textContent = `${category} ${pool.length}장`;
  document.getElementById("fc-list").innerHTML = pool
    .map(
      (c) => `
      <li class="fc-item${known[c.id] ? " is-known" : ""}">
        <span class="fc-item__front">${c.front}</span>
        <span class="fc-item__back small">${c.back}</span>
        ${known[c.id] ? `<span class="fc-item__badge">외움</span>` : ""}
      </li>`
    )
    .join("");
}

function renderAll() {
  renderFilters();
  renderStage();
  renderList();
}

renderAll();
