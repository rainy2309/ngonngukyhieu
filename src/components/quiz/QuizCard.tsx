"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { QuizQuestion } from "@/types/quiz";

export function QuizCard({ question, selected, onAnswer }: { question: QuizQuestion; selected: string | null; onAnswer: (answer: string) => void }) {
  return (
    <Card>
      <CardHeader>
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">Câu hỏi</p>
        <CardTitle>{question.prompt}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {question.options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = selected && option === question.correctAnswer;
          const isWrong = isSelected && option !== question.correctAnswer;
          return (
            <Button key={option} variant={isCorrect ? "success" : isWrong ? "warning" : "outline"} className="justify-start text-left" onClick={() => onAnswer(option)} disabled={Boolean(selected)}>
              {isCorrect ? <CheckCircle2 className="h-5 w-5" /> : isWrong ? <XCircle className="h-5 w-5" /> : null}
              {option}
            </Button>
          );
        })}
        {selected ? (
          <div className="mt-3 rounded-2xl bg-slate-50 p-4">
            <p className="font-bold text-slate-950">{selected === question.correctAnswer ? "Đúng rồi" : `Đáp án đúng: ${question.correctAnswer}`}</p>
            <p className="mt-1 text-slate-700">{question.explanation}</p>
            <p className="mt-2 font-semibold text-slate-900">{question.exampleSentence}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
