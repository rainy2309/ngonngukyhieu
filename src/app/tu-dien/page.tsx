"use client";

import { useMemo, useState } from "react";
import { Bookmark, CheckCircle2, ExternalLink, Hand, PlayCircle, Search, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/common/SectionCard";
import { signCategories, signDictionaryData, signRegions, type SignDictionaryItem } from "@/data/signDictionaryData";
import { getDictionaryLetterId, groupDictionaryByLetter, normalizeVietnameseText, vietnameseAlphabet } from "@/lib/vietnameseText";

const favoriteKey = "cham_favorite_signs";
const learnedKey = "cham_learned_signs";

const difficultyLabels = {
  easy: "Dễ",
  medium: "Trung bình",
  hard: "Khó",
};

const regionLabels = {
  HN: "Hà Nội",
  HP: "Hải Phòng",
  HCM: "TP.HCM",
  "Toàn quốc": "Toàn quốc",
  "Chưa xác định": "Chưa xác định",
};

function readLocalArray(key: string) {
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function saveUnique(key: string, id: string) {
  const current = readLocalArray(key);
  window.localStorage.setItem(key, JSON.stringify(Array.from(new Set([...current, id]))));
}

function scrollToLetter(letter: string) {
  document.getElementById(getDictionaryLetterId(letter))?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function DictionaryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [region, setRegion] = useState("Tất cả");
  const [difficulty, setDifficulty] = useState("Tất cả");
  const [selected, setSelected] = useState<SignDictionaryItem | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const normalizedQuery = normalizeVietnameseText(query);
    return signDictionaryData
      .filter((item) => {
        const matchesCategory = category === "Tất cả" || item.category === category;
        const matchesRegion = region === "Tất cả" || item.region === region;
        const matchesDifficulty = difficulty === "Tất cả" || item.difficulty === difficulty;
        const searchable = [
          item.word,
          item.normalizedWord,
          item.meaning,
          item.category,
          item.exampleSentence,
          item.description,
          ...item.relatedWords,
        ].map(normalizeVietnameseText).join(" ");
        const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
        return matchesCategory && matchesRegion && matchesDifficulty && matchesQuery;
      })
      .sort((a, b) => a.normalizedWord.localeCompare(b.normalizedWord, "vi"));
  }, [query, category, region, difficulty]);

  const grouped = useMemo(() => groupDictionaryByLetter(filtered), [filtered]);
  const lettersWithData = new Set(grouped.filter((group) => group.items.length).map((group) => group.letter));

  function toggleFavorite(id: string) {
    const current = readLocalArray(favoriteKey);
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    window.localStorage.setItem(favoriteKey, JSON.stringify(next));
    setFavoriteIds(next);
  }

  function markLearned(id: string) {
    saveUnique(learnedKey, id);
  }

  return (
    <main className="flex-1 bg-gradient-to-b from-blue-50 to-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="font-black uppercase tracking-[0.25em] text-blue-500">CHẠM</p>
          <h1 className="mt-3 text-4xl font-black text-slate-950 sm:text-5xl">Từ điển ký hiệu</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">Tra cứu nhanh từ vựng, cụm từ và ký hiệu thông dụng trong đời sống hằng ngày.</p>
        </div>

        <SectionCard className="mb-6">
          <div className="flex items-center gap-3 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-lg shadow-blue-100/50">
            <Search className="h-6 w-6 shrink-0 text-blue-500" aria-hidden="true" />
            <label className="sr-only" htmlFor="dictionary-search">Tìm kiếm từ điển</label>
            <input
              id="dictionary-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm từ, cụm từ hoặc chủ đề ký hiệu..."
              className="min-h-12 flex-1 bg-transparent text-base font-semibold text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <FilterSelect label="Chủ đề" value={category} onChange={setCategory} options={["Tất cả", ...signCategories]} />
            <FilterSelect label="Khu vực" value={region} onChange={setRegion} options={["Tất cả", ...signRegions]} getLabel={(value) => value === "Tất cả" ? value : regionLabels[value as keyof typeof regionLabels]} />
            <FilterSelect label="Độ khó" value={difficulty} onChange={setDifficulty} options={["Tất cả", "easy", "medium", "hard"]} getLabel={(value) => value === "Tất cả" ? value : difficultyLabels[value as keyof typeof difficultyLabels]} />
          </div>

          <div className="sticky top-28 z-20 mt-5 flex gap-2 overflow-x-auto rounded-full bg-white/95 py-2 md:hidden">
            {vietnameseAlphabet.map((letter) => (
              <button key={letter} type="button" disabled={!lettersWithData.has(letter)} onClick={() => scrollToLetter(letter)} className={`h-9 min-w-9 rounded-full text-sm font-black ${lettersWithData.has(letter) ? "bg-blue-50 text-blue-700" : "bg-slate-50 text-slate-300"}`}>
                {letter}
              </button>
            ))}
          </div>

          <p className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm font-semibold leading-6 text-blue-900">Dữ liệu ký hiệu trong từ điển là nội dung minh họa cho demo. Ký hiệu có thể khác nhau theo vùng và cần được xác minh bởi giáo viên hoặc nguồn chuyên môn.</p>
        </SectionCard>

        <div className="grid gap-6 md:grid-cols-[1fr_auto]">
          <div className="space-y-10">
            {filtered.length ? grouped.map((group) => group.items.length ? (
              <section key={group.letter} id={getDictionaryLetterId(group.letter)} className="scroll-mt-36">
                <h2 className="mb-4 flex items-center gap-3 text-4xl font-black text-blue-700">
                  {group.letter}
                  <span className="h-px flex-1 bg-blue-100" />
                </h2>
                <div className="grid gap-4 lg:grid-cols-2">
                  {group.items.map((item) => (
                    <DictionaryCard key={item.id} item={item} favorite={favoriteIds.includes(item.id)} onFavorite={() => toggleFavorite(item.id)} onOpen={() => setSelected(item)} />
                  ))}
                </div>
              </section>
            ) : null) : <p className="rounded-3xl bg-blue-50 p-8 text-center text-lg font-bold text-blue-900">Chưa tìm thấy nội dung phù hợp. Hãy thử từ khóa khác.</p>}
          </div>

          <aside className="sticky top-28 hidden h-fit rounded-full border border-blue-100 bg-white p-2 shadow-lg shadow-blue-100/60 md:block" aria-label="Chỉ mục chữ cái">
            <div className="grid gap-1">
              {vietnameseAlphabet.map((letter) => (
                <button key={letter} type="button" disabled={!lettersWithData.has(letter)} onClick={() => scrollToLetter(letter)} className={`grid h-8 w-8 place-items-center rounded-full text-xs font-black transition ${lettersWithData.has(letter) ? "text-blue-700 hover:bg-blue-50" : "text-slate-300"}`}>
                  {letter}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <SignDetailModal item={selected} onClose={() => setSelected(null)} onFavorite={toggleFavorite} onLearned={markLearned} />
    </main>
  );
}

function FilterSelect({ label, value, onChange, options, getLabel }: { label: string; value: string; onChange: (value: string) => void; options: string[]; getLabel?: (value: string) => string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-12 rounded-2xl border border-blue-100 bg-white px-4 font-bold text-slate-800 outline-none focus:ring-4 focus:ring-blue-100">
        {options.map((option) => <option key={option} value={option}>{getLabel ? getLabel(option) : option}</option>)}
      </select>
    </label>
  );
}

function DictionaryCard({ item, favorite, onFavorite, onOpen }: { item: SignDictionaryItem; favorite: boolean; onFavorite: () => void; onOpen: () => void }) {
  return (
    <article className="rounded-[1.75rem] border border-blue-100 bg-white p-5 shadow-lg shadow-blue-100/50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-slate-950">{item.word}</h3>
          <p className="mt-2 leading-7 text-slate-600">{item.meaning}</p>
        </div>
        <button type="button" onClick={onFavorite} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100" aria-label={favorite ? `Bỏ yêu thích ${item.word}` : `Lưu yêu thích ${item.word}`}>
          <Bookmark className={favorite ? "h-5 w-5 fill-blue-600" : "h-5 w-5"} aria-hidden="true" />
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>{item.category}</Badge>
        <Badge className="bg-sky-50 text-sky-800 ring-sky-100">{regionLabels[item.region]}</Badge>
        <Badge className="bg-emerald-50 text-emerald-800 ring-emerald-100">{difficultyLabels[item.difficulty]}</Badge>
      </div>
      <p className="mt-4 rounded-2xl bg-slate-50 p-4 font-semibold text-slate-700">{item.exampleSentence}</p>
      <MediaPlaceholder />
      <Button onClick={onOpen} className="mt-4 rounded-full">Xem ký hiệu</Button>
    </article>
  );
}

function MediaPlaceholder() {
  return (
    <div className="mt-4 rounded-2xl border border-dashed border-blue-200 bg-blue-50 p-4 text-blue-900">
      <div className="mb-2 flex items-center gap-2 font-black"><PlayCircle className="h-5 w-5" /> GIF/Video minh họa ký hiệu</div>
      <p className="text-sm leading-6">Nội dung minh họa sẽ được nhóm bổ sung hoặc xác minh ở giai đoạn sau.</p>
    </div>
  );
}

function SignDetailModal({ item, onClose, onFavorite, onLearned }: { item: SignDictionaryItem | null; onClose: () => void; onFavorite: (id: string) => void; onLearned: (id: string) => void }) {
  return (
    <Dialog.Root open={Boolean(item)} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-100">
          {item ? (
            <div className="grid gap-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="text-4xl font-black text-blue-700">{item.word}</Dialog.Title>
                  <Dialog.Description className="mt-2 text-lg leading-8 text-slate-600">{item.meaning}</Dialog.Description>
                </div>
                <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700"><X className="h-5 w-5" /></button>
              </div>
              <MediaPlaceholder />
              <div className="flex flex-wrap gap-2">
                <Badge>{item.category}</Badge>
                <Badge className="bg-sky-50 text-sky-800 ring-sky-100">{regionLabels[item.region]}</Badge>
                <Badge className="bg-emerald-50 text-emerald-800 ring-emerald-100">{difficultyLabels[item.difficulty]}</Badge>
              </div>
              <p className="rounded-2xl bg-slate-50 p-4 text-lg font-semibold text-slate-800">{item.exampleSentence}</p>
              <div>
                <h3 className="mb-3 text-xl font-black text-slate-950">Mô tả từng bước</h3>
                <ol className="grid gap-2">
                  {item.signSteps.map((step, index) => <li key={step} className="rounded-2xl bg-blue-50 p-3 font-semibold text-blue-900">{index + 1}. {step}</li>)}
                </ol>
              </div>
              <div>
                <h3 className="mb-3 text-xl font-black text-slate-950">Từ liên quan</h3>
                <div className="flex flex-wrap gap-2">{item.relatedWords.map((word) => <Badge key={word} className="bg-slate-100 text-slate-700 ring-slate-200">{word}</Badge>)}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-bold text-slate-800">Nguồn: {item.sourceName ?? "Chưa xác định"}</p>
                {item.sourceUrl ? <a className="mt-1 inline-flex items-center gap-1 font-bold text-blue-700" href={item.sourceUrl} target="_blank" rel="noreferrer">Xem nguồn <ExternalLink className="h-4 w-4" /></a> : null}
              </div>
              <p className="rounded-2xl bg-orange-50 p-4 font-semibold leading-7 text-orange-900">Ký hiệu có thể khác nhau theo vùng. Nội dung trong bản demo cần được xác minh bởi giáo viên hoặc nguồn chuyên môn.</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <Button variant="secondary" className="rounded-full" onClick={() => onFavorite(item.id)}><Bookmark className="h-5 w-5" /> Lưu yêu thích</Button>
                <Button variant="success" className="rounded-full" onClick={() => onLearned(item.id)}><CheckCircle2 className="h-5 w-5" /> Đánh dấu đã học</Button>
                <Button variant="outline" className="rounded-full" onClick={onClose}>Đóng</Button>
              </div>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
