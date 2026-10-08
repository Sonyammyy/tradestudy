import { initHeader, getPrefs, setPref } from "../common/header.js";
import { TRACK, GROUPS, incoterms, changes2020 } from "../data/incoterms.js";

initHeader();

const MODES = [
  { id: "all", label: "전체 11" },
  { id: "sea", label: "해상 전용 4" },
  { id: "any", label: "모든 운송방식 7" },
];
const MODE_LABEL = { sea: "해상·내수로 전용", any: "모든 운송방식" };

const fromHash = incoterms.find((r) => r.code === location.hash.slice(1).toUpperCase());
let selected = fromHash?.code ?? getPrefs().incoterm ?? "FCA";
let mode = getPrefs().incotermMode ?? "all";

const rule = () => incoterms.find((r) => r.code === selected);
const visibleRules = () => incoterms.filter((r) => mode === "all" || r.mode === mode);

/* ---------- 운송방식 토글 ---------- */

function renderModes() {
  const box = document.getElementById("mode-toggle");
  box.innerHTML = MODES.map(
    (m) => `<button type="button" class="segmented__btn" data-mode="${m.id}" aria-pressed="${m.id === mode}">${m.label}</button>`
  ).join("");
  box.querySelectorAll("[data-mode]").forEach((b) =>
    b.addEventListener("click", () => {
      mode = b.dataset.mode;
      setPref("incotermMode", mode);
      // 선택한 규칙이 걸러지면 첫 규칙으로
      if (!visibleRules().some((r) => r.code === selected)) selected = visibleRules()[0].code;
      renderAll();
    })
  );
}

/* ---------- 규칙 버튼 (그룹별) ---------- */

function renderButtons() {
  const box = document.getElementById("rule-buttons");
  const rules = visibleRules();
  box.innerHTML = GROUPS.map((g) => {
    const items = rules.filter((r) => r.group === g.id);
    if (!items.length) return "";
    return `<div class="inco-rules__group" title="${g.name}">${items
      .map((r) => `<button type="button" class="rule-btn" data-code="${r.code}" aria-pressed="${r.code === selected}">${r.code}</button>`)
      .join("")}</div>`;
  }).join("");
  box.querySelectorAll("[data-code]").forEach((b) => b.addEventListener("click", () => select(b.dataset.code)));
}

/* ---------- 분기점 트랙 ---------- */

function renderTrack() {
  const r = rule();
  const last = TRACK.length - 1;
  const pct = (i) => (i / last) * 100;
  const split = r.risk !== r.costEnd;

  document.getElementById("track").innerHTML = `
    <div class="track__line"></div>
    <div class="track__cost" style="width: ${pct(r.costEnd)}%"></div>
    ${TRACK.map((name, i) => {
      const isRisk = i === r.risk;
      const isCost = split && i === r.costEnd;
      const cls = ["track__stop", i <= r.costEnd ? "is-paid" : "", isRisk ? "is-risk" : "", isCost ? "is-cost" : ""].join(" ");
      return `
        <div class="${cls}" style="left: ${pct(i)}%">
          ${isRisk ? `<span class="track__flag track__flag--risk">위험 이전</span>` : ""}
          ${isCost ? `<span class="track__flag track__flag--cost">비용 종료</span>` : ""}
          <span class="track__dot"></span>
          <span class="track__label">${name}</span>
        </div>`;
    }).join("")}`;

  document.getElementById("track-legend").innerHTML = `
    <li><span class="legend-dot legend-dot--paid"></span>매도인이 비용 부담하는 구간</li>
    <li><span class="legend-dot legend-dot--risk"></span>위험이 매수인에게 넘어가는 지점</li>
    ${split ? `<li><span class="legend-dot legend-dot--cost"></span>매도인 비용 부담이 끝나는 지점</li>` : ""}`;

  // 좁은 화면에서 트랙이 잘리면 위험 이전 지점이 보이도록 가로 스크롤
  const sc = document.querySelector(".track-scroll");
  const flag = document.querySelector(".track__stop.is-risk");
  if (sc.scrollWidth > sc.clientWidth && flag) {
    sc.scrollLeft = flag.offsetLeft + document.getElementById("track").offsetLeft - sc.clientWidth / 2;
  }
}

/* ---------- 상세 ---------- */

function renderDetail() {
  const r = rule();
  const group = GROUPS.find((g) => g.id === r.group);
  const split = r.risk !== r.costEnd;
  const rows = [
    ["그룹", group.name],
    ["운송방식", MODE_LABEL[r.mode]],
    ["위험 이전", TRACK[r.risk]],
    ["비용 종료", TRACK[r.costEnd]],
    ["운송계약", r.carriage],
    ["보험", r.insurance],
    ["수출통관", r.exportClearance],
    ["수입통관", r.importClearance],
    ["적재", r.loading],
    ["양하", r.unloading],
  ];

  document.getElementById("rule-detail").innerHTML = `
    <div class="inco-detail__main">
      <h3 class="inco-detail__title"><span class="inco-detail__code">${r.code}</span> ${r.name} · ${r.ko}</h3>
      <p class="inco-detail__summary">${r.summary}</p>
      ${
        split
          ? `<p class="small inco-detail__split">위험 이전 지점(<strong>${TRACK[r.risk]}</strong>)과 매도인 비용 종료 지점(<strong>${TRACK[r.costEnd]}</strong>)이 다릅니다.</p>`
          : `<p class="small inco-detail__split">위험 이전과 비용 분기점이 같은 지점(<strong>${TRACK[r.risk]}</strong>)입니다.</p>`
      }
      <div class="inco-detail__block">
        <p class="inco-detail__label">인도 · 위험 이전 시점</p>
        <p class="small">${r.delivery}</p>
      </div>
      <div class="inco-detail__block inco-detail__block--point">
        <p class="inco-detail__label">시험 포인트</p>
        <p class="small">${r.examPoint}</p>
      </div>
    </div>
    <dl class="inco-detail__facts">
      ${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}
    </dl>`;
}

/* ---------- 비교표 ---------- */

function renderCompare() {
  const cols = [
    ["운송방식", (r) => (r.mode === "sea" ? "해상 전용" : "모든 운송")],
    ["위험 이전", (r) => TRACK[r.risk]],
    ["비용 종료", (r) => TRACK[r.costEnd]],
    ["운송계약", (r) => r.carriage],
    ["보험", (r) => r.insurance.split(" (")[0]],
    ["수출통관", (r) => r.exportClearance],
    ["수입통관", (r) => r.importClearance],
    ["양하", (r) => (r.unloading.length > 6 ? "계약에 따라" : r.unloading)],
  ];
  const box = document.getElementById("compare");
  box.innerHTML = `
    <table class="data-table compare-table">
      <thead><tr><th scope="col">규칙</th>${cols.map(([h]) => `<th scope="col">${h}</th>`).join("")}</tr></thead>
      <tbody>
        ${incoterms
          .map(
            (r) => `
          <tr class="${r.code === selected ? "is-selected" : ""}${mode !== "all" && r.mode !== mode ? " is-dim" : ""}" data-row="${r.code}" tabindex="0">
            <th scope="row"><b>${r.code}</b> <span class="caption">${r.ko}</span></th>
            ${cols.map(([, f]) => {
              const v = f(r);
              return `<td class="${v === "매도인" || v.startsWith("매도인") ? "is-seller" : ""}">${v}</td>`;
            }).join("")}
          </tr>`
          )
          .join("")}
      </tbody>
    </table>`;
  box.querySelectorAll("[data-row]").forEach((tr) => {
    const go = () => {
      const r = incoterms.find((x) => x.code === tr.dataset.row);
      if (mode !== "all" && r.mode !== mode) mode = "all";
      select(r.code);
      document.querySelector(".inco").scrollIntoView({ behavior: "smooth", block: "start" });
    };
    tr.addEventListener("click", go);
    tr.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    });
  });
}

function renderChanges() {
  document.getElementById("changes").innerHTML = changes2020
    .map((c) => `<li class="changes__item"><strong>${c.title}</strong><span class="small">${c.desc}</span></li>`)
    .join("");
}

/* ---------- 상태 ---------- */

function select(code) {
  selected = code;
  setPref("incoterm", code);
  history.replaceState(null, "", `#${code}`);
  renderAll();
}

function renderAll() {
  renderModes();
  renderButtons();
  renderTrack();
  renderDetail();
  renderCompare();
}

// ← → 키로 규칙 이동 (입력창이 아닐 때)
document.addEventListener("keydown", (e) => {
  if (e.target.closest?.("input, textarea, select, dialog")) return;
  const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
  if (!step) return;
  const list = visibleRules();
  const i = list.findIndex((r) => r.code === selected);
  const next = list[(i + step + list.length) % list.length];
  select(next.code);
  document.querySelector(`[data-code="${next.code}"]`)?.focus();
});

renderChanges();
renderAll();
