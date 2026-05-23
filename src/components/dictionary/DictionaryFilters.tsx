"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/vocabularyData";

export function DictionaryFilters({
  search,
  category,
  difficulty,
  onSearch,
  onCategory,
  onDifficulty,
}: {
  search: string;
  category: string;
  difficulty: string;
  onSearch: (value: string) => void;
  onCategory: (value: string) => void;
  onDifficulty: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_220px_180px]">
      <label className="relative">
        <span className="sr-only">Tìm từ tiếng Việt</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <Input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Tìm từ, nghĩa hoặc ví dụ..." className="pl-12" />
      </label>
      <label>
        <span className="sr-only">Lọc theo chủ đề</span>
        <select value={category} onChange={(event) => onCategory(event.target.value)} className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-100">
          <option>Tất cả</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label>
        <span className="sr-only">Lọc theo độ khó</span>
        <select value={difficulty} onChange={(event) => onDifficulty(event.target.value)} className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-100">
          <option value="all">Mọi độ khó</option>
          <option value="easy">Dễ</option>
          <option value="medium">Trung bình</option>
          <option value="hard">Khó</option>
        </select>
      </label>
    </div>
  );
}
