import { initHeader, pageUrl, getPrefs, setPref } from "../common/header.js";
import { icon } from "../common/icons.js";
import { load, save, KEYS } from "../common/storage.js";
import { currentWeek, applicationStatus } from "../common/dday.js";
import { openNoteDialog } from "../common/note-dialog.js";
import { esc, period } from "../common/util.js";
import { plan } from "../data/plan.js";
import { concepts } from "../data/concepts.js";
import { exam, APPLY_URL } from "../data/exam.js";

initHeader();

const thisWeek = currentWeek(plan);
const conceptUrl = (id) => `${pageUrl("study")}#${id}`;
const weekUrl = (week) => `${pageUrl("study")}#w${week}`;
const conceptsOf = (week) => concepts.filter((c) => c.week === week);

let checks = load(KEYS.planChecks, {});

/* ---------- 좌측 · 학습 목차 ---------- */

function renderToc() {
  const toc = document.getElementById("toc");
  toc.innerHTML = `
    <div class="toc-progress">
      <div class="toc-progress__label">
        <span class="small">전체 진행률</span>
        <span class="small num" id="progress-text"></span>
      </div>
      <div class="progress" role="progressbar" aria-label="전체 진행률" aria-valuemin="0" aria-valuemax="100" id="progress">
        <div class="progress__bar" id="progress-bar"></div>
      </div>
    </div>

    <div class="search">
      ${icon("search", 18)}
      <input class="input" type="search" id="toc-search" placeholder="개념 검색" aria-label="개념 검색" autocomplete="off">
    </div>
    <div class="search-results" id="toc-results" hidden></div>

    <div id="toc-weeks">
      <label class="check-row check-row--all">
        <input type="checkbox" id="check-all">
        <span>전체 선택</span>
      </label>
      <ul class="week-list">
        ${plan
          .map(
            (w) => `
          <li class="week-row${w.week === thisWeek.week ? " is-current" : ""}">
            <input type="checkbox" class="week-row__check" data-week="${w.week}" aria-label="W${w.week} ${w.title} 완료">
            <a class="week-row__link" href="${weekUrl(w.week)}">
              <span class="week-row__no">W${w.week}</span>
              <span class="week-row__text">
                <span class="week-row__title">${w.title}</span>
                <span class="caption num">${period(w)} · <span data-week-count="${w.week}"></span></span>
              </span>
            </a>
          </li>`
          )
          .join("")}
      </ul>
    </div>`;

  toc.querySelectorAll(".week-row__check").forEach((box) => {
    box.addEventListener("change", () => setWeekDone(Number(box.dataset.week), box.checked));
  });

  toc.querySelector("#check-all").addEventListener("change", (e) => {
    concepts.forEach((c) => setCheck(c.id, e.target.checked));
    saveChecks();
  });

  // 태블릿 크기에서 목차 패널 접기/펴기
  const panel = toc.closest(".home-toc");
  const toggle = document.getElementById("toc-toggle");
  toggle.addEventListener("click", () => {
    const open = panel.classList.toggle("is-expanded");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "학습 목차 접기" : "학습 목차 펴기");
  });

  const input = toc.querySelector("#toc-search");
  const results = toc.querySelector("#toc-results");
  const weeks = toc.querySelector("#toc-weeks");
  input.addEventListener("input", () => {
    const q = input.value.trim();
    weeks.hidden = q !== "";
    renderSearch(results, q);
  });
}

/* ---------- 중앙 · 오늘의 학습 ---------- */

function renderToday() {
  const w = thisWeek;
  const count = conceptsOf(w.week).length;
  const today = document.getElementById("today");

  today.innerHTML = `
    <div class="today">
      <span class="today__badge" aria-hidden="true">W${w.week}</span>
      <h1 class="display today__title">${w.title}</h1>
      <p class="caption num today__meta">
        W${w.week} · ${period(w)} · 필수 개념 ${count}개${w.subject ? ` · ${w.subject}` : ""}${w.note ? ` · <span class="today__note">${w.note}</span>` : ""}
      </p>
      <p class="today__summary">${w.summary}</p>

      <div class="today__actions">
        <button class="btn btn--primary" type="button" id="review-done" aria-pressed="false">
          ${icon("check", 18)}<span>복습 완료</span>
        </button>
        <a class="btn btn--outline" href="${weekUrl(w.week)}">${icon("book", 18)}개념노트로 이동</a>
        <button class="btn btn--outline" type="button" data-action="add-note">${icon("plus", 18)}오답 추가</button>
      </div>

      <div class="today__chips" aria-label="추천 질문">
        ${w.questions.map((q) => `<a class="chip" href="${conceptUrl(q.concept)}">${q.q}</a>`).join("")}
      </div>
    </div>

    <div class="today__search">
      <div class="search-results search-results--up" id="quick-results" hidden></div>
      <div class="search search--lg">
        ${icon("search", 20)}
        <input class="input" type="search" id="quick-search" placeholder="개념 빠른 검색 (예: 환가료, CIP, 제25조)" aria-label="개념 빠른 검색" autocomplete="off">
      </div>
    </div>`;

  today.querySelector("#review-done").addEventListener("click", () => {
    const done = conceptsOf(w.week).every((c) => checks[c.id]);
    setWeekDone(w.week, !done);
  });

  const input = today.querySelector("#quick-search");
  const results = today.querySelector("#quick-results");
  input.addEventListener("input", () => renderSearch(results, input.value.trim()));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      input.value = "";
      renderSearch(results, "");
    }
    // 엔터: 첫 번째 결과로 이동
    if (e.key === "Enter") {
      const first = results.querySelector("a");
      if (first) location.href = first.href;
    }
  });
}

/* ---------- 우측 · 학습 스튜디오 ---------- */

const TILES = [
  { label: "개념노트", icon: "book", href: () => pageUrl("study") },
  { label: "인코텀즈", icon: "ship", href: () => pageUrl("incoterms") },
  { label: "결제 흐름도", icon: "flow", href: () => pageUrl("payment") },
  { label: "합격 시뮬레이터", icon: "calc", href: () => `${pageUrl("exam")}#simulator` },
  { label: "오답노트", icon: "note", href: () => pageUrl("notes") },
  { label: "암기카드", icon: "cards", href: () => pageUrl("flashcards") },
  { label: "시험정보", icon: "calendar", href: () => pageUrl("exam") },
];

function renderStudio() {
  const studio = document.getElementById("studio");
  studio.innerHTML = `
    <div id="apply-banner"></div>
    <div class="tile-grid">
      ${TILES.map(
        (t) => `
        <a class="tile" href="${t.href()}">
          <span class="tile__icon">${icon(t.icon, 20)}</span>
          <span class="tile__label">${t.label}</span>
          <span class="tile__arrow">${icon("chevron", 16)}</span>
        </a>`
      ).join("")}
    </div>

    <section class="recent" aria-labelledby="recent-title">
      <div class="recent__head">
        <h3 id="recent-title">최근 오답</h3>
        <a class="caption" href="${pageUrl("notes")}">전체 보기</a>
      </div>
      <ul class="recent__list" id="recent-list"></ul>
    </section>

    <div class="studio__foot">
      <button class="btn btn--primary btn--block" type="button" data-action="add-note">${icon("plus", 18)}오답 추가</button>
    </div>`;

  renderBanner();
  renderRecent();
  document.addEventListener("prefs:change", renderBanner);
}

function renderBanner() {
  const box = document.getElementById("apply-banner");
  const apply = applicationStatus();
  if (apply.state === "closed" || getPrefs().bannerClosed === apply.state) {
    box.innerHTML = "";
    return;
  }
  const target = exam.target;
  const detail =
    apply.state === "before"
      ? `제${target.round}회 원서접수 ${target.applyStart.slice(5).replace("-", ".")} 시작`
      : `제${target.round}회 시험 ${target.examDate.slice(5).replace("-", ".")}(토)`;

  box.innerHTML = `
    <div class="banner${apply.state === "open" ? " banner--open" : ""}" role="status">
      <span class="banner__icon">${icon("info", 20)}</span>
      <div class="banner__text">
        <strong class="num">${apply.label}</strong>
        <span class="caption num">${detail} · <a href="${APPLY_URL}" target="_blank" rel="noopener">접수 페이지</a></span>
      </div>
      <button class="btn btn--ghost btn--icon banner__close" type="button" aria-label="안내 닫기">${icon("close", 16)}</button>
    </div>`;

  box.querySelector(".banner__close").addEventListener("click", () => {
    setPref("bannerClosed", apply.state);
    box.innerHTML = "";
  });
}

function renderRecent() {
  const list = document.getElementById("recent-list");
  const notes = load(KEYS.wrongNotes, [])
    .slice()
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 3);

  if (notes.length === 0) {
    list.innerHTML = `<li class="recent__empty caption">아직 기록한 오답이 없습니다. 틀린 문제를 <b>오답 추가</b>로 남겨 보세요.</li>`;
    return;
  }

  list.innerHTML = notes
    .map(
      (n) => `
      <li>
        <a class="recent__item" href="${pageUrl("notes")}#${esc(n.id)}">
          <span class="recent__subject">${esc(n.subject)}</span>
          <span class="recent__topic">${esc(n.topic)}</span>
          <span class="caption num">W${esc(n.week)} · ${esc(n.createdAt)}</span>
        </a>
      </li>`
    )
    .join("");
}

/* ---------- 오답 추가 ---------- */

function initNoteButtons() {
  document.querySelectorAll('[data-action="add-note"]').forEach((btn) =>
    btn.addEventListener("click", () =>
      openNoteDialog({ subject: thisWeek.subject ?? exam.subjects[0].name, week: thisWeek.week })
    )
  );
  document.addEventListener("notes:change", renderRecent);
}

/* ---------- 검색 ---------- */

function renderSearch(box, query) {
  if (!query) {
    box.hidden = true;
    box.innerHTML = "";
    return;
  }
  const q = query.toLowerCase();
  const found = concepts.filter((c) => `${c.name} ${c.summary} ${c.group} ${c.examPoint} ${c.refs.join(" ")}`.toLowerCase().includes(q)).slice(0, 8);

  box.hidden = false;
  box.innerHTML = found.length
    ? found
        .map(
          (c) => `
        <a class="search-result" href="${conceptUrl(c.id)}">
          <span class="search-result__name">${c.name}</span>
          <span class="caption">W${c.week} · ${c.group} · ${c.summary}</span>
        </a>`
        )
        .join("")
    : `<p class="search-results__empty caption">“${esc(query)}”에 맞는 개념이 없습니다.</p>`;
}

/* ---------- 체크 상태 ---------- */

function setCheck(id, value) {
  if (value) checks[id] = true;
  else delete checks[id];
}

function setWeekDone(week, value) {
  conceptsOf(week).forEach((c) => setCheck(c.id, value));
  saveChecks();
}

function saveChecks() {
  save(KEYS.planChecks, checks);
  updateChecks();
}

function updateChecks() {
  const total = concepts.length;
  const done = concepts.filter((c) => checks[c.id]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  document.getElementById("progress-text").textContent = `${done} / ${total} · ${pct}%`;
  document.getElementById("progress-bar").style.width = `${pct}%`;
  document.getElementById("progress").setAttribute("aria-valuenow", String(pct));

  plan.forEach((w) => {
    const list = conceptsOf(w.week);
    const n = list.filter((c) => checks[c.id]).length;
    const box = document.querySelector(`.week-row__check[data-week="${w.week}"]`);
    box.checked = list.length > 0 && n === list.length;
    box.indeterminate = n > 0 && n < list.length;
    box.closest(".week-row").classList.toggle("is-done", box.checked);
    document.querySelector(`[data-week-count="${w.week}"]`).textContent = `${n}/${list.length}`;
  });

  const all = document.getElementById("check-all");
  all.checked = total > 0 && done === total;
  all.indeterminate = done > 0 && done < total;

  const weekDone = conceptsOf(thisWeek.week).every((c) => checks[c.id]);
  const btn = document.getElementById("review-done");
  btn.setAttribute("aria-pressed", String(weekDone));
  btn.classList.toggle("is-done", weekDone);
  btn.querySelector("span").textContent = weekDone ? "복습 완료됨" : "복습 완료";
}

/* ---------- 시작 ---------- */

renderToc();
renderToday();
renderStudio();
initNoteButtons();
updateChecks();
