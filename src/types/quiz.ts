export type QuizMode = "image-to-word" | "word-to-meaning" | "word-to-category";

export type QuizQuestion = {
  id: string;
  prompt: string;
  mode: QuizMode;
  correctAnswer: string;
  options: string[];
  explanation: string;
  exampleSentence: string;
};

export type QuizAnswer = {
  question: QuizQuestion;
  selectedAnswer: string;
  isCorrect: boolean;
};
