"use client";

import { useState } from "react";
import { Hand } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChamLogo({ className }: { className?: string }) {
  const [imageError, setImageError] = useState(false);

  return (
    <span 
      className={cn(
        "relative grid h-12 w-12 place-items-center rounded-full overflow-hidden transition-all duration-200", 
        imageError 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
          : "bg-[#2EAFFF] p-1.5",
        className
      )} 
      aria-label="Logo CHẠM"
    >
      {!imageError ? (
        <img
          src="/logo.png"
          alt="Logo CHẠM"
          className="h-full w-full object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <>
          <span className="absolute inset-1 rounded-full border border-white/35" />
          <Hand className="h-6 w-6" aria-hidden="true" />
        </>
      )}
    </span>
  );
}


