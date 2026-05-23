import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800 ring-1 ring-blue-100", className)} {...props} />;
}
