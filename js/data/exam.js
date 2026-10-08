// 시험 일정, 과목, 합격 기준 (README 1장)
const rounds = [
  { round: 65, examDate: "2026-03-28", applyStart: "2026-03-02", applyEnd: "2026-03-15", result: "2026-04-03 14:00" },
  { round: 66, examDate: "2026-07-25", applyStart: "2026-06-29", applyEnd: "2026-07-12", result: "2026-07-31 14:00" },
  { round: 67, examDate: "2026-11-28", applyStart: "2026-11-02", applyEnd: "2026-11-15", result: "2026-12-04 14:00" },
];

// 원서접수 바로가기 (접수 전 KITA 무역아카데미 공지에서 주소 확인)
export const APPLY_URL = "https://newcbt.kita.net/";

export const exam = {
  name: "국제무역사 1급",
  host: "한국무역협회 무역아카데미",
  method: "비대면 온라인 (웹캠·마이크 PC, 스마트폰 거치 필요)",
  fee: 55000,
  questions: 120,
  minutes: 120,
  examTime: "09:30–11:30",
  passAverage: 60,
  failUnder: 40,

  subjects: [
    { id: "norms", name: "무역규범", questions: 30, scope: "대외무역법, 통관·관세환급, FTA" },
    { id: "payment", name: "무역결제", questions: 30, scope: "대금결제, 외환실무" },
    { id: "contract", name: "무역계약", questions: 30, scope: "무역계약, 운송·보험" },
    { id: "english", name: "무역영어", questions: 30, scope: "무역영어, 무역 관련 국제법규, 무역서식" },
  ],

  rounds,
  target: rounds.find((r) => r.round === 67),
};
