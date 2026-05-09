import { CalendarClock, ChevronLeft, ChevronRight } from "lucide-react";
import { Magnetic, Reveal } from "@/components/effects/motion";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cases, deadlines } from "@/lib/data";

const colors = {
  red: "border-red-400/30 bg-red-500/15 text-red-50",
  orange: "border-orange-400/30 bg-orange-500/15 text-orange-50",
  yellow: "border-yellow-400/30 bg-yellow-500/15 text-yellow-50",
  green: "border-emerald-400/30 bg-emerald-500/15 text-emerald-50",
};

function variant(priority: string) {
  if (priority === "red") return "danger";
  if (priority === "orange") return "warning";
  if (priority === "yellow") return "default";
  return "success";
}

const calendarDays = Array.from({ length: 35 }, (_, index) => index + 24);

export default function DeadlinesPage() {
  return (
    <div className="space-y-20 md:space-y-[120px]">
      <PageHero
        badge="Deadline Tracker"
        badgeVariant="warning"
        title="Calendar and critical-date list"
        actions={
          <>
            <Magnetic><Button variant="secondary" size="icon"><ChevronLeft className="h-4 w-4" /></Button></Magnetic>
            <Magnetic><Button variant="secondary">March 2025</Button></Magnetic>
            <Magnetic><Button variant="secondary" size="icon"><ChevronRight className="h-4 w-4" /></Button></Magnetic>
          </>
        }
      >
        Fifteen deadline events color-coded by urgency: red for immediate risk, orange for near-term filings, yellow for planned work, and green for lower-risk follow-up.
      </PageHero>

      <Reveal>
        <section className="grid gap-5 lg:grid-cols-[1fr_25rem]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CalendarClock className="h-5 w-5 text-orange-200" /> Calendar</CardTitle>
              <CardDescription>Visual schedule with color-coded legal operations urgency.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.16em] text-[#8888a0]">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <div key={day}>{day}</div>)}
              </div>
              <div className="mt-3 grid grid-cols-7 gap-2">
                {calendarDays.map((absoluteDay) => {
                  const day = absoluteDay > 28 ? absoluteDay - 28 : absoluteDay;
                  const date = `2025-03-${String(day).padStart(2, "0")}`;
                  const dayDeadlines = deadlines.filter((deadline) => deadline.date === date);
                  return (
                    <div key={`${absoluteDay}-${date}`} className="min-h-28 rounded-2xl border border-white/10 bg-white/[0.025] p-2 text-left transition hover:border-cyan-300/30 hover:bg-white/[0.04]">
                      <div className={absoluteDay > 28 ? "text-base text-zinc-300" : "text-base text-zinc-600"}>{day}</div>
                      <div className="mt-2 space-y-1">
                        {dayDeadlines.map((deadline) => (
                          <div key={deadline.id} className={`rounded-lg border px-2 py-1 text-xs leading-5 ${colors[deadline.priority]}`}>{deadline.title}</div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deadline queue</CardTitle>
              <CardDescription>Sorted critical date list with matter and owner.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {deadlines.map((deadline) => {
                const legalCase = cases.find((item) => item.id === deadline.caseId);
                return (
                  <div key={deadline.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium">{deadline.title}</div>
                        <div className="mt-1 text-base text-[#8888a0]">{deadline.date} · {deadline.type}</div>
                      </div>
                      <Badge variant={variant(deadline.priority)}>{deadline.priority}</Badge>
                    </div>
                    <div className="mt-3 text-sm text-[#8888a0]">{legalCase?.caseNumber} · {legalCase?.client} · Owner: {deadline.owner}</div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>
      </Reveal>
    </div>
  );
}
