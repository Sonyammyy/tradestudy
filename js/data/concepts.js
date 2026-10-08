// 주차별 개념 카드 (README 6장)
// { id, week, group, name, summary, detail(HTML), examPoint, refs: [] }
// 일반적인 국제무역사 수험 범위 기준 정리. 법령 수치는 개정될 수 있으므로 시험 전 최신 법령을 확인합니다.
const c = (id, week, group, name, summary, detail = "", examPoint = "", refs = []) => ({ id, week, group, name, summary, detail, examPoint, refs });

export const concepts = [
  /* ================= W1 · 무역계약 기초 · 인코텀즈 2020 ================= */

  c("w1-contract-nature", 1, "무역계약의 성립", "무역계약의 법적 성질", "낙성계약, 쌍무계약, 유상계약, 불요식계약",
    `<ul>
      <li><strong>낙성계약</strong>: 당사자의 합의만으로 성립. 물품 인도나 대금 지급이 있어야 성립하는 요물계약이 아님</li>
      <li><strong>쌍무계약</strong>: 매도인은 물품 인도, 매수인은 대금 지급이라는 서로 대가적인 채무를 부담</li>
      <li><strong>유상계약</strong>: 양 당사자가 서로 대가(물품 ↔ 대금)를 주고받음</li>
      <li><strong>불요식계약</strong>: 서면 등 특별한 형식 없이 구두로도 성립. CISG 제11조도 서면 요건을 두지 않음 (제96조 유보국 예외)</li>
    </ul>`,
    "요물·편무·무상·요식계약이 아님을 묻는 문제가 자주 출제. CISG 제11조: 계약은 서면으로 체결·입증될 필요 없음",
    ["CISG 제11조", "CISG 제96조"]),

  c("w1-offer", 1, "무역계약의 성립", "청약과 청약의 유인", "청약(Offer)과 청약의 유인(Invitation to offer) 구분",
    `<ul>
      <li><strong>청약</strong>: 일정한 조건으로 계약을 체결하겠다는 확정적 의사표시. 상대방의 승낙만 있으면 계약이 성립</li>
      <li>CISG 제14조 요건: ① 1인 이상의 <strong>특정인</strong>에 대한 제안 ② 물품 표시와 수량·대금을 명시적·묵시적으로 정해 <strong>충분히 확정적</strong> ③ 승낙 시 구속된다는 의사</li>
      <li><strong>청약의 유인</strong>: 상대방이 청약하도록 유도하는 행위. 카탈로그, 가격표, 광고, 견적 요청 등. 상대방이 응해도 계약이 바로 성립하지 않음</li>
      <li>불특정 다수에 대한 제안은 반대 의사가 명백하지 않으면 청약의 유인 (제14조 2항)</li>
    </ul>`,
    "확인조건부 청약(Offer subject to our final confirmation)은 청약이 아니라 청약의 유인. 불특정 다수 대상 제안 = 원칙적으로 청약의 유인",
    ["CISG 제14조"]),

  c("w1-offer-types", 1, "무역계약의 성립", "청약의 종류", "확정청약(Firm offer), 자유청약(Free offer), 반대청약(Counter offer), 조건부청약",
    `<ul>
      <li><strong>확정청약(Firm offer)</strong>: 승낙기간을 정하거나 철회불능(firm, irrevocable)임을 표시한 청약. 기간 내 철회 불가 (제16조 2항)</li>
      <li><strong>자유청약(Free offer)</strong>: 승낙기간을 정하지 않은 청약. 상대방이 승낙을 발송하기 전에 철회 통지가 도달하면 철회 가능 (제16조 1항)</li>
      <li><strong>반대청약(Counter offer)</strong>: 원청약의 조건을 변경한 회신. 원청약을 거절하고 새로운 청약을 한 것으로 봄 (제19조 1항)</li>
      <li><strong>조건부청약</strong>: 선착순 판매 조건부(subject to prior sale), 시황 변동 조건부(subject to market fluctuation), 확인 조건부(subject to final confirmation → 청약의 유인)</li>
      <li><strong>회수(Withdrawal)</strong>: 청약이 도달하기 전 또는 동시에 회수 통지 도달 → 확정청약도 회수 가능 (제15조 2항)</li>
      <li><strong>철회(Revocation)</strong>: 청약 도달 후, 상대방이 승낙을 발송하기 전에 철회 통지 도달 (제16조 1항)</li>
    </ul>`,
    "회수는 도달 전, 철회는 도달 후 승낙 발송 전. 확정청약도 '회수'는 가능하지만 '철회'는 불가. 반대청약 = 원청약 거절 + 새 청약",
    ["CISG 제15조", "CISG 제16조", "CISG 제17조", "CISG 제19조"]),

  c("w1-acceptance", 1, "무역계약의 성립", "승낙", "경상의 원칙(Mirror image rule), 침묵은 승낙이 아님, 승낙의 효력발생 시기 (CISG 도달주의)",
    `<ul>
      <li><strong>경상의 원칙</strong>: 승낙은 청약 내용과 거울처럼 완전히 일치해야 함</li>
      <li>CISG는 이를 완화: 청약 조건을 <strong>실질적으로 변경하지 않는</strong> 부가·상이 조건은 청약자가 지체 없이 이의하지 않으면 승낙으로 봄 (제19조 2항)</li>
      <li>실질적 변경 사항: 대금, 지급, 물품의 품질·수량, 인도 장소·시기, 책임 범위, 분쟁해결 (제19조 3항) → 반대청약</li>
      <li><strong>침묵이나 부작위는 그 자체로 승낙이 아님</strong> (제18조 1항)</li>
      <li>효력발생: CISG는 <strong>도달주의</strong> (제18조 2항). 영미법의 발신주의(Mailbox rule)와 대비</li>
      <li>연착된 승낙도 청약자가 지체 없이 유효하다고 통지하면 승낙 효력 (제21조)</li>
    </ul>`,
    "CISG = 도달주의, 영미법 = 발신주의. 대금·품질·수량·인도·책임·분쟁해결 변경은 실질적 변경 → 반대청약",
    ["CISG 제18조", "CISG 제19조", "CISG 제21조", "CISG 제23조"]),

  c("w1-general-terms", 1, "무역계약의 성립", "일반거래조건협정서", "개별 계약에 공통 적용할 거래조건을 미리 합의한 문서",
    `<ul>
      <li>Agreement on General Terms and Conditions of Business. 계속적 거래를 할 당사자가 매 거래에 공통으로 적용할 조건을 미리 합의</li>
      <li>주요 내용: 거래 형태(본인 대 본인), 청약·승낙 방법, 품질·수량·가격·선적·보험·결제·포장 조건, 클레임·중재, 불가항력, 준거법</li>
      <li>개별 거래는 매매계약서(Sales Contract)·주문서(Purchase Order)로 품명·수량·가격·선적기일 등만 정함</li>
      <li>개별 계약의 특약과 충돌하면 개별 계약(특약)이 우선</li>
    </ul>`,
    "일반거래조건 = 공통 조건의 사전 합의. 개별 계약의 특약이 우선 적용",
    []),

  c("w1-quality", 1, "8대 거래조건", "품질조건", "견본·상표·규격·명세서 매매, 표준품 매매 (FAQ, GMQ, USQ), 품질 결정시기 (선적품질 / 양륙품질, TQ·RT·SD)",
    `<p><strong>품질 결정 방법</strong></p>
    <ul>
      <li>견본매매(Sale by sample), 상표매매(Sale by brand), 규격매매(Sale by grade·standard: ISO, KS), 명세서매매(Sale by specification: 기계·선박), 점검매매(Sale by inspection)</li>
      <li><strong>FAQ</strong>(Fair Average Quality, 평균중등품질): 농산물·곡물. 선적지에서 해당 계절 출하품의 평균 품질</li>
      <li><strong>GMQ</strong>(Good Merchantable Quality, 판매적격품질): 목재·냉동수산물처럼 내부 확인이 어려운 물품. 양륙 시 판매 가능한 품질 보증</li>
      <li><strong>USQ</strong>(Usual Standard Quality, 보통품질): 공인검사기관 등급으로 결정 (인삼, 오징어 등)</li>
    </ul>
    <p><strong>품질 결정 시기</strong></p>
    <ul>
      <li>선적품질조건(Shipped quality) vs 양륙품질조건(Landed quality)</li>
      <li><strong>TQ</strong>(Tale Quale): 곡물 선적품질조건</li>
      <li><strong>RT</strong>(Rye Terms): 곡물 양륙품질조건 (호밀 거래에서 유래)</li>
      <li><strong>SD</strong>(Sea Damaged): 원칙은 선적품질이지만 해상운송 중 해수 등에 의한 손해는 매도인 부담 (조건부 선적품질)</li>
    </ul>`,
    "FAQ = 선적지 기준, GMQ = 양륙지 기준(숨은 하자). TQ = 선적품질, RT = 양륙품질, SD = 선적품질 + 해수손해만 매도인",
    []),

  c("w1-quantity", 1, "8대 거래조건", "수량조건", "수량 단위, 과부족 용인조항 (M/L clause)",
    `<ul>
      <li>수량 단위: 중량(Weight), 용적(Measurement, CBM), 개수(Piece, Dozen, Gross), 길이, 면적, 포장 단위</li>
      <li>톤: <strong>Long ton 1,016kg</strong>(영국), <strong>Short ton 907kg</strong>(미국), <strong>Metric ton 1,000kg</strong></li>
      <li>개수: 1 Dozen = 12개, 1 Gross = 12 Dozen = 144개, 1 Great gross = 1,728개</li>
      <li>중량 조건: 총중량(Gross), 순중량(Net), 법적순중량(Legal net: 내포장 포함)</li>
      <li><strong>과부족 용인조항(More or Less clause)</strong>: 곡물·광석 등 산물(bulk)은 정확한 수량 인도가 어려우므로 일정 비율(예: 5%) 과부족 허용. 선택권자(보통 매도인)와 정산 가격을 명시</li>
      <li>신용장 거래: 'about' 표시 시 ±10%, 수량이 개수·포장 단위가 아니면 금액 초과하지 않는 범위에서 ±5% 허용 (UCP 600 제30조)</li>
    </ul>`,
    "Long ton 1,016kg / Short ton 907kg / Metric ton 1,000kg. M/L 조항 없이도 산물은 UCP 제30조 b항으로 ±5%",
    ["UCP 600 제30조"]),

  c("w1-price", 1, "8대 거래조건", "가격조건", "인코텀즈 규칙과 연계해 가격 구성 요소 결정",
    `<ul>
      <li>가격 구성: 제조원가 + 포장비 + 수출 제비용(통관·내륙운송·선적비) + 해상운임 + 보험료 + 이윤</li>
      <li>어디까지의 비용을 매도인이 부담하는지는 <strong>인코텀즈 규칙</strong>으로 정함. 매도인 부담 최소 EXW → 최대 DDP</li>
      <li>결제 통화 지정, 단가(Unit price)와 총액(Total amount) 표시</li>
      <li>장기 계약은 원자재·임금 변동에 대비한 가격 조정(Escalation) 조항을 두기도 함</li>
    </ul>`,
    "가격조건 = 인코텀즈 규칙 + 통화 + 단가. 매도인 비용 부담 최소 EXW, 최대 DDP",
    []),

  c("w1-shipment", 1, "8대 거래조건", "선적조건", "선적시기, 분할선적, 환적",
    `<ul>
      <li>선적시기 지정: 특정 월(June shipment), 연속 월(May/June shipment), 특정일 이전(not later than)</li>
      <li><strong>prompt, immediately, as soon as possible</strong> 같은 표현은 은행이 무시 (UCP 600 제3조)</li>
      <li><strong>on or about</strong>: 지정일 전후 5일 (시작일·종료일 포함)</li>
      <li>first half 1–15일, second half 16일–말일, beginning 1–10일, middle 11–20일, end 21일–말일</li>
      <li>선적일 증명: B/L 발행일. 본선적재표기(On board notation)가 있으면 그 표기 일자</li>
      <li><strong>분할선적(Partial shipment)</strong>: 신용장에 금지 문언이 없으면 허용 (제31조)</li>
      <li><strong>환적(Transhipment)</strong>: 금지되어 있어도 전 운송 구간이 하나의 운송서류로 커버되면 환적 가능하다고 표시된 서류 수리 (제20조 c항 등)</li>
    </ul>`,
    "prompt·immediately는 무시, on or about = ±5일, first half = 1–15일. 분할선적은 금지 없으면 허용",
    ["UCP 600 제3조", "UCP 600 제20조", "UCP 600 제31조"]),

  c("w1-insurance-payment", 1, "8대 거래조건", "보험조건 · 결제조건", "부보 주체와 조건, 대금 결제 방식",
    `<p><strong>보험조건</strong></p>
    <ul>
      <li>부보 주체: CIF·CIP는 매도인이 매수인을 위해 부보, 나머지는 위험 부담자가 자기를 위해 선택적으로 부보</li>
      <li>보험금액: 통상 CIF(CIP) 가액의 <strong>110%</strong> (희망이익 10% 포함)</li>
      <li>담보조건: ICC(A)·(B)·(C) + 전쟁·동맹파업 등 부가위험</li>
    </ul>
    <p><strong>결제조건</strong></p>
    <ul>
      <li>방식: 송금(사전·사후), 추심(D/P·D/A), 신용장</li>
      <li>시기: 선지급(CWO·CIA), 동시지급(COD·CAD·일람출급 L/C), 후지급(D/A·Usance L/C·O/A)</li>
    </ul>`,
    "보험금액 110%는 인코텀즈 CIF·CIP(A5)와 UCP 600 제28조 f항 공통. 결제 시기를 선·동시·후로 구분하는 문제 출제",
    ["Incoterms 2020 A5", "UCP 600 제28조"]),

  c("w1-packing", 1, "8대 거래조건", "포장조건과 화인", "포장 방법과 화인(Shipping marks)",
    `<ul>
      <li>포장 구분: 개장(Unitary packing: 낱개), 내장(Inner packing), 외장(Outer packing: 운송용)</li>
      <li>산적화물(Bulk cargo)은 무포장</li>
      <li><strong>화인(Shipping marks)</strong> 구성
        <ul>
          <li>주화인(Main mark): 도형 안에 수입자 약호</li>
          <li>부화인(Counter mark): 생산자·대리인 표시</li>
          <li>화번(Case number): 포장 일련번호</li>
          <li>항구 표시(Port mark): 목적항</li>
          <li>원산지 표시(Country of origin)</li>
          <li>주의 표시(Care mark): Handle with care, This side up, Keep dry</li>
        </ul>
      </li>
    </ul>`,
    "필수 화인 = 주화인 · 화번 · 항구 표시. 이 중 하나라도 없으면 화물 식별 불가",
    []),

  c("w1-claim", 1, "8대 거래조건", "클레임 · 중재조건", "클레임 제기 기한과 방법, 중재 합의",
    `<ul>
      <li>클레임 원인: 품질 불량, 수량 부족, 선적 지연, 포장 불량, 대금 미지급 등</li>
      <li>클레임 조항: 제기 기한(예: 물품 도착 후 ○일), 제기 방법(서면 + 공인검정기관 보고서), 해결 방법</li>
      <li>CISG 제38조: 매수인은 실행 가능한 단기간 내 물품 검사</li>
      <li>CISG 제39조: 부적합을 발견했거나 발견했어야 하는 때부터 <strong>합리적 기간 내</strong> 통지, 늦어도 물품 교부일부터 <strong>2년</strong> 내</li>
      <li>해결 방법: 당사자 간(청구권 포기, 화해) → 제3자 개입(알선, 조정, 중재, 소송)</li>
      <li>중재조항: 중재지, 중재기관, 준거법을 명시. 중재합의가 있으면 소송 제기 불가(직소금지)</li>
    </ul>`,
    "CISG 제39조: 합리적 기간 내 통지, 최장 인도 후 2년. 중재합의의 직소금지(방소항변) 효력",
    ["CISG 제38조", "CISG 제39조"]),

  c("w1-inco-rules", 1, "인코텀즈 2020", "11개 규칙 분류", "해상·내수로 전용 4개 (FAS, FOB, CFR, CIF), 모든 운송방식 7개 (EXW, FCA, CPT, CIP, DAP, DPU, DDP)",
    `<ul>
      <li><strong>모든 운송방식용 (7)</strong>: EXW, FCA, CPT, CIP, DAP, DPU, DDP</li>
      <li><strong>해상·내수로 운송 전용 (4)</strong>: FAS, FOB, CFR, CIF</li>
      <li>그룹 구분(참고): E(출하) – EXW / F(주운임 미지급) – FCA·FAS·FOB / C(주운임 지급) – CPT·CIP·CFR·CIF / D(도착) – DAP·DPU·DDP</li>
      <li>E·F·C 규칙은 <strong>선적지 인도(적출지 계약)</strong>, D 규칙은 <strong>목적지 인도(양륙지 계약)</strong></li>
    </ul>`,
    "해상 전용 4개(FAS·FOB·CFR·CIF)만 외우면 나머지 7개는 모든 운송방식. C 규칙도 선적지 계약",
    ["Incoterms 2020"]),

  c("w1-inco-points", 1, "인코텀즈 2020", "인도 지점 · 위험 이전 · 비용 분기점", "규칙별 인도 지점, 위험 이전 시점, 비용 분기점",
    `<ul>
      <li><strong>EXW</strong>: 매도인 영업장 구내에서 매수인 처분하에 둠. 적재 의무 없음, 수출통관도 매수인</li>
      <li><strong>FCA</strong>: 지정 장소에서 매수인 지정 운송인에게 인도. 매도인 구내면 매수인 운송수단에 적재까지, 그 밖의 장소면 도착한 운송수단 위에서 양하 준비된 상태로</li>
      <li><strong>FAS</strong>: 지정 선적항에서 본선 선측(alongside)</li>
      <li><strong>FOB</strong>: 지정 선적항에서 본선 적재(on board)</li>
      <li><strong>CFR · CIF</strong>: 위험은 선적항 본선 적재 시 이전, 운임(CIF는 보험료도)은 목적항까지 매도인</li>
      <li><strong>CPT · CIP</strong>: 위험은 최초 운송인 인도 시 이전, 운임(CIP는 보험료도)은 지정 목적지까지 매도인</li>
      <li><strong>DAP</strong>: 목적지에서 도착 운송수단 위에 양하 준비된 상태로 인도</li>
      <li><strong>DPU</strong>: 목적지에서 <strong>양하 완료</strong> 후 인도. 매도인이 양하 의무를 지는 유일한 규칙</li>
      <li><strong>DDP</strong>: DAP + 수입통관·관세 납부까지 매도인</li>
    </ul>`,
    "수출통관은 EXW만 매수인, 수입통관은 DDP만 매도인. 목적지 양하는 DPU만 매도인",
    ["Incoterms 2020 A2", "Incoterms 2020 A3"]),

  c("w1-inco-c", 1, "인코텀즈 2020", "C 규칙의 두 분기점", "C 규칙은 위험 이전 지점과 비용 분기점이 다름 (2개의 분기점)",
    `<ul>
      <li>C 규칙(CFR, CIF, CPT, CIP)은 매도인이 주운송 계약을 체결하고 운임을 부담</li>
      <li>그러나 위험은 <strong>선적지</strong>(본선 적재 또는 최초 운송인 인도)에서 이미 매수인에게 이전</li>
      <li>→ 위험 분기점(선적지)과 비용 분기점(목적지)이 달라 <strong>분기점이 2개</strong></li>
      <li>따라서 C 규칙은 도착지 계약이 아니라 <strong>선적지 계약(Shipment contract)</strong></li>
      <li>운송 중 위험은 매수인 부담이므로 CIF·CIP에서는 매도인이 매수인을 위해 보험을 부보</li>
    </ul>`,
    "C 규칙 = 선적지 계약. 위험은 선적지, 비용은 목적지. 'CIF는 도착지 계약'이라는 보기는 오답",
    ["Incoterms 2020"]),

  c("w1-inco-2020", 1, "인코텀즈 2020", "2020 주요 개정", "DAT → DPU, CIP 최소 부보조건 ICC(A) 상향 (CIF는 ICC(C) 유지), FCA 본선적재 B/L, 자신의 운송수단 허용, 보안 의무 명시, A1–A10 / B1–B10",
    `<ul>
      <li><strong>DAT → DPU</strong>: 양하 장소를 터미널로 한정하지 않음 (Delivered at Place Unloaded)</li>
      <li><strong>CIP</strong>: 최소 부보조건을 <strong>ICC(A)</strong>로 상향. <strong>CIF는 ICC(C)</strong> 유지 (당사자 합의로 변경 가능)</li>
      <li><strong>FCA</strong>: 당사자 합의 시 매수인이 운송인에게 <strong>본선적재표기 B/L</strong>을 매도인에게 발행하도록 지시 가능 (신용장 거래 대응)</li>
      <li>FCA 매수인, D 규칙 매도인이 <strong>자신의 운송수단</strong>으로 운송 가능</li>
      <li>운송 관련 <strong>보안 요건</strong> 의무와 비용 배분 명시 (A4·A7)</li>
      <li>비용 조항을 A9/B9에 모아 정리, 인도(A2)·위험(A3)을 앞쪽으로 배치</li>
      <li>사용자 해설(Explanatory Notes for Users) 도입</li>
    </ul>`,
    "CIP = ICC(A), CIF = ICC(C). DAT 삭제 → DPU 신설. FCA 본선적재 B/L 옵션. 규칙 수는 11개로 동일",
    ["Incoterms 2020 A5", "Incoterms 2020 A6"]),

  c("w1-inco-container", 1, "인코텀즈 2020", "컨테이너 화물 권장 규칙", "컨테이너 화물에는 FOB 대신 FCA, CIF 대신 CIP 권장",
    `<ul>
      <li>FOB·CFR·CIF는 위험이 <strong>본선 적재 시</strong> 이전</li>
      <li>컨테이너 화물은 CY·CFS에서 운송인에게 넘긴 뒤 실제 선적까지 시간이 걸림 → 매도인이 통제할 수 없는 기간의 위험까지 부담하게 됨</li>
      <li>그래서 운송인 인도 시점에 위험이 이전되는 <strong>FCA·CPT·CIP</strong>가 적합</li>
    </ul>`,
    "컨테이너 화물: FOB → FCA, CFR → CPT, CIF → CIP",
    ["Incoterms 2020"]),

  c("w1-inco-scope", 1, "인코텀즈 2020", "인코텀즈가 다루지 않는 것", "소유권 이전, 계약위반 구제, 대금지급 방법, 분쟁해결",
    `<p><strong>다루는 것</strong>: 인도, 위험 이전, 비용 배분, 운송·보험 계약 의무, 수출입 통관, 인도 증빙 서류</p>
    <p><strong>다루지 않는 것</strong></p>
    <ul>
      <li>매매계약의 성립 여부</li>
      <li>소유권(권원) 이전</li>
      <li>계약위반과 구제(손해배상 등), 면책·불가항력</li>
      <li>대금 지급 방법·시기</li>
      <li>분쟁해결 방법, 준거법</li>
      <li>물품 명세</li>
    </ul>
    <p>국내 거래에도 사용할 수 있음</p>`,
    "소유권 이전·대금 지급·계약위반 구제·분쟁해결은 인코텀즈 범위 밖 → 매매계약·준거법(CISG)으로 정함",
    ["Incoterms 2020"]),

  /* ================= W2 · CISG · 운송 · 적하보험 ================= */

  c("w2-cisg-scope", 2, "CISG", "CISG 적용 범위", "영업소가 서로 다른 체약국에 있는 당사자 간 물품매매 (1980 비엔나 / 한국 2005 발효)",
    `<ul>
      <li>1980년 비엔나 외교회의 채택, 1988년 발효. 한국은 2005년 3월 1일 발효</li>
      <li>적용: 영업소가 서로 다른 국가에 있는 당사자 간 물품매매로서 ① 양국이 모두 체약국이거나 ② 국제사법 규칙에 따라 체약국 법이 적용되는 경우 (제1조)</li>
      <li>당사자의 <strong>국적</strong>이나 계약의 민사·상사 성격은 고려하지 않음 (제1조 3항)</li>
      <li>당사자 합의로 적용 배제·변경 가능 (제6조, Opt-out)</li>
      <li>규율 범위: 계약의 성립, 매도인·매수인의 권리의무 (제4조)</li>
      <li>규율하지 않는 것: 계약의 유효성, 소유권에 미치는 효과 (제4조), 물품으로 인한 사망·상해 책임 (제5조)</li>
    </ul>`,
    "기준은 국적이 아니라 영업소. 제6조로 적용 배제 가능. 계약 유효성·소유권·인신 손해는 적용 안 됨",
    ["CISG 제1조", "CISG 제4조", "CISG 제5조", "CISG 제6조"]),

  c("w2-cisg-exclusion", 2, "CISG", "CISG 적용 제외", "개인·가정용 매매, 경매, 강제집행, 유가증권·통화, 선박·항공기, 전기",
    `<p><strong>제2조 적용 제외 매매</strong></p>
    <ul>
      <li>개인용·가족용·가정용 매매 (매도인이 그 용도를 몰랐고 알 수도 없었던 경우는 적용)</li>
      <li>경매</li>
      <li>강제집행 등 법률상 권한에 의한 매매</li>
      <li>주식·지분·투자증권·유통증권·통화</li>
      <li>선박·부선·수상익선·항공기</li>
      <li>전기</li>
    </ul>
    <p><strong>제3조</strong>: 제작·생산할 물품의 공급계약도 매매로 봄. 단 주문자가 재료의 중요 부분을 공급하거나, 노무·서비스 공급이 주된 부분이면 제외</p>`,
    "전기만 제외되고 가스·석유는 적용 대상. 선박·항공기는 제외",
    ["CISG 제2조", "CISG 제3조"]),

  c("w2-cisg-formation", 2, "CISG", "계약의 성립", "CISG의 청약·승낙 조항",
    `<ul>
      <li>CISG 제2부(제14–24조)가 계약 성립을 규율</li>
      <li>제14조 청약의 정의, 제15조 청약은 도달 시 효력·회수, 제16조 철회, 제17조 거절 시 효력 상실</li>
      <li>제18조 승낙의 정의와 도달주의, 제19조 변경된 승낙, 제20조 승낙기간 계산, 제21조 연착 승낙, 제22조 승낙의 회수</li>
      <li>제23조: 계약은 <strong>승낙이 효력을 발생하는 시점</strong>에 성립</li>
      <li>제24조: '도달'의 정의 (상대방에게 구두로 전달되거나 영업소·우편주소로 전달된 때)</li>
      <li>승낙기간: 전보는 발송 위해 교부한 때부터, 서신은 서신에 표시된 일자(없으면 봉투 일자)부터 기산 (제20조)</li>
    </ul>`,
    "계약 성립 시점 = 승낙 도달 시. 승낙은 도달 전·동시에 회수 가능 (제22조)",
    ["CISG 제14–24조"]),

  c("w2-cisg-25", 2, "CISG", "본질적 계약위반", "Fundamental breach, 제25조",
    `<ul>
      <li>정의: 상대방이 계약상 기대할 수 있는 바를 <strong>실질적으로 박탈</strong>할 정도의 손해를 주는 위반</li>
      <li>단, 위반 당사자가 그 결과를 <strong>예견하지 못했고</strong>, 같은 부류의 합리적인 사람도 예견할 수 없었다면 본질적 위반이 아님</li>
      <li>효과: 계약 해제 (제49조, 제64조), 대체물 인도 청구 (제46조 2항), 위험 이전 후에도 구제 가능 (제70조)</li>
    </ul>`,
    "본질적 위반 = 실질적 박탈 + 예견가능성. 계약 해제·대체물 인도 청구의 요건",
    ["CISG 제25조", "CISG 제46조", "CISG 제49조", "CISG 제64조"]),

  c("w2-cisg-seller-duty", 2, "CISG", "매도인 의무", "물품 인도, 서류 교부, 계약 적합성",
    `<ul>
      <li>제30조: 매도인은 계약과 협약에 따라 <strong>물품 인도, 관련 서류 교부, 소유권 이전</strong></li>
      <li>인도 장소 (제31조): 운송이 포함되면 최초 운송인에게 교부</li>
      <li>계약 적합성 (제35조): 계약에서 정한 수량·품질·종류·포장. 통상 사용 목적 적합, 알려진 특정 목적 적합, 견본·모형과 일치, 통상 방식의 포장</li>
      <li>적합성 판단 시점: <strong>위험 이전 시</strong> (제36조)</li>
      <li>제3자의 권리·지식재산권으로부터 자유로운 물품 (제41·42조)</li>
      <li>인도기일 전 부적합 치유권 (제37조), 인도기일 후 추완권 (제48조)</li>
    </ul>`,
    "매도인 3대 의무: 인도 · 서류 교부 · 소유권 이전. 적합성은 위험 이전 시점 기준",
    ["CISG 제30조", "CISG 제35조", "CISG 제36조", "CISG 제41조"]),

  c("w2-cisg-buyer-duty", 2, "CISG", "매수인 의무", "대금 지급, 인도 수령",
    `<ul>
      <li>제53조: 매수인은 <strong>대금 지급</strong>과 <strong>인도 수령</strong></li>
      <li>지급 장소: 매도인의 영업소. 물품·서류 교부와 상환이면 그 교부 장소 (제57조)</li>
      <li>지급 시기: 매도인이 물품이나 서류를 매수인 처분하에 둔 때. 지급 전 검사 기회 (제58조)</li>
      <li>매도인의 요구나 절차 없이도 지급 (제59조)</li>
      <li>인도 수령 (제60조): 인도를 가능하게 하는 모든 행위 + 물품 수령</li>
      <li>검사 (제38조)와 부적합 통지 (제39조)를 게을리하면 부적합을 주장할 권리 상실</li>
    </ul>`,
    "매수인 의무 = 대금 지급 + 인도 수령. 검사·통지 의무 위반 시 권리 상실",
    ["CISG 제53조", "CISG 제57조", "CISG 제58조", "CISG 제60조"]),

  c("w2-cisg-buyer", 2, "CISG", "매수인의 구제", "특정이행 청구, 대체물 인도 청구(본질적 위반 시), 하자보완 청구, 부가기간 지정, 계약 해제, 대금 감액, 손해배상",
    `<ul>
      <li><strong>이행 청구</strong> (제46조 1항): 의무 이행을 청구 (특정이행)</li>
      <li><strong>대체물 인도 청구</strong> (제46조 2항): <strong>본질적 위반</strong>일 때만, 합리적 기간 내 통지와 함께</li>
      <li><strong>하자보완(수리) 청구</strong> (제46조 3항): 불합리하지 않은 경우</li>
      <li><strong>부가기간 지정</strong> (제47조, Nachfrist): 추가 이행 기간 지정. 기간 내 인도하지 않으면 해제 가능</li>
      <li><strong>계약 해제</strong> (제49조): 본질적 위반 또는 부가기간 내 미인도</li>
      <li><strong>대금 감액</strong> (제50조): 부적합 물품의 가치 비율로 감액. 대금 지급 여부와 무관</li>
      <li><strong>손해배상</strong> (제45조 1항 b): 다른 구제와 함께 청구 가능</li>
    </ul>`,
    "대체물 인도 청구는 본질적 위반일 때만. 대금감액은 매수인만의 구제. 손해배상은 다른 구제와 병행 가능",
    ["CISG 제45–52조"]),

  c("w2-cisg-seller", 2, "CISG", "매도인의 구제", "이행 청구, 부가기간 지정, 계약 해제, 물품명세 확정, 손해배상",
    `<ul>
      <li><strong>이행 청구</strong> (제62조): 대금 지급, 인도 수령 등</li>
      <li><strong>부가기간 지정</strong> (제63조)</li>
      <li><strong>계약 해제</strong> (제64조): 본질적 위반, 또는 부가기간 내 대금 미지급·인도 미수령</li>
      <li><strong>물품명세 확정</strong> (제65조): 매수인이 형태·규격 등을 지정해야 하는데 하지 않으면 매도인이 지정</li>
      <li><strong>손해배상</strong> (제61조 1항 b)</li>
    </ul>`,
    "물품명세 확정권은 매도인만, 대금감액·대체물 청구는 매수인만 가진 구제",
    ["CISG 제61–65조"]),

  c("w2-cisg-risk", 2, "CISG", "위험의 이전", "제66–70조",
    `<ul>
      <li>제66조: 위험 이전 후 물품이 멸실·훼손되어도 매수인은 대금 지급 의무를 면하지 못함 (매도인 작위·부작위로 인한 경우 제외)</li>
      <li>제67조: 운송이 포함된 계약 → <strong>최초 운송인에게 교부</strong>한 때 (특정 장소에서 교부해야 하면 그 장소에서). 물품이 계약에 <strong>특정</strong>되어야 함</li>
      <li>제68조: 운송 중 매매 → 원칙 <strong>계약 체결 시</strong>. 사정에 따라 운송인에게 교부한 때로 소급 가능</li>
      <li>제69조: 그 밖의 경우 → 매수인이 물품을 수령한 때, 또는 처분 가능 상태인데 수령하지 않아 계약 위반이 된 때</li>
      <li>제70조: 본질적 위반이 있으면 위험이 이전되어도 매수인의 구제권에 영향 없음</li>
      <li>인코텀즈를 채택하면 인코텀즈의 위험 이전 규정이 우선 (제6조)</li>
    </ul>`,
    "운송 중 매매는 원칙적으로 계약 체결 시 위험 이전. 물품 특정 전에는 위험이 이전되지 않음",
    ["CISG 제66–70조"]),

  c("w2-cisg-damages", 2, "CISG", "손해배상 · 손해경감 · 면책", "손해배상 범위와 예견가능성 (제74조), 손해경감 의무 (제77조), 면책 (제79조)",
    `<ul>
      <li><strong>제74조</strong>: 손해배상액 = 위반으로 입은 손실(이익 상실 포함). 단, 계약 체결 시 위반 당사자가 <strong>예견했거나 예견할 수 있었던</strong> 범위로 제한</li>
      <li>제75조: 해제 후 대체거래를 했으면 계약가격과 대체거래가격의 차액</li>
      <li>제76조: 대체거래가 없으면 계약가격과 해제 시 시가의 차액</li>
      <li><strong>제77조 손해경감 의무</strong>: 피해 당사자는 손실 경감을 위한 합리적 조치를 해야 함. 안 하면 경감 가능했던 금액만큼 감액 청구 가능</li>
      <li>제78조: 대금 등 지급 지체 시 이자 청구</li>
      <li><strong>제79조 면책</strong>: 통제할 수 없는 장애 + 계약 시 고려를 기대할 수 없었음 + 회피·극복 불가 → <strong>손해배상 책임만</strong> 면제. 장애가 존재하는 기간에만 효력</li>
    </ul>`,
    "제79조 면책은 손해배상만 면제(해제·대금감액 등은 가능). 예견가능성 기준과 손해경감 의무가 단골",
    ["CISG 제74조", "CISG 제75조", "CISG 제76조", "CISG 제77조", "CISG 제79조"]),

  c("w2-liner", 2, "운송", "정기선과 부정기선", "정기선(개품운송)과 부정기선(용선운송)",
    `<ul>
      <li><strong>정기선(Liner)</strong>: 정해진 항로·일정 운항. 불특정 다수 화주의 <strong>개품운송</strong>. 공표 운임(Tariff). 운송계약 증거는 <strong>B/L</strong>. 주로 컨테이너선. 하역비는 선주 부담(Berth term / Liner term)</li>
      <li><strong>부정기선(Tramp)</strong>: 항로·일정 없이 화주 수요에 따라 운항. 곡물·광석·석탄 등 대량 산화물. <strong>용선계약(Charter Party, C/P)</strong>. 운임은 수요·공급에 따른 시장 운임</li>
      <li>해운동맹(Shipping Conference): 정기선사들의 운임 카르텔</li>
    </ul>`,
    "정기선 = 개품운송·B/L·공표 운임·Berth term. 부정기선 = 용선계약·벌크·시장 운임",
    []),

  c("w2-charter", 2, "운송", "용선계약", "항해용선, 정기용선, 나용선 / 정박기간(Laytime), 체선료(Demurrage), 조출료(Despatch money)",
    `<ul>
      <li><strong>항해용선(Voyage C/P)</strong>: 특정 항해 단위. 운임은 화물량 기준. 선주가 운항·비용 부담. 선복 전체를 일괄 운임으로 빌리면 총괄운임용선(Lumpsum C/P)</li>
      <li><strong>정기용선(Time C/P)</strong>: 일정 기간 단위. 용선료는 기간 기준. 선주는 선원·선박 관리, 용선자는 연료·항비 등 운항비</li>
      <li><strong>나용선(Bareboat / Demise C/P)</strong>: 선박만 빌리고 선원·관리 모두 용선자</li>
      <li><strong>정박기간(Laytime)</strong>: 하역에 허용된 기간
        <ul>
          <li>CQD(Customary Quick Despatch): 항구 관습에 따라 가능한 빨리</li>
          <li>Running laydays: 연속 일수 (일요일·공휴일 포함)</li>
          <li>WWD(Weather Working Days): 하역 가능한 날씨의 작업일만 계산. SHEX(일요일·공휴일 제외) / SHINC(포함)</li>
        </ul>
      </li>
      <li><strong>체선료(Demurrage)</strong>: 정박기간 초과 시 용선자 → 선주</li>
      <li><strong>조출료(Despatch money)</strong>: 정박기간보다 빨리 끝내면 선주 → 용선자. 통상 <strong>체선료의 1/2</strong></li>
      <li>하역비 조건: FI(선적비 화주), FO(양하비 화주), FIO(선적·양하 모두 화주), Berth term(선주)</li>
    </ul>`,
    "조출료 = 체선료의 1/2이 관행. 'Once on demurrage, always on demurrage'(체선 중에는 휴일도 계산). FIO = 하역비 모두 화주",
    []),

  c("w2-surcharge", 2, "운송", "운임 할증료", "BAF, CAF, THC 등",
    `<ul>
      <li><strong>BAF</strong>(Bunker Adjustment Factor): 유류할증료</li>
      <li><strong>CAF</strong>(Currency Adjustment Factor): 통화할증료</li>
      <li><strong>THC</strong>(Terminal Handling Charge): 터미널 화물처리비</li>
      <li>CFS Charge: LCL 화물 혼재·분류 비용</li>
      <li>Congestion Surcharge: 체화할증료 (항만 혼잡)</li>
      <li>Heavy Lift / Bulky·Lengthy Surcharge: 중량·용적·장척 할증</li>
      <li>Optional Charge: 양륙항 선택 할증, Transhipment Charge: 환적 할증</li>
      <li>PSS(Peak Season Surcharge): 성수기 할증</li>
      <li>운임톤(Revenue Ton, R/T): 중량톤(1,000kg)과 용적톤(1CBM) 중 운임이 높은 쪽 적용</li>
      <li>FAK(Freight All Kinds): 품목 구분 없이 컨테이너당 동일 운임 (Box rate)</li>
    </ul>`,
    "BAF = 유류, CAF = 통화, THC = 터미널. 운임톤은 중량톤과 용적톤 중 큰 쪽",
    []),

  c("w2-container", 2, "운송", "컨테이너 운송", "FCL / LCL, CY / CFS",
    `<ul>
      <li><strong>FCL</strong>(Full Container Load): 한 화주의 화물로 컨테이너를 채움</li>
      <li><strong>LCL</strong>(Less than Container Load): 여러 화주의 소량 화물을 포워더가 혼재(Consolidation)</li>
      <li><strong>CY</strong>(Container Yard): FCL 컨테이너 인수·인도·보관 장소</li>
      <li><strong>CFS</strong>(Container Freight Station): LCL 화물을 모아 적입·분류하는 장소</li>
      <li>운송 형태: CY/CY(FCL/FCL, Door to Door), CFS/CFS(LCL/LCL), CFS/CY(여러 수출자 → 한 수입자, Buyer's consolidation), CY/CFS(한 수출자 → 여러 수입자)</li>
      <li>규격: 20ft = 1 TEU, 40ft = 1 FEU (2 TEU)</li>
      <li>FCL B/L의 'Shipper's Load and Count', 'Said to Contain'은 부지(不知)문언으로 사고부 B/L이 아님</li>
    </ul>`,
    "CY = FCL, CFS = LCL. 'Shipper's load and count' 문언이 있어도 은행 수리 (UCP 600 제26조)",
    ["UCP 600 제26조"]),

  c("w2-bl-function", 2, "운송", "선하증권(B/L)의 기능", "화물수령증, 운송계약의 증거, 권리증권",
    `<ul>
      <li><strong>화물수령증</strong>(Receipt of goods): 운송인이 화물을 수령했다는 증거</li>
      <li><strong>운송계약의 증거</strong>(Evidence of contract of carriage): B/L 자체가 계약은 아니고 증거</li>
      <li><strong>권리증권</strong>(Document of title): B/L을 양도하면 화물에 대한 권리가 이전</li>
      <li>유가증권의 성질: 요인증권, 요식증권, 문언증권, 지시증권, 처분증권, 인도증권, <strong>상환증권</strong>(B/L 원본과 상환해서만 화물 인도)</li>
      <li>원본은 보통 3통 1세트(Full set). 1통으로 화물이 인도되면 나머지는 효력 상실</li>
    </ul>`,
    "B/L 3대 기능 = 화물수령증 · 운송계약 증거 · 권리증권. Sea Waybill·AWB는 권리증권 기능이 없음",
    []),

  c("w2-bl-types", 2, "운송", "B/L 종류", "선적 / 수취, 무사고 / 사고, 지시식 / 기명식, 기간경과(Stale), 제3자, 통선하증권, Surrendered B/L",
    `<ul>
      <li><strong>선적(Shipped / On board) B/L</strong> vs <strong>수취(Received) B/L</strong>: 수취 B/L에 본선적재표기(On board notation)를 하면 선적 B/L로 인정</li>
      <li><strong>무사고(Clean)</strong> vs <strong>사고부(Foul / Dirty)</strong>: 화물·포장의 하자 문언 유무. 은행은 무사고 B/L만 수리 (UCP 제27조)</li>
      <li><strong>지시식(Order) B/L</strong>: 'To order', 'To order of shipper' → 배서로 양도, 유통성 있음</li>
      <li><strong>기명식(Straight) B/L</strong>: 수하인 명기 → 유통성 제한</li>
      <li><strong>Stale B/L</strong>: 선적일 후 21일이 지나 제시된 B/L. 'Stale B/L acceptable' 문언이 없으면 수리 거절</li>
      <li><strong>제3자(Third party) B/L</strong>: 수익자가 아닌 제3자가 송하인. UCP상 수리 가능 (제14조 k)</li>
      <li><strong>통선하증권(Through B/L)</strong>: 여러 운송인이 이어서 운송할 때 최초 운송인이 전 구간에 대해 발행</li>
      <li><strong>Surrendered B/L</strong>: 원본을 발행 후 송하인이 운송인에게 반납. 수하인은 원본 없이 화물 인수 (근거리 운송)</li>
      <li>기타: Switch B/L(중계무역), Charter party B/L(제22조), House B/L(포워더 발행), Short form B/L(약식)</li>
    </ul>`,
    "은행 수리 = Clean On board B/L. Stale = 선적 후 21일 경과. Surrendered B/L은 유통성 상실",
    ["UCP 600 제14조", "UCP 600 제20조", "UCP 600 제22조", "UCP 600 제27조"]),

  c("w2-nonneg", 2, "운송", "비유통 운송서류", "해상화물운송장(Sea Waybill), 항공화물운송장(AWB)",
    `<ul>
      <li><strong>해상화물운송장(Sea Waybill)</strong>: 비유통(Non-negotiable)·기명식. 화물수령증·운송계약 증거 기능만 있고 <strong>권리증권이 아님</strong> → 수하인은 원본 제시 없이 신원 확인만으로 화물 인수. 본·지사 간, 신뢰 관계, 근거리 거래에 사용. CMI 해상화물운송장 통일규칙(1990)</li>
      <li><strong>항공화물운송장(AWB)</strong>: 비유통·기명식, 권리증권 아님. 원본 3통(운송인용·수하인용·송하인용). 송하인이 작성하는 것이 원칙(실무는 항공사·대리점이 대행)</li>
      <li>Master AWB(항공사 발행) vs House AWB(포워더 발행)</li>
      <li>AWB 발행일이 선적일. 실제 발송일 별도 표기가 있으면 그 날짜 (UCP 제23조)</li>
    </ul>`,
    "Sea Waybill·AWB는 권리증권이 아님 → 신용장 거래에서 은행이 담보를 확보하려면 수하인을 개설은행으로 지정",
    ["UCP 600 제21조", "UCP 600 제23조"]),

  c("w2-lg", 2, "운송", "수입화물선취보증서(L/G)", "B/L 도착 전 화물을 먼저 인수하기 위한 은행 보증서",
    `<ul>
      <li>근거리 무역에서 화물이 B/L 원본보다 먼저 도착하는 경우 사용</li>
      <li>수입자가 개설은행에 L/G 발급 신청 → 은행이 연대보증한 L/G를 운송인에게 제출하고 B/L 원본 없이 화물 인수</li>
      <li>나중에 B/L 원본이 도착하면 운송인에게 제출하고 L/G를 회수</li>
      <li>L/G를 발급받은 수입자는 이후 도착한 서류에 하자가 있어도 <strong>대금 지급을 거절할 수 없음</strong></li>
      <li>수출자 측 하자서류 매입에 쓰는 'L/G 네고'의 보상장과는 다른 것</li>
    </ul>`,
    "수입화물선취보증서를 쓰면 서류 하자 주장권 포기. 수출 측 L/G 네고와 혼동 주의",
    []),

  c("w2-multimodal", 2, "운송", "복합운송", "복합운송과 복합운송인 (FIATA FBL)",
    `<ul>
      <li>정의: 서로 다른 2가지 이상의 운송수단으로, 복합운송인(MTO)이 전 구간에 대해 단일 책임을 지는 운송</li>
      <li>요건: 단일 책임, 단일 운임, 단일 운송서류(복합운송증권), 서로 다른 운송수단</li>
      <li>복합운송인 유형: 실제운송인형(선사 등 Actual carrier), 계약운송인형(포워더, NVOCC)</li>
      <li>책임체계
        <ul>
          <li>단일책임체계(Uniform): 손해 구간과 무관하게 동일 책임</li>
          <li>이종책임체계(Network): 손해 발생 구간의 운송 법규 적용</li>
          <li>절충식(Modified uniform): UN 국제복합운송조약(1980)</li>
        </ul>
      </li>
      <li><strong>FIATA FBL</strong>: 국제운송주선인협회연맹의 복합운송 선하증권. 유통 가능</li>
      <li>랜드브리지: SLB(시베리아), ALB(미국 대륙), MLB(미니 랜드브리지)</li>
    </ul>`,
    "복합운송인 = 전 구간 단일 책임. Network 체계 = 손해 발생 구간 법 적용. 은행 수리는 UCP 600 제19조",
    ["UCP 600 제19조"]),

  c("w2-sea-rules", 2, "운송", "해상운송 국제규칙", "헤이그(1924), 헤이그-비스비(1968), 함부르크(1978), 로테르담(2008) / 책임한도와 항해과실 면책 비교",
    `<ul>
      <li><strong>헤이그 규칙(1924)</strong>: 선하증권 통일조약. 감항능력 주의의무·화물 주의의무. <strong>항해과실·선박화재 면책</strong> 등 면책 사유 열거. 책임한도 포장당 £100. 갑판적 화물·생동물 제외. 제소기간 1년</li>
      <li><strong>헤이그-비스비 규칙(1968)</strong>: 헤이그 개정. 1979년 SDR 의정서로 <strong>포장당 666.67 SDR 또는 kg당 2 SDR</strong> 중 높은 쪽. 컨테이너 조항 신설. 항해과실 면책 유지</li>
      <li><strong>함부르크 규칙(1978)</strong>: <strong>항해과실 면책 폐지</strong>, 추정과실책임. <strong>포장당 835 SDR 또는 kg당 2.5 SDR</strong>. 지연 손해 책임(운임의 2.5배). 갑판적·생동물 포함. 제소기간 2년</li>
      <li><strong>로테르담 규칙(2008)</strong>: 해상 구간을 포함한 Door to Door 운송. <strong>포장당 875 SDR 또는 kg당 3 SDR</strong>. 전자운송기록 인정. 미발효</li>
      <li>한국 상법: 헤이그-비스비 수준 책임한도(포장당 666.67 SDR 또는 kg당 2 SDR), 항해과실 면책 인정</li>
    </ul>`,
    "항해과실 면책 폐지는 함부르크부터. 책임한도: H-V 666.67/2 → 함부르크 835/2.5 → 로테르담 875/3",
    []),

  c("w2-air", 2, "운송", "항공운송", "몬트리올 협약, AWB",
    `<ul>
      <li>바르샤바 협약(1929)과 그 개정 의정서들 → <strong>몬트리올 협약(1999, 2003 발효)</strong>으로 통합·현대화</li>
      <li>화물 손해에 대해 운송인은 원칙적으로 <strong>엄격책임</strong>. 단, 물품 고유 결함, 포장 불량, 전쟁, 공권력 행위는 면책</li>
      <li>화물 책임한도는 <strong>kg당 SDR</strong>로 정하며, ICAO가 정기 검토로 상향 조정해 옴 (최초 17 SDR). 최신 한도는 ICAO 공시 확인</li>
      <li>송하인이 가액을 신고하고 추가 요금을 내면 신고 가액까지 배상</li>
      <li>AWB: 비유통·기명식, 권리증권 아님, 송하인 작성 원칙. 전자 AWB(e-AWB) 인정</li>
    </ul>`,
    "항공 = 몬트리올 협약, AWB는 비유통 서류. 책임한도는 kg당 SDR 기준(포장당 아님)",
    ["UCP 600 제23조"]),

  c("w2-ins-principle", 2, "적하보험", "해상보험 기본원칙", "피보험이익, 최대선의, 담보(Warranty), 근인주의",
    `<ul>
      <li><strong>피보험이익(Insurable interest)</strong>: 보험 목적물에 대한 경제적 이해관계. 적하보험은 계약 체결 시가 아니라 <strong>손해 발생 시</strong>에 있으면 됨</li>
      <li><strong>최대선의(Utmost good faith)</strong>: 보험계약자의 고지의무(Disclosure), 부실표시 금지</li>
      <li><strong>담보(Warranty)</strong>: 피보험자가 반드시 지켜야 할 약속. 명시담보와 묵시담보(감항담보, 적법담보). 영국 해상보험법(MIA 1906)상 위반 시 보험자 자동 면책 → 영국 보험법(Insurance Act 2015)으로 위반이 치유될 때까지 책임 정지로 완화</li>
      <li><strong>근인주의(Proximate cause)</strong>: 손해의 가장 지배적·효과적인 원인이 담보위험이어야 보상. 시간적으로 가장 가까운 원인이 아님</li>
      <li>기타: 실손보상 원칙, 대위(Subrogation), 위부(Abandonment)</li>
    </ul>`,
    "피보험이익은 손해 발생 시 존재하면 충분. 근인 = 가장 효과적인 원인(시간상 최근 원인 아님)",
    ["MIA 1906"]),

  c("w2-loss", 2, "적하보험", "해상손해", "전손 (현실전손, 추정전손), 분손 (단독해손, 공동해손), 비용손해 (손해방지비용, 구조비)",
    `<p><strong>전손(Total loss)</strong></p>
    <ul>
      <li><strong>현실전손</strong>(Actual): 물품 완전 멸실, 본래 성질 상실, 회복 불가능한 박탈, 선박 행방불명</li>
      <li><strong>추정전손</strong>(Constructive): 현실전손이 불가피하거나 회복·수리 비용이 회복 후 가액을 초과. 피보험자가 <strong>위부(Notice of abandonment)</strong>를 통지해야 전손으로 보상, 아니면 분손 처리</li>
    </ul>
    <p><strong>분손(Partial loss)</strong></p>
    <ul>
      <li><strong>단독해손</strong>(Particular average): 피보험자가 단독으로 입은 부분 손해</li>
      <li><strong>공동해손</strong>(General average): 선박·화물의 공동 위험을 피하려고 의도적·합리적으로 한 희생과 비용. 선박·화물·운임 이해관계자가 비율대로 분담. <strong>요크-앤트워프 규칙(YAR)</strong> 적용</li>
    </ul>
    <p><strong>비용손해</strong></p>
    <ul>
      <li>손해방지비용(Sue and labour charges): 손해 방지·경감 비용. 보험금액을 초과해도 보상</li>
      <li>구조비(Salvage charges): 계약 없이 임의로 구조한 자에게 지급</li>
      <li>특별비용(Particular charges), 손해조사비용</li>
    </ul>`,
    "추정전손은 위부 통지 필요. 공동해손은 YAR, ICC(A)·(B)·(C) 모두 담보. 손해방지비용은 보험금액 초과해도 보상",
    ["MIA 1906", "York-Antwerp Rules"]),

  c("w2-icc", 2, "적하보험", "ICC(A) · (B) · (C)", "협회적하약관 ICC(A), ICC(B), ICC(C)의 담보범위 차이",
    `<ul>
      <li><strong>ICC(A)</strong>: 포괄담보(All risks) 방식. 면책위험을 제외한 모든 위험. 해적 위험도 담보</li>
      <li><strong>ICC(B)</strong>: 열거담보. 화재·폭발, 좌초·교사·침몰·전복, 육상운송용구 전복·탈선, 충돌·접촉, 피난항 양하, <strong>지진·화산분화·낙뢰</strong>, 공동해손 희생, 투하, <strong>갑판유실</strong>, <strong>해수·호수·하천수 침입</strong>, <strong>선적·양하 중 추락한 포장당 전손</strong></li>
      <li><strong>ICC(C)</strong>: (B)에서 굵게 표시한 4가지(지진·화산·낙뢰, 갑판유실, 해수 등 침입, 하역 중 추락 전손)를 뺀 위험</li>
      <li>구 약관 대응: (A) ≈ All Risks, (B) ≈ WA(분손담보), (C) ≈ FPA(단독해손 부담보)</li>
    </ul>`,
    "(B)에만 있고 (C)에 없는 위험 4가지가 단골. 해적은 ICC(A)에서 담보",
    ["ICC 2009"]),

  c("w2-ins-extra", 2, "적하보험", "부가약관", "전쟁약관, 동맹파업약관",
    `<ul>
      <li><strong>협회전쟁약관(IWC, Cargo)</strong>: 전쟁, 내란, 혁명, 포획·나포, 기뢰·어뢰 등. <strong>해상에 있는 동안만</strong> 담보 (Waterborne agreement)</li>
      <li><strong>협회동맹파업약관(ISC, Cargo)</strong>: 파업, 직장폐쇄, 폭동, 소요, 테러. 창고 간 담보</li>
      <li>기타 부가위험: TPND(도난·발하·불착), RFWD(빗물·담수 손해), COOC(유류·타화물 접촉), JWOB(투하·갑판유실), Breakage(파손), Leakage(누손), Sweat & Heating(습기·열), Hook & Hole(갈고리 손해)</li>
    </ul>`,
    "전쟁위험은 해상에 있는 동안만, 동맹파업은 창고 간. TPND = 도난·발하·불착",
    ["ICC 2009"]),

  c("w2-ins-exclusion", 2, "적하보험", "면책위험", "피보험자의 고의적 불법행위, 통상의 누손·자연소모, 포장 불충분, 지연 등",
    `<p><strong>ICC 2009 일반 면책</strong></p>
    <ul>
      <li>피보험자의 고의적 불법행위</li>
      <li>통상의 누손, 통상의 중량·용적 감소, 자연소모</li>
      <li>포장·준비의 불충분·부적합</li>
      <li>보험 목적물 고유의 하자·성질</li>
      <li><strong>지연</strong>으로 인한 손해 (담보위험이 원인이어도 면책)</li>
      <li>선주·운항자의 지급불능·재정적 채무불이행</li>
      <li>원자력·방사능 무기 사용</li>
    </ul>
    <p>그 외: 불감항·부적합 면책, 전쟁 면책, 동맹파업 면책. (B)(C)는 제3자의 악의적 손상도 면책 → Malicious Damage Clause로 추가 담보</p>`,
    "지연 손해는 담보위험 때문이어도 면책. 전쟁·파업은 부가약관으로만 담보",
    ["ICC 2009"]),

  c("w2-ins-period", 2, "적하보험", "보험기간", "창고 간 약관 (Warehouse to warehouse)",
    `<ul>
      <li><strong>운송약관(Transit clause)</strong>, 흔히 창고 간 약관</li>
      <li>개시: 보험증권에 기재된 장소의 창고에서 운송을 위해 <strong>처음 움직일 때</strong> (2009 ICC는 운송차량 적재를 위한 이동 개시부터)</li>
      <li>종료: 다음 중 먼저 도래하는 때
        <ul>
          <li>목적지 최종 창고에서 양하 완료</li>
          <li>통상 운송 과정이 아닌 보관·할당·분배를 위해 다른 창고 등을 선택한 때</li>
          <li>최종 양하항에서 본선 양하 후 <strong>60일</strong> 경과 (항공은 30일)</li>
        </ul>
      </li>
    </ul>`,
    "해상 양하 후 60일, 항공 30일. 전쟁위험은 해상에 있는 동안만이라는 점과 비교",
    ["ICC 2009 제8조"]),

  c("w2-ins-docs", 2, "적하보험", "보험증권과 보험증명서", "보험증권(Policy)과 보험증명서(Certificate)",
    `<ul>
      <li><strong>보험증권(Insurance Policy)</strong>: 개별 보험계약의 증거</li>
      <li><strong>포괄예정보험(Open cover / Open policy)</strong>: 일정 기간 선적분을 포괄 계약 → 개별 선적마다 <strong>보험증명서(Certificate)</strong> 또는 확정통지서(Declaration) 발행</li>
      <li>UCP 600 제28조
        <ul>
          <li>보험증권 대신 증명서·통지서 수리 가능 여부: 증권을 요구하면 증명서로 대체 <strong>불가</strong>, 증명서를 요구하면 증권으로 대체 <strong>가능</strong></li>
          <li>브로커가 발행하는 보험인수증(<strong>Cover note</strong>)은 수리 불가</li>
          <li>보험서류 일자는 선적일보다 늦으면 안 됨 (그 전부터 효력이 있다고 표시하면 가능)</li>
        </ul>
      </li>
      <li>배서로 양도 가능 (CIF·CIP에서 매도인이 백지배서해 매수인에게 넘김)</li>
    </ul>`,
    "Cover note 불수리. Policy 요구 시 Certificate 불가, Certificate 요구 시 Policy 가능",
    ["UCP 600 제28조"]),

  /* ================= W3 · 무역결제 · 신용장 ================= */

  c("w3-remit", 3, "송금방식", "송금 수단", "T/T(전신송금), M/T(우편송금), D/D(송금수표)",
    `<ul>
      <li><strong>T/T</strong>(Telegraphic Transfer, 전신송금): 송금은행이 지급은행에 전신(SWIFT <strong>MT103</strong>)으로 지급 지시. 가장 빠르고 일반적</li>
      <li><strong>M/T</strong>(Mail Transfer, 우편송금): 지급지시서를 우편으로 송부. 현재 거의 사용 안 함</li>
      <li><strong>D/D</strong>(Demand Draft, 송금수표): 송금은행이 발행한 수표를 <strong>송금인이 직접</strong> 수취인에게 우송 → 수취인이 지급은행에 제시</li>
      <li>송금방식의 특징: 절차 간단, 수수료 저렴. 은행의 지급 보증이 없어 상대방 신용에 의존</li>
    </ul>`,
    "T/T = SWIFT MT103. D/D = 송금인이 수표를 직접 우송",
    ["SWIFT MT103"]),

  c("w3-remit-timing", 3, "송금방식", "사전송금 · 사후송금", "사전송금: CWO, CIA / 사후송금: COD, CAD, O/A(청산계정)",
    `<ul>
      <li><strong>사전송금</strong>: CWO(Cash With Order, 주문 시 송금), CIA(Cash In Advance). 수출자에게 가장 유리, 수입자 위험 최대</li>
      <li><strong>COD</strong>(Cash On Delivery): 물품이 수입국에 도착하면 수입자가 검사 후 대금 지급. 수입국에 수출자 대리인·지사 필요. 귀금속 등 고가품</li>
      <li><strong>CAD</strong>(Cash Against Documents): <strong>수출국</strong>에서 수입자 대리인·지사에게 선적서류를 넘기며 대금 수령. 'European D/P'라고도 함</li>
      <li><strong>O/A</strong>(Open Account, 청산계정·외상): 선적 후 서류를 직접 보내고 약정 기간 후 송금. 수출자 위험 최대. 수출 채권을 은행에 매각(O/A 네고)해 조기 현금화 가능</li>
    </ul>`,
    "COD = 수입국에서 물품과 대금 교환, CAD = 수출국에서 서류와 대금 교환. O/A는 수출자 위험 최대",
    []),

  c("w3-collection-parties", 3, "추심방식", "추심의 당사자", "추심의뢰인(수출자), 추심의뢰은행, 추심은행, 제시은행, 지급인(수입자)",
    `<ul>
      <li><strong>추심의뢰인</strong>(Principal): 수출자</li>
      <li><strong>추심의뢰은행</strong>(Remitting bank): 수출자의 거래은행</li>
      <li><strong>추심은행</strong>(Collecting bank): 추심의뢰은행 외에 추심 과정에 참여하는 은행</li>
      <li><strong>제시은행</strong>(Presenting bank): 지급인에게 서류를 제시하는 추심은행</li>
      <li><strong>지급인</strong>(Drawee): 수입자</li>
      <li>은행은 <strong>추심지시서</strong>(Collection instruction)에 따라서만 행동</li>
      <li>은행은 서류 내용을 심사하지 않고, 지시서에 열거된 서류가 외관상 도착했는지만 확인 (URC 제12조)</li>
      <li>물품을 은행 동의 없이 은행 앞으로 직접 보내면 안 됨 (제10조)</li>
    </ul>`,
    "추심은행은 서류 내용 심사 의무 없음 (신용장과 다름). URC 522는 1995년 개정판",
    ["URC 522 제3조", "URC 522 제10조", "URC 522 제12조"]),

  c("w3-dpda", 3, "추심방식", "D/P와 D/A", "D/P(지급인도)와 D/A(인수인도)의 서류 인도 시점 차이",
    `<ul>
      <li><strong>D/P</strong>(Documents against Payment, 지급인도): 일람출급 환어음. 수입자가 <strong>대금을 지급해야</strong> 서류를 받음</li>
      <li><strong>D/A</strong>(Documents against Acceptance, 인수인도): 기한부 환어음. 수입자가 환어음을 <strong>인수(서명)만 하면</strong> 서류를 받고, 대금은 만기일에 지급</li>
      <li>D/A는 대금 없이 서류(화물)가 넘어가므로 수출자 위험이 D/P보다 큼</li>
      <li>D/P Usance: 기한부 환어음이지만 지급해야 서류 인도</li>
      <li>기한부 환어음이 포함된 추심에 D/A·D/P 지시가 없으면 <strong>지급인도(D/P)</strong>로 처리 (URC 제7조)</li>
    </ul>`,
    "수출자 위험: D/A > D/P. 지시가 없으면 D/P로 처리 (URC 제7조)",
    ["URC 522 제7조"]),

  c("w3-documentary", 3, "추심방식", "화환추심과 무화환추심", "선적서류 첨부 여부에 따른 구분",
    `<ul>
      <li>URC 제2조 서류 구분
        <ul>
          <li><strong>금융서류</strong>: 환어음, 약속어음, 수표 등 금전 지급용 증서</li>
          <li><strong>상업서류</strong>: 송장, 운송서류, 권리증권 등</li>
        </ul>
      </li>
      <li><strong>화환추심</strong>(Documentary collection): 상업서류가 붙은 추심 (금융서류 + 상업서류, 또는 상업서류만)</li>
      <li><strong>무화환추심</strong>(Clean collection): 상업서류 없이 금융서류만 추심</li>
    </ul>`,
    "상업서류가 붙으면 화환추심, 금융서류만이면 무화환추심",
    ["URC 522 제2조"]),

  c("w3-no-guarantee", 3, "추심방식", "추심은행의 지위", "은행은 지급을 보증하지 않음 (URC 522)",
    `<ul>
      <li>추심에서 은행은 단순한 대리인(서비스 제공자)으로, <strong>대금 지급을 보증하지 않음</strong></li>
      <li>지급·인수 거절 시 지체 없이 추심의뢰은행에 통지 (제26조)</li>
      <li>거절증서(Protest) 작성은 지시가 있을 때만 (제24조)</li>
      <li>물품 보관·보험 등 조치 의무 없음 (제10조)</li>
      <li>수출자는 수입자 신용에 의존 → 단기수출보험 등으로 위험 보완</li>
    </ul>`,
    "추심 = 은행 지급 보증 없음 / 신용장 = 개설은행의 조건부 지급 확약",
    ["URC 522 제10조", "URC 522 제24조", "URC 522 제26조"]),

  c("w3-lc-principle", 3, "신용장", "독립성 · 추상성 원칙", "신용장의 독립성·추상성 원칙, 서류거래 원칙",
    `<ul>
      <li><strong>독립성</strong>(제4조): 신용장은 근거가 되는 매매계약과 별개의 거래. 은행은 계약 내용에 구속되지 않음</li>
      <li><strong>추상성</strong>(제5조): 은행은 물품·용역이 아니라 <strong>서류</strong>로만 거래</li>
      <li>서류 심사는 문면상(on their face) 일치 여부만 확인 (제14조)</li>
      <li>엄격일치 원칙(Strict compliance)이 기본. 다만 서류 간 데이터는 동일할 필요 없이 상충하지만 않으면 됨</li>
      <li>비서류적 조건(서류 제시 없이 충족 여부를 확인해야 하는 조건)은 무시 (제14조 h)</li>
      <li>예외: 사기거래 배제 원칙(Fraud rule). UCP가 아니라 각국 법원 판례로 인정 (지급정지가처분)</li>
    </ul>`,
    "독립성 = 매매계약과 별개(제4조), 추상성 = 서류 거래(제5조). Fraud rule은 UCP 규정이 아님",
    ["UCP 600 제4조", "UCP 600 제5조", "UCP 600 제14조"]),

  c("w3-lc-parties", 3, "신용장", "신용장의 당사자", "개설의뢰인, 개설은행, 수익자, 통지은행, 확인은행, 지정은행(지급·인수·매입), 상환은행",
    `<ul>
      <li><strong>개설의뢰인</strong>(Applicant): 수입자</li>
      <li><strong>개설은행</strong>(Issuing bank): 지급을 확약하는 주체</li>
      <li><strong>수익자</strong>(Beneficiary): 수출자</li>
      <li><strong>통지은행</strong>(Advising bank): 신용장의 외관상 진정성을 확인해 통지. 지급 의무 없음 (제9조)</li>
      <li><strong>확인은행</strong>(Confirming bank): 개설은행의 요청으로 독립적인 지급 확약을 추가 (제8조)</li>
      <li><strong>지정은행</strong>(Nominated bank): 지급·연지급·인수·매입 권한을 받은 은행. 확인은행이 아니면 이행 의무 없음</li>
      <li><strong>상환은행</strong>(Reimbursing bank): 개설은행 대신 대금 상환. 서류 일치 여부를 보지 않음 (URR 725)</li>
      <li>신용장 조건변경·취소에는 <strong>개설은행·확인은행·수익자</strong> 동의 필요 (제10조). 개설의뢰인은 기본 당사자가 아님</li>
    </ul>`,
    "기본 당사자 = 개설은행·수익자·(확인은행). 통지은행은 지급 의무 없음",
    ["UCP 600 제2조", "UCP 600 제8조", "UCP 600 제9조", "UCP 600 제10조", "UCP 600 제13조"]),

  c("w3-lc-types", 3, "신용장", "신용장의 종류", "확인, 일람출급/기한부, 지급·연지급·인수·매입, 양도가능, 회전, 보증(Standby, ISP98), Back-to-Back, 내국(Local), 선대(Red clause)",
    `<ul>
      <li><strong>확인신용장</strong>(Confirmed): 확인은행이 지급 확약 추가. 개설은행 신용·국가 위험 대비</li>
      <li><strong>일람출급(At sight)</strong> / <strong>기한부(Usance)</strong>: 대금 지급 시기 기준</li>
      <li>이용 방법(제6조): <strong>지급</strong>(Payment), <strong>연지급</strong>(Deferred payment: 환어음 없이 만기 지급), <strong>인수</strong>(Acceptance: 기한부 환어음 인수 후 만기 지급), <strong>매입</strong>(Negotiation)</li>
      <li><strong>양도가능</strong>(Transferable, 제38조): 1회 양도. 중계무역</li>
      <li><strong>회전</strong>(Revolving): 일정 기간마다 금액이 자동 갱신</li>
      <li><strong>보증</strong>(Standby, ISP98 또는 UCP 적용): 채무 불이행 시 지급하는 금융 보증 성격</li>
      <li><strong>구상무역 신용장</strong>: Back-to-Back(동시개설), Tomas, Escrow. 수출입 균형을 맞추는 연계무역용</li>
      <li><strong>내국신용장</strong>(Local L/C): 국내 원자재 공급자 앞으로 개설</li>
      <li><strong>선대신용장</strong>(Red clause, 전대신용장): 선적 전에 수출자에게 대금 일부를 미리 지급하도록 허용</li>
    </ul>`,
    "연지급 신용장은 환어음 없음. 양도는 1회만. Red clause = 선적 전 선지급",
    ["UCP 600 제6조", "UCP 600 제38조", "ISP98"]),

  c("w3-irrevocable", 3, "신용장", "취소불능", "UCP 600의 모든 신용장은 취소불능",
    `<ul>
      <li>UCP 600 제3조: 신용장은 취소불능 표시가 없어도 <strong>취소불능</strong> (UCP 500의 취소가능 신용장 개념 삭제)</li>
      <li>제10조: 개설은행·확인은행·수익자 동의 없이 조건변경·취소 불가</li>
      <li>수익자가 조건변경 수락 통지 없이 변경 조건에 맞는 서류를 제시하면 수락으로 간주</li>
      <li>조건변경의 <strong>부분 수락은 거절</strong>로 봄 (제10조 e)</li>
      <li>'○일 이내 거절하지 않으면 수락으로 본다'는 문구는 무시 (제10조 f)</li>
    </ul>`,
    "조건변경 부분 수락 = 거절. 묵시적 수락 간주 조항은 무시",
    ["UCP 600 제3조", "UCP 600 제10조"]),

  c("w3-usance", 3, "신용장", "Shipper's / Banker's Usance", "Shipper's Usance (수출자가 신용 공여) / Banker's Usance (은행이 신용 공여, 수출자는 일람불처럼 즉시 수령)",
    `<ul>
      <li><strong>Shipper's Usance</strong>: 수출자가 수입자에게 만기까지 신용 공여. 수출자는 만기에 대금 수령. 인수 후 할인받으면 <strong>할인료는 수출자 부담</strong></li>
      <li><strong>Banker's Usance</strong>: 인수은행(해외 은행 또는 개설은행)이 신용 공여. 수출자는 매입 시 <strong>즉시 대금 수령</strong>(일람불과 같은 효과). <strong>할인료·인수수수료는 수입자 부담</strong></li>
      <li>Banker's Usance는 'Usance L/C payable at sight' 등으로 표시</li>
      <li>국내 은행이 인수하면 Domestic Banker's Usance, 해외 은행이 인수하면 Overseas Banker's Usance</li>
    </ul>`,
    "이자 부담: Shipper's = 수출자, Banker's = 수입자. Banker's Usance에서 수출자는 일람불처럼 즉시 수령",
    []),

  c("w3-ucp2", 3, "UCP 600 조항", "제2조 정의", "일치하는 제시 (Complying presentation)",
    `<ul>
      <li><strong>일치하는 제시</strong>: 신용장 조건 + UCP 600의 적용 규정 + <strong>국제표준은행관행(ISBP)</strong>에 따른 제시</li>
      <li><strong>결제(Honour)</strong>: 일람지급 / 연지급 확약 후 만기 지급 / 환어음 인수 후 만기 지급</li>
      <li><strong>매입(Negotiation)</strong>: 지정은행이 일치하는 제시에 대해 환어음·서류를 매수(대금 선지급 또는 선지급 약정)하는 것</li>
      <li>은행영업일(Banking day), 제시(Presentation), 제시인(Presenter) 등 정의</li>
    </ul>`,
    "일치하는 제시의 3요소 = 신용장 조건 · UCP 600 · ISBP. 매입 = 구매 개념, 서류 심사만 하는 것은 매입 아님",
    ["UCP 600 제2조", "ISBP 821"]),

  c("w3-ucp3", 3, "UCP 600 조항", "제3조 해석", "on or about = 전후 5일, to·until·from은 해당 일 포함",
    `<ul>
      <li><strong>on or about</strong>: 지정일 전 5일부터 후 5일까지 (양 끝일 포함)</li>
      <li>선적기간: <strong>to, until, till, from, between</strong>은 해당 일 <strong>포함</strong>, <strong>before, after</strong>는 <strong>제외</strong></li>
      <li>만기 결정: <strong>from, after</strong>는 해당 일 <strong>제외</strong></li>
      <li>first half 1–15일, second half 16일–말일, beginning 1–10일, middle 11–20일, end 21일–말일</li>
      <li>prompt, immediately, as soon as possible → 무시</li>
      <li>first class, well known, qualified, independent 등 발행인 표현은 수익자 외 누구든 발행 가능</li>
    </ul>`,
    "선적기간의 from은 포함, 만기 계산의 from은 제외. on or about = 전후 5일",
    ["UCP 600 제3조"]),

  c("w3-ucp14", 3, "UCP 600 조항", "제14조 서류심사 기준", "5은행영업일, 선적 후 21일 이내 제시",
    `<ul>
      <li>지정은행·확인은행·개설은행은 제시일 <strong>다음 날부터 최장 5은행영업일</strong> 내에 일치 여부 결정 (b항). 유효기일이 그 안에 끝나도 단축되지 않음</li>
      <li>운송서류 원본을 포함한 제시는 <strong>선적일 후 21일</strong> 이내, 어떤 경우에도 <strong>유효기일 이내</strong> (c항)</li>
      <li>서류 간 데이터는 동일할 필요는 없고 <strong>상충만 하지 않으면</strong> 됨 (d항)</li>
      <li>상업송장 외 서류의 물품 명세는 일반적 용어 가능 (e항)</li>
      <li>요구되지 않은 서류는 무시·반환 (g항), 비서류적 조건은 무시 (h항)</li>
      <li>서류 일자는 신용장 개설일보다 앞설 수 있으나 제시일보다 늦으면 안 됨 (i항)</li>
      <li>송하인이 수익자가 아니어도 됨 (k항)</li>
    </ul>`,
    "5은행영업일 · 선적 후 21일 · 유효기일 내 — 세 기간을 동시에 충족해야",
    ["UCP 600 제14조"]),

  c("w3-ucp16", 3, "UCP 600 조항", "제16조 하자서류 거절 통지", "하자서류의 거절과 통지",
    `<ul>
      <li>하자가 있으면 지정은행·확인은행·개설은행은 결제·매입을 거절할 수 있음</li>
      <li>개설은행은 개설의뢰인과 하자 포기(Waiver) 교섭 가능. 단 5영업일 기간은 연장되지 않음</li>
      <li>거절 통지는 제시인에게 <strong>단 1회</strong>(Single notice), <strong>모든 하자</strong>를 기재하고 서류 처리 상태를 명시
        <ul>
          <li>추가 지시가 있을 때까지 보관</li>
          <li>개설의뢰인의 하자 포기가 있을 때까지 보관</li>
          <li>서류 반환</li>
          <li>사전에 받은 지시에 따라 처리</li>
        </ul>
      </li>
      <li>통지 기한: 제시일 다음 날부터 <strong>5은행영업일</strong> 이내, 전신 등 신속한 수단</li>
      <li>이를 지키지 않으면 서류가 일치하지 않는다고 주장할 수 없음 (배제 효과)</li>
    </ul>`,
    "거절 통지는 1회에 모든 하자. 5영업일을 넘기면 하자 주장 불가",
    ["UCP 600 제16조"]),

  c("w3-ucp18", 3, "UCP 600 조항", "제18조 상업송장", "상업송장의 요건",
    `<ul>
      <li>수익자가 발행 (양도 신용장은 예외)</li>
      <li>개설의뢰인 앞으로 작성 (양도 신용장은 예외)</li>
      <li>신용장과 동일한 통화로 작성</li>
      <li><strong>서명 불요</strong></li>
      <li>물품 명세는 신용장의 명세와 <strong>일치(correspond)</strong>해야 함 (다른 서류는 일반 용어 가능)</li>
      <li>신용장 금액을 초과한 송장도 은행 재량으로 수리 가능 (초과분을 결제하지 않는 경우)</li>
    </ul>`,
    "상업송장은 서명 불요, 물품 명세는 신용장과 일치. 다른 서류는 일반 용어 가능",
    ["UCP 600 제18조"]),

  c("w3-ucp20", 3, "UCP 600 조항", "제20조 선하증권", "선하증권의 요건",
    `<ul>
      <li>운송인 명칭을 표시하고 운송인·선장 또는 그 대리인이 서명</li>
      <li>본선적재 표시: 사전 인쇄 문구('Shipped on board') 또는 일자가 기재된 <strong>본선적재표기(On board notation)</strong> → 그 일자가 선적일</li>
      <li>신용장에 지정된 선적항·양륙항 표시</li>
      <li>원본 전통(Full set) 또는 원본 1통</li>
      <li>운송 조건 포함 또는 참조 (약식 B/L 가능)</li>
      <li>용선계약 조건을 따른다는 표시가 없을 것 (있으면 제22조 용선계약 B/L)</li>
      <li>환적이 금지되어도 전 운송이 하나의 B/L로 커버되면 환적 표시 B/L 수리 (c항)</li>
      <li>'Intended vessel' 표시 시 실제 적재 선박명과 일자를 본선적재표기로 기재해야 함</li>
    </ul>`,
    "본선적재표기 일자 = 선적일. 용선계약 B/L은 제22조",
    ["UCP 600 제20조", "UCP 600 제22조"]),

  c("w3-ucp28", 3, "UCP 600 조항", "제28조 보험서류", "최소 110%, 선적일보다 늦은 일자 불가",
    `<ul>
      <li>보험회사·보험인수업자 또는 그 대리인이 발행·서명</li>
      <li><strong>보험인수증(Cover note) 수리 불가</strong></li>
      <li>보험증권은 포괄예정보험 증명서·통지서 대신 수리 가능 (반대는 불가)</li>
      <li>일자는 <strong>선적일보다 늦으면 안 됨</strong> (그 이전부터 효력 발생이 표시되면 가능)</li>
      <li>신용장과 같은 통화</li>
      <li>최소 부보금액: 요구가 없으면 <strong>CIF·CIP 가액의 110%</strong>. 가액을 알 수 없으면 결제·매입 요청 금액과 송장 총액 중 큰 쪽의 110%</li>
      <li>담보 구간: 수탁·선적지부터 양륙·최종 목적지까지</li>
      <li>'All risks' 표기 보험서류 수리. 면책비율(Franchise, Excess) 기재 가능</li>
    </ul>`,
    "최소 110% · 선적일 이후 일자 불가 · Cover note 불가",
    ["UCP 600 제28조"]),

  c("w3-ucp29", 3, "UCP 600 조항", "제29조 유효기일 연장", "은행 휴무 시 유효기일 연장",
    `<ul>
      <li>유효기일 또는 최종 제시일이 은행 휴업일이면 다음 첫 은행영업일까지 연장</li>
      <li>단, 제36조의 불가항력 휴업은 연장되지 않음</li>
      <li>연장된 기간에 제시를 받은 지정은행은 그 사실을 개설은행에 표시(Covering schedule)</li>
      <li><strong>최종 선적일은 연장되지 않음</strong></li>
    </ul>`,
    "유효기일·제시기간은 연장, 최종 선적일은 연장 안 됨. 불가항력 휴업은 연장 없음",
    ["UCP 600 제29조", "UCP 600 제36조"]),

  c("w3-ucp30", 3, "UCP 600 조항", "제30조 과부족", "about ±10%, 수량 ±5%",
    `<ul>
      <li>(a) <strong>about, approximately</strong>가 금액·수량·단가에 붙으면 해당 항목 <strong>±10%</strong></li>
      <li>(b) 수량을 포장 단위·개수로 표시하지 않았고 금액을 초과하지 않으면 수량 <strong>±5%</strong> 허용 (산물)</li>
      <li>(c) 분할선적이 금지돼도, 수량을 전부 선적하고 단가를 낮추지 않았다면 신용장 금액보다 <strong>5% 이내 부족</strong>한 청구 허용 (별도 과부족 규정이나 about 표시가 있으면 적용 안 함)</li>
    </ul>`,
    "about = ±10%. 산물 수량 ±5%는 금액 초과 불가, 개수 단위 물품엔 적용 안 됨",
    ["UCP 600 제30조"]),

  c("w3-ucp31", 3, "UCP 600 조항", "제31조 분할선적 · 제32조 할부선적", "분할선적 허용 여부와 할부선적 불이행 효과",
    `<ul>
      <li>제31조: 분할청구·분할선적은 <strong>금지 문언이 없으면 허용</strong></li>
      <li>동일 운송수단·동일 항해에 선적된 여러 운송서류는 목적지가 같으면 선적일·선적항이 달라도 분할선적이 아님</li>
      <li>특송·우편 영수증도 동일 장소·일자·목적지면 분할선적 아님</li>
      <li>제32조: 일정 기간별 할부 선적·청구가 정해진 경우, 어느 회차를 기간 내에 이행하지 않으면 <strong>그 회차와 이후 모든 회차</strong>의 신용장 효력 상실</li>
    </ul>`,
    "분할선적은 금지 문언 없으면 허용. 할부선적 1회 불이행 시 해당·이후 회차 모두 무효",
    ["UCP 600 제31조", "UCP 600 제32조"]),

  c("w3-ucp36", 3, "UCP 600 조항", "제36조 불가항력", "불가항력 시 은행의 면책",
    `<ul>
      <li>천재지변, 폭동, 소요, 반란, 전쟁, 테러, 파업·직장폐쇄 등 은행이 통제할 수 없는 사유로 영업이 중단된 결과에 대해 은행은 책임지지 않음</li>
      <li>영업 재개 후에도 중단 기간에 유효기일이 지난 신용장은 결제·매입하지 않음 (<strong>연장 없음</strong>)</li>
    </ul>`,
    "불가항력 휴업 중 유효기일 만료 시 연장 없음 (제29조 일반 휴업일 연장과 대비)",
    ["UCP 600 제36조", "UCP 600 제29조"]),

  c("w3-ucp38", 3, "UCP 600 조항", "제38조 양도", "양도는 1회 한정",
    `<ul>
      <li>'<strong>transferable</strong>' 표시가 있어야 양도 가능. divisible, fractionable, assignable, transmissible은 인정 안 됨</li>
      <li>양도은행: 지정은행 또는 개설은행</li>
      <li><strong>1회만 양도</strong> 가능. 제2수익자가 제3자에게 재양도 불가 (제1수익자에게 되돌리는 것은 가능)</li>
      <li>분할선적이 허용되면 여러 제2수익자에게 분할 양도 가능</li>
      <li>변경 가능 항목: 금액·단가 <strong>감액</strong>, 유효기일·제시기간·선적기간 <strong>단축</strong>, 부보비율 <strong>증가</strong>, 개설의뢰인 이름을 제1수익자로 대체</li>
      <li>제1수익자는 자기 송장·환어음으로 대체할 권리 (차액 취득)</li>
      <li>양도 비용은 원칙적으로 제1수익자 부담</li>
    </ul>`,
    "양도 1회 한정, 'transferable'만 인정. 금액·기간은 줄이고 부보비율은 늘림",
    ["UCP 600 제38조"]),

  c("w3-discrepancy", 3, "신용장", "하자서류 처리", "L/G 네고, 유보부 매입, 추심 전환",
    `<ul>
      <li>서류 정정 후 재제시 (유효기일·제시기간 내)</li>
      <li>신용장 조건변경(Amendment) 요청</li>
      <li><strong>전신조회(Cable nego)</strong>: 매입 전 개설은행에 하자 수용 여부를 전신으로 확인</li>
      <li><strong>유보부 매입(Under reserve)</strong>: 하자를 알고 매입하되, 개설은행이 지급을 거절하면 수익자가 상환하는 조건</li>
      <li><strong>L/G 네고</strong>: 수익자가 매입은행에 보상장(Letter of Indemnity)을 제출하고 매입. 거절 시 수익자 책임</li>
      <li><strong>추심 전환(Collection basis)</strong>: 매입하지 않고 추심으로 보내 대금이 들어오면 지급</li>
    </ul>`,
    "유보부 매입·L/G 네고는 하자를 해소하는 것이 아니라 매입은행이 상환청구권을 확보하는 방식",
    ["UCP 600 제16조"]),

  /* ================= W4 · 외환실무 · 무역금융 ================= */

  c("w4-quote", 4, "외환", "환율 고시방법", "직접표시 / 간접표시",
    `<ul>
      <li><strong>직접표시(자국통화표시)</strong>: 외국통화 1단위 = 자국통화 얼마 (USD 1 = KRW 1,380). 한국 등 대부분 국가</li>
      <li><strong>간접표시(외국통화표시)</strong>: 자국통화 1단위 = 외국통화 얼마 (영국: GBP 1 = USD 1.27)</li>
      <li>국제 시장: 유럽식(USD 1 = 타통화 얼마)과 미국식(타통화 1단위 = USD 얼마, 주로 EUR·GBP·AUD·NZD)</li>
      <li>직접표시에서 환율 상승 = 자국통화 가치 하락(원화 약세) → 수출 유리, 수입 불리</li>
    </ul>`,
    "원화 환율은 직접표시. 환율 상승 = 원화 가치 하락 = 수출 가격경쟁력 상승",
    []),

  c("w4-rate", 4, "외환", "매매기준율 · TTS · TTB", "매매기준율, 전신환매도율(TTS) / 전신환매입률(TTB), 현찰 매매율",
    `<ul>
      <li><strong>매매기준율</strong>: 미 달러는 전 영업일 외국환중개회사를 통해 거래된 환율의 가중평균(시장평균환율). 그 밖의 통화는 재정환율</li>
      <li>대고객 환율은 <strong>은행 입장</strong>에서 표시</li>
      <li><strong>TTS</strong>(Telegraphic Transfer Selling): 은행이 고객에게 외화를 <strong>팔 때</strong> → 수입 대금 결제, 해외 송금</li>
      <li><strong>TTB</strong>(Telegraphic Transfer Buying): 은행이 고객에게서 외화를 <strong>살 때</strong> → 수출 대금 입금, 해외 송금 수취</li>
      <li>현찰 매도율·매입률: 보관·운송비 때문에 스프레드가 가장 큼</li>
      <li>크기 순서: 현찰매도율 > TTS > 매매기준율 > TTB > 현찰매입률</li>
    </ul>`,
    "Selling·Buying은 은행 기준. 수입 결제 = TTS, 수출 대금 = TTB. 스프레드는 현찰 > 전신환",
    []),

  c("w4-sight-rate", 4, "외환", "일람출급환어음 매입률 · 환가료", "일람출급환어음 매입률과 환가료",
    `<ul>
      <li>매입은행은 수출환어음을 매입해 수출자에게 먼저 지급하고, 개설은행으로부터 대금을 받기까지 기간 동안 자금을 부담</li>
      <li><strong>환가료</strong>(Exchange commission): 이 기간(표준 우편일수 등)에 대한 이자 성격의 수수료</li>
      <li><strong>일람출급환어음 매입률</strong>(A/S buying rate) = TTB − 환가료</li>
      <li>기한부 어음 매입률(Usance bill buying rate) = TTB − 환가료(우편일수 + 어음 기간)</li>
    </ul>`,
    "일람출급환어음 매입률 = TTB − 환가료. 환가료 = 매입 후 상환까지의 이자",
    []),

  c("w4-hedge", 4, "외환", "환리스크 관리", "선물환, 통화선물, 통화옵션, 통화스왑, 리딩·래깅, 매칭, 네팅",
    `<p><strong>외부적 기법</strong> (금융기관·시장 이용)</p>
    <ul>
      <li><strong>선물환(Forward)</strong>: 은행과 장래 특정일의 환율을 미리 약정 (장외 거래, 맞춤형)</li>
      <li><strong>통화선물(Futures)</strong>: 거래소 표준화 상품. 증거금, 일일정산</li>
      <li><strong>통화옵션(Option)</strong>: 특정 환율로 사고팔 <strong>권리</strong>. 매수자는 프리미엄 지급. Call = 살 권리, Put = 팔 권리</li>
      <li><strong>통화스왑(Swap)</strong>: 서로 다른 통화의 원금·이자를 교환 (장기)</li>
      <li>환변동보험(무역보험공사), 팩토링·포페이팅</li>
    </ul>
    <p><strong>내부적 기법</strong> (기업 내부 관리)</p>
    <ul>
      <li><strong>리딩·래깅(Leading & Lagging)</strong>: 환율 전망에 따라 결제 시기를 앞당기거나 늦춤</li>
      <li><strong>매칭(Matching)</strong>: 외화 유입과 유출의 통화·시기를 일치시킴</li>
      <li><strong>네팅(Netting)</strong>: 본·지사 간 채권·채무를 상계하고 차액만 결제</li>
      <li>결제 통화 선택, 가격 정책, 자산부채 관리</li>
    </ul>`,
    "수출자(외화 받을 예정)는 선물환 매도 · 풋옵션 매수. 네팅 = 상계, 매칭 = 유출입 일치, 리딩·래깅 = 시기 조정",
    []),

  c("w4-fx-act", 4, "외환", "외국환거래법", "목적, 거주자·비거주자 구분, 지급·수령 절차, 신고가 필요한 지급방법 (상계, 제3자 지급 등)",
    `<ul>
      <li>목적: 외국환거래와 대외거래의 자유 보장, 시장 기능 활성화, 거래의 정상화, 국제수지 균형과 통화가치 안정</li>
      <li><strong>거주자</strong>: 대한민국에 주소·거소를 둔 개인, 대한민국에 주된 사무소를 둔 법인</li>
      <li><strong>비거주자</strong>: 거주자 외의 개인·법인</li>
      <li>외국 법인의 <strong>국내 지점·사무소</strong>는 거주자로 봄. 국내 법인의 해외 지점은 비거주자로 봄</li>
      <li>지급·수령은 외국환은행을 통해 하고, 지급 사유와 금액을 증빙</li>
      <li>신고가 필요할 수 있는 지급방법 (외국환거래규정)
        <ul>
          <li><strong>상계</strong>: 채권·채무를 서로 상계</li>
          <li><strong>기간 초과 지급</strong>: 정해진 기간을 넘는 선지급·후지급</li>
          <li><strong>제3자 지급</strong>: 거래 당사자가 아닌 자에게 지급하거나 받음</li>
          <li><strong>외국환은행을 통하지 않은 지급</strong></li>
        </ul>
      </li>
    </ul>
    <p class="caption">금액 기준과 신고 면제 범위는 자주 개정되므로 외국환거래규정 최신판을 확인합니다.</p>`,
    "외국 법인의 국내 지점 = 거주자. 신고 대상 지급방법 4가지: 상계 · 기간 초과 · 제3자 지급 · 외국환은행 미경유",
    ["외국환거래법 제3조", "외국환거래규정 제5장"]),

  c("w4-policy", 4, "무역금융", "정책 무역금융", "생산자금, 원자재자금, 포괄금융",
    `<ul>
      <li>수출업체에 <strong>선적 전</strong> 필요 자금을 저리로 지원 (한국은행 금융중개지원대출 연계)</li>
      <li>용도별 자금
        <ul>
          <li><strong>생산자금</strong>: 수출품 제조·가공 비용</li>
          <li><strong>원자재자금</strong>: 수출용 원자재 수입 또는 내국신용장에 의한 국내 구매</li>
          <li><strong>완제품구매자금</strong>: 수출용 완제품 국내 구매</li>
        </ul>
      </li>
      <li><strong>포괄금융</strong>: 수출 실적이 일정 규모 이하인 업체에 용도 구분 없이 일괄 지원</li>
      <li>융자 한도: 실적기준(과거 수출 실적)과 신용장기준(수출 신용장·계약서)</li>
    </ul>`,
    "무역금융 = 선적 전 금융. 포괄금융은 용도 구분 없이. 수출환어음 매입(선적 후 금융)과 구분",
    []),

  c("w4-nego", 4, "무역금융", "수출환어음 매입(네고)", "수출자가 선적서류를 은행에 제시하고 대금을 미리 받는 것",
    `<ul>
      <li>수출자가 선적 후 환어음과 신용장 요구 서류를 매입은행에 제시</li>
      <li>매입은행이 서류를 심사하고 <strong>환가료 등을 공제</strong>한 대금을 먼저 지급</li>
      <li>매입은행은 서류를 개설은행에 보내 상환받음</li>
      <li>개설은행이 지급을 거절하면 매입은행은 수출자에게 <strong>상환청구(소구)</strong> 가능</li>
      <li>확인은행의 매입은 상환청구 불가 (UCP 제8조)</li>
      <li>추심 거래(D/P·D/A)도 은행 여신으로 추심 전 매입 가능</li>
    </ul>`,
    "매입은행은 소구권 있음(확인은행 제외). 네고 = 선적 후 금융",
    ["UCP 600 제7조", "UCP 600 제8조"]),

  c("w4-forfaiting", 4, "무역금융", "포페이팅과 국제팩토링", "포페이팅 (상환청구권 없음, 중장기 연불수출) / 국제팩토링 (수출팩터·수입팩터)",
    `<p><strong>포페이팅(Forfaiting)</strong></p>
    <ul>
      <li>포페이터가 수출자의 중장기 연불 채권(개설은행이 인수하거나 보증(aval)한 환어음·약속어음)을 <strong>상환청구권 없이</strong>(Without recourse) 고정금리로 할인 매입</li>
      <li>수출자는 신용·국가·환율·금리 위험을 모두 넘김</li>
      <li>주로 기한부 신용장, 자본재·플랜트 수출</li>
    </ul>
    <p><strong>국제팩토링(International factoring)</strong></p>
    <ul>
      <li>무신용장 외상 거래(O/A, D/A) 채권을 <strong>수출팩터</strong>(국내)가 매입하고, <strong>수입팩터</strong>(해외)가 수입자 신용조사·대금 회수·지급 보증</li>
      <li>단기(통상 180일 이내) 거래, 전도금융 제공</li>
      <li>FCI(Factors Chain International) 규칙</li>
    </ul>`,
    "포페이팅 = 중장기 · 비소구 · 어음 할인. 팩토링 = 단기 · 무신용장 외상 채권 매입·회수",
    []),

  c("w4-ksure", 4, "무역금융", "무역보험", "단기수출보험, 중장기수출보험, 환변동보험",
    `<ul>
      <li>운영: <strong>한국무역보험공사(K-SURE)</strong>, 근거법 무역보험법</li>
      <li><strong>단기수출보험</strong>: 결제기간 <strong>2년 이하</strong> 수출에서 수입자 신용위험(파산·지급 지체·인수 거절)과 비상위험(전쟁·송금 제한 등)으로 대금을 못 받은 손실 보상</li>
      <li><strong>중장기수출보험</strong>: 결제기간 <strong>2년 초과</strong>. 플랜트·선박 등 자본재. 공급자신용·구매자신용</li>
      <li><strong>환변동보험</strong>: 약정 환율 대비 환율이 떨어져 손실이 나면 보상하고, 올라 이익이 나면 <strong>환수</strong></li>
      <li>기타: 수출신용보증(선적 전·후), 해외투자보험, 수입보험</li>
    </ul>`,
    "단기 = 2년 이하, 중장기 = 2년 초과. 환변동보험은 손실 보상 + 이익 환수",
    ["무역보험법"]),

  c("w4-local", 4, "무역금융", "내국신용장과 구매확인서", "내국신용장과 구매확인서 비교",
    `<ul>
      <li><strong>내국신용장(Local L/C)</strong>: 수출업자가 국내 원자재·완제품 공급자 앞으로 외국환은행을 통해 개설. <strong>개설은행의 지급 보증 있음</strong>. 무역금융 융자 한도 범위 내 개설</li>
      <li><strong>구매확인서</strong>: 외화획득용 원료·물품의 구매 사실을 외국환은행 또는 전자무역기반사업자가 확인해 발급. <strong>지급 보증 없음</strong>. 무역금융 한도와 무관하게 발급, 차수 제한 없음</li>
      <li>공통 효과: 공급자의 <strong>수출실적 인정</strong>, 부가가치세 <strong>영세율</strong>, <strong>관세환급</strong></li>
      <li>근거: 내국신용장은 한국은행 무역금융 규정, 구매확인서는 대외무역법</li>
    </ul>`,
    "공통 = 수출실적 · 영세율 · 관세환급. 차이 = 은행 지급 보증은 내국신용장만",
    ["대외무역법 제18조"]),

  /* ================= W5 · 무역규범 ================= */

  c("w5-trade-def", 5, "대외무역법", "무역의 정의", "물품, 대통령령이 정하는 용역, 전자적 형태의 무체물",
    `<ul>
      <li>대외무역법상 무역 = 다음의 수출과 수입
        <ul>
          <li><strong>물품</strong>: 외국환거래법상 지급수단·증권·채권을 화체한 서류를 제외한 동산</li>
          <li><strong>대통령령으로 정하는 용역</strong>: 경영 상담, 법무, 회계, 엔지니어링, 디자인, 컴퓨터 시스템 설계·자문, 문화산업 관련 용역, 운수·관광 등</li>
          <li><strong>전자적 형태의 무체물</strong>: 소프트웨어, 디지털 콘텐츠(영상·음향·전자서적·데이터베이스) 등 정보통신망으로 전송되는 것</li>
        </ul>
      </li>
    </ul>`,
    "무역 대상 3가지 = 물품 · 용역 · 전자적 형태의 무체물. 지급수단·증권은 물품이 아님",
    ["대외무역법 제2조"]),

  c("w5-notice", 5, "대외무역법", "수출입공고 · 통합공고 · 전략물자고시", "수출입 품목 관리 체계",
    `<ul>
      <li><strong>수출입공고</strong>: 산업통상자원부장관이 수출입 제한·금지 품목을 공고. <strong>네거티브 리스트</strong> 방식(제한 품목만 게재, 나머지는 자유)</li>
      <li><strong>통합공고</strong>: 약사법·식품위생법·화학물질관리법 등 <strong>개별 법률의 수출입 요건</strong>을 산업부장관이 모아서 공고 (요건 확인 기관 지정)</li>
      <li><strong>전략물자수출입고시</strong>: 바세나르, NSG, AG, MTCR 등 국제수출통제체제에 따른 전략물자와 수출허가 기준</li>
      <li>세 가지를 모두 확인해야 수출입 가능 여부를 판단할 수 있음</li>
    </ul>`,
    "수출입공고 = 네거티브 리스트. 통합공고 = 개별법 요건의 통합",
    ["대외무역법 제11조", "대외무역법 제12조", "대외무역법 제19조"]),

  c("w5-approval", 5, "대외무역법", "수출입 승인 · 전략물자 수출허가", "수출입 승인과 전략물자 수출허가",
    `<ul>
      <li><strong>수출입 승인</strong>: 수출입공고상 제한 품목은 산업부장관(위임받은 승인기관) 승인 필요</li>
      <li>승인 유효기간: 원칙 <strong>1년</strong> (품목 특성에 따라 단축·연장 가능)</li>
      <li>승인 면제: 무상 견본, 외교관 물품 등 대통령령으로 정한 경우</li>
      <li><strong>전략물자 수출허가</strong>: 산업부장관 또는 관계 행정기관장의 허가</li>
      <li><strong>상황허가(Catch-all)</strong>: 전략물자가 아니더라도 대량파괴무기 등으로 전용될 우려가 있으면 허가 대상</li>
      <li>전략물자 해당 여부는 전략물자관리원에 판정 신청 가능</li>
    </ul>`,
    "Catch-all = 비전략물자라도 WMD 용도 우려 시 허가 대상. 수출입 승인 유효기간 원칙 1년",
    ["대외무역법 제11조", "대외무역법 제19조"]),

  c("w5-foreign-currency", 5, "대외무역법", "외화획득용 원료 · 물품 수입", "외화획득용 원료·물품 수입",
    `<ul>
      <li>외화획득(수출, 주한 국제연합군 등 납품, 관광, 용역·전자적 무체물 수출 등)을 위해 수입하는 원료·기재·물품</li>
      <li>수입 시 수출입공고 등의 제한을 일부 완화받음</li>
      <li>정해진 기간 안에 외화획득을 이행해야 하며, 목적 외 사용·양도 시 승인 필요</li>
      <li>국내에서 조달할 때는 구매확인서·내국신용장 활용</li>
    </ul>`,
    "외화획득용 원료는 외화획득 이행 의무가 따르고, 목적 외 사용 시 승인 필요",
    ["대외무역법(외화획득용 원료·기재)"]),

  c("w5-special-trade", 5, "대외무역법", "특정거래형태", "위탁판매, 수탁판매, 중계무역, 중개무역, 외국인도수출, 외국인수수입, 임대차, 무환수출입",
    `<ul>
      <li><strong>위탁판매수출</strong>: 물품을 무환으로 수출해 판매된 범위에서 대금 결제</li>
      <li><strong>수탁판매수입</strong>: 물품을 무환으로 수입해 판매된 범위에서 대금 결제</li>
      <li><strong>위탁가공무역</strong>: 가공임을 지급하고 외국에서 가공한 뒤 수입하거나 현지 판매</li>
      <li><strong>수탁가공무역</strong>: 가득액을 받는 조건으로 외국 원자재를 가공해 수출</li>
      <li><strong>임대수출·임차수입</strong>: 임대(임차) 후 재수입(재수출)하거나 기간 만료 후 소유권 이전</li>
      <li><strong>연계무역</strong>: 물물교환, 구상무역, 대응구매, 제품환매</li>
      <li><strong>중계무역</strong>: 수출할 목적으로 물품을 <strong>수입</strong>해 국내에 통관하지 않고(보세구역 등) 수출. 매매 차익</li>
      <li><strong>외국인수수입</strong>: 수입 대금은 국내에서 지급, 물품은 외국에서 인수</li>
      <li><strong>외국인도수출</strong>: 수출 대금은 국내에서 받고, 물품은 외국에서 인도</li>
      <li><strong>무환수출입</strong>: 외국환 거래 없이 물품 이동</li>
      <li>참고: <strong>중개무역</strong>은 제3국 간 거래를 알선하고 수수료를 받는 것으로, 대외무역관리규정의 특정거래형태 목록에는 없음</li>
    </ul>`,
    "중계무역 = 직접 사고팔아 매매 차익, 중개무역 = 알선 수수료. 둘의 차이가 단골",
    ["대외무역관리규정 제2조"]),

  c("w5-origin-rule", 5, "대외무역법", "원산지 판정기준", "완전생산기준, 실질적 변형기준 (세번변경, 부가가치, 주요공정)",
    `<ul>
      <li><strong>완전생산기준</strong>: 한 국가에서 완전히 생산·채취한 물품 (광물, 농·수산물, 그 나라에서 태어나고 자란 동물, 그 나라 선박이 잡은 수산물 등)</li>
      <li><strong>실질적 변형기준</strong>: 2개국 이상이 생산에 관여하면 마지막으로 실질적 변형을 일으킨 국가
        <ul>
          <li>세번변경기준: HS <strong>6단위</strong>가 변경되는 제조·가공</li>
          <li>부가가치기준: 일정 비율 이상 부가가치 창출</li>
          <li>주요공정기준: 특정 주요 공정 수행</li>
        </ul>
      </li>
      <li><strong>단순한 가공</strong>(운송·보관을 위한 작업, 포장 교체, 단순 절단·혼합·조립, 라벨 부착 등)은 원산지를 부여하지 않음</li>
    </ul>`,
    "단순 가공은 원산지 변경 없음. 대외무역법 세번변경은 HS 6단위",
    ["대외무역법 제34조", "대외무역법 시행령(원산지 판정)"]),

  c("w5-origin-mark", 5, "대외무역법", "원산지 표시", "원산지 표시 의무와 방법",
    `<ul>
      <li>원산지 표시 대상 물품을 수입하면 원산지를 표시해야 함</li>
      <li>표시 방법: 한글·한자·영문으로 'Made in ○○', '원산지: ○○' 등. <strong>최종 구매자</strong>가 쉽게 판독할 수 있게</li>
      <li>원칙: 제조 단계에서 인쇄·각인·주조 등 <strong>쉽게 제거되지 않는 방법</strong>으로 현품에 표시 (곤란하면 라벨·스티커·포장 표시)</li>
      <li>수입 후 국내에서 단순 가공한 물품은 원래 원산지를 표시</li>
      <li>금지: 원산지 허위 표시, 오인 표시, 표시의 손상·변경 → 과징금·형사처벌</li>
    </ul>`,
    "원산지 표시는 최종 구매자 기준, 원칙적으로 현품에 견고하게. 허위·오인 표시 금지",
    ["대외무역법 제33조"]),

  c("w5-tax-elements", 5, "관세법 · 통관", "과세요건 4가지", "과세물건, 납세의무자, 과세표준, 세율",
    `<ul>
      <li><strong>과세물건</strong>: 수입물품 (관세법 제14조)</li>
      <li><strong>납세의무자</strong>: 원칙적으로 <strong>수입신고를 하는 때의 화주</strong> (제19조). 보세구역 반출·멸실 등의 경우 특별납세의무자(운영인 등), 연대납세의무자, 납세보증자</li>
      <li><strong>과세표준</strong>: 수입물품의 가격(종가세) 또는 수량(종량세) (제15조)</li>
      <li><strong>세율</strong>: 관세율표의 기본세율과 탄력관세·협정세율 등</li>
    </ul>`,
    "과세요건 = 물건 · 납세의무자 · 과세표준 · 세율. 원칙적 납세의무자는 수입신고하는 때의 화주",
    ["관세법 제14조", "관세법 제15조", "관세법 제19조"]),

  c("w5-tax-timing", 5, "관세법 · 통관", "과세물건 확정시기", "과세물건 확정시기와 적용법령 (수입신고 시점)",
    `<ul>
      <li>관세는 <strong>수입신고를 하는 때</strong>의 물품 성질과 수량에 따라 부과 (제16조)</li>
      <li>예외: 선박·항공기용품을 허가대로 적재하지 않은 때는 하역 허가를 받은 때, 보세구역 밖 보수작업 기간 경과는 승인받은 때, 보세구역 장치물품의 멸실·폐기는 그때, 우편 수입은 통관우체국 도착 때, 도난·분실은 그때, 수입신고 전 즉시반출은 즉시반출신고를 한 때 등</li>
      <li>적용 법령: 원칙적으로 <strong>수입신고 당시</strong> 법령 (제17조). 보세건설장 반입 물품은 사용 전 수입신고가 수리된 날</li>
      <li>과세환율: 수입신고일이 속하는 주의 전주 외국환매도율 평균 (관세청장 고시)</li>
    </ul>`,
    "과세물건 확정과 적용 법령은 원칙적으로 수입신고 시. 예외 사유가 보기로 출제",
    ["관세법 제16조", "관세법 제17조", "관세법 제18조"]),

  c("w5-valuation", 5, "관세법 · 통관", "관세평가 6가지 방법", "거래가격(가산·공제요소), 동종·동질물품, 유사물품, 국내판매가격, 산정가격, 합리적 기준",
    `<ul>
      <li><strong>제1방법 거래가격</strong> (제30조): 구매자가 실제로 지급했거나 지급할 가격 + 가산요소 − 공제요소
        <ul>
          <li>가산: 구매자가 부담하는 수수료·중개료(<strong>구매수수료 제외</strong>), 용기·포장비, 생산지원비용(무상·인하 제공 물품·용역), 권리사용료, 사후귀속이익, <strong>수입항 도착까지의 운임·보험료</strong> (한국은 CIF 기준)</li>
          <li>공제: 수입 후 조립·설치·정비·기술지원비, 수입항 도착 후 운임·보험료, 국내 조세, 연불이자</li>
          <li>적용 배제: 처분·사용 제한, 특수관계가 가격에 영향 등</li>
        </ul>
      </li>
      <li><strong>제2방법</strong> 동종·동질물품 거래가격 (제31조)</li>
      <li><strong>제3방법</strong> 유사물품 거래가격 (제32조)</li>
      <li><strong>제4방법</strong> 국내판매가격 기초 (제33조, 이윤·비용·관세 공제)</li>
      <li><strong>제5방법</strong> 산정가격 (제34조, 생산비 + 이윤·일반경비 + 운임)</li>
      <li><strong>제6방법</strong> 합리적 기준 (제35조)</li>
      <li>순서대로 적용하되, 납세의무자가 요청하면 <strong>제4·5방법 순서를 바꿀 수 있음</strong></li>
    </ul>`,
    "한국은 CIF 기준 과세가격. 구매수수료는 가산 안 함. 4·5방법은 요청 시 순서 변경",
    ["관세법 제30–35조"]),

  c("w5-tariff-order", 5, "관세법 · 통관", "세율 적용 우선순위", "덤핑방지·상계·보복·긴급관세 등 → 국제협력·편익관세 → 조정·할당·계절관세 → 일반특혜관세 → 잠정세율 → 기본세율 (FTA 협정세율 우선)",
    `<ol class="ordered">
      <li><strong>덤핑방지관세, 상계관세, 보복관세, 긴급관세, 특정국물품 긴급관세, 농림축산물 특별긴급관세, 일부 조정관세</strong> → 세율이 높든 낮든 최우선</li>
      <li><strong>국제협력관세, 편익관세</strong> → 3~6순위 세율보다 <strong>낮은 경우에만</strong> 우선</li>
      <li><strong>조정관세, 할당관세, 계절관세</strong> (할당관세는 일반특혜관세보다 낮은 경우에만 우선)</li>
      <li><strong>일반특혜관세</strong></li>
      <li><strong>잠정세율</strong></li>
      <li><strong>기본세율</strong></li>
    </ol>
    <p><strong>FTA 협정관세</strong>는 FTA특례법에 따라 우선 적용. 단 관세법상 세율이 더 낮으면 그 세율 적용</p>`,
    "1순위는 높든 낮든 무조건 우선. 국제협력·편익관세는 낮을 때만 우선. 잠정세율은 기본세율에 우선",
    ["관세법 제50조", "FTA관세특례법 제5조"]),

  c("w5-export-decl", 5, "관세법 · 통관", "수출신고", "수출신고와 신고수리 후 선적 기한",
    `<ul>
      <li>물품을 수출하려면 세관장에게 수출신고 (화주, 관세사, 관세법인 등이 전자신고)</li>
      <li>수출신고는 물품이 장치된 장소에서 (선적 전)</li>
      <li>수출신고가 수리된 물품은 수리일부터 <strong>30일 이내</strong>에 운송수단에 적재 (제251조). 1년 범위에서 적재기간 연장 가능</li>
      <li>기간 내 적재하지 않으면 수출신고 수리 취소</li>
      <li>수출물품 검사는 원칙적으로 생략, 필요 시 검사</li>
    </ul>`,
    "수출신고 수리일부터 30일 이내 적재 (1년 범위 연장). 미적재 시 수리 취소",
    ["관세법 제241조", "관세법 제251조"]),

  c("w5-import-decl", 5, "관세법 · 통관", "수입신고 시기", "출항 전, 입항 전, 하선 전, 보세구역 도착 전, 보세구역 반입 후 / 반입 후 30일 이내 신고 (위반 시 가산세)",
    `<ul>
      <li><strong>출항 전 신고</strong>: 적재항에서 출항하기 전 (항공기·근거리 선박)</li>
      <li><strong>입항 전 신고</strong>: 입항 전 (통상 입항 5일 전, 항공기 1일 전부터)</li>
      <li><strong>보세구역 도착 전 신고</strong>: 하선·하기 후 보세구역 도착 전</li>
      <li><strong>보세구역 장치 후 신고</strong>: 보세구역 반입 후</li>
      <li>관세청장이 정하는 보세구역에 반입한 물품은 반입일부터 <strong>30일 이내</strong> 수입신고 (제241조 3항)</li>
      <li>기한을 넘기면 <strong>신고지연 가산세</strong> (과세가격의 일정 비율, 상한 있음)</li>
    </ul>`,
    "보세구역 반입 후 30일 이내 수입신고, 지연 시 가산세. 출항 전·입항 전 신고는 신속 통관용",
    ["관세법 제241조", "관세법 제243조", "관세법 제244조"]),

  c("w5-release", 5, "관세법 · 통관", "신고수리 전 반출 · 즉시반출", "신고수리 전 반출, 수입신고 전 즉시반출",
    `<ul>
      <li><strong>신고수리 전 반출</strong> (제252조): 수입신고 후 수리 전에 세관장 승인을 받아 반출. 원칙적으로 <strong>관세 상당 담보</strong> 제공</li>
      <li><strong>수입신고 전 즉시반출</strong> (제253조): 관세청장이 정하는 물품(공장 원자재 등)을 지정받은 업체가 즉시반출신고 후 반출</li>
      <li>즉시반출 후 <strong>10일 이내</strong> 수입신고. 기한 내 신고하지 않으면 관세의 <strong>20%</strong> 가산세 징수, 즉시반출 대상 지정 취소 가능</li>
    </ul>`,
    "즉시반출 후 10일 이내 수입신고, 위반 시 관세의 20% 가산세. 수리 전 반출은 담보 제공",
    ["관세법 제252조", "관세법 제253조"]),

  c("w5-bonded", 5, "관세법 · 통관", "보세구역", "지정보세구역 (지정장치장, 세관검사장), 특허보세구역 (보세창고·공장·전시장·건설장·판매장), 종합보세구역",
    `<ul>
      <li><strong>지정보세구역</strong> (세관장 지정)
        <ul>
          <li>지정장치장: 통관하려는 물품을 일시 장치. 장치기간 원칙 6개월 이내 (관세청장이 정함)</li>
          <li>세관검사장: 통관 물품 검사 장소</li>
        </ul>
      </li>
      <li><strong>특허보세구역</strong> (세관장 특허, 운영인)
        <ul>
          <li>보세창고: 외국물품·통관 전 물품 장치</li>
          <li>보세공장: 외국물품 원료로 제조·가공</li>
          <li>보세전시장: 박람회·전시회</li>
          <li>보세건설장: 산업시설 건설에 쓰는 외국물품</li>
          <li>보세판매장: 면세점</li>
        </ul>
      </li>
      <li><strong>종합보세구역</strong> (관세청장 지정): 여러 보세구역 기능을 종합 수행</li>
    </ul>`,
    "지정보세구역 2종(지정장치장·세관검사장), 특허보세구역 5종. 종합보세구역은 관세청장 지정",
    ["관세법 제154조", "관세법 제169조", "관세법 제174조", "관세법 제197조"]),

  c("w5-bonded-transport", 5, "관세법 · 통관", "보세운송", "외국물품을 보세 상태로 국내 운송",
    `<ul>
      <li>외국물품을 관세를 내지 않은 상태로 개항, 보세구역, 세관관서, 통관역 등 사이에서 운송</li>
      <li>물품에 따라 세관장에게 <strong>신고</strong> 또는 <strong>승인</strong></li>
      <li>신고인: 화주, 관세사, 보세운송업자</li>
      <li>정해진 기간 안에 목적지에 도착해야 하며(해상·항공별로 고시), 도착하지 않으면 관세 즉시 징수</li>
      <li>수출신고가 수리된 물품의 운송은 보세운송 절차 생략</li>
    </ul>`,
    "보세운송은 신고 또는 승인. 기간 내 미도착 시 관세 즉시 징수",
    ["관세법 제213조", "관세법 제217조"]),

  c("w5-refund-type", 5, "관세환급", "개별환급과 간이정액환급", "관세환급특례법상 환급 방법",
    `<ul>
      <li>근거: 수출용 원재료에 대한 관세 등 환급에 관한 특례법 (관세환급특례법)</li>
      <li><strong>개별환급</strong>: 수출물품 제조에 들어간 원재료별 납부세액을 <strong>소요량</strong>으로 계산해 환급. 소요량계산서, 수입신고필증, 기초원재료납세증명서 등 필요</li>
      <li><strong>간이정액환급</strong>: 일정 규모 이하 <strong>중소기업</strong>이 생산한 수출물품에 대해 <strong>정액환급률표</strong>(수출금액 1만원당 환급액)로 환급. 소요량 계산 불필요</li>
      <li>관세법상 환급(위약물품 환급, 재수출 환급 등)과 구분</li>
    </ul>`,
    "간이정액환급 = 중소기업 · 정액환급률표 · 소요량 계산 불필요. 개별환급 = 소요량 계산",
    ["관세환급특례법"]),

  c("w5-refund-period", 5, "관세환급", "환급 요건과 청구기한", "수출신고 수리일부터 2년",
    `<ul>
      <li>환급 대상 수출 등: 수출신고 수리 수출, 내국신용장·구매확인서에 의한 국내 공급, 보세구역 공급 등</li>
      <li>원재료를 수입할 때 관세를 납부했어야 함</li>
      <li>원재료 수입신고 수리일부터 <strong>2년 이내</strong>에 수출 등에 제공 (소요기간)</li>
      <li>환급 청구는 수출신고 수리일 등 <strong>수출 이행일부터 2년 이내</strong></li>
      <li>환급 청구권자: 수출자 또는 수출물품 생산자</li>
    </ul>`,
    "두 개의 2년: 원재료 수입 후 2년 내 수출, 수출 후 2년 내 환급 청구",
    ["관세환급특례법"]),

  c("w5-refund-material", 5, "관세환급", "소요원재료와 과다환급", "소요원재료 산정과 과다환급",
    `<ul>
      <li><strong>소요원재료</strong>: 수출물품 생산에 들어간 원재료 (물리적·화학적으로 결합된 것 + 생산 과정의 손모량)</li>
      <li><strong>소요량</strong>: 수출물품 1단위 생산에 드는 원재료의 양 (손모율 포함)</li>
      <li>국내에서 산 원재료는 <strong>기초원재료납세증명서(기납증)</strong>나 분할증명서로 관세 납부 사실을 증명</li>
      <li><strong>과다환급</strong>: 실제보다 많이 환급받으면 추징 + 가산세. 부정 환급은 처벌</li>
    </ul>`,
    "손모량도 소요량에 포함. 국내 조달 원재료는 기납증으로 증명. 과다환급은 추징",
    ["관세환급특례법"]),

  c("w5-fta-origin", 5, "FTA", "원산지결정기준", "완전생산기준, 세번변경기준 (CC · CTH · CTSH), 부가가치기준, 가공공정기준",
    `<ul>
      <li><strong>완전생산기준(WO)</strong>: 한 당사국에서 완전히 생산된 물품</li>
      <li><strong>세번변경기준(CTC)</strong>: 비원산지 재료와 최종 물품의 HS 번호가 다르면 원산지 인정
        <ul>
          <li><strong>CC</strong>: 2단위(류) 변경 → 가장 엄격</li>
          <li><strong>CTH</strong>: 4단위(호) 변경</li>
          <li><strong>CTSH</strong>: 6단위(소호) 변경 → 가장 완화</li>
        </ul>
      </li>
      <li><strong>부가가치기준(RVC)</strong>: 역내 부가가치 비율 일정 이상(공제법 BD, 집적법 BU) 또는 비원산지 재료 비율 일정 이하(MC)</li>
      <li><strong>가공공정기준(SP)</strong>: 특정 공정을 수행해야 원산지 인정 (섬유의 원사기준 등)</li>
      <li>품목별 원산지 결정기준(PSR)은 협정마다 다름</li>
    </ul>`,
    "CC = 2단위(가장 엄격), CTH = 4단위, CTSH = 6단위(가장 완화)",
    ["FTA관세특례법 제7조"]),

  c("w5-fta-supplement", 5, "FTA", "보충적 기준", "미소기준(De minimis), 누적기준, 직접운송원칙",
    `<ul>
      <li><strong>미소기준(De minimis)</strong>: 세번변경을 충족하지 못한 비원산지 재료라도 그 가격(또는 중량)이 일정 비율(통상 10% 내외) 이하면 원산지 인정</li>
      <li><strong>누적기준(Cumulation)</strong>: 상대 당사국의 원산지 재료·공정을 자국 것으로 간주 (양자·교차·완전누적)</li>
      <li><strong>직접운송원칙</strong>: 원산지 물품은 당사국 간에 직접 운송. 제3국을 경유하면 하역·재선적·보존 작업 외 가공이 없고 세관 통제하에 있었음을 증명해야</li>
      <li><strong>불인정 공정(최소 공정)</strong>: 단순 포장, 세척, 절단, 혼합 등은 원산지 인정 안 함</li>
      <li>부속품·예비품·공구, 소매용 포장재 등은 협정에 따라 별도 취급</li>
    </ul>`,
    "미소기준은 세번변경기준 보완용. 직접운송: 제3국 경유 시 세관 통제하 단순 환적만 허용",
    ["FTA관세특례법"]),

  c("w5-fta-cert", 5, "FTA", "원산지증명 방식", "자율발급과 기관발급, 인증수출자",
    `<ul>
      <li><strong>기관발급</strong>: 세관·대한상공회의소가 원산지증명서 발급 (한-아세안, 한-중, 한-인도, 한-싱가포르 등)</li>
      <li><strong>자율발급</strong>: 수출자·생산자(협정에 따라 수입자) 스스로 작성 (한-EU, 한-미, 한-EFTA 등)</li>
      <li><strong>인증수출자</strong>: 세관장이 원산지 증명 능력을 인증한 수출자. 증명 절차 간소화</li>
      <li>한-EU FTA: 건당 <strong>6,000유로 초과</strong> 물품은 인증수출자만 원산지 신고서 작성 가능</li>
      <li>원산지증명서 유효기간은 통상 발급일부터 1년 (협정별 상이). 증빙서류는 5년 보관</li>
    </ul>`,
    "한-EU는 6,000유로 초과 시 인증수출자만. 기관발급: 아세안·중국·인도. 자율발급: EU·미국·EFTA",
    ["FTA관세특례법"]),

  c("w5-fta-verify", 5, "FTA", "사후검증 · 협정관세 적용", "원산지 사후검증, 협정관세 적용 신청",
    `<ul>
      <li><strong>협정관세 적용 신청</strong>: 원칙적으로 수입신고 수리 전. 수리 전에 못 했으면 수입신고 수리일부터 <strong>1년 이내</strong> 사후 적용 신청 가능</li>
      <li><strong>원산지 사후검증</strong>: 수입국 세관이 원산지의 적정성 확인
        <ul>
          <li>직접검증: 수입국 세관이 수출국 수출자·생산자를 직접 조사 (한-미 등)</li>
          <li>간접검증: 수출국 세관에 검증을 요청 (한-EU, 한-아세안 등)</li>
        </ul>
      </li>
      <li>원산지가 인정되지 않으면 협정관세 적용 배제, 차액 추징 + 가산세</li>
      <li>원산지증빙서류는 수입자·수출자·생산자 모두 5년 보관</li>
    </ul>`,
    "협정관세 사후 적용 신청은 수리일부터 1년 이내. 직접검증(미국) vs 간접검증(EU)",
    ["FTA관세특례법 제9조", "FTA관세특례법"]),

  /* ================= W6 · 무역영어 ================= */

  c("w6-letters", 6, "무역영어", "거래 단계별 무역서신", "신용조회, 거래제의, 청약, 반대청약, 주문, 승낙, 신용장 개설 통지, 선적 통지, 클레임",
    `<ul>
      <li>흐름: 시장조사 → 거래 제의(Business proposal, Circular letter) → <strong>신용조회(Credit inquiry)</strong> → 조회(Inquiry) → 청약(Offer) → 반대청약(Counter offer) → 주문(Order) → 주문 승낙(Acknowledgement) → 계약서 → 신용장 개설 통지 → 선적 통지(Shipping advice) → 대금 결제 → 클레임(Claim)</li>
      <li>자주 나오는 표현
        <ul>
          <li>Enclosed please find ~ : ~을 동봉합니다</li>
          <li>We are pleased to inform you that ~ / We regret to inform you that ~</li>
          <li>Please open an L/C in our favor : 당사를 수익자로 신용장을 개설해 주십시오</li>
          <li>We have drawn a draft on you at sight : 귀사 앞 일람출급 환어음을 발행했습니다</li>
          <li>This offer is subject to our final confirmation : 확인조건부 청약 (청약의 유인)</li>
          <li>We would appreciate it if you could ~ : ~해 주시면 감사하겠습니다</li>
        </ul>
      </li>
    </ul>`,
    "서신 흐름 순서 배열 문제 다수. Inquiry는 청약 전, Acknowledgement는 주문 승낙",
    []),

  c("w6-5c", 6, "무역영어", "신용조회 5C", "Character, Capital, Capacity, Collateral, Conditions",
    `<ul>
      <li><strong>Character</strong>(성격·신용): 계약 이행 의지, 성실성, 평판, 영업 태도</li>
      <li><strong>Capital</strong>(자본): 재무 상태, 자본 규모</li>
      <li><strong>Capacity</strong>(능력): 영업 능력, 연혁, 경영 능력, 생산 능력</li>
      <li><strong>Collateral</strong>(담보): 채무 불이행 시 담보 능력</li>
      <li><strong>Conditions</strong>(거래 조건·환경): 경제·정치 상황, 업계 상황</li>
      <li>기본은 3C(Character, Capital, Capacity), 여기에 Collateral, Conditions를 더해 5C</li>
      <li>신용조회처: 은행조회(Bank reference), 동업자조회(Trade reference), 상업흥신소(Credit agency), 무역보험공사</li>
    </ul>`,
    "3C = Character · Capital · Capacity. Character = 이행 의지·성실성",
    []),

  c("w6-abbr", 6, "무역영어", "주요 약어", "B/L, AWB, L/C, D/P, D/A, T/T, CAD, COD, ETD, ETA, FCL, LCL, CY, CFS, P/I, C/O, P/L",
    `<ul>
      <li>B/L Bill of Lading 선하증권 · AWB Air Waybill 항공화물운송장</li>
      <li>L/C Letter of Credit · D/P Documents against Payment · D/A Documents against Acceptance</li>
      <li>T/T Telegraphic Transfer · CAD Cash Against Documents · COD Cash On Delivery</li>
      <li>ETD Estimated Time of Departure 출항 예정 · ETA Estimated Time of Arrival 도착 예정</li>
      <li>FCL / LCL · CY Container Yard / CFS Container Freight Station</li>
      <li>P/I Proforma Invoice 견적송장 · C/O Certificate of Origin 원산지증명서 · P/L Packing List 포장명세서</li>
      <li>선적 서류 흐름: S/R Shipping Request 선적요청서 → S/O Shipping Order 선적지시서 → M/R Mate's Receipt 본선수취증 → B/L → D/O Delivery Order 화물인도지시서</li>
      <li>기타: L/G Letter of Guarantee, N/N Non-Negotiable, M/L More or Less, T/S Transhipment</li>
    </ul>`,
    "S/R → S/O → M/R → B/L → D/O 순서. M/R은 일등항해사가 발행",
    []),

  c("w6-clauses", 6, "무역영어", "계약서 영문 조항", "Entire Agreement, Force Majeure, Arbitration, Governing Law, Severability, Hardship, Non-waiver",
    `<ul>
      <li><strong>Entire Agreement</strong>(완전합의): 이 계약서가 당사자 간 유일·완전한 합의이며 이전 합의를 대체</li>
      <li><strong>Force Majeure</strong>(불가항력): 통제할 수 없는 사유로 인한 불이행·지연은 면책</li>
      <li><strong>Arbitration</strong>(중재): 분쟁을 중재로 해결 (중재지·기관·규칙)</li>
      <li><strong>Governing Law</strong>(준거법): 계약 해석에 적용할 법</li>
      <li><strong>Severability</strong>(분리가능성): 일부 조항이 무효여도 나머지는 유효</li>
      <li><strong>Hardship</strong>(사정변경): 이행이 현저히 곤란해지면 재협상 의무</li>
      <li><strong>Non-waiver</strong>(권리불포기): 권리를 행사하지 않았다고 그 권리를 포기한 것이 아님</li>
      <li>기타: Assignment(양도 제한), Notice(통지), Termination(해지), Infringement(지재권 침해), Confidentiality(비밀유지)</li>
    </ul>`,
    "Severability = 일부 무효 분리, Non-waiver = 미행사 ≠ 포기, Hardship = 재협상 (Force Majeure = 면책)",
    []),

  c("w6-dispute", 6, "무역영어", "분쟁해결과 중재", "화해, 알선, 조정, 중재 / 중재의 장점 (단심제, 비공개, 뉴욕협약) / 중재합의 요소 (중재지, 중재기관, 준거법)",
    `<ul>
      <li>당사자 간 해결: 청구권 포기(Waiver of claim), 화해(Amicable settlement)</li>
      <li><strong>알선</strong>(Intermediation): 제3자가 조언. 강제력 없음</li>
      <li><strong>조정</strong>(Conciliation, Mediation): 조정인이 조정안 제시, 당사자가 수락해야 효력</li>
      <li><strong>중재</strong>(Arbitration): 중재인의 판정. <strong>법원 확정판결과 동일한 효력</strong>
        <ul>
          <li>장점: <strong>단심제</strong>(신속·저렴), <strong>비공개</strong>, 전문가 판정, <strong>뉴욕협약</strong>(1958, 외국중재판정의 승인 및 집행에 관한 협약)으로 해외 집행 가능</li>
          <li>중재합의는 <strong>서면</strong>으로. 중재합의가 있으면 소송 제기 불가(직소금지, 방소항변)</li>
          <li>중재합의 3요소: <strong>중재지, 중재기관, 준거법</strong></li>
          <li>국내 상설 중재기관: 대한상사중재원</li>
        </ul>
      </li>
      <li>소송(Litigation): 최종 수단. 해외 집행이 어려움</li>
    </ul>`,
    "중재 = 단심제 · 비공개 · 뉴욕협약 해외 집행 · 서면 합의 · 직소금지. 중재합의 3요소",
    ["뉴욕협약(1958)", "중재법"]),

  c("w6-reading", 6, "무역영어", "영문 원문 독해", "UCP 600, 인코텀즈 2020, CISG 주요 조항",
    `<ul>
      <li>UCP 600 Art.14(b): "...shall each have <strong>a maximum of five banking days</strong> following the day of presentation to determine if a presentation is complying."</li>
      <li>UCP 600 Art.14(c): "...not later than <strong>21 calendar days after the date of shipment</strong>..., but in any event not later than the expiry date of the credit."</li>
      <li>UCP 600 Art.3: "The expression 'on or about' ... will be interpreted as a stipulation that an event is to occur during a period of <strong>five calendar days before until five calendar days after</strong> the specified date, both start and end dates included."</li>
      <li>UCP 600 Art.30(a): "The words 'about' or 'approximately' ... are to be construed as allowing a tolerance <strong>not to exceed 10% more or 10% less</strong>..."</li>
      <li>CISG Art.18(1): "<strong>Silence or inactivity does not in itself amount to acceptance.</strong>"</li>
      <li>CISG Art.25: "A breach ... is fundamental if it results in such detriment to the other party as <strong>substantially to deprive him of what he is entitled to expect</strong> under the contract..."</li>
      <li>독해 팁: shall(의무) / may(재량), unless otherwise stipulated(달리 정하지 않으면), provided that(단, ~라면)</li>
    </ul>`,
    "원문 속 숫자: 5 banking days, 21 calendar days, 10%, 5%, 110%, 5 calendar days",
    ["UCP 600", "CISG", "Incoterms 2020"]),

  c("w6-forms", 6, "무역영어", "무역서식 해석", "신용장 (MT700 필드), 상업송장, 선하증권, 보험증권",
    `<p><strong>MT700 신용장 주요 필드</strong></p>
    <ul>
      <li>20 Documentary Credit Number · 31C Date of Issue · <strong>31D Date and Place of Expiry</strong></li>
      <li>40A Form of Documentary Credit (IRREVOCABLE / IRREVOCABLE TRANSFERABLE) · 40E Applicable Rules (UCP LATEST VERSION)</li>
      <li>50 Applicant · 59 Beneficiary · 32B Currency Code, Amount · 39A Percentage Credit Amount Tolerance</li>
      <li>41a Available With ... By ... · 42C Drafts at ... · 42a Drawee</li>
      <li>43P Partial Shipments · 43T Transhipment</li>
      <li>44E Port of Loading · 44F Port of Discharge · <strong>44C Latest Date of Shipment</strong></li>
      <li>45A Description of Goods · <strong>46A Documents Required</strong> · 47A Additional Conditions</li>
      <li>71D Charges · 48 Period for Presentation · 49 Confirmation Instructions</li>
    </ul>
    <p><strong>기타 서식</strong>: 선하증권(Shipper, Consignee, Notify Party, Vessel, Port of Loading/Discharge, Freight Prepaid/Collect, No. of Original B/L), 보험증권(Assured, Amount Insured, Conditions, Claims Payable at), 상업송장(Invoice No., Description, Unit Price, Amount)</p>
    <p><strong>SWIFT 메시지</strong>: MT700 신용장 개설, MT707 조건변경, MT103 송금</p>`,
    "MT700 = 개설, MT707 = 조건변경, MT103 = 송금. 31D 유효기일, 44C 최종선적일, 46A 요구서류",
    ["SWIFT MT700", "SWIFT MT707"]),

  /* ================= W7 · 실전 · 응시 환경 점검 ================= */

  c("w7-mock", 7, "실전", "120분 실전 모의고사 2회", "문항당 1분 배분 연습",
    `<ul>
      <li>120문항 / 120분, 쉬는 시간 없음 → <strong>문항당 1분</strong></li>
      <li>1회독은 아는 문제 위주로 빠르게(약 80분), 남은 시간에 보류 문제와 마킹 검토</li>
      <li>숫자 문제(UCP 기간·비율, 관세법 기한)는 즉답, 긴 영문 지문은 나중에</li>
      <li>모의고사 후 과목별 점수를 시험정보 페이지에 기록하고, 틀린 문제는 오답노트에 추가</li>
    </ul>`,
    "실제 시간을 재고 2회 이상. 과목별 점수 기록으로 과락 위험 확인",
    []),

  c("w7-review", 7, "실전", "오답노트 복습 모드 2회 이상", "오답을 한 장씩 넘기며 다시 풀기",
    `<ul>
      <li>'복습 필요'와 '다시 틀림' 항목 위주로 복습 모드 진행</li>
      <li>틀린 이유를 유형화: 개념 혼동 / 숫자 암기 부족 / 지문 오독 / 시간 부족</li>
      <li>같은 개념을 2번 이상 틀리면 암기카드로 옮겨 반복</li>
    </ul>`,
    "틀린 이유를 유형별로 나누면 마지막 주 보완 우선순위가 보임",
    []),

  c("w7-weak", 7, "실전", "과락 위험 과목 집중 보완", "합격 시뮬레이터로 40점 미만 과목 확인",
    `<ul>
      <li>합격 기준: <strong>평균 60점 이상</strong> + <strong>과목별 40점 이상</strong></li>
      <li>과목당 30문항 → 1문항 약 3.33점</li>
      <li>과락선 40점 = 30문항 중 <strong>12문항</strong></li>
      <li>평균 60점 = 120문항 중 <strong>72문항</strong></li>
      <li>시뮬레이터에 모의고사 결과를 넣어 40점 근처 과목을 집중 보완</li>
    </ul>`,
    "합격 = 총 72문항 이상 + 모든 과목 12문항 이상",
    []),

  c("w7-prep", 7, "응시 준비", "응시 환경 점검", "신분증, 웹캠·마이크 PC, 스마트폰 거치대, 응시가이드 영상 시청",
    `<ul>
      <li>신분증 (주민등록증, 운전면허증, 여권 등 인정 신분증)</li>
      <li>웹캠·마이크가 되는 PC와 안정적인 인터넷</li>
      <li>감독용 스마트폰과 거치대 (측면 촬영 등 응시 안내에 따른 위치)</li>
      <li>조용한 독립 공간, 책상 위 정리</li>
      <li>응시가이드 영상 시청과 사전 접속 테스트</li>
      <li>세부 규정(허용 물품, 입실 시간 등)은 KITA 무역아카데미 응시 안내를 확인</li>
    </ul>`,
    "시험 전 KITA 공지의 응시 가이드와 사전 점검을 반드시 완료",
    []),
];
