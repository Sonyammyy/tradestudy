import { initHeader } from "../common/header.js";
import { icon } from "../common/icons.js";
import { load, save, KEYS } from "../common/storage.js";
import { currentWeek, todayKST, parseDate } from "../common/dday.js";
import { openNoteDialog } from "../common/note-dialog.js";
import { esc, period, shortDate } from "../common/util.js";
import { plan } from "../data/plan.js";
import { concepts } from "../data/concepts.js";

initHeader();

const DAY = 24 * 60 * 60 * 1000;
const thisWeek = currentWeek(plan);
const conceptsOf = (week) => concepts.filter((c) => c.week === week);
const weekOf = (n) => plan.find((w) => w.week === n);

let checks = load(KEYS.planChecks, {});
let selected = thisWeek.week;
let filter = "all"; // all | todo | known
let expandAll = false;

const isKnown = (id) => Boolean(checks[id]);
const countKnown = (list) => list.filter((c) => isKnown(c.id)).length;

/* ---------- 타임라인 (주차 탭) ---------- */

// 오늘이 7주 중 어디쯤인지 (0–100%)
function todayPosition() {
  const today = todayKST();
  const i = plan.findIndex((w) => today <= parseDate(w.end));
  if (i === -1) return 100;
  const w = plan[i];
  const start = parseDate(w.start);
  const length = parseDate(w.end) - start + DAY;
  const frac = Math.min(Math.max((today - start) / length, 0), 1);
  return ((i + frac) / plan.length) * 100;
}

function renderTimeline() {
  const box = document.getElementById("timeline");
  const pos = todayPosition();
  const todayLabel = shortDate(new Date(todayKST()).toISOString());

  box.innerHTML = `
    <div class="timeline__inner" style="--steps: ${plan.length}">
      <div class="timeline__track" aria-hidden="true">
        <div class="timeline__fill" style="width: ${pos}%"></div>
        <span class="timeline__today${pos < 6 ? " is-start" : pos > 94 ? " is-end" : ""}" style="left: ${pos}%"><span class="timeline__today-label num">오늘 ${todayLabel}</span></span>
      </div>
      <div class="timeline__steps" role="tablist" aria-label="주차 선택">
        ${plan
          .map(
            (w) => `
          <button class="step" type="button" role="tab" id="tab-w${w.week}" data-week="${w.week}"
                  aria-controls="week-panel" aria-selected="false" tabindex="-1">
            <span class="step__dot" aria-hidden="true"></span>
            <span class="step__week num">W${w.week}${w.week === thisWeek.week ? ' <span class="step__now">이번 주</span>' : ""}</span>
            <span class="step__title">${w.title}</span>
            <span class="caption num">${period(w)} · <span data-step-count="${w.week}"></span></span>
          </button>`
          )
          .join("")}
      </div>
    </div>`;

  const tabs = [...box.querySelectorAll(".step")];
  tabs.forEach((tab) => tab.addEventListener("click", () => selectWeek(Number(tab.dataset.week), { updateHash: true })));

  // ← → 키로 주차 이동
  box.querySelector("[role=tablist]").addEventListener("keydown", (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = Math.min(Math.max(selected + step, 1), plan.length);
    selectWeek(next, { updateHash: true });
    document.getElementById(`tab-w${next}`).focus();
  });
}

/* ---------- 주차 개념 목록 ---------- */

function renderWeekPanel() {
  const w = weekOf(selected);
  const list = conceptsOf(selected);
  const known = countKnown(list);
  const panel = document.getElementById("week-panel");
  panel.setAttribute("aria-labelledby", `tab-w${selected}`);

  const groups = [...new Set(list.map((c) => c.group))];
  const visible = (c) => filter === "all" || (filter === "known") === isKnown(c.id);

  panel.innerHTML = `
    <header class="week-head">
      <p class="caption num">W${w.week} · ${period(w)}${w.subject ? ` · ${w.subject}` : ""}${w.note ? ` · <span class="week-head__note">${w.note}</span>` : ""}</p>
      <h2 class="week-head__title">${w.title}</h2>
      <p class="week-head__summary">${w.summary}</p>
      <div class="week-head__filters" role="group" aria-label="보기 필터">
        ${[
          ["all", `전체 ${list.length}`],
          ["todo", `아직 ${list.length - known}`],
          ["known", `외웠어요 ${known}`],
        ]
          .map(([key, label]) => `<button class="chip${filter === key ? " is-active" : ""}" type="button" data-filter="${key}" aria-pressed="${filter === key}">${label}</button>`)
          .join("")}
        <button class="chip chip--toggle" type="button" id="expand-all" aria-pressed="${expandAll}">${expandAll ? "상세 모두 접기" : "상세 모두 펼치기"}</button>
      </div>
    </header>

    <div class="week-body">
      ${groups
        .map((g) => {
          const items = list.filter((c) => c.group === g);
          const shown = items.filter(visible);
          if (shown.length === 0) return "";
          return `
          <section class="concept-group">
            <h3 class="concept-group__title">${g} <span class="caption num">${countKnown(items)}/${items.length}</span></h3>
            <div class="concept-list">${shown.map(renderCard).join("")}</div>
          </section>`;
        })
        .join("") || `<p class="week-empty caption">${filter === "known" ? "아직 외운 개념이 없습니다." : "이 주의 개념을 모두 외웠습니다. 👏"}</p>`}
      <p class="week-note caption">일반적인 국제무역사 수험 범위를 기준으로 정리한 내용입니다. 관세법·외국환거래법 등의 기간·금액은 개정될 수 있으니 시험 전 국가법령정보센터(law.go.kr)에서 최신 조문을 확인하세요.</p>
    </div>`;

  panel.querySelectorAll("[data-filter]").forEach((b) =>
    b.addEventListener("click", () => {
      filter = b.dataset.filter;
      renderWeekPanel();
    })
  );
  panel.querySelector("#expand-all").addEventListener("click", () => {
    expandAll = !expandAll;
    renderWeekPanel();
  });
  panel.querySelectorAll("[data-known]").forEach((b) =>
    b.addEventListener("click", () => {
      const id = b.dataset.known;
      setCheck(id, !isKnown(id));
      saveChecks();
    })
  );
  panel.querySelectorAll("[data-note]").forEach((b) =>
    b.addEventListener("click", () => {
      const c = concepts.find((x) => x.id === b.dataset.note);
      openNoteDialog({ subject: w.subject ?? undefined, week: c.week, topic: c.name, concept: c.summary, conceptId: c.id });
    })
  );
}

function renderCard(c) {
  const known = isKnown(c.id);
  return `
    <article class="concept${known ? " is-known" : ""}" id="${c.id}" tabindex="-1">
      <div class="concept__body">
        <h4 class="concept__name">${c.name}</h4>
        <p class="concept__summary">${c.summary}</p>
        ${c.detail ? `<details class="concept__detail"${expandAll ? " open" : ""}><summary>상세 설명</summary><div>${c.detail}</div></details>` : ""}
        ${c.examPoint ? `<p class="concept__point"><strong>시험 포인트</strong> ${c.examPoint}</p>` : ""}
        ${c.refs.length ? `<p class="concept__refs"><span class="caption">관련 조항</span> ${c.refs.map((r) => `<span class="chip chip--static">${r}</span>`).join("")}</p>` : ""}
      </div>
      <div class="concept__actions">
        <button class="btn btn--sm ${known ? "btn--primary" : "btn--outline"}" type="button" data-known="${c.id}" aria-pressed="${known}">
          ${icon("check", 16)}외웠어요
        </button>
        <button class="btn btn--sm btn--ghost" type="button" data-note="${c.id}">${icon("plus", 16)}오답노트에 추가</button>
      </div>
    </article>`;
}

/* ---------- 오른쪽 · 진행률 · 체크리스트 ---------- */

function renderSide() {
  const list = conceptsOf(selected);
  const known = countKnown(list);
  const pct = list.length ? Math.round((known / list.length) * 100) : 0;
  const totalKnown = countKnown(concepts);
  const totalPct = Math.round((totalKnown / concepts.length) * 100);
  const allDone = list.length > 0 && known === list.length;

  document.getElementById("side-progress").innerHTML = `
    <div class="side-progress">
      <p class="side-progress__label small">W${selected}${selected === thisWeek.week ? " · 이번 주" : ""}</p>
      <p class="side-progress__num num"><strong>${known}</strong> / ${list.length}<span class="caption"> · ${pct}%</span></p>
      <div class="progress" role="progressbar" aria-label="W${selected} 진행률" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}">
        <div class="progress__bar" style="width: ${pct}%"></div>
      </div>
      <button class="btn btn--outline btn--block" type="button" id="week-all">${allDone ? "이 주 체크 모두 해제" : "이 주 모두 외웠어요"}</button>
      <p class="caption num side-progress__total">전체 ${totalKnown} / ${concepts.length} · ${totalPct}%</p>
    </div>`;

  document.getElementById("week-all").addEventListener("click", () => {
    list.forEach((c) => setCheck(c.id, !allDone));
    saveChecks();
  });

  document.getElementById("side-checklist").innerHTML = `
    <ul class="checklist">
      ${plan
        .map((w) => {
          const items = conceptsOf(w.week);
          const n = countKnown(items);
          return `
          <li class="checklist__row${w.week === selected ? " is-selected" : ""}${n === items.length ? " is-done" : ""}">
            <input type="checkbox" data-week-check="${w.week}" aria-label="W${w.week} 모두 외움" ${n === items.length ? "checked" : ""}>
            <button class="checklist__link" type="button" data-week-go="${w.week}">
              <span class="checklist__week num">W${w.week}</span>
              <span class="checklist__title">${w.title}</span>
            </button>
            <span class="caption num">${n}/${items.length}</span>
          </li>`;
        })
        .join("")}
    </ul>`;

  document.querySelectorAll("[data-week-check]").forEach((box) => {
    const items = conceptsOf(Number(box.dataset.weekCheck));
    const n = countKnown(items);
    box.indeterminate = n > 0 && n < items.length;
    box.addEventListener("change", () => {
      items.forEach((c) => setCheck(c.id, box.checked));
      saveChecks();
    });
  });
  document.querySelectorAll("[data-week-go]").forEach((b) =>
    b.addEventListener("click", () => {
      selectWeek(Number(b.dataset.weekGo), { updateHash: true });
      document.querySelector(".timeline").scrollIntoView({ behavior: "smooth", block: "start" });
    })
  );
}

/* ---------- 상태 ---------- */

function setCheck(id, value) {
  if (value) checks[id] = true;
  else delete checks[id];
}

function saveChecks() {
  save(KEYS.planChecks, checks);
  renderAll();
}

function updateTabs() {
  plan.forEach((w) => {
    const tab = document.getElementById(`tab-w${w.week}`);
    const items = conceptsOf(w.week);
    const n = countKnown(items);
    const on = w.week === selected;
    tab.setAttribute("aria-selected", String(on));
    tab.tabIndex = on ? 0 : -1;
    tab.classList.toggle("is-done", n === items.length);
    tab.classList.toggle("is-current", w.week === thisWeek.week);
    tab.querySelector(`[data-step-count="${w.week}"]`).textContent = `${n}/${items.length}`;
  });
}

function renderAll() {
  updateTabs();
  renderWeekPanel();
  renderSide();
}

function selectWeek(week, { updateHash = false } = {}) {
  if (week !== selected) filter = "all";
  selected = week;
  renderAll();
  if (updateHash) history.replaceState(null, "", `#w${week}`);
  document.getElementById(`tab-w${week}`).scrollIntoView({ block: "nearest", inline: "center" });
}

// #w3 → 3주차, #w2-icc → 해당 개념 카드로 이동해 강조
function applyHash() {
  const hash = decodeURIComponent(location.hash.slice(1));
  const weekMatch = /^w(\d+)$/.exec(hash);
  if (weekMatch && weekOf(Number(weekMatch[1]))) {
    selectWeek(Number(weekMatch[1]));
    return;
  }
  const concept = concepts.find((c) => c.id === hash);
  if (!concept) return;
  filter = "all";
  selectWeek(concept.week);
  const card = document.getElementById(concept.id);
  card.querySelector("details")?.setAttribute("open", "");
  card.scrollIntoView({ block: "center" });
  card.focus({ preventScroll: true });
  card.classList.add("is-highlight");
  setTimeout(() => card.classList.remove("is-highlight"), 2400);
}

/* ---------- 시작 ---------- */

document.getElementById("study-meta").textContent =
  `7주 학습 계획 · 필수 개념 ${concepts.length}개 · ${shortDate(plan[0].start)}–${shortDate(plan[plan.length - 1].end)}`;
renderTimeline();
renderAll();
applyHash();
window.addEventListener("hashchange", applyHash);
// 다른 탭에서 체크가 바뀌면 반영
window.addEventListener("storage", (e) => {
  if (e.key === `trade:${KEYS.planChecks}`) {
    checks = load(KEYS.planChecks, {});
    renderAll();
  }
});
