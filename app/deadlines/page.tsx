import { CalendarClock, ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <Badge variant="warning" className="mb-4">Deadline Tracker</Badge>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-gradient">Calendar and critical-date list</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
            Fifteen deadline events color-coded by urgency: red for immediate risk, orange for near-term filings, yellow for planned work, and green for lower-risk follow-up.
          </p>
        </div>
        <div className="flex gap-2"><Button variant="secondary" size="icon"><ChevronLeft className="h-4 w-4" /></Button><Button variant="secondary">March 2025</Button><Button variant="secondary" size="icon"><ChevronRight className="h-4 w-4" /></Button></div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_25rem]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarClock className="h-5 w-5 text-orange-200" /> Calendar</CardTitle>
            <CardDescription>Visual schedule with color-coded legal operations urgency.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.16em] text-zinc-500">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <div key={day}>{day}</div>)}
            </div>
            <div className="mt-3 grid grid-cols-7 gap-2">
              {calendarDays.map((absoluteDay) => {
                const day = absoluteDay > 28 ? absoluteDay - 28 : absoluteDay;
                const date = `2025-03-${String(day).padStart(2, "0")}`;
                const dayDeadlines = deadlines.filter((deadline) => deadline.date === date);
                return (
                  <div key={`${absoluteDay}-${date}`} className="min-h-28 rounded-2xl border border-white/10 bg-white/[0.025] p-2 text-left">
                    <div className={absoluteDay > 28 ? "text-sm text-zinc-300" : "text-sm text-zinc-600"}>{day}</div>
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
                      <div className="mt-1 text-sm text-zinc-400">{deadline.date} · {deadline.type}</div>
                    </div>
                    <Badge variant={variant(deadline.priority)}>{deadline.priority}</Badge>
                  </div>
                  <div className="mt-3 text-xs text-zinc-500">{legalCase?.caseNumber} · {legalCase?.client} · Owner: {deadline.owner}</div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
