// 시험일·접수기간 계산 (한국 시간 기준)
import { exam } from "../data/exam.js";

const DAY = 24 * 60 * 60 * 1000;

// 현재 시각을 한국 날짜(자정 기준)로 변환
export function todayKST(now = new Date()) {
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return Date.UTC(kst.getUTCFullYear(), kst.getUTCMonth(), kst.getUTCDate());
}

// "2026-11-28" → UTC 자정 타임스탬프
export function parseDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

// 오늘 날짜 "2026-10-08" (한국 시간)
export function todayString(now) {
  return new Date(todayKST(now)).toISOString().slice(0, 10);
}

// 오늘이 속한 주차. 시작 전이면 첫 주, 끝난 뒤면 마지막 주
export function currentWeek(plan, now) {
  const today = todayKST(now);
  return plan.find((w) => today <= parseDate(w.end)) ?? plan[plan.length - 1];
}

export function daysUntil(dateStr, now) {
  return Math.round((parseDate(dateStr) - todayKST(now)) / DAY);
}

export function examDday(now) {
  const n = daysUntil(exam.target.examDate, now);
  const label = n > 0 ? `D-${n}` : n === 0 ? "D-DAY" : `D+${-n}`;
  return { days: n, label };
}

export function applicationStatus(now) {
  const { applyStart, applyEnd } = exam.target;
  const toStart = daysUntil(applyStart, now);
  const toEnd = daysUntil(applyEnd, now);
  if (toStart > 0) return { state: "before", label: `접수까지 ${toStart}일` };
  if (toEnd >= 0) return { state: "open", label: `접수 중 · ${applyEnd.slice(5).replace("-", ".")} 마감` };
  return { state: "closed", label: "접수 마감" };
}
