// 작은 공용 함수

// 사용자가 입력한 문자열을 HTML에 넣기 전에 이스케이프
export function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
}

// "2026-10-08" → "10.08"
export function shortDate(str) {
  return str.slice(5, 10).replace("-", ".");
}

// 주차 기간 "10.08–10.14"
export function period(week) {
  return `${shortDate(week.start)}–${shortDate(week.end)}`;
}
