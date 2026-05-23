import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-700 text-white shadow-sm hover:bg-blue-800",
        secondary: "bg-white text-blue-800 ring-1 ring-blue-100 hover:bg-blue-50",
        outline: "bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50",
        success: "bg-emerald-600 text-white hover:bg-emerald-700",
        warning: "bg-orange-500 text-white hover:bg-orange-600",
        ghost: "text-slate-700 hover:bg-slate-100",
      },
      size: {
        default: "min-h-11",
        sm: "min-h-9 rounded-lg px-3 text-sm",
        lg: "min-h-12 px-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
