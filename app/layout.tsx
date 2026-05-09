import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import {
  BookOpen,
  BriefcaseBusiness,
  CalendarClock,
  ClipboardList,
  FileArchive,
  Landmark,
  LayoutDashboard,
  ReceiptText,
  Scale,
  Search,
  Sparkles,
} from "lucide-react";
import { CursorGlow } from "@/components/effects/cursor-glow";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Silverstone Legal | Case Management & Document Intelligence",
  description:
    "Portfolio demo for legal practice management, AI contract analysis, research RAG, deadlines, billing, and client portal workflows.",
};

const navigation = [
  { href: "/", label: "Case Dashboard", icon: LayoutDashboard },
  { href: "/documents", label: "Documents", icon: FileArchive },
  { href: "/analyzer", label: "AI Analyzer", icon: Sparkles },
  { href: "/research", label: "Legal Research", icon: BookOpen },
  { href: "/deadlines", label: "Deadlines", icon: CalendarClock },
  { href: "/billing", label: "Billing", icon: ReceiptText },
  { href: "/templates", label: "Templates", icon: ClipboardList },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} noise antialiased`}>
        <CursorGlow />
        <div className="aurora-bg" aria-hidden="true" />
        <div className="app-shell text-[#e8e8ed]">
          <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/[0.06] bg-[#050510]/75 px-4 py-5 shadow-2xl shadow-violet-950/20 backdrop-blur-2xl lg:block">
            <Link href="/" className="gradient-border flex items-center gap-3 rounded-2xl bg-white/[0.035] p-4 transition hover:bg-white/[0.055]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-200 shadow-[0_0_30px_rgba(0,212,255,0.22)]">
                <Scale className="h-6 w-6" />
              </div>
              <div>
                <div className="font-heading text-lg font-semibold tracking-tight text-white">Silverstone Legal</div>
                <div className="text-xs uppercase tracking-[0.22em] text-[#8888a0]">Command Center</div>
              </div>
            </Link>

            <nav className="mt-6 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#b7b7c7] transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-[#8888a0] transition group-hover:text-cyan-200" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="gradient-border absolute bottom-5 left-4 right-4 rounded-2xl bg-cyan-400/10 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
                <Landmark className="h-4 w-4" />
                Trial readiness
              </div>
              <p className="mt-2 text-sm leading-6 text-[#8888a0]">
                94% of active matters have current pleadings, deadlines, billing, and client communications indexed.
              </p>
            </div>
          </aside>

          <div className="lg:pl-72">
            <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#050510]/72 backdrop-blur-2xl">
              <div className="flex min-h-16 items-center justify-between gap-4 px-4 md:px-8">
                <div className="flex items-center gap-3 lg:hidden">
                  <Scale className="h-6 w-6 text-cyan-200" />
                  <span className="font-heading text-lg font-semibold text-white">Silverstone Legal</span>
                </div>
                <div className="hidden items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.035] px-4 py-2 text-sm text-[#8888a0] shadow-[0_0_30px_rgba(0,212,255,0.08)] lg:flex">
                  <Search className="h-4 w-4" />
                  Search matters, documents, authorities, invoices...
                </div>
                <div className="ml-auto flex items-center gap-3 text-sm text-[#8888a0]">
                  <BriefcaseBusiness className="h-4 w-4 text-emerald-300" />
                  Live demo workspace
                </div>
              </div>
            </header>
            <main className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
