// 결제방식 · SVG 흐름도 렌더, 단계 선택, 이전·다음·자동 재생
import { initHeader, getPrefs, setPref } from "../common/header.js";
import { icon } from "../common/icons.js";
import { actors, payments, TABS, comparison } from "../data/payments.js";

initHeader();

const hash = location.hash.slice(1);
const hashTab = TABS.find((t) => t.id === hash || t.keys.includes(hash));
let tab = hashTab?.id ?? getPrefs().paymentTab ?? "sightLC";
let flowKey = hashTab?.keys.includes(hash) ? hash : TABS.find((t) => t.id === tab).keys[0];
let current = 0; // 현재 단계 인덱스
let timer = null;

const flow = () => payments[flowKey];
const actorName = (key) => actors[key].name;

/* ---------- 탭 ---------- */

function renderTabs() {
  const box = document.getElementById("pay-tabs");
  box.innerHTML = TABS.map(
    (t) => `<button type="button" role="tab" class="pay-tab" id="tab-${t.id}" data-tab="${t.id}" aria-selected="${t.id === tab}" tabindex="${t.id === tab ? 0 : -1}">${t.label}</button>`
  ).join("");
  box.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => selectTab(b.dataset.tab)));
  box.addEventListener("keydown", (e) => {
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!d) return;
    e.preventDefault();
    const i = TABS.findIndex((t) => t.id === tab);
    const next = TABS[(i + d + TABS.length) % TABS.length];
    selectTab(next.id);
    document.getElementById(`tab-${next.id}`).focus();
  });
}

function selectTab(id) {
  tab = id;
  flowKey = TABS.find((t) => t.id === id).keys[0];
  setPref("paymentTab", id);
  history.replaceState(null, "", `#${id}`);
  current = 0;
  stop();
  renderAll();
}

/* ---------- 개요 ---------- */

function meter(level, label) {
  return `
    <div class="meter" role="img" aria-label="${label} ${level}단계 (5단계 중)">
      <span class="meter__label">${label}</span>
      <span class="meter__dots">${[1, 2, 3, 4, 5].map((n) => `<i class="${n <= level ? "on" : ""}"></i>`).join("")}</span>
      <span class="meter__value num">${level}/5</span>
    </div>`;
}

function renderOverview() {
  const f = flow();
  const t = TABS.find((x) => x.id === tab);
  document.getElementById("overview").innerHTML = `
    <div class="pay-overview__main">
      ${
        t.keys.length > 1
          ? `<div class="segmented" role="group" aria-label="기한부 신용장 종류">${t.keys
              .map((k) => `<button type="button" class="segmented__btn" data-variant="${k}" aria-pressed="${k === flowKey}">${payments[k].variant}</button>`)
              .join("")}</div>`
          : ""
      }
      <h2 id="overview-title" class="pay-overview__title">${f.title}</h2>
      <p><span class="rule-chip">${f.rule}</span></p>
      <p class="pay-overview__def">${f.definition}</p>
      <div class="pay-overview__cols">
        <div><h3>언제 쓰나</h3><p class="small">${f.when}</p></div>
        <div><h3>수입자 부담</h3><p class="small">${f.importerBurden}</p></div>
        <div><h3>장점</h3><ul class="small dot-list">${f.pros.map((x) => `<li>${x}</li>`).join("")}</ul></div>
        <div><h3>단점</h3><ul class="small dot-list">${f.cons.map((x) => `<li>${x}</li>`).join("")}</ul></div>
      </div>
    </div>
    <div class="pay-overview__risk">
      ${meter(f.exporterRisk, "수출자 위험")}
      ${meter(f.importerRisk, "수입자 위험")}
      <p class="caption">1 낮음 · 5 높음</p>
    </div>`;

  document.querySelectorAll("[data-variant]").forEach((b) =>
    b.addEventListener("click", () => {
      flowKey = b.dataset.variant;
      history.replaceState(null, "", `#${flowKey}`);
      current = 0;
      stop();
      renderAll();
    })
  );
}

/* ---------- SVG 흐름도 ---------- */

const LANE_W = 128;
const HEAD_H = 64;
const ROW_H = 54;
const PAD_X = 16;

function renderFlow() {
  const f = flow();
  const lanes = f.actors;
  const width = PAD_X * 2 + lanes.length * LANE_W;
  const height = HEAD_H + f.steps.length * ROW_H + 16;
  const laneX = (key) => PAD_X + lanes.indexOf(key) * LANE_W + LANE_W / 2;
  const rowY = (i) => HEAD_H + i * ROW_H + ROW_H / 2 + 6;
  const state = (i) => (i === current ? "current" : i < current ? "past" : "future");

  const head = lanes
    .map((key) => {
      const x = laneX(key);
      return `
      <g class="lane-head">
        <rect x="${x - LANE_W / 2 + 6}" y="6" width="${LANE_W - 12}" height="${HEAD_H - 16}" rx="10"></rect>
        <text x="${x}" y="30" class="lane-head__name">${actorName(key)}</text>
        <text x="${x}" y="46" class="lane-head__alias">${shorten(actors[key].alias, 11)}</text>
      </g>
      <line class="lane-line" x1="${x}" x2="${x}" y1="${HEAD_H - 6}" y2="${height - 8}"></line>`;
    })
    .join("");

  const rows = f.steps
    .map((st, i) => {
      const y = rowY(i);
      const x1 = laneX(st.from);
      const x2 = laneX(st.to);
      const cls = `step step--${state(i)}`;
      const label = `${st.no}단계: ${actorName(st.from)}${st.from === st.to ? "" : ` → ${actorName(st.to)}`}, ${st.title}`;
      let mark;
      let textX;
      let anchor = "middle";
      if (st.from === st.to) {
        // 한 참여자 안에서 일어나는 단계
        mark = `<rect class="step__self" x="${x1 - 46}" y="${y - 13}" width="92" height="26" rx="13"></rect>
                <circle class="step__num-bg" cx="${x1 - 32}" cy="${y}" r="10"></circle>
                <text class="step__num" x="${x1 - 32}" y="${y + 4}">${st.no}</text>`;
        textX = x1 + 54;
        anchor = "start";
        if (textX + 120 > width) {
          textX = x1 - 54;
          anchor = "end";
        }
      } else {
        const dir = x2 > x1 ? 1 : -1;
        const sx = x1 + dir * 14;
        const ex = x2 - dir * 10;
        mark = `<line class="step__arrow" x1="${sx}" y1="${y}" x2="${ex}" y2="${y}" marker-end="url(#arrow-${state(i)})"></line>
                <circle class="step__num-bg" cx="${x1}" cy="${y}" r="11"></circle>
                <text class="step__num" x="${x1}" y="${y + 4}">${st.no}</text>`;
        textX = (x1 + x2) / 2;
      }
      return `
      <g class="${cls}" data-step="${i}" tabindex="0" role="button" aria-label="${label}" aria-pressed="${i === current}">
        <rect class="step__hit" x="0" y="${y - ROW_H / 2}" width="${width}" height="${ROW_H}"></rect>
        ${mark}
        <text class="step__title" x="${textX}" y="${st.from === st.to ? y + 4 : y - 9}" text-anchor="${anchor}">${st.title}</text>
      </g>`;
    })
    .join("");

  const markers = ["current", "past", "future"]
    .map(
      (k) => `<marker id="arrow-${k}" class="arrowhead arrowhead--${k}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z"></path></marker>`
    )
    .join("");

  document.getElementById("flow").innerHTML = `
    <svg class="flow-svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="group" aria-label="${f.title} 흐름도">
      <defs>${markers}</defs>
      ${head}
      ${rows}
    </svg>`;

  document.querySelectorAll("#flow [data-step]").forEach((g) => {
    const go = () => {
      stop();
      setStep(Number(g.dataset.step));
    };
    g.addEventListener("click", go);
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    });
  });
}

function shorten(text, n) {
  return text.length > n ? `${text.slice(0, n - 1)}…` : text;
}

/* ---------- 단계 상세 ---------- */

function renderDetail() {
  const f = flow();
  const st = f.steps[current];
  const route = st.from === st.to ? actorName(st.from) : `${actorName(st.from)} → ${actorName(st.to)}`;
  const list = (title, items, cls = "") =>
    items.length ? `<div class="flow-detail__block"><h4>${title}</h4><ul class="${cls}">${items.map((x) => `<li>${x}</li>`).join("")}</ul></div>` : "";

  document.getElementById("step-detail").innerHTML = `
    <p class="flow-detail__step num">STEP ${st.no} / ${f.steps.length}</p>
    <h3 class="flow-detail__title">${st.title}</h3>
    <p class="flow-detail__route">${route}</p>
    <p class="flow-detail__desc">${st.desc}</p>
    ${list("필요한 서류", st.documents, "doc-list")}
    ${list("확인사항", st.check, "dot-list")}
    ${st.rule ? `<div class="flow-detail__block"><h4>관련 조항</h4><p class="small">${st.rule}</p></div>` : ""}
    ${st.examPoint ? `<div class="flow-detail__point"><strong>시험 포인트</strong> ${st.examPoint}</div>` : ""}`;
}

/* ---------- 컨트롤 ---------- */

function renderControls() {
  const n = flow().steps.length;
  document.getElementById("flow-controls").innerHTML = `
    <button class="btn btn--outline btn--sm" type="button" id="prev" ${current === 0 ? "disabled" : ""}>이전</button>
    <span class="flow-controls__count num" aria-live="polite">${current + 1} / ${n}</span>
    <button class="btn btn--outline btn--sm" type="button" id="next" ${current === n - 1 ? "disabled" : ""}>다음</button>
    <button class="btn btn--primary btn--sm" type="button" id="play" aria-pressed="${Boolean(timer)}">${timer ? "일시정지" : "자동 재생"}</button>`;
  document.getElementById("prev").addEventListener("click", () => {
    stop();
    setStep(current - 1);
  });
  document.getElementById("next").addEventListener("click", () => {
    stop();
    setStep(current + 1);
  });
  document.getElementById("play").addEventListener("click", () => (timer ? stop() : play()));
}

function setStep(i) {
  const n = flow().steps.length;
  current = Math.min(Math.max(i, 0), n - 1);
  renderFlow();
  renderDetail();
  renderControls();
  // 현재 단계가 보이도록 흐름도 상자 안에서만 스크롤 (페이지는 움직이지 않음)
  const box = document.getElementById("flow");
  const st = flow().steps[current];
  const y = HEAD_H + current * ROW_H;
  const x = PAD_X + flow().actors.indexOf(st.from) * LANE_W;
  if (y < box.scrollTop + HEAD_H || y + ROW_H > box.scrollTop + box.clientHeight) box.scrollTop = Math.max(0, y - box.clientHeight / 2);
  if (x < box.scrollLeft || x + LANE_W > box.scrollLeft + box.clientWidth) box.scrollLeft = Math.max(0, x - LANE_W);
}

function play() {
  if (current >= flow().steps.length - 1) current = -1;
  timer = setInterval(() => {
    if (current >= flow().steps.length - 1) return stop();
    setStep(current + 1);
  }, 2200);
  setStep(current + 1);
}

function stop() {
  if (!timer) return;
  clearInterval(timer);
  timer = null;
  renderControls();
}

document.addEventListener("keydown", (e) => {
  if (e.target.closest?.("input, textarea, select, dialog, [role=tablist]")) return;
  if (e.key === "ArrowRight") {
    stop();
    setStep(current + 1);
  }
  if (e.key === "ArrowLeft") {
    stop();
    setStep(current - 1);
  }
});

/* ---------- 비교표 ---------- */

function renderCompare() {
  const cols = [
    ["은행 지급확약", "guarantee"],
    ["서류 인도 시점", "docs"],
    ["대금 지급 시점", "pay"],
    ["수출자 위험", "exporterRisk"],
    ["수입자 자금부담", "importerFund"],
    ["적용 규칙", "rule"],
  ];
  document.getElementById("pay-compare").innerHTML = `
    <table class="data-table">
      <thead><tr><th scope="col">결제방식</th>${cols.map(([h]) => `<th scope="col">${h}</th>`).join("")}</tr></thead>
      <tbody>${comparison
        .map((r) => `<tr><th scope="row"><b>${r.name}</b></th>${cols.map(([, k]) => `<td>${r[k]}</td>`).join("")}</tr>`)
        .join("")}</tbody>
    </table>`;
}

function renderAll() {
  renderTabs();
  renderOverview();
  setStep(current);
}

renderCompare();
renderAll();
