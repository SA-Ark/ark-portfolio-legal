import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "accent-gradient text-white shadow-[0_0_30px_rgba(0,212,255,0.24)] hover:shadow-[0_0_34px_rgba(124,58,237,0.32)] hover:brightness-110",
        secondary: "border border-white/[0.08] bg-white/[0.055] text-white backdrop-blur-xl hover:border-cyan-300/30 hover:bg-white/[0.09] hover:shadow-[0_0_30px_rgba(0,212,255,0.10)]",
        ghost: "text-[#d8d8e5] hover:bg-white/[0.06] hover:text-white",
        outline: "border border-cyan-400/40 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/15 hover:shadow-[0_0_30px_rgba(0,212,255,0.18)]",
        destructive: "bg-red-500 text-white hover:bg-red-400",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-base",
        lg: "h-12 rounded-2xl px-6 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
