"use client";

import type { LearningProgress } from "@/types/progress";

const defaultProgress: LearningProgress = {
  learnedWords: [],
  reviewWords: [],
  bestQuizScore: 0,
  recentlyViewedWords: [],
};

const keys = {
  learnedWords: "silentBridge.learnedWords",
  reviewWords: "silentBridge.reviewWords",
  bestQuizScore: "silentBridge.bestQuizScore",
  recentlyViewedWords: "silentBridge.recentlyViewedWords",
};

function readArray(key: string) {
  if (typeof window === "undefined") return [];
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as string[]) : [];
  } catch {
    return [];
  }
}

export function getProgress(): LearningProgress {
  if (typeof window === "undefined") return defaultProgress;
  return {
    learnedWords: readArray(keys.learnedWords),
    reviewWords: readArray(keys.reviewWords),
    bestQuizScore: Number(window.localStorage.getItem(keys.bestQuizScore) ?? 0),
    recentlyViewedWords: readArray(keys.recentlyViewedWords),
  };
}

export function setWordLearned(wordId: string) {
  const progress = getProgress();
  const learnedWords = Array.from(new Set([...progress.learnedWords, wordId]));
  const reviewWords = progress.reviewWords.filter((id) => id !== wordId);
  window.localStorage.setItem(keys.learnedWords, JSON.stringify(learnedWords));
  window.localStorage.setItem(keys.reviewWords, JSON.stringify(reviewWords));
}

export function setWordForReview(wordId: string) {
  const progress = getProgress();
  const reviewWords = Array.from(new Set([...progress.reviewWords, wordId]));
  window.localStorage.setItem(keys.reviewWords, JSON.stringify(reviewWords));
}

export function addRecentlyViewed(wordId: string) {
  const progress = getProgress();
  const recentlyViewedWords = [wordId, ...progress.recentlyViewedWords.filter((id) => id !== wordId)].slice(0, 6);
  window.localStorage.setItem(keys.recentlyViewedWords, JSON.stringify(recentlyViewedWords));
}

export function saveBestQuizScore(score: number) {
  const progress = getProgress();
  if (score > progress.bestQuizScore) {
    window.localStorage.setItem(keys.bestQuizScore, String(score));
  }
}
