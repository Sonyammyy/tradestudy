// 인코텀즈 2020 · 11개 규칙 (README 5-3)
// 분기점 트랙의 지점 (인덱스로 참조)
export const TRACK = ["매도인 공장", "수출통관", "운송인 인도·선측", "본선 적재", "주운송", "목적지 도착 (양하 전)", "양하 완료", "수입통관"];

export const GROUPS = [
  { id: "E", name: "E그룹 · 출하" },
  { id: "F", name: "F그룹 · 주운임 미지급" },
  { id: "C", name: "C그룹 · 주운임 지급" },
  { id: "D", name: "D그룹 · 도착" },
];

// mode: "sea" = 해상·내수로 운송 전용, "any" = 모든 운송방식
// risk: 위험이 매수인에게 넘어가는 지점 (TRACK 인덱스)
// costEnd: 매도인 비용 부담이 끝나는 지점 (TRACK 인덱스)
export const incoterms = [
  {
    code: "EXW", name: "Ex Works", ko: "공장인도", group: "E", mode: "any",
    risk: 0, costEnd: 0,
    delivery: "매도인 영업장 구내(공장·창고)에서 물품을 매수인의 처분하에 둘 때",
    carriage: "매수인", insurance: "의무 없음", exportClearance: "매수인", importClearance: "매수인",
    loading: "매도인에게 적재 의무 없음", unloading: "매수인",
    summary: "매도인 의무가 가장 작은 규칙입니다. 물품을 자기 구내에서 넘겨주기만 하고, 적재·수출통관도 매수인이 합니다.",
    examPoint: "수출통관을 매수인이 하는 유일한 규칙. 매도인은 적재 의무도 없음 (적재까지 원하면 FCA 권장)",
  },
  {
    code: "FCA", name: "Free Carrier", ko: "운송인인도", group: "F", mode: "any",
    risk: 2, costEnd: 2,
    delivery: "지정 장소에서 매수인이 지정한 운송인에게 인도. 매도인 구내면 매수인 운송수단에 적재까지, 그 밖의 장소면 도착 운송수단 위에서 양하 준비된 상태로",
    carriage: "매수인", insurance: "의무 없음", exportClearance: "매도인", importClearance: "매수인",
    loading: "매도인 구내 인도 시 매도인이 적재", unloading: "매수인",
    summary: "컨테이너 화물에 가장 많이 권장되는 F 규칙입니다. 수출통관 후 매수인 지정 운송인에게 넘기면 위험이 이전됩니다.",
    examPoint: "2020 개정: 합의 시 매수인이 운송인에게 본선적재표기 B/L을 매도인에게 발행하도록 지시 가능. 매수인 자기 운송수단 사용 허용",
  },
  {
    code: "FAS", name: "Free Alongside Ship", ko: "선측인도", group: "F", mode: "sea",
    risk: 2, costEnd: 2,
    delivery: "지정 선적항에서 매수인이 지정한 본선의 선측(부두·부선)에 물품을 둘 때",
    carriage: "매수인", insurance: "의무 없음", exportClearance: "매도인", importClearance: "매수인",
    loading: "매수인 (본선 적재)", unloading: "매수인",
    summary: "해상 전용 규칙 중 매도인 의무가 가장 작습니다. 본선 옆까지만 갖다 놓으면 됩니다.",
    examPoint: "선측(alongside) 인도 — 본선 적재 전에 위험 이전. 벌크 화물(곡물·광석)에 주로 사용",
  },
  {
    code: "FOB", name: "Free On Board", ko: "본선인도", group: "F", mode: "sea",
    risk: 3, costEnd: 3,
    delivery: "지정 선적항에서 매수인이 지정한 본선에 물품을 적재할 때",
    carriage: "매수인", insurance: "의무 없음", exportClearance: "매도인", importClearance: "매수인",
    loading: "매도인 (본선 적재까지)", unloading: "매수인",
    summary: "가장 많이 쓰이는 해상 규칙입니다. 본선에 적재되는 순간 위험이 매수인에게 넘어갑니다.",
    examPoint: "컨테이너 화물에는 FOB 대신 FCA 권장. 위험 이전 = 본선 적재 시 (2010부터 '난간 통과' 기준 폐지)",
  },
  {
    code: "CFR", name: "Cost and Freight", ko: "운임포함인도", group: "C", mode: "sea",
    risk: 3, costEnd: 5,
    delivery: "선적항에서 본선에 적재할 때 (운임은 목적항까지 매도인)",
    carriage: "매도인", insurance: "의무 없음", exportClearance: "매도인", importClearance: "매수인",
    loading: "매도인", unloading: "운송계약에 포함되면 매도인, 아니면 매수인",
    summary: "매도인이 목적항까지 운임을 내지만, 위험은 선적항 본선 적재 시 이미 매수인에게 넘어갑니다.",
    examPoint: "C 규칙 = 분기점 2개 (위험: 선적항, 비용: 목적항). 도착지 계약이 아니라 선적지 계약",
  },
  {
    code: "CIF", name: "Cost, Insurance and Freight", ko: "운임·보험료포함인도", group: "C", mode: "sea",
    risk: 3, costEnd: 5,
    delivery: "선적항에서 본선에 적재할 때 (운임·보험료는 목적항까지 매도인)",
    carriage: "매도인", insurance: "매도인 · 최소 ICC(C), 110%", exportClearance: "매도인", importClearance: "매수인",
    loading: "매도인", unloading: "운송계약에 포함되면 매도인, 아니면 매수인",
    summary: "CFR에 매도인의 보험 의무가 더해진 규칙입니다. 보험은 매수인을 위해 들지만 최소 조건은 ICC(C)입니다.",
    examPoint: "CIF = ICC(C) 유지, CIP = ICC(A). 보험금액 최소 CIF 가액의 110%. 컨테이너 화물은 CIP 권장",
  },
  {
    code: "CPT", name: "Carriage Paid To", ko: "운송비지급인도", group: "C", mode: "any",
    risk: 2, costEnd: 5,
    delivery: "매도인이 계약한 (최초) 운송인에게 물품을 교부할 때 (운송비는 지정 목적지까지 매도인)",
    carriage: "매도인", insurance: "의무 없음", exportClearance: "매도인", importClearance: "매수인",
    loading: "매도인", unloading: "운송계약에 포함되면 매도인, 아니면 매수인",
    summary: "모든 운송방식용 CFR이라고 보면 됩니다. 최초 운송인에게 넘기는 순간 위험이 이전됩니다.",
    examPoint: "위험 이전 = 최초 운송인 인도 시. 비용은 목적지까지 → 분기점 2개",
  },
  {
    code: "CIP", name: "Carriage and Insurance Paid To", ko: "운송비·보험료지급인도", group: "C", mode: "any",
    risk: 2, costEnd: 5,
    delivery: "매도인이 계약한 (최초) 운송인에게 물품을 교부할 때 (운송비·보험료는 지정 목적지까지 매도인)",
    carriage: "매도인", insurance: "매도인 · 최소 ICC(A), 110%", exportClearance: "매도인", importClearance: "매수인",
    loading: "매도인", unloading: "운송계약에 포함되면 매도인, 아니면 매수인",
    summary: "CPT에 보험 의무가 더해진 규칙입니다. 2020 개정으로 최소 부보조건이 ICC(A)로 높아졌습니다.",
    examPoint: "2020 개정 핵심: CIP 최소 부보조건 ICC(A) (CIF는 ICC(C) 유지)",
  },
  {
    code: "DAP", name: "Delivered at Place", ko: "도착장소인도", group: "D", mode: "any",
    risk: 5, costEnd: 5,
    delivery: "지정 목적지에서 도착한 운송수단 위에 양하 준비된 상태로 매수인 처분하에 둘 때",
    carriage: "매도인", insurance: "의무 없음 (위험 부담자가 스스로 부보)", exportClearance: "매도인", importClearance: "매수인",
    loading: "매도인", unloading: "매수인",
    summary: "목적지까지 매도인이 가져가지만, 양하와 수입통관은 매수인이 합니다.",
    examPoint: "양하는 매수인. 양하까지 매도인이 하면 DPU, 수입통관까지 하면 DDP",
  },
  {
    code: "DPU", name: "Delivered at Place Unloaded", ko: "도착지양하인도", group: "D", mode: "any",
    risk: 6, costEnd: 6,
    delivery: "지정 목적지에서 도착 운송수단으로부터 양하를 마치고 매수인 처분하에 둘 때",
    carriage: "매도인", insurance: "의무 없음 (위험 부담자가 스스로 부보)", exportClearance: "매도인", importClearance: "매수인",
    loading: "매도인", unloading: "매도인",
    summary: "2020 개정에서 DAT를 대신해 생긴 규칙입니다. 매도인이 목적지에서 양하까지 책임지는 유일한 규칙입니다.",
    examPoint: "DAT → DPU (터미널 한정 삭제). 매도인이 양하 의무를 지는 유일한 규칙",
  },
  {
    code: "DDP", name: "Delivered Duty Paid", ko: "관세지급인도", group: "D", mode: "any",
    risk: 5, costEnd: 7,
    delivery: "지정 목적지에서 수입통관을 마친 물품을 도착 운송수단 위에 양하 준비된 상태로 매수인 처분하에 둘 때",
    carriage: "매도인", insurance: "의무 없음 (위험 부담자가 스스로 부보)", exportClearance: "매도인", importClearance: "매도인",
    loading: "매도인", unloading: "매수인",
    summary: "매도인 의무가 가장 큰 규칙입니다. 수입통관과 관세까지 매도인이 부담합니다.",
    examPoint: "수입통관을 매도인이 하는 유일한 규칙. 양하는 매수인 (DAP + 수입통관)",
  },
];

// 2020 주요 개정 사항
export const changes2020 = [
  { title: "DAT → DPU", desc: "양하 장소를 터미널로 한정하지 않도록 명칭 변경 (Delivered at Place Unloaded)" },
  { title: "CIP 부보조건 상향", desc: "CIP 최소 부보조건이 ICC(C) → ICC(A). CIF는 ICC(C) 유지" },
  { title: "FCA 본선적재 B/L", desc: "합의 시 매수인이 운송인에게 본선적재표기 B/L을 매도인에게 발행하도록 지시" },
  { title: "자기 운송수단 허용", desc: "FCA 매수인, D 규칙 매도인이 제3자 운송인 없이 자기 운송수단으로 운송 가능" },
  { title: "보안 의무 명시", desc: "운송 관련 보안 요건의 의무와 비용 배분을 A4·A7 등에 명시" },
  { title: "조항 구조 정리", desc: "A1–A10 / B1–B10 유지, 인도(A2)·위험(A3)을 앞으로, 비용을 A9/B9에 통합" },
];
