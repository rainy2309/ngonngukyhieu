import { CampaignCard } from "@/components/cards/CampaignCard";
import { Badge } from "@/components/ui/badge";
import { campaignCalendar, campaignCards, platforms } from "@/data/campaignData";

export default function CampaignPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-10 rounded-3xl bg-blue-700 p-6 text-white shadow-sm sm:p-8">
        <Badge className="mb-4 bg-white/15 text-white ring-white/20">Chiến dịch truyền thông</Badge>
        <h1 className="text-4xl font-black sm:text-5xl">Hiểu để kết nối</h1>
        <p className="mt-4 max-w-3xl text-xl leading-9 text-blue-50">Lan tỏa kiến thức về người khiếm thính và khuyến khích cộng đồng học một số ký hiệu cơ bản.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {platforms.map((platform) => <span key={platform.name} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-blue-800"><platform.icon className="h-5 w-5" />{platform.name}</span>)}
        </div>
      </section>
      <section className="mb-10">
        <h2 className="mb-5 text-3xl font-black text-slate-950">Nội dung chiến dịch</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{campaignCards.map((card) => <CampaignCard key={card.title} {...card} />)}</div>
      </section>
      <section>
        <h2 className="mb-5 text-3xl font-black text-slate-950">Lịch 7 ngày</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {campaignCalendar.map((item) => (
            <div key={item.day} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <item.icon className="mb-3 h-6 w-6 text-blue-700" aria-hidden="true" />
              <p className="font-black text-blue-800">{item.day}</p>
              <p className="mt-2 font-semibold leading-7 text-slate-700">{item.topic}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
