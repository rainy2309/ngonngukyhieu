"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { PlaySquare, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VisualPlaceholder } from "@/components/dictionary/WordCard";
import { difficultyLabel } from "@/lib/utils";
import type { VocabularyItem } from "@/types/vocabulary";

export function WordDetailModal({ item, open, onOpenChange }: { item: VocabularyItem | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-5 shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200">
          {item ? (
            <div className="grid gap-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="text-3xl font-black text-slate-950">{item.word}</Dialog.Title>
                  <Dialog.Description className="mt-2 text-lg leading-8 text-slate-600">{item.meaning}</Dialog.Description>
                </div>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="sm" aria-label="Đóng chi tiết từ"><X className="h-5 w-5" /></Button>
                </Dialog.Close>
              </div>
              <VisualPlaceholder label={item.word} description={item.imageDescription} large />
              <div className="flex flex-wrap gap-2">
                <Badge>{item.category}</Badge>
                <Badge className="bg-emerald-50 text-emerald-800 ring-emerald-100">{difficultyLabel(item.difficulty)}</Badge>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Câu ví dụ</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{item.exampleSentence}</p>
              </div>
              <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50 p-4">
                <div className="mb-2 flex items-center gap-2 font-bold text-blue-900"><PlaySquare className="h-5 w-5" /> Ký hiệu demo</div>
                <p className="text-blue-800">{item.signVideoPlaceholder} Đây là phần giữ chỗ cho video hoặc ảnh ký hiệu, không phải dữ liệu chính thức.</p>
              </div>
              <div>
                <p className="mb-2 font-bold text-slate-900">Từ liên quan</p>
                <div className="flex flex-wrap gap-2">{item.relatedWords.map((word) => <Badge key={word} className="bg-slate-100 text-slate-700 ring-slate-200">{word}</Badge>)}</div>
              </div>
              <p className="rounded-2xl bg-orange-50 p-4 text-sm font-semibold leading-6 text-orange-900">Dữ liệu ký hiệu trong bản demo cần được xác minh bởi giáo viên hoặc nguồn chuyên môn.</p>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
