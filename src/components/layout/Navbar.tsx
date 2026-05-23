import Link from "next/link";
import { BookOpen, Brain, Home, Info, Layers, Megaphone, Menu, Search, Users } from "lucide-react";

const links = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/dashboard", label: "Bảng học tập", icon: Brain },
  { href: "/dictionary", label: "Từ điển", icon: Search },
  { href: "/lessons", label: "Bài học", icon: BookOpen },
  { href: "/flashcards", label: "Flashcards", icon: Layers },
  { href: "/quiz", label: "Quiz", icon: Brain },
  { href: "/community", label: "Cộng đồng", icon: Users },
  { href: "/campaign", label: "Chiến dịch", icon: Megaphone },
  { href: "/about", label: "Dự án", icon: Info },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8" aria-label="Điều hướng chính">
        <Link href="/" className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-sm">
            <BookOpen aria-hidden="true" />
          </span>
          <span>
            <span className="block text-lg font-black text-slate-950">Silent Bridge</span>
            <span className="block text-sm font-semibold text-blue-700">Kết nối không âm thanh</span>
          </span>
        </Link>
        <div className="hidden flex-wrap items-center justify-end gap-1 lg:flex">
          {links.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200">
              <link.icon className="h-4 w-4" aria-hidden="true" />
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 lg:hidden" aria-label="Menu thu gọn">
          <Menu className="h-6 w-6 text-slate-700" aria-hidden="true" />
        </div>
      </nav>
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 sm:px-6 lg:hidden">
        {links.slice(1).map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200">
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
