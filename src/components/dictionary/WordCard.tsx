"use client";

import { Eye, PlaySquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { difficultyLabel } from "@/lib/utils";
import type { VocabularyItem } from "@/types/vocabulary";

export function VisualPlaceholder({ label, description, large = false }: { label: string; description: string; large?: boolean }) {
  return (
    <div className={`grid place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-center ${large ? "min-h-64 p-8" : "min-h-40 p-5"}`}>
      <div>
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm">
          <Eye aria-hidden="true" />
        </div>
        <p className="text-lg font-black text-blue-900">{label}</p>
        <p className="mt-1 text-sm leading-6 text-blue-800">{description}</p>
      </div>
    </div>
  );
}

export function WordCard({ item, onOpen }: { item: VocabularyItem; onOpen: (item: VocabularyItem) => void }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader>
        <VisualPlaceholder label={item.word} description={item.imageDescription} />
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge>{item.category}</Badge>
          <Badge className="bg-emerald-50 text-emerald-800 ring-emerald-100">{difficultyLabel(item.difficulty)}</Badge>
        </div>
        <CardTitle>{item.word}</CardTitle>
      </CardHeader>
      <CardContent className="mt-auto grid gap-4">
        <p className="leading-7 text-slate-600">{item.meaning}</p>
        <Button variant="outline" className="justify-start" aria-label={`Mở video demo ký hiệu cho từ ${item.word}`}>
          <PlaySquare className="h-5 w-5" aria-hidden="true" />
          Video ký hiệu demo
        </Button>
        <Button onClick={() => onOpen(item)}>Xem chi tiết</Button>
      </CardContent>
    </Card>
  );
}
