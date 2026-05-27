import { Heart, Sparkles } from "lucide-react";
import { ChamLogo } from "@/components/common/ChamLogo";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-8 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pb-12 lg:pt-16">
      <div className="pointer-events-none absolute left-4 top-20 h-28 w-28 rounded-full bg-blue-100/60 blur-3xl sm:h-40 sm:w-40" />
      <div className="pointer-events-none absolute right-2 top-10 h-32 w-32 rounded-full bg-sky-100/70 blur-3xl sm:right-10 sm:h-52 sm:w-52" />
      <div className="pointer-events-none absolute left-[8%] top-52 hidden h-28 w-28 rounded-[2rem] border border-blue-100 bg-white/40 sm:block" />
      <div className="pointer-events-none absolute right-[14%] top-56 hidden grid-cols-4 gap-2 opacity-40 md:grid">
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={index} className="h-1.5 w-1.5 rounded-full bg-blue-400" />
        ))}
      </div>
      <svg className="pointer-events-none absolute bottom-0 left-0 -z-10 h-44 w-full text-blue-100/70 sm:h-72" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0,160L60,154.7C120,149,240,139,360,149.3C480,160,600,192,720,186.7C840,181,960,139,1080,128C1200,117,1320,139,1380,149.3L1440,160L1440,320L0,320Z" />
      </svg>
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mx-auto mb-5 flex w-fit max-w-full items-center gap-3 rounded-full bg-white px-3 py-2 text-xs font-bold text-blue-700 shadow-lg shadow-blue-100 sm:mb-6 sm:px-4 sm:text-sm">
          <ChamLogo className="h-8 w-8 shrink-0 shadow-none sm:h-9 sm:w-9" />
          <span className="line-clamp-2 text-left sm:text-center">Học ký hiệu qua hình ảnh, từ vựng và hoạt động tương tác</span>
        </div>
        <p className="mb-2 text-2xl font-black text-slate-800 sm:text-5xl">Chào mừng đến với</p>
        <h1 className="text-6xl font-black text-blue-600 sm:text-8xl lg:text-9xl">CHẠM</h1>
        <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:mt-5 sm:text-2xl sm:leading-9">Khám phá từ vựng, học ký hiệu và kết nối trực quan hơn mỗi ngày.</p>
        <div className="mt-6 flex items-center justify-center gap-4 text-blue-300 sm:mt-8 sm:gap-5">
          <Sparkles className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
          <span className="h-1 w-16 rounded-full bg-blue-200 sm:w-24" />
          <Heart className="h-7 w-7 fill-blue-100 sm:h-8 sm:w-8" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
