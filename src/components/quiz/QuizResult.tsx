"use client";

import { RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { QuizAnswer } from "@/types/quiz";

export function QuizResult({ answers, onRestart }: { answers: QuizAnswer[]; onRestart: () => void }) {
  const correct = answers.filter((answer) => answer.isCorrect).length;
  const score = Math.round((correct / answers.length) * 100);
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <Trophy className="h-8 w-8" aria-hidden="true" />
        </div>
        <CardTitle className="text-4xl">Kết quả: {score} điểm</CardTitle>
        <p className="text-lg text-slate-600">Đúng {correct}/{answers.length} câu</p>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3">
          {answers.map((answer, index) => (
            <div key={answer.question.id} className="rounded-2xl border border-slate-200 p-4">
              <p className="font-bold text-slate-900">Câu {index + 1}: {answer.question.prompt}</p>
              <p className="mt-1 text-slate-700">Bạn chọn: {answer.selectedAnswer}</p>
              <p className={answer.isCorrect ? "font-semibold text-emerald-700" : "font-semibold text-orange-700"}>{answer.isCorrect ? "Đúng" : `Chưa đúng. Đáp án: ${answer.question.correctAnswer}`}</p>
            </div>
          ))}
        </div>
        <Button onClick={onRestart}><RotateCcw className="h-5 w-5" /> Làm lại</Button>
      </CardContent>
    </Card>
  );
}
