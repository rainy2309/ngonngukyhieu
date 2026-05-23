"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, PlaySquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { VisualPlaceholder } from "@/components/dictionary/WordCard";
import { getProgress, setWordLearned } from "@/lib/progress";
import { lessons, vocabularyData } from "@/data/vocabularyData";

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const lesson = lessons.find((item) => item.id === id);
  const words = useMemo(() => lesson ? lesson.wordIds.map((wordId) => vocabularyData.find((word) => word.id === wordId)).filter(Boolean) : [], [lesson]);
  const [learned, setLearned] = useState<string[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLearned(getProgress().learnedWords), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!lesson) {
    return <main className="mx-auto max-w-7xl flex-1 px-4 py-10"><h1 className="text-3xl font-black">Không tìm thấy bài học</h1><Button asChild className="mt-4"><Link href="/lessons">Quay lại bài học</Link></Button></main>;
  }

  const progress = (lesson.wordIds.filter((wordId) => learned.includes(wordId)).length / lesson.wordIds.length) * 100;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-4">
        <Button asChild variant="secondary" className="w-fit"><Link href="/lessons">Quay lại danh sách</Link></Button>
        <h1 className="text-4xl font-black text-slate-950">{lesson.topic}</h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-600">{lesson.description}</p>
        <Progress value={progress} />
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {words.map((word) => word ? (
          <Card key={word.id}>
            <CardHeader>
              <VisualPlaceholder label={word.word} description={word.imageDescription} />
              <div className="flex flex-wrap gap-2"><Badge>{word.category}</Badge><Badge className="bg-emerald-50 text-emerald-800 ring-emerald-100">{learned.includes(word.id) ? "Đã học" : "Chưa học"}</Badge></div>
              <CardTitle>{word.word}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <p className="text-slate-700">{word.meaning}</p>
              <p className="rounded-2xl bg-slate-50 p-4 font-semibold text-slate-900">{word.exampleSentence}</p>
              <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50 p-4 text-blue-900"><PlaySquare className="mb-2 h-5 w-5" />{word.signVideoPlaceholder}</div>
              <Button variant={learned.includes(word.id) ? "success" : "default"} onClick={() => { setWordLearned(word.id); setLearned(getProgress().learnedWords); }}>
                <CheckCircle2 className="h-5 w-5" /> Đánh dấu đã học
              </Button>
            </CardContent>
          </Card>
        ) : null)}
      </div>
    </main>
  );
}
