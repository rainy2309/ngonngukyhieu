"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronDown, Home, Menu, Search, Users } from "lucide-react";
import { AuthNav } from "@/components/auth/AuthNav";
import { ChamLogo } from "@/components/common/ChamLogo";

const mainLinks = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/tu-dien", label: "Từ điển", icon: Search },
  { href: "/cong-dong", label: "Cộng đồng", icon: Users },
];

const courseLinks = [
  { href: "/khoa-hoc/bang-chu-cai", label: "Ký hiệu bảng chữ cái" },
  { href: "/khoa-hoc/ghep-tu", label: "Ghép từ" },
  { href: "/khoa-hoc/ghep-cau", label: "Ghép câu" },
  { href: "/khoa-hoc/ngu-phap-ky-hieu", label: "Ngữ pháp ký hiệu" },
];

function CourseDropdown({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const active = pathname === "/khoa-hoc" || pathname.startsWith("/khoa-hoc/");

  if (mobile) {
    return (
      <details className="group shrink-0">
        <summary
          className={`flex cursor-pointer list-none items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-black ${
            active ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700"
          }`}
        >
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          Khóa học
          <ChevronDown className="h-4 w-4 transition group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="mt-2 grid min-w-64 gap-1 rounded-3xl border border-blue-100 bg-white p-2 shadow-xl shadow-blue-100/60">
          <Link className="whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700" href="/khoa-hoc">
            Tổng quan khóa học
          </Link>
          {courseLinks.map((link) => (
            <Link key={link.href} className="whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700" href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </details>
    );
  }

  return (
    <div className="group relative shrink-0">
      <Link
        href="/khoa-hoc"
        className={`inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-black transition ${
          active ? "border-blue-600 text-blue-700" : "border-transparent text-slate-600 hover:text-blue-700"
        }`}
      >
        <BookOpen className="h-4 w-4" aria-hidden="true" />
        Khóa học
        <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" aria-hidden="true" />
      </Link>
      <div className="invisible absolute left-0 top-full z-50 min-w-72 translate-y-2 rounded-3xl border border-blue-100 bg-white p-2 opacity-0 shadow-2xl shadow-blue-100/70 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {courseLinks.map((link) => (
          <Link key={link.href} href={link.href} className="block whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 px-3 py-3">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-blue-100 bg-white/95 px-4 py-3 shadow-xl shadow-blue-100/60 backdrop-blur"
        aria-label="Điều hướng chính"
      >
        <Link href="/" className="flex shrink-0 items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100">
          <ChamLogo />
          <span className="hidden sm:block">
            <span className="block whitespace-nowrap text-2xl font-black leading-none text-blue-700">CHẠM</span>
            <span className="block whitespace-nowrap text-xs font-bold text-slate-500">Kết nối bằng ngôn ngữ ký hiệu</span>
          </span>
        </Link>

        <div className="hidden min-w-0 items-center gap-1 lg:flex">
          {mainLinks.slice(0, 2).map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-black transition ${
                  active ? "border-blue-600 text-blue-700" : "border-transparent text-slate-600 hover:text-blue-700"
                }`}
              >
                <link.icon className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </Link>
            );
          })}
          <CourseDropdown />
          {mainLinks.slice(2).map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-black transition ${
                  active ? "border-blue-600 text-blue-700" : "border-transparent text-slate-600 hover:text-blue-700"
                }`}
              >
                <link.icon className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden shrink-0 lg:block">
          <AuthNav />
        </div>

        <Menu className="h-5 w-5 text-blue-700 lg:hidden" aria-hidden="true" />
      </nav>

      <div className="mx-auto mt-3 flex max-w-7xl gap-2 overflow-x-auto rounded-full border border-blue-100 bg-white px-3 py-2 shadow-lg shadow-blue-100/50 lg:hidden">
        {mainLinks.slice(0, 2).map((link) => {
          const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
          return (
            <Link key={link.href} href={link.href} className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-black ${active ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700"}`}>
              {link.label}
            </Link>
          );
        })}
        <CourseDropdown mobile />
        <Link
          href="/cong-dong"
          className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-black ${pathname.startsWith("/cong-dong") ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700"}`}
        >
          Cộng đồng
        </Link>
        <AuthNav />
      </div>
    </header>
  );
}
