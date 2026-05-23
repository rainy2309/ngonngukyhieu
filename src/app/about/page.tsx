import { Code2, GraduationCap, HeartHandshake, Target, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sections = [
  {
    title: "Giới thiệu dự án",
    icon: GraduationCap,
    text: "Silent Bridge là MVP nền tảng học tiếng Việt trực quan cho người điếc và khiếm thính, đồng thời hỗ trợ lớp học nâng cao nhận thức cộng đồng.",
  },
  {
    title: "Vấn đề",
    icon: Target,
    text: "Người học có thể gặp khó khăn khi tài liệu quá nhiều chữ, thiếu hình ảnh, thiếu ví dụ rõ ràng hoặc thiếu lựa chọn giao tiếp phù hợp.",
  },
  {
    title: "Người dùng mục tiêu",
    icon: Users,
    text: "Học sinh, sinh viên khiếm thính, bạn học, giáo viên, nhóm truyền thông sinh viên và người muốn học cách giao tiếp tôn trọng hơn.",
  },
  {
    title: "Giải pháp đề xuất",
    icon: HeartHandshake,
    text: "Ứng dụng dùng từ vựng mẫu, thẻ hình ảnh, flashcard, quiz và nội dung truyền thông ngắn để tạo cầu nối học tập dễ tiếp cận.",
  },
  {
    title: "Công nghệ sử dụng",
    icon: Code2,
    text: "Next.js, TypeScript, Tailwind CSS, shadcn/ui style components, lucide-react và localStorage. MVP không cần backend.",
  },
  {
    title: "Tác động xã hội",
    icon: HeartHandshake,
    text: "Dự án khuyến khích giao tiếp kiên nhẫn, rõ ràng, tôn trọng và giúp cộng đồng hiểu rằng tiếp cận thông tin nên có nhiều hình thức.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-10">
        <Badge className="mb-4">Demo đại học</Badge>
        <h1 className="text-4xl font-black text-slate-950 sm:text-5xl">Về dự án Silent Bridge</h1>
        <p className="mt-4 max-w-3xl text-xl leading-9 text-slate-600">Một nguyên mẫu web app phục vụ học tập, trình bày ý tưởng và truyền thông tích cực. Ứng dụng không triển khai AI nhận diện ký hiệu và không sử dụng camera.</p>
      </section>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><section.icon aria-hidden="true" /></div>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent><p className="text-lg leading-8 text-slate-600">{section.text}</p></CardContent>
          </Card>
        ))}
      </div>
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-slate-950">Nhóm thực hiện</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {["Thành viên 1", "Thành viên 2", "Thành viên 3"].map((member) => (
            <div key={member} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-black text-slate-900">{member}</p>
              <p className="text-slate-600">Vai trò: nghiên cứu, thiết kế, phát triển</p>
            </div>
          ))}
        </div>
      </section>
      <p className="mt-6 rounded-2xl bg-orange-50 p-4 font-semibold leading-7 text-orange-900">Ghi chú: dữ liệu ký hiệu trong bản demo cần được xác minh bởi giáo viên, chuyên gia hoặc tổ chức đáng tin cậy. Ứng dụng không khẳng định dữ liệu ký hiệu là chính thức.</p>
    </main>
  );
}
