// localStorage 래퍼 (읽기·쓰기·백업). 키는 "trade:" 접두사로 통일
const PREFIX = "trade:";

export const KEYS = {
  planChecks: "planChecks",
  wrongNotes: "wrongNotes",
  mockScores: "mockScores",
  flashcards: "flashcards",
  prefs: "prefs",
};

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    // 저장소 사용 불가
  }
}

// 전체 데이터를 JSON 파일로 내보내기
export function exportBackup() {
  const data = Object.fromEntries(Object.values(KEYS).map((k) => [k, load(k, null)]));
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `trade-study-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// JSON 파일에서 불러오기
export async function importBackup(file) {
  const data = JSON.parse(await file.text());
  for (const k of Object.values(KEYS)) {
    if (data[k] != null) save(k, data[k]);
  }
}
