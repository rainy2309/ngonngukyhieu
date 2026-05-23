export type Difficulty = "easy" | "medium" | "hard";

export type VocabularyItem = {
  id: string;
  word: string;
  meaning: string;
  category: string;
  exampleSentence: string;
  imageDescription: string;
  signVideoPlaceholder: string;
  difficulty: Difficulty;
  relatedWords: string[];
};

export type Lesson = {
  id: string;
  topic: string;
  description: string;
  difficulty: Difficulty;
  wordIds: string[];
};
