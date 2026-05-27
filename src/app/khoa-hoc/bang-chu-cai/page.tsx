"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bookmark, Check, CheckCircle2, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { alphabetSignData, type AlphabetSignItem } from "@/data/alphabetSignData";
import { learningStorageKeys, saveLearningItem } from "@/lib/localLearning";

const learnedAlphabetKey = "cham_learned_alphabet";
const learnedSignsKey = "cham_learned_signs";
const favoriteSignsKey = "cham_favorite_signs";

function readStringArray(key: string) {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "[]") as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;
          return String(record.id ?? record.label ?? "");
        }
        return "";
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function saveUniqueString(key: string, id: string) {
  if (typeof window === "undefined") return [];

  const next = Array.from(new Set([id, ...readStringArray(key)]));
  window.localStorage.setItem(key, JSON.stringify(next));
  return next;
}

function saveViewedCourse() {
  saveLearningItem(learningStorageKeys.viewedLessons, { id: "bang-chu-cai", label: "Ký hiệu bảng chữ cái" });
}

function MediaPlaceholder({ item }: { item: AlphabetSignItem }) {
  return (
    <div className="aspect-video w-full rounded-[1.75rem] border border-dashed border-blue-200 bg-blue-50 p-5 text-center text-blue-900 shadow-inner">
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <PlayCircle className="h-10 w-10 text-blue-600" aria-hidden="true" />
        <p className="text-base font-black sm:text-lg">{item.videoPlaceholder}</p>
        <p className="max-w-md text-xs font-semibold leading-6 text-slate-500 sm:text-sm">Nội dung minh họa sẽ được nhóm bổ sung hoặc xác minh ở giai đoạn sau.</p>
      </div>
    </div>
  );
}

export default function AlphabetCoursePage() {
  const [selectedId, setSelectedId] = useState(alphabetSignData[0]?.id ?? "");
  const [learnedIds, setLearnedIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const detailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLearnedIds(readStringArray(learnedAlphabetKey));
    setFavoriteIds(readStringArray(favoriteSignsKey));
    saveViewedCourse();
  }, []);

  const selectedIndex = useMemo(() => alphabetSignData.findIndex((item) => item.id === selectedId), [selectedId]);
  const selectedItem = alphabetSignData[selectedIndex] ?? alphabetSignData[0];
  const totalLetters = alphabetSignData.length;

  function selectLetter(id: string, shouldScroll = true) {
    setSelectedId(id);
    if (shouldScroll) {
      window.setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }

  function markLearned() {
    const next = saveUniqueString(learnedAlphabetKey, selectedItem.id);
    saveUniqueString(learnedSignsKey, `alphabet-${selectedItem.id}`);
    setLearnedIds(next);
  }

  function saveFavorite() {
    const next = saveUniqueString(favoriteSignsKey, selectedItem.id);
    setFavoriteIds(next);
  }

  function goToIndex(index: number) {
    const next = alphabetSignData[index];
    if (next) selectLetter(next.id);
  }

  if (!alphabetSignData.length) {
    return (
      <main className="flex-1 bg-gradient-to-b from-blue-50 via-white to-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-blue-100 bg-white p-6 text-center font-bold text-blue-900 shadow-xl shadow-blue-100/60">Chưa có dữ liệu bảng chữ cái.</div>
      </main>
    );
  }

  const selectedIsLearned = learnedIds.includes(selectedItem.id);
  const selectedIsFavorite = favoriteIds.includes(selectedItem.id);

  return (
    <main className="flex-1 bg-gradient-to-b from-blue-50 via-white to-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-5 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-blue-100/60 sm:p-7 lg:grid-cols-[1.4fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-blue-600">Khóa học</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl lg:text-5xl">Ký hiệu bảng chữ cái</h1>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600 sm:text-lg sm:leading-8">Chọn một chữ cái để xem minh họa ký hiệu, cách thực hiện và ghi chú học tập.</p>
          </div>
          <div className="rounded-[1.5rem] bg-blue-50 px-5 py-4 text-blue-900">
            <p className="text-sm font-black uppercase">Tiến độ</p>
            <p className="mt-1 text-2xl font-black">Đã học: {learnedIds.length} / {totalLetters} chữ</p>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-blue-100 bg-white p-4 shadow-lg shadow-blue-100/50 sm:p-5">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0" aria-label="Chọn chữ cái">
            {alphabetSignData.map((item) => {
              const active = item.id === selectedItem.id;
              const learned = learnedIds.includes(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Xem ký hiệu chữ ${item.letter}`}
                  aria-pressed={active}
                  onClick={() => selectLetter(item.id)}
                  className={`relative flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border px-4 text-base font-black transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 ${
                    active ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100" : "border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
                  }`}
                >
                  {item.letter}
                  {learned ? (
                    <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-white" aria-label="Đã học">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div ref={detailRef} className="scroll-mt-28">
          <section className="mt-6 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-blue-100/60 sm:p-7">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-7xl font-black leading-none text-blue-700 sm:text-8xl">{selectedItem.letter}</p>
                    <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">{selectedItem.title}</h2>
                  </div>
                  {selectedIsLearned ? <CheckCircle2 className="h-9 w-9 shrink-0 text-emerald-600" aria-label="Đã học" /> : null}
                </div>
                <MediaPlaceholder item={selectedItem} />
              </div>

              <div className="grid gap-5">
                <div className="flex flex-wrap gap-2">
                  <Badge>{selectedItem.category}</Badge>
                  <Badge className="bg-emerald-50 text-emerald-800 ring-emerald-100">Cơ bản</Badge>
                  {selectedIsFavorite ? <Badge className="bg-orange-50 text-orange-800 ring-orange-100">Đã lưu yêu thích</Badge> : null}
                </div>

                <section>
                  <h3 className="text-xl font-black text-slate-950">Mô tả ngắn</h3>
                  <p className="mt-2 rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-700 sm:text-base">{selectedItem.description}</p>
                </section>

                <section>
                  <h3 className="text-xl font-black text-slate-950">Cách thực hiện</h3>
                  <ul className="mt-3 grid gap-2">
                    {selectedItem.instructions.map((instruction) => (
                      <li key={instruction} className="rounded-2xl bg-blue-50 p-3 text-sm font-semibold leading-6 text-blue-900 sm:text-base">
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-black text-slate-950">Lưu ý khi học</h3>
                  <ul className="mt-3 grid gap-2">
                    {selectedItem.tips.map((tip) => (
                      <li key={tip} className="rounded-2xl bg-orange-50 p-3 text-sm font-semibold leading-6 text-orange-900 sm:text-base">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="grid gap-2 sm:grid-cols-2">
                  <Button className="w-full rounded-full" onClick={markLearned}>
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    Đánh dấu đã học
                  </Button>
                  <Button variant="secondary" className="w-full rounded-full" onClick={saveFavorite}>
                    <Bookmark className={selectedIsFavorite ? "h-5 w-5 fill-blue-700" : "h-5 w-5"} aria-hidden="true" />
                    Lưu yêu thích
                  </Button>
                  <Button variant="outline" className="w-full rounded-full" disabled={selectedIndex <= 0} onClick={() => goToIndex(selectedIndex - 1)}>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    Chữ trước
                  </Button>
                  <Button variant="outline" className="w-full rounded-full" disabled={selectedIndex >= totalLetters - 1} onClick={() => goToIndex(selectedIndex + 1)}>
                    Chữ tiếp theo
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
