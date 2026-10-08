// 헤더·내비게이션 렌더, 현재 페이지 표시, 설정 창
import { examDday, applicationStatus } from "./dday.js";
import { icon } from "./icons.js";
import { load, save, remove, KEYS, exportBackup, importBackup } from "./storage.js";
import { exam, APPLY_URL } from "../data/exam.js";

// 사이트 루트 (index.html, pages/*.html 어디서 불러와도 같은 위치를 가리킴)
const ROOT = new URL("../../", import.meta.url);
const href = (path) => new URL(path, ROOT).pathname;

// 태블릿 이하에서는 메뉴가 화면 위에 겹쳐 열림
const narrow = window.matchMedia("(max-width: 1024px)");

export const NAV = [
  { id: "home", label: "홈", path: "index.html", icon: "sidebar" },
  { id: "study", label: "개념노트", path: "pages/study.html", icon: "book" },
  { id: "incoterms", label: "인코텀즈", path: "pages/incoterms.html", icon: "ship" },
  { id: "payment", label: "결제방식", path: "pages/payment.html", icon: "flow" },
  { id: "notes", label: "오답노트", path: "pages/notes.html", icon: "note" },
  { id: "flashcards", label: "암기카드", path: "pages/flashcards.html", icon: "cards" },
  { id: "exam", label: "시험정보", path: "pages/exam.html", icon: "calendar" },
];

export function pageUrl(id) {
  const item = NAV.find((n) => n.id === id);
  return href(item ? item.path : "index.html");
}

export function getPrefs() {
  return load(KEYS.prefs, {});
}

export function setPref(key, value) {
  save(KEYS.prefs, { ...getPrefs(), [key]: value });
}

export function initHeader() {
  renderHeader();
  renderNav();
  initMenuToggle();
  initSettings();
}

function renderHeader() {
  const dday = examDday();
  const apply = applicationStatus();
  const target = exam.target;

  document.getElementById("site-header").outerHTML = `
    <header class="site-header">
      <button class="btn btn--outline btn--icon site-header__menu" type="button"
              aria-controls="site-nav" aria-expanded="true" aria-label="메뉴 접기">${icon("menu")}</button>
      <a class="site-header__logo" href="${href("index.html")}">
        <img src="${href("assets/logo.svg")}" alt="" width="36" height="36">
        <span class="site-header__title">무역노트</span>
      </a>
      <span class="badge-dday" title="제${target.round}회 국제무역사 1급 · ${target.examDate}">${dday.label}</span>
      <div class="site-header__actions">
        <a class="btn btn--primary" href="${APPLY_URL}" target="_blank" rel="noopener" title="${apply.label}">원서접수</a>
        <a class="btn btn--outline hide-sm" href="${pageUrl("notes")}">오답노트</a>
        <button class="btn btn--outline" type="button" id="open-settings" aria-haspopup="dialog">
          ${icon("settings", 18)}<span class="hide-sm">설정</span>
        </button>
      </div>
    </header>`;
}

function renderNav() {
  const current = document.body.dataset.page;
  document.getElementById("site-nav").innerHTML = `<ul>${NAV.map(
    (n) => `<li><a href="${href(n.path)}"${n.id === current ? ' aria-current="page"' : ""}>${icon(n.icon, 18)}<span>${n.label}</span></a></li>`
  ).join("")}</ul>`;
}

// 데스크톱: 왼쪽 메뉴 접기/펴기 (상태 저장) · 태블릿 이하: 메뉴 열기/닫기
function initMenuToggle() {
  const btn = document.querySelector(".site-header__menu");
  const nav = document.getElementById("site-nav");

  const sync = () => {
    const open = narrow.matches ? nav.classList.contains("is-open") : !document.body.classList.contains("nav-collapsed");
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? (narrow.matches ? "메뉴 닫기" : "메뉴 접기") : narrow.matches ? "메뉴 열기" : "메뉴 펴기");
  };
  const closeOverlay = () => {
    nav.classList.remove("is-open");
    sync();
  };

  document.body.classList.toggle("nav-collapsed", Boolean(getPrefs().navCollapsed));
  sync();

  btn.addEventListener("click", () => {
    if (narrow.matches) {
      nav.classList.toggle("is-open");
    } else {
      const collapsed = document.body.classList.toggle("nav-collapsed");
      setPref("navCollapsed", collapsed);
    }
    sync();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      closeOverlay();
      btn.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !nav.contains(e.target) && !btn.contains(e.target)) closeOverlay();
  });
  narrow.addEventListener("change", closeOverlay);
}

function initSettings() {
  const target = exam.target;
  const dialog = document.createElement("dialog");
  dialog.className = "modal";
  dialog.setAttribute("aria-labelledby", "settings-title");
  dialog.innerHTML = `
    <div class="modal__head">
      <h2 id="settings-title">설정</h2>
      <button class="btn btn--ghost btn--icon" type="button" data-close aria-label="닫기">${icon("close")}</button>
    </div>
    <div class="modal__body settings">
      <section class="settings__group">
        <h3>화면</h3>
        <label class="check-row">
          <input type="checkbox" id="pref-nav-collapsed">
          <span>왼쪽 메뉴 접어두기 <span class="caption">(데스크톱)</span></span>
        </label>
        <div class="settings__row">
          <span>원서접수 안내 배너</span>
          <button class="btn btn--outline" type="button" id="pref-banner-reset">다시 보이기</button>
        </div>
      </section>

      <section class="settings__group">
        <h3>데이터 백업</h3>
        <p class="caption">체크, 오답노트, 모의고사 점수는 이 브라우저에만 저장됩니다. 브라우저 데이터를 지우기 전이나 다른 기기로 옮길 때 백업 파일을 받아 두세요.</p>
        <div class="settings__actions">
          <button class="btn btn--outline" type="button" id="backup-export">${icon("download", 18)}내보내기</button>
          <button class="btn btn--outline" type="button" id="backup-import">${icon("upload", 18)}불러오기</button>
          <input type="file" id="backup-file" accept="application/json,.json" hidden>
        </div>
      </section>

      <section class="settings__group">
        <h3>초기화</h3>
        <div class="settings__row">
          <span>학습 기록을 모두 지웁니다.</span>
          <button class="btn btn--danger" type="button" id="data-reset">${icon("trash", 18)}모두 지우기</button>
        </div>
      </section>

      <section class="settings__group">
        <h3>목표 시험</h3>
        <p class="small num">제${target.round}회 ${exam.name} · ${target.examDate.replaceAll("-", ".")} ${exam.examTime}</p>
        <p class="caption num">원서접수 ${target.applyStart.slice(5).replace("-", ".")}–${target.applyEnd.slice(5).replace("-", ".")} · 합격발표 ${target.result.slice(5, 10).replace("-", ".")}</p>
      </section>
    </div>`;
  document.body.append(dialog);

  const navCheck = dialog.querySelector("#pref-nav-collapsed");
  const fileInput = dialog.querySelector("#backup-file");

  document.getElementById("open-settings").addEventListener("click", () => {
    navCheck.checked = document.body.classList.contains("nav-collapsed");
    dialog.showModal();
  });
  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  // 바깥(배경)을 누르면 닫기
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  navCheck.addEventListener("change", () => {
    document.body.classList.toggle("nav-collapsed", navCheck.checked);
    setPref("navCollapsed", navCheck.checked);
    document.querySelector(".site-header__menu").setAttribute("aria-expanded", String(!navCheck.checked));
  });

  dialog.querySelector("#pref-banner-reset").addEventListener("click", (e) => {
    setPref("bannerClosed", null);
    e.currentTarget.textContent = "다시 보이게 했어요";
    document.dispatchEvent(new CustomEvent("prefs:change"));
  });

  dialog.querySelector("#backup-export").addEventListener("click", () => exportBackup());
  dialog.querySelector("#backup-import").addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;
    try {
      await importBackup(file);
      location.reload();
    } catch {
      alert("백업 파일을 읽지 못했습니다. 내보내기로 만든 JSON 파일인지 확인해 주세요.");
    } finally {
      fileInput.value = "";
    }
  });

  dialog.querySelector("#data-reset").addEventListener("click", () => {
    if (!confirm("체크 기록, 오답노트, 모의고사 점수, 암기카드 기록, 설정을 모두 지울까요?\n지운 뒤에는 되돌릴 수 없습니다.")) return;
    Object.values(KEYS).forEach(remove);
    location.reload();
  });
}
