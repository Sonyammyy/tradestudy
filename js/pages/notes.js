import { initHeader, pageUrl, getPrefs, setPref } from "../common/header.js";
import { icon } from "../common/icons.js";
import { todayKST, todayString } from "../common/dday.js";
import { esc } from "../common/util.js";
import { openNoteDialog, loadNotes, saveNotes, STATUS } from "../common/note-dialog.js";
import { exam } from "../data/exam.js";
import { plan } from "../data/plan.js";
import { concepts } from "../data/concepts.js";

initHeader();

const DAY = 24 * 60 * 60 * 1000;
const filters = { q: "", subject: "", week: "", status: "", period: "" };
let view = getPrefs().notesView ?? "cards";

const conceptOf = (id) => concepts.find((c) => c.id === id);
const sortNotes = (list) => list.slice().sort((a, b) => Number(b.id) - Number(a.id));

/* ---------- 요약 ---------- */

function renderSummary() {
  const notes = loadNotes();
  const count = (st) => notes.filter((n) => n.status === st).length;
  const bySubject = exam.subjects.map((s) => ({ name: s.name, n: notes.filter((x) => x.subject === s.name).length }));
  const max = Math.max(1, ...bySubject.map((x) => x.n));

  document.getElementById("summary").innerHTML = `
    <div class="stat-row">
      <div class="stat"><span class="stat__label">전체 오답</span><span class="stat__value num">${notes.length}</span></div>
      <div class="stat"><span class="stat__label">복습 필요</span><span class="stat__value num">${count("review")}</span></div>
      <div class="stat"><span class="stat__label">다시 틀림</span><span class="stat__value num">${count("again")}</span></div>
      <div class="stat"><span class="stat__label">외움</span><span class="stat__value num">${count("done")}</span></div>
    </div>
    <div class="subject-bars" role="list" aria-label="과목별 오답 수">
      ${bySubject
        .map(
          (s) => `
        <div class="subject-bar" role="listitem">
          <span class="subject-bar__name">${s.name}</span>
          <span class="subject-bar__track"><span class="subject-bar__fill" style="width: ${(s.n / max) * 100}%"></span></span>
          <span class="subject-bar__value num">${s.n}</span>
        </div>`
        )
        .join("")}
    </div>`;
}

/* ---------- 필터 ---------- */

function renderToolbar() {
  const opt = (value, label, current) => `<option value="${value}"${value === current ? " selected" : ""}>${label}</option>`;
  document.getElementById("toolbar").innerHTML = `
    <div class="search notes-toolbar__search">
      ${icon("search", 18)}
      <input class="input" type="search" id="note-search" placeholder="주제·문제·메모 검색" aria-label="오답 검색" value="${esc(filters.q)}" autocomplete="off">
    </div>
    <select class="input" id="f-subject" aria-label="과목">${opt("", "전체 과목", filters.subject)}${exam.subjects.map((s) => opt(s.name, s.name, filters.subject)).join("")}</select>
    <select class="input" id="f-week" aria-label="주차">${opt("", "전체 주차", filters.week)}${plan.map((w) => opt(String(w.week), `W${w.week}`, filters.week)).join("")}</select>
    <select class="input" id="f-status" aria-label="복습 상태">${opt("", "전체 상태", filters.status)}${Object.entries(STATUS).map(([k, v]) => opt(k, v, filters.status)).join("")}</select>
    <select class="input" id="f-period" aria-label="기간">${opt("", "전체 기간", filters.period)}${opt("1", "오늘", filters.period)}${opt("7", "최근 7일", filters.period)}${opt("30", "최근 30일", filters.period)}</select>`;

  const bind = (id, key) =>
    document.getElementById(id).addEventListener(id === "note-search" ? "input" : "change", (e) => {
      filters[key] = e.target.value.trim();
      renderList();
    });
  bind("note-search", "q");
  bind("f-subject", "subject");
  bind("f-week", "week");
  bind("f-status", "status");
  bind("f-period", "period");
}

function filtered() {
  const q = filters.q.toLowerCase();
  const since = filters.period ? todayKST() - (Number(filters.period) - 1) * DAY : null;
  return sortNotes(loadNotes()).filter((n) => {
    if (filters.subject && n.subject !== filters.subject) return false;
    if (filters.week && String(n.week) !== filters.week) return false;
    if (filters.status && n.status !== filters.status) return false;
    if (since !== null && Date.parse(n.createdAt) < since) return false;
    if (q) {
      const text = [n.topic, n.question, n.reason, n.concept, n.myAnswer, n.answer].join(" ").toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });
}

/* ---------- 목록 ---------- */

function renderViewToggle() {
  const box = document.getElementById("view-toggle");
  box.innerHTML = [
    ["cards", "카드"],
    ["table", "표"],
  ]
    .map(([k, l]) => `<button type="button" class="segmented__btn" data-view="${k}" aria-pressed="${k === view}">${l}</button>`)
    .join("");
  box.querySelectorAll("[data-view]").forEach((b) =>
    b.addEventListener("click", () => {
      view = b.dataset.view;
      setPref("notesView", view);
      renderViewToggle();
      renderList();
    })
  );
}

function statusBadge(n) {
  return `<span class="status status--${n.status}">${STATUS[n.status] ?? n.status}</span>`;
}

function renderList() {
  const all = loadNotes();
  const list = filtered();
  document.getElementById("list-count").textContent = all.length ? `${list.length} / ${all.length}` : "";
  const box = document.getElementById("note-list");

  if (!all.length) {
    box.innerHTML = `<div class="empty">아직 기록한 오답이 없습니다.<br>틀린 문제를 <b>+ 오답 추가</b>로 남기면 여기에 모입니다.</div>`;
    return;
  }
  if (!list.length) {
    box.innerHTML = `<div class="empty">조건에 맞는 오답이 없습니다.</div>`;
    return;
  }

  if (view === "table") {
    box.innerHTML = `
      <div class="table-scroll">
        <table class="data-table notes-table">
          <thead><tr><th>날짜</th><th>과목</th><th>주차</th><th>주제</th><th>상태</th><th class="num">틀린 횟수</th><th><span class="sr-only">관리</span></th></tr></thead>
          <tbody>
            ${list
              .map(
                (n) => `
              <tr id="${esc(n.id)}">
                <td class="num">${esc(n.createdAt)}</td>
                <td>${esc(n.subject)}</td>
                <td>W${esc(n.week)}</td>
                <td class="notes-table__topic">${esc(n.topic)}</td>
                <td>${statusBadge(n)}</td>
                <td class="num">${Number(n.wrongCount) || 1}</td>
                <td class="notes-table__actions">
                  <button class="btn btn--ghost btn--sm" type="button" data-edit="${esc(n.id)}">수정</button>
                  <button class="btn btn--ghost btn--sm" type="button" data-delete="${esc(n.id)}">삭제</button>
                </td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>`;
  } else {
    box.innerHTML = `<div class="note-grid">${list.map(renderCard).join("")}</div>`;
  }

  box.querySelectorAll("[data-edit]").forEach((b) =>
    b.addEventListener("click", () => openNoteDialog({}, loadNotes().find((n) => n.id === b.dataset.edit)))
  );
  box.querySelectorAll("[data-delete]").forEach((b) =>
    b.addEventListener("click", () => {
      const n = loadNotes().find((x) => x.id === b.dataset.delete);
      if (!confirm(`'${n.topic}' 오답을 삭제할까요?`)) return;
      saveNotes(loadNotes().filter((x) => x.id !== n.id));
    })
  );
  box.querySelectorAll("[data-status]").forEach((sel) =>
    sel.addEventListener("change", () => {
      updateNote(sel.dataset.status, { status: sel.value });
    })
  );
}

function renderCard(n) {
  const c = conceptOf(n.conceptId);
  const row = (label, value, cls = "") => (value ? `<div class="note-card__row ${cls}"><dt>${label}</dt><dd>${esc(value)}</dd></div>` : "");
  return `
    <article class="note-card status-${n.status}" id="${esc(n.id)}" tabindex="-1">
      <header class="note-card__head">
        <span class="note-card__subject">${esc(n.subject)} · W${esc(n.week)}</span>
        ${statusBadge(n)}
      </header>
      <h3 class="note-card__topic">${esc(n.topic)}</h3>
      <dl class="note-card__body">
        ${row("문제", n.question, "note-card__row--question")}
        ${row("내가 고른 답", n.myAnswer, "is-bad-answer")}
        ${row("정답", n.answer, "is-good-answer")}
        ${row("왜 틀렸나", n.reason)}
        ${row("맞는 개념", n.concept)}
      </dl>
      ${c ? `<a class="note-card__link small" href="${pageUrl("study")}#${c.id}">${icon("book", 16)} ${c.name}</a>` : ""}
      <footer class="note-card__foot">
        <span class="caption num">${esc(n.createdAt)} · 틀린 횟수 ${Number(n.wrongCount) || 1}</span>
        <span class="note-card__actions">
          <select class="input input--sm" data-status="${esc(n.id)}" aria-label="복습 상태 변경">
            ${Object.entries(STATUS).map(([k, v]) => `<option value="${k}"${k === n.status ? " selected" : ""}>${v}</option>`).join("")}
          </select>
          <button class="btn btn--ghost btn--sm" type="button" data-edit="${esc(n.id)}">수정</button>
          <button class="btn btn--ghost btn--sm" type="button" data-delete="${esc(n.id)}">삭제</button>
        </span>
      </footer>
    </article>`;
}

function updateNote(id, patch) {
  saveNotes(loadNotes().map((n) => (n.id === id ? { ...n, ...patch, updatedAt: todayString() } : n)));
}

/* ---------- 복습 모드 ---------- */

const review = { list: [], i: 0, revealed: false, right: 0, wrong: 0 };

function startReview() {
  // 현재 필터 결과 중 외우지 않은 것 우선. 모두 외웠으면 전체
  const base = filtered();
  const pending = base.filter((n) => n.status !== "done");
  review.list = (pending.length ? pending : base).map((n) => n.id);
  review.i = 0;
  review.right = 0;
  review.wrong = 0;
  review.revealed = false;
  if (!review.list.length) {
    alert("복습할 오답이 없습니다. 먼저 오답을 추가해 주세요.");
    return;
  }
  renderReview();
  document.getElementById("review").showModal();
}

function renderReview() {
  const dlg = document.getElementById("review");
  const total = review.list.length;

  if (review.i >= total) {
    dlg.innerHTML = `
      <div class="modal__head"><h2 id="review-title">복습 완료</h2>
        <button class="btn btn--ghost btn--icon" type="button" data-close aria-label="닫기">${icon("close")}</button></div>
      <div class="modal__body review-done">
        <p class="review-done__score num"><strong>${review.right}</strong> / ${total} 맞힘</p>
        <p class="small">또 틀린 ${review.wrong}개는 '다시 틀림'으로 표시되고 틀린 횟수가 늘었습니다.</p>
      </div>
      <div class="modal__foot">
        <button class="btn btn--outline" type="button" id="review-again">처음부터 다시</button>
        <button class="btn btn--primary" type="button" data-close>닫기</button>
      </div>`;
    dlg.querySelector("#review-again").addEventListener("click", startReview);
  } else {
    const n = loadNotes().find((x) => x.id === review.list[review.i]);
    const block = (label, value, cls = "") => (value ? `<div class="review-block ${cls}"><p class="review-block__label">${label}</p><p>${esc(value)}</p></div>` : "");
    dlg.innerHTML = `
      <div class="modal__head">
        <h2 id="review-title">복습 모드 <span class="caption num">${review.i + 1} / ${total}</span></h2>
        <button class="btn btn--ghost btn--icon" type="button" data-close aria-label="닫기">${icon("close")}</button>
      </div>
      <div class="progress review-progress"><div class="progress__bar" style="width: ${(review.i / total) * 100}%"></div></div>
      <div class="modal__body review-card">
        <p class="note-card__subject">${esc(n.subject)} · W${esc(n.week)} · 틀린 횟수 ${Number(n.wrongCount) || 1}</p>
        <h3 class="review-card__topic">${esc(n.topic)}</h3>
        ${block("문제", n.question)}
        ${block("그때 고른 답", n.myAnswer, "is-bad-answer")}
        ${
          review.revealed
            ? `${block("정답", n.answer, "is-good-answer")}${block("왜 틀렸나", n.reason)}${block("맞는 개념", n.concept, "review-block--concept")}
               ${!n.answer && !n.reason && !n.concept ? `<p class="caption">정답·개념 메모가 비어 있습니다. 수정에서 채워 두면 복습이 쉬워집니다.</p>` : ""}`
            : `<button class="btn btn--outline btn--block review-reveal" type="button" id="reveal">정답 보기 <span class="caption">(Space)</span></button>`
        }
      </div>
      <div class="modal__foot">
        ${
          review.revealed
            ? `<button class="btn btn--outline" type="button" id="mark-wrong">또 틀림</button>
               <button class="btn btn--primary" type="button" id="mark-right">맞힘</button>`
            : `<button class="btn btn--ghost" type="button" id="skip">건너뛰기</button>`
        }
      </div>`;
    dlg.querySelector("#reveal")?.addEventListener("click", reveal);
    dlg.querySelector("#skip")?.addEventListener("click", () => next());
    dlg.querySelector("#mark-right")?.addEventListener("click", () => mark(true));
    dlg.querySelector("#mark-wrong")?.addEventListener("click", () => mark(false));
    (dlg.querySelector("#reveal") ?? dlg.querySelector("#mark-right"))?.focus();
  }
  dlg.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", () => dlg.close()));
}

function reveal() {
  review.revealed = true;
  renderReview();
}

function mark(right) {
  const id = review.list[review.i];
  const n = loadNotes().find((x) => x.id === id);
  if (right) {
    review.right++;
    updateNote(id, { status: "done" });
  } else {
    review.wrong++;
    updateNote(id, { status: "again", wrongCount: (Number(n.wrongCount) || 1) + 1 });
  }
  next();
}

function next() {
  review.i++;
  review.revealed = false;
  renderReview();
}

document.getElementById("review").addEventListener("keydown", (e) => {
  if (review.i >= review.list.length) return;
  if (e.key === " " && !review.revealed) {
    e.preventDefault();
    reveal();
  }
});

/* ---------- 내보내기 · 불러오기 ---------- */

function exportNotes() {
  const blob = new Blob([JSON.stringify(loadNotes(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `trade-wrong-notes-${todayString()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function importNotes(file) {
  try {
    const data = JSON.parse(await file.text());
    // 오답 배열 또는 설정의 전체 백업 파일 둘 다 지원
    const incoming = Array.isArray(data) ? data : data.wrongNotes;
    if (!Array.isArray(incoming)) throw new Error("format");
    const valid = incoming.filter((n) => n && n.id && n.topic);
    const map = new Map(loadNotes().map((n) => [n.id, n]));
    valid.forEach((n) => map.set(String(n.id), { status: "review", wrongCount: 1, ...n, id: String(n.id) }));
    saveNotes([...map.values()]);
    alert(`${valid.length}개 오답을 불러왔습니다. (같은 항목은 덮어씀)`);
  } catch {
    alert("파일을 읽지 못했습니다. 오답노트 내보내기나 설정 백업으로 만든 JSON 파일인지 확인해 주세요.");
  }
}

/* ---------- 시작 ---------- */

function renderAll() {
  renderSummary();
  renderList();
}

document.getElementById("add-note").addEventListener("click", () => openNoteDialog());
document.getElementById("start-review").addEventListener("click", startReview);
document.getElementById("export-notes").addEventListener("click", exportNotes);
const fileInput = document.getElementById("import-file");
document.getElementById("import-notes").addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", async () => {
  if (fileInput.files[0]) await importNotes(fileInput.files[0]);
  fileInput.value = "";
});
document.addEventListener("notes:change", renderAll);
window.addEventListener("storage", (e) => {
  if (e.key === "trade:wrongNotes") renderAll();
});

renderViewToggle();
renderToolbar();
renderAll();

// 홈 '최근 오답'에서 넘어온 경우 해당 카드 강조
const target = location.hash.slice(1) && document.getElementById(decodeURIComponent(location.hash.slice(1)));
if (target) {
  target.scrollIntoView({ block: "center" });
  target.classList.add("is-highlight");
  setTimeout(() => target.classList.remove("is-highlight"), 2400);
}
