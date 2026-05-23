"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BookOpenCheck, History, ListChecks, Medal } from "lucide-react";
import { ProgressCard } from "@/components/cards/ProgressCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getProgress } from "@/lib/progress";
import { lessons, vocabularyData } from "@/data/vocabularyData";
import type { LearningProgress } from "@/types/progress";

export default function DashboardPage() {
  const [progress, setProgress] = useState<LearningProgress>({ learnedWords: [], reviewWords: [], bestQuizScore: 0, recentlyViewedWords: [] });

  useEffect(() => {
    const timer = window.setTimeout(() => setProgress(getProgress()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const recentWords = useMemo(() => progress.recentlyViewedWords.map((id) => vocabularyData.find((item) => item.id === id)).filter(Boolean), [progress.recentlyViewedWords]);
  const activeLesson = lessons.find((lesson) => lesson.wordIds.some((id) => !progress.learnedWords.includes(id))) ?? lessons[0];
  const lessonProgress = Math.round((activeLesson.wordIds.filter((id) => progress.learnedWords.includes(id)).length / activeLesson.wordIds.length) * 100);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-950">Bảng học tập</h1>
        <p className="mt-3 text-lg text-slate-600">Theo dõi tiến độ lưu trên trình duyệt của bạn.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <ProgressCard icon={BookOpenCheck} label="Số từ đã học" value={progress.learnedWords.length} hint="Từ đã đánh dấu biết rồi" />
            <ProgressCard icon={ListChecks} label="Cần ôn lại" value={progress.reviewWords.length} hint="Từ bạn muốn xem lại" />
            <ProgressCard icon={Medal} label="Điểm quiz cao nhất" value={`${progress.bestQuizScore}`} hint="Lưu theo thang 100" />
            <ProgressCard icon={History} label="Từ đã xem gần đây" value={progress.recentlyViewedWords.length} hint="Tối đa 6 từ gần nhất" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Chủ đề đang học: {activeLesson.topic}</CardTitle>
              <p className="text-slate-600">{activeLesson.description}</p>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Progress value={lessonProgress} />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild><Link href={`/lessons/${activeLesson.id}`}>Gợi ý bài học tiếp theo</Link></Button>
                <Button asChild variant="secondary"><Link href="/flashcards">Ôn bằng flashcards</Link></Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Từ đã xem gần đây</CardTitle></CardHeader>
            <CardContent>
              {recentWords.length ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {recentWords.map((word) => word ? <div key={word.id} className="rounded-2xl bg-slate-50 p-4"><p className="font-black text-slate-950">{word.word}</p><p className="text-sm text-slate-600">{word.category}</p></div> : null)}
                </div>
              ) : <p className="text-slate-600">Bạn chưa xem từ nào. Hãy mở từ điển để bắt đầu.</p>}
            </CardContent>
          </Card>
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
