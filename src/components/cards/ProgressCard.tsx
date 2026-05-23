import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ProgressCard({ label, value, hint, icon: Icon }: { label: string; value: string | number; hint: string; icon: LucideIcon }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <Icon aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="text-3xl font-black text-slate-950">{value}</p>
          <p className="text-sm text-slate-600">{hint}</p>
        </div>
      </CardContent>
    </Card>
  );
}
