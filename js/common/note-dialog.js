// 오답 빠른 입력 창 (홈 · 개념노트에서 함께 사용)
// 저장하면 document에 "notes:change" 이벤트를 보냄
import { icon } from "./icons.js";
import { load, save, KEYS } from "./storage.js";
import { todayString } from "./dday.js";
import { exam } from "../data/exam.js";
import { plan } from "../data/plan.js";

let dialog = null;
let form = null;
let linkedConcept = "";

function build() {
  dialog = document.createElement("dialog");
  dialog.className = "modal";
  dialog.setAttribute("aria-labelledby", "note-title");
  dialog.innerHTML = `
    <form id="note-form">
      <div class="modal__head">
        <h2 id="note-title">오답 추가</h2>
        <button class="btn btn--ghost btn--icon" type="button" data-close aria-label="닫기">${icon("close")}</button>
      </div>
      <div class="modal__body">
        <div class="field-row">
          <label class="field">
            <span class="field__label">과목</span>
            <select class="input" name="subject">
              ${exam.subjects.map((s) => `<option>${s.name}</option>`).join("")}
            </select>
          </label>
          <label class="field">
            <span class="field__label">주차</span>
            <select class="input" name="week">
              ${plan.map((w) => `<option value="${w.week}">W${w.week} · ${w.title}</option>`).join("")}
            </select>
          </label>
        </div>
        <label class="field">
          <span class="field__label">주제 <span class="is-bad">*</span></span>
          <input class="input" name="topic" required placeholder="예: D/A 서류 인도 시점" autocomplete="off">
        </label>
        <label class="field">
          <span class="field__label">왜 틀렸는지</span>
          <textarea class="input" name="reason" rows="2" placeholder="예: 지급과 인수를 헷갈림"></textarea>
        </label>
        <label class="field">
          <span class="field__label">맞는 개념</span>
          <textarea class="input" name="concept" rows="2" placeholder="예: D/A는 환어음 인수만으로 서류 인도"></textarea>
        </label>
        <p class="caption">문제 내용, 고른 답 같은 자세한 항목은 오답노트 페이지에서 채울 수 있습니다.</p>
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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const today = todayString();
    const note = {
      id: String(Date.now()),
      subject: data.get("subject"),
      week: Number(data.get("week")),
      topic: data.get("topic").trim(),
      question: "",
      myAnswer: "",
      answer: "",
      reason: data.get("reason").trim(),
      concept: data.get("concept").trim(),
      conceptId: linkedConcept, // 관련 개념 링크 (개념노트에서 추가했을 때)
      status: "review",
      wrongCount: 1,
      createdAt: today,
      updatedAt: today,
    };
    save(KEYS.wrongNotes, [...load(KEYS.wrongNotes, []), note]);
    dialog.close();
    document.dispatchEvent(new CustomEvent("notes:change", { detail: note }));
  });
}

// defaults: { subject, week, topic, concept, conceptId }
export function openNoteDialog(defaults = {}) {
  if (!dialog) build();
  form.reset();
  form.subject.value = defaults.subject ?? exam.subjects[0].name;
  form.week.value = String(defaults.week ?? plan[0].week);
  form.topic.value = defaults.topic ?? "";
  form.concept.value = defaults.concept ?? "";
  linkedConcept = defaults.conceptId ?? "";
  dialog.showModal();
  (defaults.topic ? form.reason : form.topic).focus();
}
