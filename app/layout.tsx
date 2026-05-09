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
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}>
        <div className="min-h-screen bg-[#0a0a0a] text-white">
          <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-zinc-950/80 px-4 py-5 backdrop-blur-xl lg:block">
            <Link href="/" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-200">
                <Scale className="h-6 w-6" />
              </div>
              <div>
                <div className="font-heading text-lg font-semibold tracking-tight">Silverstone Legal</div>
                <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">Command Center</div>
              </div>
            </Link>

            <nav className="mt-6 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/8 hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-zinc-500 transition group-hover:text-blue-200" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-5 left-4 right-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-100">
                <Landmark className="h-4 w-4" />
                Trial readiness
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                94% of active matters have current pleadings, deadlines, billing, and client communications indexed.
              </p>
            </div>
          </aside>

          <div className="lg:pl-72">
            <header className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/75 backdrop-blur-xl">
              <div className="flex min-h-16 items-center justify-between gap-4 px-4 md:px-8">
                <div className="flex items-center gap-3 lg:hidden">
                  <Scale className="h-6 w-6 text-blue-200" />
                  <span className="font-heading text-lg font-semibold">Silverstone Legal</span>
                </div>
                <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400 lg:flex">
                  <Search className="h-4 w-4" />
                  Search matters, documents, authorities, invoices...
                </div>
                <div className="ml-auto flex items-center gap-3 text-sm text-zinc-400">
                  <BriefcaseBusiness className="h-4 w-4 text-emerald-300" />
                  Live demo workspace
                </div>
              </div>
            </header>
            <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
