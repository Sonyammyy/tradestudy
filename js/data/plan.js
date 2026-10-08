// 7주 계획 (README 6장)
// summary: 홈 '오늘의 학습' 요약 (핵심어는 <strong>)
// questions: 추천 질문 칩 → 개념노트의 해당 개념(concept id)으로 이동
export const plan = [
  {
    week: 1,
    start: "2026-10-08",
    end: "2026-10-14",
    title: "무역계약 기초 · 인코텀즈 2020",
    subject: "무역계약",
    summary:
      "무역계약은 <strong>낙성·쌍무·유상·불요식계약</strong>입니다. <strong>청약</strong>과 <strong>청약의 유인</strong>을 구분하고, 승낙은 <strong>경상의 원칙</strong>과 CISG <strong>도달주의</strong>로 정리합니다. 8대 거래조건 중 <strong>품질 결정시기</strong>와 <strong>과부족 용인조항(M/L)</strong>을 익히고, <strong>인코텀즈 2020</strong> 11개 규칙을 운송방식별(해상 전용 4 · 모든 운송방식 7)로 나눠 <strong>위험 이전 시점</strong>과 <strong>비용 분기점</strong>을 외웁니다. C 규칙은 두 분기점이 다르고, <strong>CIP는 ICC(A)</strong>, <strong>CIF는 ICC(C)</strong>가 최소 부보조건입니다.",
    questions: [
      { q: "CIF와 CIP의 보험 조건 차이는?", concept: "w1-inco-2020" },
      { q: "C 규칙의 분기점이 두 개인 이유는?", concept: "w1-inco-c" },
      { q: "확정청약과 반대청약의 차이는?", concept: "w1-offer-types" },
      { q: "인코텀즈가 다루지 않는 것은?", concept: "w1-inco-scope" },
    ],
  },
  {
    week: 2,
    start: "2026-10-15",
    end: "2026-10-21",
    title: "CISG · 운송 · 적하보험",
    subject: "무역계약",
    summary:
      "<strong>CISG</strong>의 적용 범위와 적용 제외 대상, <strong>본질적 계약위반(제25조)</strong>을 기준으로 매수인·매도인의 <strong>구제수단</strong>을 구분합니다. 운송은 <strong>B/L의 3가지 기능</strong>과 종류, <strong>용선계약</strong>의 체선료·조출료, 해상운송 국제규칙의 차이를 봅니다. 적하보험은 <strong>전손·분손·공동해손</strong>과 <strong>ICC(A)·(B)·(C)</strong> 담보범위가 핵심입니다.",
    questions: [
      { q: "대체물 인도 청구는 언제 가능?", concept: "w2-cisg-buyer" },
      { q: "Sea Waybill과 B/L의 차이는?", concept: "w2-nonneg" },
      { q: "추정전손이란?", concept: "w2-loss" },
      { q: "ICC(B)와 ICC(C)의 담보 차이는?", concept: "w2-icc" },
    ],
  },
  {
    week: 3,
    start: "2026-10-22",
    end: "2026-10-28",
    title: "무역결제 · 신용장",
    subject: "무역결제",
    summary:
      "<strong>추심(URC 522)</strong>에서 은행은 지급을 보증하지 않으며, <strong>D/P</strong>는 대금 지급 시, <strong>D/A</strong>는 환어음 인수 시 서류가 인도됩니다. <strong>신용장(UCP 600)</strong>은 <strong>독립성·추상성</strong>과 서류거래 원칙을 따르고 모두 <strong>취소불능</strong>입니다. <strong>서류심사 5은행영업일</strong>, <strong>선적 후 21일 이내 제시</strong>, <strong>보험 최소 110%</strong>, <strong>about ±10%</strong> 같은 숫자는 반드시 외웁니다.",
    questions: [
      { q: "D/P와 D/A의 서류 인도 시점 차이는?", concept: "w3-dpda" },
      { q: "Shipper's와 Banker's Usance 차이는?", concept: "w3-usance" },
      { q: "서류심사 기간은 며칠?", concept: "w3-ucp14" },
      { q: "양도가능신용장은 몇 번 양도?", concept: "w3-ucp38" },
    ],
  },
  {
    week: 4,
    start: "2026-10-29",
    end: "2026-11-04",
    title: "외환실무 · 무역금융",
    subject: "무역결제",
    note: "원서접수 시작 11.02",
    summary:
      "환율은 <strong>매매기준율</strong>을 중심으로 <strong>TTS(전신환매도율)</strong>와 <strong>TTB(전신환매입률)</strong>를 은행 기준으로 구분합니다. 환리스크 관리는 <strong>선물환·통화옵션·통화스왑</strong> 같은 외부 기법과 <strong>리딩·래깅·매칭·네팅</strong> 같은 내부 기법으로 나눕니다. 무역금융은 <strong>포페이팅(상환청구권 없음)</strong>, <strong>국제팩토링</strong>, <strong>내국신용장과 구매확인서</strong> 비교가 자주 나옵니다.",
    questions: [
      { q: "TTS와 TTB는 누구 기준?", concept: "w4-rate" },
      { q: "포페이팅과 팩토링 차이는?", concept: "w4-forfaiting" },
      { q: "내국신용장과 구매확인서 차이는?", concept: "w4-local" },
      { q: "환가료는 왜 붙나?", concept: "w4-sight-rate" },
    ],
  },
  {
    week: 5,
    start: "2026-11-05",
    end: "2026-11-11",
    title: "무역규범",
    subject: "무역규범",
    summary:
      "<strong>대외무역법</strong>은 무역의 정의, <strong>특정거래형태</strong>, 원산지 판정기준을 봅니다. <strong>관세법</strong>은 <strong>과세요건 4가지</strong>, <strong>관세평가 6가지 방법</strong>, <strong>세율 적용 우선순위</strong>, 수입신고 시기(<strong>반입 후 30일</strong>)가 핵심입니다. 관세환급은 <strong>개별환급·간이정액환급</strong>과 <strong>청구기한 2년</strong>, FTA는 <strong>CC·CTH·CTSH</strong> 세번변경기준과 <strong>미소기준·누적기준·직접운송원칙</strong>을 정리합니다.",
    questions: [
      { q: "중계무역과 중개무역의 차이는?", concept: "w5-special-trade" },
      { q: "관세평가 제1방법의 가산요소는?", concept: "w5-valuation" },
      { q: "세율 적용 우선순위는?", concept: "w5-tariff-order" },
      { q: "CTH와 CTSH의 차이는?", concept: "w5-fta-origin" },
    ],
  },
  {
    week: 6,
    start: "2026-11-12",
    end: "2026-11-18",
    title: "무역영어",
    subject: "무역영어",
    note: "원서접수 마감 11.15",
    summary:
      "거래 단계별 <strong>무역서신</strong>의 흐름(신용조회 → 거래제의 → 청약 → 주문 → 선적 통지 → 클레임)과 신용조회 <strong>5C</strong>를 익힙니다. 계약서 영문 조항(<strong>Entire Agreement, Force Majeure, Arbitration</strong>)과 <strong>중재</strong>의 장점(단심제, 비공개, <strong>뉴욕협약</strong>)을 정리하고, <strong>MT700</strong> 필드 등 무역서식을 해석합니다.",
    questions: [
      { q: "신용조회 5C는?", concept: "w6-5c" },
      { q: "Severability 조항의 의미는?", concept: "w6-clauses" },
      { q: "중재의 장점은?", concept: "w6-dispute" },
      { q: "MT700의 주요 필드는?", concept: "w6-forms" },
    ],
  },
  {
    week: 7,
    start: "2026-11-19",
    end: "2026-11-27",
    title: "실전 · 응시 환경 점검",
    subject: null,
    summary:
      "<strong>120분 실전 모의고사</strong>로 문항당 1분 배분을 연습하고, <strong>오답노트 복습 모드</strong>로 약점을 정리합니다. 합격 시뮬레이터로 <strong>과락(40점 미만)</strong> 위험 과목을 확인해 집중 보완하고, <strong>신분증·웹캠·마이크·스마트폰 거치대</strong>를 미리 점검합니다.",
    questions: [
      { q: "모의고사는 어떻게 풀까?", concept: "w7-mock" },
      { q: "과락 위험 과목 확인하기", concept: "w7-weak" },
      { q: "응시 준비물은?", concept: "w7-prep" },
    ],
  },
];
