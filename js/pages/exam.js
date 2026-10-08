import { initHeader, getPrefs, setPref } from "../common/header.js";
import { load, save, KEYS } from "../common/storage.js";
import { examDday, applicationStatus, todayString, daysUntil } from "../common/dday.js";
import { esc, shortDate } from "../common/util.js";
import { exam, APPLY_URL } from "../data/exam.js";

initHeader();

const PER = 30; // 과목당 문항 수
const PASS_N = Math.ceil((exam.failUnder / 100) * PER); // 과락을 면하는 최소 개수 = 12
const PASS_TOTAL = Math.ceil((exam.passAverage / 100) * exam.questions); // 평균 60점 = 72문항
const score = (n) => Math.round((n / PER) * 1000) / 10; // 소수 첫째 자리
const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];
const dateLabel = (d) => `${d.replaceAll("-", ".")}(${WEEKDAY[new Date(`${d}T00:00:00Z`).getUTCDay()]})`;

/* ---------- D-day · 일정 ---------- */

function renderHero() {
  const t = exam.target;
  const d = examDday();
  const apply = applicationStatus();
  document.getElementById("exam-hero").innerHTML = `
    <p class="exam-hero__label">제${t.round}회 시험까지</p>
    <p class="exam-hero__dday num">${d.label}</p>
    <p class="exam-hero__date num">${dateLabel(t.examDate)} ${exam.examTime}</p>
    <div class="exam-hero__apply${apply.state === "open" ? " is-open" : ""}">
      <span class="num">${apply.label}</span>
      <a class="btn btn--sm ${apply.state === "open" ? "btn--primary" : "btn--outline"}" href="${APPLY_URL}" target="_blank" rel="noopener">원서접수</a>
    </div>
    <p class="caption num">원서접수 ${shortDate(t.applyStart)}–${shortDate(t.applyEnd)} · 합격발표 ${shortDate(t.result)} 14시</p>`;
}

function renderRounds() {
  document.getElementById("rounds").innerHTML = `
    <table class="data-table rounds-table">
      <thead><tr><th>회차</th><th>시험일</th><th>원서접수</th><th>합격발표</th><th>상태</th></tr></thead>
      <tbody>
        ${exam.rounds
          .map((r) => {
            const left = daysUntil(r.examDate);
            const state = left < 0 ? "종료" : r.round === exam.target.round ? "목표" : "예정";
            return `
          <tr class="${r.round === exam.target.round ? "is-target" : ""}${left < 0 ? " is-past" : ""}">
            <th scope="row">제${r.round}회</th>
            <td class="num">${dateLabel(r.examDate)}</td>
            <td class="num">${shortDate(r.applyStart)}–${shortDate(r.applyEnd)}</td>
            <td class="num">${shortDate(r.result)} 14시</td>
            <td><span class="round-state round-state--${state === "목표" ? "target" : state === "종료" ? "past" : "next"}">${state}</span></td>
          </tr>`;
          })
          .join("")}
      </tbody>
    </table>
    <p class="caption rounds-note">출처: 한국무역협회 2026 시행 공고 기준. 접수 전 KITA 무역아카데미 공지사항에서 한 번 더 확인하세요.</p>`;
}

function renderInfo() {
  document.getElementById("exam-info").innerHTML = `
    <dl class="info-list">
      <dt>시행처</dt><dd>${exam.host}</dd>
      <dt>응시 방식</dt><dd>${exam.method}</dd>
      <dt>응시료</dt><dd class="num">${exam.fee.toLocaleString("ko-KR")}원</dd>
      <dt>문항</dt><dd>객관식 4지선다 ${exam.questions}문항 / ${exam.minutes}분 (쉬는 시간 없음)</dd>
      <dt>합격 기준</dt><dd>평균 ${exam.passAverage}점 이상, 과목별 ${exam.failUnder}점 미만 과락</dd>
    </dl>
    <table class="data-table subjects-table">
      <thead><tr><th>과목</th><th class="num">문항</th><th>세부 범위</th></tr></thead>
      <tbody>${exam.subjects.map((s) => `<tr><th scope="row">${s.name}</th><td class="num">${s.questions}</td><td class="subjects-table__scope">${s.scope}</td></tr>`).join("")}</tbody>
    </table>`;
}

/* ---------- 준비물 체크리스트 ---------- */

const CHECKLIST = [
  ["apply", "원서 접수 (11.02–11.15)"],
  ["fee", "응시료 55,000원 결제"],
  ["id", "신분증 준비 (주민등록증·운전면허증·여권 등)"],
  ["pc", "웹캠·마이크가 되는 PC와 인터넷 점검"],
  ["phone", "감독용 스마트폰과 거치대"],
  ["guide", "응시가이드 영상 시청"],
  ["test", "사전 접속·환경 테스트"],
  ["room", "조용한 독립 공간과 책상 정리"],
  ["rules", "당일 접속 시간·허용 물품 확인 (KITA 응시 안내)"],
];

function renderChecklist() {
  const checked = getPrefs().examChecklist ?? {};
  const done = CHECKLIST.filter(([k]) => checked[k]).length;
  document.getElementById("check-count").textContent = `${done} / ${CHECKLIST.length}`;
  document.getElementById("checklist").innerHTML = `
    <ul class="checklist-prep">
      ${CHECKLIST.map(
        ([k, label]) => `<li><label class="check-row${checked[k] ? " is-done" : ""}"><input type="checkbox" data-check="${k}" ${checked[k] ? "checked" : ""}><span>${label}</span></label></li>`
      ).join("")}
    </ul>`;
  document.querySelectorAll("[data-check]").forEach((box) =>
    box.addEventListener("change", () => {
      const next = { ...(getPrefs().examChecklist ?? {}) };
      if (box.checked) next[box.dataset.check] = true;
      else delete next[box.dataset.check];
      setPref("examChecklist", next);
      renderChecklist();
    })
  );
}

/* ---------- 합격 시뮬레이터 ---------- */

let simValues = getPrefs().simValues ?? exam.subjects.map(() => "");

function evaluate(counts) {
  const nums = counts.map((v) => Math.min(Math.max(Number(v) || 0, 0), PER));
  const total = nums.reduce((a, b) => a + b, 0);
  const avg = Math.round((total / exam.questions) * 1000) / 10;
  const fails = nums.map((n) => n < PASS_N);
  const deficit = nums.reduce((sum, n) => sum + Math.max(0, PASS_N - n), 0);
  const need = Math.max(deficit, PASS_TOTAL - total, 0);
  const pass = avg >= exam.passAverage && !fails.some(Boolean);
  return { nums, total, avg, fails, need, pass };
}

function renderSim() {
  const box = document.getElementById("sim");
  box.innerHTML = `
    <div class="sim-inputs">
      ${exam.subjects
        .map(
          (s, i) => `
        <label class="sim-input">
          <span class="field__label">${s.name}</span>
          <span class="sim-input__row">
            <input class="input num" type="number" inputmode="numeric" min="0" max="${PER}" step="1" data-sim="${i}" value="${esc(simValues[i])}" placeholder="0" aria-label="${s.name} 맞힌 개수">
            <span class="caption">/ ${PER}</span>
          </span>
          <span class="sim-input__score num" id="sim-score-${i}"></span>
        </label>`
        )
        .join("")}
    </div>
    <div class="sim-result" id="sim-result" aria-live="polite"></div>
    <div class="sim-actions">
      <input class="input input--date" type="date" id="mock-date" value="${todayString()}" aria-label="모의고사 날짜">
      <button class="btn btn--primary" type="button" id="save-mock">모의고사 기록으로 저장</button>
      <button class="btn btn--ghost" type="button" id="clear-sim">초기화</button>
    </div>`;

  box.querySelectorAll("[data-sim]").forEach((inp) =>
    inp.addEventListener("input", () => {
      simValues[Number(inp.dataset.sim)] = inp.value;
      setPref("simValues", simValues);
      updateSim();
    })
  );
  document.getElementById("clear-sim").addEventListener("click", () => {
    simValues = exam.subjects.map(() => "");
    setPref("simValues", simValues);
    renderSim();
  });
  document.getElementById("save-mock").addEventListener("click", saveMock);
  updateSim();
}

function updateSim() {
  const r = evaluate(simValues);
  const filled = simValues.some((v) => v !== "");
  r.nums.forEach((n, i) => {
    const el = document.getElementById(`sim-score-${i}`);
    el.textContent = simValues[i] === "" ? "—" : `${score(n)}점${r.fails[i] ? " · 과락" : ""}`;
    el.classList.toggle("is-bad", simValues[i] !== "" && r.fails[i]);
  });
  const res = document.getElementById("sim-result");
  if (!filled) {
    res.innerHTML = `<p class="caption">합격 기준: 평균 ${exam.passAverage}점(총 ${PASS_TOTAL}문항) 이상 + 모든 과목 ${exam.failUnder}점(${PASS_N}문항) 이상</p>`;
    return;
  }
  const failNames = exam.subjects.filter((_, i) => r.fails[i]).map((s) => s.name);
  res.innerHTML = `
    <div class="sim-verdict ${r.pass ? "is-pass" : "is-fail"}">
      <span class="sim-verdict__badge">${r.pass ? "✓ 합격" : "✕ 불합격"}</span>
      <span class="sim-verdict__avg num">평균 <strong>${r.avg}</strong>점 · 총 ${r.total} / ${exam.questions}문항</span>
    </div>
    <ul class="sim-notes small">
      ${failNames.length ? `<li class="is-bad">과락 과목: ${failNames.join(", ")} (과목당 ${PASS_N}문항 이상 필요)</li>` : `<li>과락 과목 없음</li>`}
      ${
        r.pass
          ? `<li>합격선보다 ${r.total - PASS_TOTAL}문항 여유가 있습니다.</li>`
          : `<li>합격까지 최소 <strong class="num">${r.need}</strong>문항을 더 맞혀야 합니다${failNames.length ? " (과락 과목 우선)" : ""}.</li>`
      }
    </ul>`;
}

/* ---------- 모의고사 기록 · 추이 ---------- */

function loadMocks() {
  return load(KEYS.mockScores, []).slice().sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : Number(a.id) - Number(b.id)));
}

function saveMock() {
  if (!simValues.some((v) => v !== "")) {
    alert("과목별 맞힌 개수를 먼저 입력해 주세요.");
    return;
  }
  const r = evaluate(simValues);
  const date = document.getElementById("mock-date").value || todayString();
  const record = { id: String(Date.now()), date, counts: r.nums };
  if (!save(KEYS.mockScores, [...load(KEYS.mockScores, []), record])) {
    alert("브라우저 저장소에 저장하지 못했습니다.");
    return;
  }
  renderMock();
  document.getElementById("mock").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderMock() {
  const mocks = loadMocks();
  document.getElementById("mock-count").textContent = mocks.length ? `${mocks.length}회` : "";
  const box = document.getElementById("mock");
  if (!mocks.length) {
    box.innerHTML = `<div class="empty">아직 저장한 모의고사가 없습니다.<br>위 시뮬레이터에 결과를 입력하고 <b>모의고사 기록으로 저장</b>을 누르세요.</div>`;
    return;
  }

  box.innerHTML = `
    <div class="chart-card">
      <div class="chart-head">
        <h3 class="chart-title">과목별 점수 추이</h3>
        <ul class="chart-legend">${exam.subjects.map((s, i) => `<li><span class="legend-line series-${i + 1}"></span>${s.name}</li>`).join("")}</ul>
      </div>
      <div class="chart-wrap" id="chart"></div>
    </div>
    <div class="table-scroll">
      <table class="data-table mock-table">
        <thead><tr><th>날짜</th>${exam.subjects.map((s) => `<th class="num">${s.name}</th>`).join("")}<th class="num">평균</th><th>결과</th><th><span class="sr-only">삭제</span></th></tr></thead>
        <tbody>
          ${mocks
            .slice()
            .reverse()
            .map((m) => {
              const r = evaluate(m.counts);
              return `<tr>
                <td class="num">${esc(m.date)}</td>
                ${r.nums.map((n, i) => `<td class="num${r.fails[i] ? " is-bad" : ""}">${score(n)} <span class="caption">(${n})</span></td>`).join("")}
                <td class="num"><b>${r.avg}</b></td>
                <td><span class="status ${r.pass ? "status--done" : "status--again"}">${r.pass ? "합격" : "불합격"}</span></td>
                <td><button class="btn btn--ghost btn--sm" type="button" data-del="${esc(m.id)}">삭제</button></td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>`;

  box.querySelectorAll("[data-del]").forEach((b) =>
    b.addEventListener("click", () => {
      if (!confirm("이 모의고사 기록을 삭제할까요?")) return;
      save(KEYS.mockScores, load(KEYS.mockScores, []).filter((m) => m.id !== b.dataset.del));
      renderMock();
    })
  );
  drawChart(mocks);
}

function drawChart(mocks) {
  const wrap = document.getElementById("chart");
  const W = Math.max(320, Math.round(wrap.clientWidth || 760));
  const H = 280;
  const m = { top: 16, right: 92, bottom: 34, left: 40 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;
  const n = mocks.length;
  const x = (i) => m.left + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
  const y = (v) => m.top + ih - (v / 100) * ih;
  const series = exam.subjects.map((s, si) => mocks.map((mk) => score(mk.counts[si])));

  const grid = [0, 20, 40, 60, 80, 100]
    .map(
      (v) => `<line class="chart-grid${v === 40 || v === 60 ? " chart-grid--ref" : ""}" x1="${m.left}" x2="${m.left + iw}" y1="${y(v)}" y2="${y(v)}"></line>
              <text class="chart-axis" x="${m.left - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`
    )
    .join("");
  const refs = `<text class="chart-ref" x="${m.left + 14}" y="${y(60) - 7}">합격선 60</text>
                <text class="chart-ref" x="${m.left + 14}" y="${y(40) - 7}">과락선 40</text>`;
  const xLabels = mocks
    .map((mk, i) => (n <= 8 || i === 0 || i === n - 1 || i % Math.ceil(n / 6) === 0 ? `<text class="chart-axis" x="${x(i)}" y="${H - 10}" text-anchor="middle">${shortDate(mk.date)}</text>` : ""))
    .join("");
  const lines = series
    .map((vals, si) => {
      const pts = vals.map((v, i) => `${x(i)},${y(v)}`).join(" ");
      return `<g class="series-${si + 1}">
        ${n > 1 ? `<polyline class="chart-line" points="${pts}"></polyline>` : ""}
        ${vals.map((v, i) => `<circle class="chart-dot" cx="${x(i)}" cy="${y(v)}" r="4"></circle>`).join("")}
      </g>`;
    })
    .join("");
  // 오른쪽 끝 직접 라벨 (겹치지 않게 최소 간격 확보)
  const ends = series.map((vals, si) => ({ si, v: vals[n - 1], y: y(vals[n - 1]) })).sort((a, b) => a.y - b.y);
  for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 13) ends[i].y = ends[i - 1].y + 13;
  const endLabels = ends.map((e) => `<text class="chart-end" x="${x(n - 1) + 10}" y="${e.y + 4}">${exam.subjects[e.si].name} ${e.v}</text>`).join("");

  wrap.innerHTML = `
    <svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="모의고사 과목별 점수 추이 (아래 표에 같은 데이터)">
      ${grid}${refs}${xLabels}
      <line class="chart-cross" id="cross" x1="0" x2="0" y1="${m.top}" y2="${m.top + ih}" visibility="hidden"></line>
      ${lines}${endLabels}
      <rect class="chart-hit" x="${m.left - 10}" y="${m.top}" width="${iw + 20}" height="${ih}"></rect>
    </svg>
    <div class="chart-tip" id="tip" hidden></div>`;

  // 호버: 가장 가까운 회차의 네 과목 점수
  const svg = wrap.querySelector("svg");
  const tip = wrap.querySelector("#tip");
  const cross = wrap.querySelector("#cross");
  const show = (clientX) => {
    const rect = svg.getBoundingClientRect();
    const sx = ((clientX - rect.left) / rect.width) * W;
    let i = n === 1 ? 0 : Math.round(((sx - m.left) / iw) * (n - 1));
    i = Math.min(Math.max(i, 0), n - 1);
    const r = evaluate(mocks[i].counts);
    cross.setAttribute("x1", x(i));
    cross.setAttribute("x2", x(i));
    cross.setAttribute("visibility", "visible");
    tip.hidden = false;
    tip.innerHTML = `<p class="chart-tip__date num">${esc(mocks[i].date)}</p>
      ${exam.subjects.map((s, si) => `<p><span class="legend-line series-${si + 1}"></span>${s.name} <b class="num">${score(r.nums[si])}</b></p>`).join("")}
      <p class="chart-tip__avg">평균 <b class="num">${r.avg}</b></p>`;
    const px = (x(i) / W) * rect.width;
    const left = px + 14 + tip.offsetWidth > rect.width ? px - tip.offsetWidth - 14 : px + 14;
    tip.style.left = `${left}px`;
    tip.style.top = `${(m.top / H) * rect.height}px`;
  };
  const hide = () => {
    tip.hidden = true;
    cross.setAttribute("visibility", "hidden");
  };
  const hit = wrap.querySelector(".chart-hit");
  hit.addEventListener("pointermove", (e) => show(e.clientX));
  hit.addEventListener("pointerleave", hide);
  hit.addEventListener("pointerdown", (e) => show(e.clientX));
}

/* ---------- 시작 ---------- */

renderHero();
renderRounds();
renderInfo();
renderChecklist();
renderSim();
renderMock();
// 화면 폭이 바뀌면 그래프를 다시 그림
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => loadMocks().length && drawChart(loadMocks()), 150);
});
if (location.hash === "#simulator") document.getElementById("simulator").scrollIntoView({ block: "start" });
