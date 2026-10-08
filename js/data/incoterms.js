// 인코텀즈 2020 · 11개 규칙 (README 5-3)
// mode: "sea" = 해상 및 내수로 운송 전용, "any" = 모든 운송방식
export const TRACK = ["매도인 공장", "수출통관", "운송인 인도·선측", "본선 적재", "주운송", "목적지 도착", "양하", "수입통관"];

export const incoterms = [
  { code: "FAS", name: "Free Alongside Ship", mode: "sea" },
  { code: "FOB", name: "Free On Board", mode: "sea" },
  { code: "CFR", name: "Cost and Freight", mode: "sea" },
  { code: "CIF", name: "Cost, Insurance and Freight", mode: "sea" },
  { code: "EXW", name: "Ex Works", mode: "any" },
  { code: "FCA", name: "Free Carrier", mode: "any" },
  { code: "CPT", name: "Carriage Paid To", mode: "any" },
  { code: "CIP", name: "Carriage and Insurance Paid To", mode: "any" },
  { code: "DAP", name: "Delivered at Place", mode: "any" },
  { code: "DPU", name: "Delivered at Place Unloaded", mode: "any" },
  { code: "DDP", name: "Delivered Duty Paid", mode: "any" },
];
