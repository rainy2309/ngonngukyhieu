"use client";

import { useState } from "react";
import { Keyboard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { learningStorageKeys, saveLearningItem } from "@/lib/localLearning";

const practiceWords = ["mẹ", "ba", "ăn", "học", "nhà", "sách", "cảm ơn", "xin chào", "hôm nay", "yêu thương"];

const toneGroups = [
  { name: "dấu sắc", pattern: /[áéíóúýắấếốớứ]/i },
  { name: "dấu huyền", pattern: /[àèìòùỳằầềồờừ]/i },
  { name: "dấu hỏi", pattern: /[ảẻỉỏủỷẳẩểổởử]/i },
  { name: "dấu ngã", pattern: /[ãẽĩõũỹẵẫễỗỡữ]/i },
  { name: "dấu nặng", pattern: /[ạẹịọụỵặậệộợự]/i },
];

function removeToneMarks(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function splitWord(word: string) {
  return Array.from(removeToneMarks(word.toUpperCase()).replace(/[^A-ZĂÂĐÊÔƠƯ]/g, ""));
}

function detectTones(word: string) {
  return toneGroups.filter((tone) => tone.pattern.test(word)).map((tone) => tone.name);
}

export default function WordBuilderPage() {
  const [word, setWord] = useState("mẹ");
  const [submittedWord, setSubmittedWord] = useState("mẹ");

  function practice(nextWord = word) {
    const trimmed = nextWord.trim();
    if (!trimmed) return;
    setWord(trimmed);
    setSubmittedWord(trimmed);
    saveLearningItem(learningStorageKeys.viewedLessons, { id: `ghep-tu-${trimmed.toLowerCase()}`, label: `Ghép từ: ${trimmed}` });
  }

  const letters = splitWord(submittedWord);
  const tones = detectTones(submittedWord);

  return (
    <main className="flex-1 bg-gradient-to-b from-blue-50 via-white to-white px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black text-slate-950">Ghép từ</h1>
          <p className="mt-4 text-lg font-semibold leading-8 text-slate-600">Luyện ghép các chữ cái và dấu tiếng Việt để tạo thành từ.</p>
        </div>

        <div className="mt-8 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-blue-100/50 md:p-6">
          <label className="grid gap-3">
            <span className="font-black text-slate-900">Nhập từ hoặc cụm từ ngắn</span>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input value={word} onChange={(event) => setWord(event.target.value)} placeholder="Ví dụ: mẹ, ăn, cảm ơn" className="min-h-12 text-base" />
              <Button onClick={() => practice()} className="min-h-12 rounded-full">
                <Keyboard className="h-5 w-5" aria-hidden="true" />
                Ghép từ
              </Button>
            </div>
          </label>

          <p className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm font-semibold leading-6 text-orange-900">Phần ghép từ trong MVP mang tính mô phỏng học tập, chưa thay thế quy tắc ký hiệu chuẩn.</p>
        </div>

        <section className="mt-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-700" aria-hidden="true" />
            <h2 className="text-2xl font-black text-slate-950">Kết quả ghép từ: “{submittedWord}”</h2>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {letters.map((letter, index) => (
              <article key={`${letter}-${index}`} className="rounded-[1.5rem] border border-blue-100 bg-white p-4 text-center shadow-lg shadow-blue-100/50">
                <p className="text-4xl font-black text-blue-700">{letter}</p>
                <div className="mt-4 aspect-video rounded-2xl border border-dashed border-blue-200 bg-blue-50 p-3">
                  <p className="text-sm font-black text-blue-800">GIF/Video minh họa ký hiệu chữ {letter}</p>
                </div>
              </article>
            ))}
            {tones.map((tone) => (
              <article key={tone} className="rounded-[1.5rem] border border-orange-100 bg-orange-50 p-4 text-center shadow-lg shadow-orange-100/50">
                <p className="text-xl font-black text-orange-800">{tone}</p>
                <p className="mt-2 text-sm font-semibold text-orange-900">Dấu thanh được nhận diện để người học chú ý khi ghép từ.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-black text-slate-950">Từ gợi ý luyện tập</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {practiceWords.map((item) => (
              <Button key={item} variant="secondary" className="rounded-full" onClick={() => practice(item)}>
                {item}
              </Button>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
