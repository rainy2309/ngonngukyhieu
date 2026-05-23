"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { Flashcard } from "@/components/learning/Flashcard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { categories, vocabularyData } from "@/data/vocabularyData";
import { setWordForReview, setWordLearned } from "@/lib/progress";

export default function FlashcardsPage() {
  const [category, setCategory] = useState("Tất cả");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cards = useMemo(() => category === "Tất cả" ? vocabularyData : vocabularyData.filter((item) => item.category === category), [category]);
  const current = cards[index % cards.length];
  const progress = ((index + 1) / cards.length) * 100;

  function nextCard() {
    setIndex((value) => (value + 1) % cards.length);
    setFlipped(false);
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-950">Flashcards</h1>
        <p className="mt-3 text-lg text-slate-600">Lật thẻ, tự đánh giá và lưu từ đã biết hoặc cần ôn lại.</p>
      </div>
      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto]">
        <label>
          <span className="mb-2 block font-bold text-slate-800">Chọn chủ đề</span>
          <select value={category} onChange={(event) => { setCategory(event.target.value); setIndex(0); setFlipped(false); }} className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100">
            <option>Tất cả</option>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <div className="self-end rounded-xl bg-white px-4 py-3 font-bold text-slate-700 shadow-sm">Thẻ {index + 1} / {cards.length}</div>
      </div>
      <Progress value={progress} className="mb-5" />
      <Flashcard item={current} flipped={flipped} onFlip={() => setFlipped((value) => !value)} />
      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        <Button variant="secondary" onClick={() => setFlipped((value) => !value)}><RotateCcw className="h-5 w-5" /> Lật thẻ</Button>
        <Button variant="success" onClick={() => { setWordLearned(current.id); nextCard(); }}><CheckCircle2 className="h-5 w-5" /> Biết rồi</Button>
        <Button variant="warning" onClick={() => { setWordForReview(current.id); nextCard(); }}>Cần ôn lại</Button>
        <Button onClick={nextCard}>Từ tiếp theo <ArrowRight className="h-5 w-5" /></Button>
      </div>
    </main>
  );
}
