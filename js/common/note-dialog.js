// 오답 입력·수정 창 (홈 · 개념노트 · 오답노트에서 함께 사용)
// 저장하면 document에 "notes:change" 이벤트를 보냄
import { icon } from "./icons.js";
import { load, save, KEYS } from "./storage.js";
import { todayString } from "./dday.js";
import { exam } from "../data/exam.js";
import { plan } from "../data/plan.js";
import { concepts } from "../data/concepts.js";

export const STATUS = {
  review: "복습 필요",
  again: "다시 틀림",
  done: "외움",
};

export function loadNotes() {
  return load(KEYS.wrongNotes, []);
}

export function saveNotes(notes) {
  const ok = save(KEYS.wrongNotes, notes);
  document.dispatchEvent(new CustomEvent("notes:change"));
  return ok;
}

let dialog = null;
let form = null;
let editingId = null;

function build() {
  dialog = document.createElement("dialog");
  dialog.className = "modal modal--wide";
  dialog.setAttribute("aria-labelledby", "note-title");
  dialog.innerHTML = `
    <form id="note-form" novalidate>
      <div class="modal__head">
        <h2 id="note-title">오답 추가</h2>
        <button class="btn btn--ghost btn--icon" type="button" data-close aria-label="닫기">${icon("close")}</button>
      </div>
      <div class="modal__body">
        <div class="field-row">
          <label class="field">
            <span class="field__label">과목</span>
            <select class="input" name="subject">${exam.subjects.map((s) => `<option>${s.name}</option>`).join("")}</select>
          </label>
          <label class="field">
            <span class="field__label">주차</span>
            <select class="input" name="week">${plan.map((w) => `<option value="${w.week}">W${w.week} · ${w.title}</option>`).join("")}</select>
          </label>
        </div>
        <label class="field">
          <span class="field__label">주제 <span class="is-bad">*</span></span>
          <input class="input" name="topic" required placeholder="예: D/A 서류 인도 시점" autocomplete="off">
          <span class="field__error" hidden>주제를 입력해 주세요.</span>
        </label>

        <details class="note-more">
          <summary>문제 · 답 기록 <span class="caption">(선택)</span></summary>
          <div class="note-more__body">
            <label class="field">
              <span class="field__label">문제 내용</span>
              <textarea class="input" name="question" rows="3" placeholder="문제를 그대로 옮겨 적거나 요약"></textarea>
            </label>
            <div class="field-row field-row--even">
              <label class="field">
                <span class="field__label">내가 고른 답</span>
                <input class="input" name="myAnswer" autocomplete="off" placeholder="예: ② 환어음 지급 시">
              </label>
              <label class="field">
                <span class="field__label">정답</span>
                <input class="input" name="answer" autocomplete="off" placeholder="예: ③ 환어음 인수 시">
              </label>
            </div>
          </div>
        </details>

        <label class="field">
          <span class="field__label">왜 틀렸는지</span>
          <textarea class="input" name="reason" rows="2" placeholder="예: 지급과 인수를 헷갈림"></textarea>
        </label>
        <label class="field">
          <span class="field__label">맞는 개념</span>
          <textarea class="input" name="concept" rows="2" placeholder="예: D/A는 환어음 인수만으로 서류 인도"></textarea>
        </label>
        <div class="field-row field-row--even">
          <label class="field">
            <span class="field__label">관련 개념 (개념노트 링크)</span>
            <select class="input" name="conceptId">
              <option value="">선택 안 함</option>
              ${plan
                .map(
                  (w) => `<optgroup label="W${w.week} · ${w.title}">${concepts
                    .filter((c) => c.week === w.week)
                    .map((c) => `<option value="${c.id}">${c.name}</option>`)
                    .join("")}</optgroup>`
                )
                .join("")}
            </select>
          </label>
          <label class="field" data-edit-only>
            <span class="field__label">복습 상태</span>
            <select class="input" name="status">${Object.entries(STATUS).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select>
          </label>
        </div>
      </div>
      <div class="modal__foot">
        <button class="btn btn--outline" type="button" data-close>취소</button>
        <button class="btn btn--primary" type="submit">저장</button>
      </div>
    </form>`;
  document.body.append(dialog);
  form = dialog.querySelector("form");

  dialog.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", () => dialog.close()));
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  form.topic.addEventListener("input", () => (form.querySelector(".field__error").hidden = true));

  // 관련 개념을 고르면 비어 있는 주차·맞는 개념을 채움
  form.conceptId.addEventListener("change", () => {
    const c = concepts.find((x) => x.id === form.conceptId.value);
    if (!c) return;
    form.week.value = String(c.week);
    if (!form.concept.value.trim()) form.concept.value = c.summary;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const topic = form.topic.value.trim();
    if (!topic) {
      form.querySelector(".field__error").hidden = false;
      form.topic.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    const today = todayString();
    const notes = loadNotes();
    const fields = {
      subject: data.subject,
      week: Number(data.week),
      topic,
      question: data.question.trim(),
      myAnswer: data.myAnswer.trim(),
      answer: data.answer.trim(),
      reason: data.reason.trim(),
      concept: data.concept.trim(),
      conceptId: data.conceptId,
      updatedAt: today,
    };

    let saved;
    if (editingId) {
      saved = notes.map((n) => (n.id === editingId ? { ...n, ...fields, status: data.status } : n));
    } else {
      saved = [...notes, { id: String(Date.now()), ...fields, status: "review", wrongCount: 1, createdAt: today }];
    }
    if (!saveNotes(saved)) {
      alert("브라우저 저장소에 저장하지 못했습니다. 시크릿 창이거나 저장 공간이 부족한지 확인해 주세요.");
      return;
    }
    dialog.close();
  });
}

// defaults: { subject, week, topic, concept, conceptId } / note: 수정할 기존 오답
export function openNoteDialog(defaults = {}, note = null) {
  if (!dialog) build();
  form.reset();
  form.querySelector(".field__error").hidden = true;
  editingId = note?.id ?? null;
  const v = note ?? defaults;

  dialog.querySelector("#note-title").textContent = note ? "오답 수정" : "오답 추가";
  dialog.querySelectorAll("[data-edit-only]").forEach((el) => (el.hidden = !note));
  form.subject.value = v.subject ?? exam.subjects[0].name;
  form.week.value = String(v.week ?? plan[0].week);
  form.topic.value = v.topic ?? "";
  form.question.value = v.question ?? "";
  form.myAnswer.value = v.myAnswer ?? "";
  form.answer.value = v.answer ?? "";
  form.reason.value = v.reason ?? "";
  form.concept.value = v.concept ?? "";
  form.conceptId.value = v.conceptId ?? "";
  form.status.value = v.status ?? "review";
  dialog.querySelector(".note-more").open = Boolean(note?.question || note?.myAnswer || note?.answer);

  dialog.showModal();
  (v.topic ? form.reason : form.topic).focus();
}

