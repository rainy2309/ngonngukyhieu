import Link from "next/link";
import { BookOpen, HandHeart, Layers, Library, MessageCircle, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/cards/FeatureCard";

const features = [
  { title: "Từ điển ký hiệu", description: "Tra cứu từ tiếng Việt theo chủ đề, độ khó và xem phần giữ chỗ ký hiệu demo.", icon: Search },
  { title: "Học từ vựng trực quan", description: "Bài học ngắn với hình ảnh, nghĩa, ví dụ và tiến độ lưu trên trình duyệt.", icon: BookOpen },
  { title: "Flashcard & Quiz", description: "Ôn tập từng thẻ, chọn từ cần ôn lại và kiểm tra bằng câu hỏi trắc nghiệm.", icon: Layers },
  { title: "Góc kiến thức cộng đồng", description: "Nội dung ngắn giúp giao tiếp tôn trọng với người điếc và khiếm thính.", icon: HandHeart },
];

export default function Home() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              MVP học tập trực quan cho demo đại học
            </span>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">Silent Bridge – Kết nối không âm thanh</h1>
              <p className="max-w-2xl text-xl leading-9 text-slate-600">Nền tảng học tiếng Việt trực quan và lan tỏa nhận thức tích cực về cộng đồng người điếc.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href="/lessons">Bắt đầu học</Link></Button>
              <Button asChild size="lg" variant="secondary"><Link href="/dictionary">Khám phá từ điển ký hiệu</Link></Button>
            </div>
          </div>
          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
            <div className="grid gap-4 rounded-2xl bg-white p-5">
              <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-700 text-white"><MessageCircle aria-hidden="true" /></div>
                <div><p className="font-black text-slate-950">Học bằng hình ảnh</p><p className="text-slate-600">Chữ rõ, ví dụ ngắn, ký hiệu demo.</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-emerald-50 p-4"><p className="text-3xl font-black text-emerald-700">50+</p><p className="font-semibold text-emerald-900">từ mẫu</p></div>
                <div className="rounded-2xl bg-orange-50 p-4"><p className="text-3xl font-black text-orange-700">7</p><p className="font-semibold text-orange-900">ngày chiến dịch</p></div>
              </div>
              <p className="rounded-2xl border border-dashed border-orange-200 bg-orange-50 p-4 text-sm font-semibold leading-6 text-orange-900">Lưu ý: nội dung ký hiệu là demo placeholder và cần được xác minh bởi giáo viên, chuyên gia hoặc tổ chức đáng tin cậy.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-700"><Library aria-hidden="true" /></div>
            <h2 className="text-2xl font-black text-slate-950">Vấn đề</h2>
            <p className="mt-3 text-lg leading-8 text-slate-600">Người điếc và khiếm thính có thể gặp khó khăn khi học tiếng Việt, giao tiếp với cộng đồng và tiếp cận tài liệu học tập phù hợp.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><HandHeart aria-hidden="true" /></div>
            <h2 className="text-2xl font-black text-slate-950">Giải pháp</h2>
            <p className="mt-3 text-lg leading-8 text-slate-600">Silent Bridge hỗ trợ học từ vựng bằng hình ảnh, chữ viết rõ ràng, nội dung trực quan và các hoạt động nâng cao nhận thức cộng đồng.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
