import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-slate-600 sm:px-6 lg:px-8">
        <p className="text-base font-semibold text-slate-800">Silent Bridge ưu tiên học tập bằng hình ảnh, chữ viết rõ ràng và nội dung dễ tiếp cận.</p>
        <p className="text-sm">Dữ liệu ký hiệu trong bản demo cần được xác minh bởi giáo viên, chuyên gia hoặc tổ chức đáng tin cậy trước khi sử dụng trong bối cảnh thật.</p>
        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/about" className="text-blue-700 hover:text-blue-900">Về dự án</Link>
          <Link href="/community" className="text-blue-700 hover:text-blue-900">Góc kiến thức</Link>
          <Link href="/campaign" className="text-blue-700 hover:text-blue-900">Chiến dịch</Link>
        </div>
      </div>
    </footer>
  );
}
