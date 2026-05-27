export const learningStorageKeys = {
  learned: "cham_learned_signs",
  favorites: "cham_favorite_signs",
  viewedLessons: "cham_viewed_lessons",
  bestQuizScore: "cham_best_quiz_score",
} as const;

export type StoredLearningItem = {
  id: string;
  label: string;
  updatedAt: string;
};

function isBrowser() {
  return typeof window !== "undefined";
}

function itemLabel(item: unknown) {
  if (typeof item === "string") return item;
  if (item && typeof item === "object") {
    const record = item as Record<string, unknown>;
    return String(record.label ?? record.word ?? record.title ?? record.id ?? "");
  }
  return "";
}

function itemId(item: unknown) {
  if (typeof item === "string") return item;
  if (item && typeof item === "object") {
    const record = item as Record<string, unknown>;
    return String(record.id ?? record.word ?? record.title ?? record.label ?? "");
  }
  return "";
}

export function readLearningItems(key: string): StoredLearningItem[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => {
        const id = itemId(item);
        const label = itemLabel(item);
        const updatedAt =
          item && typeof item === "object" && "updatedAt" in item
            ? String((item as Record<string, unknown>).updatedAt)
            : new Date().toISOString();
        return id ? { id, label: label || id, updatedAt } : null;
      })
      .filter(Boolean) as StoredLearningItem[];
  } catch {
    return [];
  }
}

export function saveLearningItem(key: string, item: { id: string; label: string }) {
  if (!isBrowser()) return;

  const nextItem: StoredLearningItem = {
    id: item.id,
    label: item.label,
    updatedAt: new Date().toISOString(),
  };
  const existing = readLearningItems(key).filter((stored) => stored.id !== item.id);
  window.localStorage.setItem(key, JSON.stringify([nextItem, ...existing]));
}

export function readBestQuizScore() {
  if (!isBrowser()) return 0;
  return Number(window.localStorage.getItem(learningStorageKeys.bestQuizScore) ?? 0);
}
