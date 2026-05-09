'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarClock,
  ClipboardList,
  FileArchive,
  LayoutDashboard,
  ReceiptText,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Case Dashboard", icon: LayoutDashboard },
  { href: "/documents", label: "Documents", icon: FileArchive },
  { href: "/analyzer", label: "AI Analyzer", icon: Sparkles },
  { href: "/research", label: "Legal Research", icon: BookOpen },
  { href: "/deadlines", label: "Deadlines", icon: CalendarClock },
  { href: "/billing", label: "Billing", icon: ReceiptText },
  { href: "/templates", label: "Templates", icon: ClipboardList },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/cases");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavigationRail() {
  const pathname = usePathname();

  return (
    <nav className="mt-6 space-y-1" aria-label="Primary navigation">
      {navigation.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-base font-medium text-[#b7b7c7] transition-all hover:bg-white/[0.06] hover:text-white",
              active &&
                "border border-cyan-300/20 bg-cyan-400/10 text-cyan-50 shadow-[0_0_30px_rgba(0,212,255,0.16)] before:absolute before:inset-y-2 before:left-0 before:w-1 before:rounded-full before:bg-cyan-300 before:shadow-[0_0_20px_rgba(0,212,255,0.75)]"
            )}
          >
            <Icon className={cn("h-4 w-4 text-[#8888a0] transition group-hover:text-cyan-200", active && "text-cyan-200")} />
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="scrollbar-thin flex gap-2 overflow-x-auto border-t border-white/[0.06] bg-[#050510]/72 px-4 py-3 backdrop-blur-2xl lg:hidden" aria-label="Mobile navigation">
      {navigation.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.035] px-3 py-2 text-base font-medium text-[#b7b7c7] backdrop-blur-xl transition-all hover:border-cyan-300/30 hover:text-white",
              active && "border-cyan-300/30 bg-cyan-400/10 text-cyan-50 shadow-[0_0_24px_rgba(0,212,255,0.18)]"
            )}
          >
            <Icon className={cn("h-4 w-4 text-[#8888a0]", active && "text-cyan-200")} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
