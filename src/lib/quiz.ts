import { vocabularyData } from "@/data/vocabularyData";
import type { QuizMode, QuizQuestion } from "@/types/quiz";

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function createQuizQuestions(category: string, count: number): QuizQuestion[] {
  const pool = category === "Tất cả" ? vocabularyData : vocabularyData.filter((item) => item.category === category);
  const selected = shuffle(pool).slice(0, count);
  const modes: QuizMode[] = ["image-to-word", "word-to-meaning", "word-to-category"];

  return selected.map((item, index) => {
    const mode = modes[index % modes.length];
    const distractors = shuffle(vocabularyData.filter((word) => word.id !== item.id));
    const categoryOptions = shuffle([...new Set(vocabularyData.map((word) => word.category).filter((value) => value !== item.category))]).slice(0, 3);

    if (mode === "word-to-meaning") {
      return {
        id: `${item.id}-meaning`,
        mode,
        prompt: `Nghĩa đúng của từ "${item.word}" là gì?`,
        correctAnswer: item.meaning,
        options: shuffle([item.meaning, ...distractors.slice(0, 3).map((word) => word.meaning)]),
        explanation: `"${item.word}" thuộc chủ đề ${item.category}.`,
        exampleSentence: item.exampleSentence,
      };
    }

    if (mode === "word-to-category") {
      return {
        id: `${item.id}-category`,
        mode,
        prompt: `Từ "${item.word}" thuộc chủ đề nào?`,
        correctAnswer: item.category,
        options: shuffle([item.category, ...categoryOptions]),
        explanation: `Từ này được xếp trong nhóm ${item.category}.`,
        exampleSentence: item.exampleSentence,
      };
    }

    return {
      id: `${item.id}-image`,
      mode,
      prompt: `Chọn từ tiếng Việt phù hợp với hình/ký hiệu demo: ${item.imageDescription}`,
      correctAnswer: item.word,
      options: shuffle([item.word, ...distractors.slice(0, 3).map((word) => word.word)]),
      explanation: `Hình minh họa đang gợi đến từ "${item.word}".`,
      exampleSentence: item.exampleSentence,
    };
  });
}
