"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { X } from "lucide-react";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Button } from "@/components/ui/button";
import { articles } from "@/data/articleData";

type Article = (typeof articles)[number];

export default function CommunityPage() {
  const [selected, setSelected] = useState<Article | null>(null);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-950">Góc kiến thức cộng đồng</h1>
        <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">Các bài viết ngắn, tích cực và tôn trọng về giao tiếp với người điếc và khiếm thính.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => <ArticleCard key={article.id} {...article} onOpen={() => setSelected(article)} />)}
      </div>
      <Dialog.Root open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200">
            {selected ? (
              <div className="grid gap-4">
                <div className="flex items-start justify-between gap-4">
                  <Dialog.Title className="text-3xl font-black text-slate-950">{selected.title}</Dialog.Title>
                  <Dialog.Close asChild><Button variant="ghost" size="sm" aria-label="Đóng bài viết"><X className="h-5 w-5" /></Button></Dialog.Close>
                </div>
                {selected.content.map((paragraph) => <p key={paragraph} className="rounded-2xl bg-slate-50 p-4 text-lg leading-8 text-slate-700">{paragraph}</p>)}
              </div>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}
