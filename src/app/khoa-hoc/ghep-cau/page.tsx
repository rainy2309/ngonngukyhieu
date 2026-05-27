"use client";

import { useState } from "react";
import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { learningStorageKeys, saveLearningItem } from "@/lib/localLearning";

const examples = [
  "Xin chào, bạn khỏe không?",
  "Tôi cần giúp đỡ.",
  "Nhà vệ sinh ở đâu?",
  "Tôi muốn mua nước.",
  "Tôi bị đau đầu.",
  "Cảm ơn bạn.",
  "Hôm nay tôi đi học.",
  "Bạn có thể viết ra giấy không?",
];

const knownMeanings: Record<string, string> = {
  "xin chào": "lời chào thân thiện",
  "cảm ơn": "thể hiện sự biết ơn",
  bạn: "người cùng giao tiếp",
  khỏe: "trạng thái cơ thể tốt",
  giúp: "hỗ trợ người khác",
  nhà: "nơi ở hoặc địa điểm",
  mua: "trao tiền để lấy hàng hóa",
  nước: "đồ uống hoặc chất lỏng",
  đau: "cảm giác khó chịu ở cơ thể",
  "hôm nay": "ngày hiện tại",
  học: "tiếp nhận kiến thức",
  viết: "tạo chữ trên giấy hoặc màn hình",
};

const situationCards = [
  { topic: "Chào hỏi", sentence: "Xin chào, bạn khỏe không?", meaning: "Mở đầu cuộc trò chuyện lịch sự." },
  { topic: "Hỏi đường", sentence: "Nhà vệ sinh ở đâu?", meaning: "Hỏi vị trí cần tìm." },
  { topic: "Mua sắm", sentence: "Tôi muốn mua nước.", meaning: "Nói nhu cầu khi mua hàng." },
  { topic: "Bệnh viện", sentence: "Tôi bị đau đầu.", meaning: "Mô tả tình trạng sức khỏe." },
  { topic: "Trường học", sentence: "Hôm nay tôi đi học.", meaning: "Nói hoạt động trong ngày." },
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9đ\s]/gi, "")
    .trim();
}

function splitSentence(sentence: string) {
  return sentence
    .replace(/[.,!?;:]/g, "")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);
}

export default function SentenceBuilderPage() {
  const [sentence, setSentence] = useState(examples[0]);
  const [submittedSentence, setSubmittedSentence] = useState(examples[0]);

  function practice(nextSentence = sentence) {
    const trimmed = nextSentence.trim();
    if (!trimmed) return;
    setSentence(trimmed);
    setSubmittedSentence(trimmed);
    saveLearningItem(learningStorageKeys.viewedLessons, { id: `ghep-cau-${trimmed.toLowerCase()}`, label: `Ghép câu: ${trimmed}` });
  }

  const words = splitSentence(submittedSentence);

  return (
    <main className="flex-1 bg-gradient-to-b from-blue-50 via-white to-white px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black text-slate-950">Ghép câu</h1>
          <p className="mt-4 text-lg font-semibold leading-8 text-slate-600">Luyện ghép các từ thành câu giao tiếp thường dùng trong đời sống.</p>
        </div>

        <div className="mt-8 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-blue-100/50 md:p-6">
          <label className="grid gap-3">
            <span className="font-black text-slate-900">Nhập câu muốn luyện</span>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input value={sentence} onChange={(event) => setSentence(event.target.value)} placeholder="Ví dụ: Cảm ơn bạn." className="min-h-12 text-base" />
              <Button onClick={() => practice()} className="min-h-12 rounded-full">
                <MessageSquareText className="h-5 w-5" aria-hidden="true" />
                Ghép câu
              </Button>
            </div>
          </label>
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-black text-slate-950">Phân tách câu</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {words.map((word, index) => {
              const meaning = knownMeanings[normalize(word)];
              return (
                <article key={`${word}-${index}`} className="rounded-[1.5rem] border border-blue-100 bg-white p-4 shadow-lg shadow-blue-100/50">
                  <p className="text-2xl font-black text-blue-700">{word}</p>
                  <p className="mt-2 min-h-12 text-sm font-semibold leading-6 text-slate-600">{meaning ?? "Chưa có dữ liệu ký hiệu cho từ này trong MVP."}</p>
                  <div className="mt-4 aspect-video rounded-2xl border border-dashed border-blue-200 bg-blue-50 p-3 text-center">
                    <p className="text-sm font-black text-blue-800">GIF/Video minh họa ký hiệu</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">Nội dung minh họa sẽ được nhóm bổ sung hoặc xác minh ở giai đoạn sau.</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">Câu giao tiếp đời sống</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {situationCards.map((card) => (
              <article key={card.topic} className="rounded-[1.75rem] border border-blue-100 bg-white p-5 shadow-lg shadow-blue-100/50">
                <p className="text-sm font-black uppercase text-blue-600">{card.topic}</p>
                <h3 className="mt-2 text-xl font-black text-slate-950">{card.sentence}</h3>
                <p className="mt-2 font-semibold leading-7 text-slate-600">{card.meaning}</p>
                <p className="mt-3 text-sm font-bold text-slate-500">Tách từ: {splitSentence(card.sentence).join(" + ")}</p>
                <div className="mt-4 aspect-video rounded-2xl border border-dashed border-blue-200 bg-blue-50 p-3 text-center">
                  <p className="font-black text-blue-800">GIF/Video minh họa ký hiệu</p>
                </div>
                <Button variant="secondary" className="mt-4 rounded-full" onClick={() => practice(card.sentence)}>
                  Luyện câu này
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">Câu mẫu</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {examples.map((item) => (
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
