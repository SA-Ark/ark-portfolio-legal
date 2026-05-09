import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-base font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-cyan-400/30 bg-cyan-400/10 text-cyan-100",
        purple: "border-violet-400/30 bg-violet-400/10 text-violet-100",
        success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
        warning: "border-yellow-400/30 bg-yellow-400/10 text-yellow-100",
        danger: "border-red-400/30 bg-red-400/10 text-red-100",
        secondary: "border-white/10 bg-white/5 text-[#e8e8ed]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
