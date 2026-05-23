"use client";

import { useEffect, useState } from "react";
import { LessonCard } from "@/components/learning/LessonCard";
import { getProgress } from "@/lib/progress";
import { lessons } from "@/data/vocabularyData";

export default function LessonsPage() {
  const [learnedWords, setLearnedWords] = useState<string[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLearnedWords(getProgress().learnedWords), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-950">Bài học từ vựng</h1>
        <p className="mt-3 text-lg text-slate-600">Chọn một chủ đề, xem từ mẫu và đánh dấu từ đã học.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {lessons.map((lesson) => {
          const progress = (lesson.wordIds.filter((id) => learnedWords.includes(id)).length / lesson.wordIds.length) * 100;
          return <LessonCard key={lesson.id} lesson={lesson} progress={progress} />;
        })}
      </div>
    </main>
  );
}
