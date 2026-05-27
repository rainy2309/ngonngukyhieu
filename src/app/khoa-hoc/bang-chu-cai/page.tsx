"use client";

import { useState } from "react";
import { CheckCircle2, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { learningStorageKeys, saveLearningItem } from "@/lib/localLearning";

const letters = ["A", "Ă", "Â", "B", "C", "D", "Đ", "E", "Ê", "G", "H", "I", "K", "L", "M", "N", "O", "Ô", "Ơ", "P", "Q", "R", "S", "T", "U", "Ư", "V", "X", "Y"];

function saveViewedCourse() {
  saveLearningItem(learningStorageKeys.viewedLessons, { id: "khoa-hoc-bang-chu-cai", label: "Ký hiệu bảng chữ cái" });
}

export default function AlphabetCoursePage() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [learned, setLearned] = useState<string[]>([]);

  function markLearned(letter: string) {
    saveViewedCourse();
    saveLearningItem(learningStorageKeys.learned, { id: `letter-${letter}`, label: `Chữ ${letter}` });
    setLearned((current) => (current.includes(letter) ? current : [letter, ...current]));
  }

  function openDetail(letter: string) {
    saveViewedCourse();
    setSelectedLetter(letter);
  }

  return (
    <main className="flex-1 bg-gradient-to-b from-blue-50 via-white to-white px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black text-slate-950">Ký hiệu bảng chữ cái</h1>
          <p className="mt-4 text-lg font-semibold leading-8 text-slate-600">Học ký hiệu từng chữ cái để làm nền tảng cho việc ghép từ.</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {letters.map((letter) => (
            <article key={letter} className="rounded-[1.75rem] border border-blue-100 bg-white p-4 shadow-lg shadow-blue-100/50">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-5xl font-black text-blue-700">{letter}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-600">Ký hiệu minh họa cho chữ {letter}.</p>
                </div>
                {learned.includes(letter) ? <CheckCircle2 className="h-6 w-6 text-emerald-600" aria-label="Đã học" /> : null}
              </div>
              <div className="mt-4 aspect-video rounded-3xl border border-dashed border-blue-200 bg-blue-50 p-4 text-center">
                <p className="font-black text-blue-800">GIF/Video minh họa ký hiệu chữ {letter}</p>
                <p className="mt-2 text-xs font-semibold text-slate-500">Nội dung minh họa sẽ được nhóm bổ sung hoặc xác minh ở giai đoạn sau.</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="secondary" className="rounded-full" onClick={() => openDetail(letter)}>
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  Xem ký hiệu
                </Button>
                <Button className="rounded-full" onClick={() => markLearned(letter)}>
                  Đã học
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedLetter ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 px-4">
          <section className="w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase text-blue-600">Chi tiết ký hiệu</p>
                <h2 className="mt-1 text-4xl font-black text-slate-950">Chữ {selectedLetter}</h2>
              </div>
              <Button variant="ghost" className="h-11 w-11 rounded-full p-0" onClick={() => setSelectedLetter(null)} aria-label="Đóng">
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
            <div className="mt-5 aspect-video rounded-3xl border border-dashed border-blue-200 bg-blue-50 p-5 text-center">
              <p className="font-black text-blue-800">GIF/Video minh họa ký hiệu chữ {selectedLetter}</p>
              <p className="mt-2 text-sm font-semibold text-slate-500">Minh họa cách tạo ký hiệu cho chữ này sẽ được nhóm bổ sung sau.</p>
            </div>
            <p className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm font-semibold leading-6 text-orange-900">Ký hiệu minh họa trong bản demo cần được xác minh bởi nguồn chuyên môn.</p>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <Button variant="outline" className="rounded-full" onClick={() => setSelectedLetter(null)}>
                Đóng
              </Button>
              <Button className="rounded-full" onClick={() => markLearned(selectedLetter)}>
                Đã học
              </Button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
