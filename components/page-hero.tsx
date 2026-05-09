import type { ReactNode } from "react";
import { Reveal } from "@/components/effects/motion";
import { ParticleHeroDynamic } from "@/components/effects/particle-hero-dynamic";
import { Badge } from "@/components/ui/badge";

export function PageHero({
  badge,
  badgeVariant = "purple",
  title,
  children,
  actions,
  compact = false,
}: {
  badge: string;
  badgeVariant?: "default" | "purple" | "success" | "warning" | "danger" | "secondary";
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
}) {
  return (
    <Reveal>
      <section className={`relative isolate overflow-hidden rounded-[28px] border border-white/[0.06] bg-white/[0.025] px-5 shadow-2xl shadow-violet-950/20 md:px-8 ${compact ? "py-8" : "py-10 md:py-14"}`}>
        <ParticleHeroDynamic />
        <span className="hero-orb left-10 top-10 h-24 w-24 bg-cyan-400/20" aria-hidden="true" />
        <span className="hero-orb bottom-6 right-12 h-32 w-32 bg-violet-600/20 [animation-delay:1.2s]" aria-hidden="true" />
        <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Badge variant={badgeVariant} className="mb-4">{badge}</Badge>
            <h1 className="shimmer-text max-w-4xl font-heading text-5xl font-extrabold tracking-tight md:text-6xl">{title}</h1>
            <div className="mt-5 max-w-3xl text-lg leading-8 text-[#b7b7c7]">{children}</div>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </section>
    </Reveal>
  );
}
