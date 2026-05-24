"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BookOpenCheck, History, ListChecks, Medal } from "lucide-react";
import { ProgressCard } from "@/components/cards/ProgressCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getProgressSummary, type ProgressSummary } from "@/lib/progress";
import { lessons, vocabularyData } from "@/data/vocabularyData";

const emptySummary: ProgressSummary = {
  learnedWords: [],
  reviewWords: [],
  bestQuizScore: 0,
  recentlyViewedWords: [],
  quizHistory: [],
  isAuthenticated: false,
};

export default function DashboardPage() {
  const [progress, setProgress] = useState<ProgressSummary>(emptySummary);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProgress() {
      try {
        const data = await getProgressSummary();
        setProgress(data);
      } catch {
        setMessage("Không thể tải dữ liệu học tập.");
      } finally {
        setLoading(false);
      }
    }

    void loadProgress();
  }, []);

  const recentWords = useMemo(() => progress.recentlyViewedWords.map((id) => vocabularyData.find((item) => item.id === id)).filter(Boolean), [progress.recentlyViewedWords]);
  const activeLesson = lessons.find((lesson) => lesson.wordIds.some((id) => !progress.learnedWords.includes(id))) ?? lessons[0];
  const lessonProgress = Math.round((activeLesson.wordIds.filter((id) => progress.learnedWords.includes(id)).length / activeLesson.wordIds.length) * 100);
  const hasData = progress.learnedWords.length > 0 || progress.reviewWords.length > 0 || progress.quizHistory.length > 0;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-950">Bảng học tập</h1>
        <p className="mt-3 text-lg text-slate-600">Theo dõi tiến độ học tập được lưu theo tài khoản của bạn.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="grid gap-6">
          {message ? <p className="rounded-2xl bg-orange-50 p-4 font-semibold text-orange-900">{message}</p> : null}
          {!loading && !hasData ? <p className="rounded-2xl bg-blue-50 p-4 font-semibold text-blue-900">Bạn chưa có tiến độ học tập. Hãy bắt đầu với Flashcard hoặc Quiz.</p> : null}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <ProgressCard icon={BookOpenCheck} label="Số từ đã học" value={progress.learnedWords.length} hint="Từ đã đánh dấu biết rồi" />
            <ProgressCard icon={ListChecks} label="Cần ôn lại" value={progress.reviewWords.length} hint="Từ bạn muốn xem lại" />
            <ProgressCard icon={Medal} label="Điểm quiz cao nhất" value={`${progress.bestQuizScore}`} hint="Lưu theo thang 100" />
            <ProgressCard icon={History} label="Quiz gần đây" value={progress.quizHistory.length} hint="Tối đa 5 lượt gần nhất" />
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
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Từ đã xem gần đây</CardTitle></CardHeader>
              <CardContent>
                {recentWords.length ? (
                  <div className="grid gap-3">
                    {recentWords.map((word) => word ? <div key={word.id} className="rounded-2xl bg-slate-50 p-4"><p className="font-black text-slate-950">{word.word}</p><p className="text-sm text-slate-600">{word.category}</p></div> : null)}
                  </div>
                ) : <p className="text-slate-600">Chưa có từ nào được lưu gần đây.</p>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Lịch sử quiz gần đây</CardTitle></CardHeader>
              <CardContent>
                {progress.quizHistory.length ? (
                  <div className="grid gap-3">
                    {progress.quizHistory.map((attempt) => (
                      <div key={attempt.id} className="rounded-2xl bg-slate-50 p-4">
                        <p className="font-black text-slate-950">{attempt.category}</p>
                        <p className="text-sm text-slate-600">{attempt.score} điểm · {attempt.totalQuestions} câu · {new Date(attempt.createdAt).toLocaleDateString("vi-VN")}</p>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-slate-600">Chưa có lượt quiz nào.</p>}
              </CardContent>
            </Card>
          </div>
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
