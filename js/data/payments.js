// 결제방식·흐름도 단계 (README 7장)
export const actors = {
  exporter: { name: "수출자", alias: "수익자(L/C), 추심의뢰인(추심)" },
  importer: { name: "수입자", alias: "개설의뢰인(L/C), 지급인(추심)" },
  remittingBank: { name: "송금은행", alias: "수입자 거래은행" },
  payingBank: { name: "지급은행", alias: "수출자 거래은행" },
  issuing: { name: "개설은행", alias: "Issuing Bank" },
  advising: { name: "통지은행", alias: "Advising Bank" },
  confirming: { name: "확인은행", alias: "확인신용장일 때만" },
  negotiating: { name: "매입은행", alias: "지정은행" },
  accepting: { name: "인수은행", alias: "Banker's Usance" },
  reimbursing: { name: "상환은행", alias: "Reimbursing Bank" },
  collectingRemit: { name: "추심의뢰은행", alias: "Remitting Bank" },
  collecting: { name: "추심은행·제시은행", alias: "Collecting / Presenting Bank" },
  carrier: { name: "운송인", alias: "선사·항공사·포워더" },
  insurer: { name: "보험회사", alias: "CIF·CIP일 때" },
};

// 탭 순서: advance(사전송금), deferred(사후송금), dp, da, sightLC, usanceLC
export const payments = {
  sightLC: {
    title: "일람출급 신용장 (At Sight L/C)",
    rule: "UCP 600",
    exporterRisk: 2, // 1(낮음)–5(높음)
    actors: ["importer", "issuing", "advising", "exporter", "negotiating", "reimbursing", "carrier"],
    steps: [
      {
        no: 1,
        from: "importer",
        to: "issuing",
        title: "신용장 개설 신청",
        desc: "수입자가 거래은행에 신용장 개설을 신청한다.",
        documents: ["신용장 개설신청서", "외국환거래약정서", "물품매도확약서(Offer Sheet) 또는 P/I"],
        check: ["담보 또는 여신한도 확보", "매매계약의 결제조건과 일치 여부"],
        rule: "",
        examPoint: "개설의뢰인 = 수입자",
      },
    ],
  },
};
