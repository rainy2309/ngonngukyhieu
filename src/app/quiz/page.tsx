"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { QuizCard } from "@/components/quiz/QuizCard";
import { QuizResult } from "@/components/quiz/QuizResult";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { categories } from "@/data/vocabularyData";
import { createQuizQuestions, saveQuizAttempt } from "@/lib/quiz";
import type { QuizAnswer, QuizQuestion } from "@/types/quiz";

export default function QuizPage() {
  const [category, setCategory] = useState("Tất cả");
  const [count, setCount] = useState(6);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [message, setMessage] = useState("");

  const current = questions[index];
  const done = questions.length > 0 && answers.length === questions.length;
  const score = useMemo(() => answers.length ? Math.round((answers.filter((answer) => answer.isCorrect).length / questions.length) * 100) : 0, [answers, questions.length]);

  function startQuiz() {
    setQuestions(createQuizQuestions(category, count));
    setAnswers([]);
    setIndex(0);
    setSelected(null);
    setMessage("");
  }

  async function answerQuestion(answer: string) {
    if (!current || selected) return;
    setSelected(answer);
    const nextAnswers = [...answers, { question: current, selectedAnswer: answer, isCorrect: answer === current.correctAnswer }];
    setAnswers(nextAnswers);

    if (nextAnswers.length === questions.length) {
      const finalScore = Math.round((nextAnswers.filter((item) => item.isCorrect).length / questions.length) * 100);
      try {
        await saveQuizAttempt(category, finalScore, questions.length);
      } catch {
        setMessage("Không thể lưu tiến độ. Vui lòng thử lại.");
      }
    }
  }

  function nextQuestion() {
    setIndex((value) => value + 1);
    setSelected(null);
  }

  if (!questions.length) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-950">Quiz trắc nghiệm</h1>
          <p className="mt-3 text-lg leading-8 text-slate-600">Chọn chủ đề và số câu. Quiz gồm nhận diện từ qua hình/ký hiệu demo, chọn nghĩa và chọn chủ đề.</p>
        </div>
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <label><span className="mb-2 block font-bold">Chủ đề</span><select value={category} onChange={(event) => setCategory(event.target.value)} className="min-h-12 w-full rounded-xl border border-slate-200 px-4 font-semibold"><option>Tất cả</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span className="mb-2 block font-bold">Số câu hỏi</span><select value={count} onChange={(event) => setCount(Number(event.target.value))} className="min-h-12 w-full rounded-xl border border-slate-200 px-4 font-semibold"><option value={5}>5 câu</option><option value={6}>6 câu</option><option value={10}>10 câu</option></select></label>
          <Button onClick={startQuiz} size="lg"><Play className="h-5 w-5" /> Bắt đầu quiz</Button>
        </div>
      </main>
    );
  }

  if (done) {
    return (
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        {message ? <p className="mb-5 rounded-2xl bg-orange-50 p-4 font-semibold text-orange-900">{message}</p> : null}
        <QuizResult answers={answers} onRestart={() => { setQuestions([]); setAnswers([]); setSelected(null); setMessage(""); }} />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div><h1 className="text-4xl font-black text-slate-950">Quiz</h1><p className="mt-2 text-slate-600">Câu {index + 1}/{questions.length} · Điểm tạm tính {score}</p></div>
        <Button variant="secondary" onClick={() => setQuestions([])}>Đổi chủ đề</Button>
      </div>
      <Progress value={(index / questions.length) * 100} className="mb-5" />
      <QuizCard question={current} selected={selected} onAnswer={(answer) => void answerQuestion(answer)} />
      {selected ? <Button className="mt-5 w-full sm:w-auto" onClick={nextQuestion}>Câu tiếp theo <ArrowRight className="h-5 w-5" /></Button> : null}
    </main>
  );
}
