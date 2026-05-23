import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ArticleCard({ title, description, readingTime, icon: Icon, onOpen }: { title: string; description: string; readingTime: string; icon: LucideIcon; onOpen: () => void }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <Icon aria-hidden="true" />
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{readingTime}</span>
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="leading-7 text-slate-600">{description}</p>
        <Button variant="secondary" onClick={onOpen}>Đọc thêm</Button>
      </CardContent>
    </Card>
  );
}
