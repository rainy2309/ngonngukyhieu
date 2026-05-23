"use client";

import { useMemo, useState } from "react";
import { DictionaryFilters } from "@/components/dictionary/DictionaryFilters";
import { WordCard } from "@/components/dictionary/WordCard";
import { WordDetailModal } from "@/components/dictionary/WordDetailModal";
import { addRecentlyViewed } from "@/lib/progress";
import { vocabularyData } from "@/data/vocabularyData";
import type { VocabularyItem } from "@/types/vocabulary";

export default function DictionaryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [difficulty, setDifficulty] = useState("all");
  const [selected, setSelected] = useState<VocabularyItem | null>(null);

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return vocabularyData.filter((item) => {
      const matchesSearch = !normalized || [item.word, item.meaning, item.exampleSentence].some((value) => value.toLowerCase().includes(normalized));
      const matchesCategory = category === "Tất cả" || item.category === category;
      const matchesDifficulty = difficulty === "all" || item.difficulty === difficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [search, category, difficulty]);

  function openItem(item: VocabularyItem) {
    addRecentlyViewed(item.id);
    setSelected(item);
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-950">Từ điển ký hiệu</h1>
        <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">Tra cứu từ tiếng Việt bằng hình ảnh và phần giữ chỗ video ký hiệu. Dữ liệu demo chưa phải nguồn chính thức.</p>
      </div>
      <DictionaryFilters search={search} category={category} difficulty={difficulty} onSearch={setSearch} onCategory={setCategory} onDifficulty={setDifficulty} />
      <p className="my-5 font-semibold text-slate-700">Tìm thấy {filtered.length} từ</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => <WordCard key={item.id} item={item} onOpen={openItem} />)}
      </div>
      <WordDetailModal item={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />
    </main>
  );
}
