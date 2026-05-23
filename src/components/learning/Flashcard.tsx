"use client";

import { PlaySquare, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VisualPlaceholder } from "@/components/dictionary/WordCard";
import type { VocabularyItem } from "@/types/vocabulary";

export function Flashcard({ item, flipped, onFlip }: { item: VocabularyItem; flipped: boolean; onFlip: () => void }) {
  return (
    <Card className="min-h-[420px]">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <Badge>{item.category}</Badge>
          <Button variant="secondary" onClick={onFlip}><RotateCcw className="h-5 w-5" /> Lật thẻ</Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5">
        {!flipped ? (
          <>
            <VisualPlaceholder label="Gợi ý hình ảnh" description={item.imageDescription} large />
            <p className="text-center text-lg font-semibold text-slate-700">Quan sát hình và đoán từ tiếng Việt.</p>
          </>
        ) : (
          <div className="grid gap-4">
            <CardTitle className="text-4xl">{item.word}</CardTitle>
            <p className="text-xl leading-8 text-slate-700">{item.meaning}</p>
            <p className="rounded-2xl bg-slate-50 p-4 text-lg font-semibold text-slate-900">{item.exampleSentence}</p>
            <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50 p-4 text-blue-900">
              <div className="mb-2 flex items-center gap-2 font-bold"><PlaySquare className="h-5 w-5" /> Video ký hiệu demo</div>
              <p>{item.signVideoPlaceholder} Nội dung này là phần giữ chỗ cho demo.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
