import { notFound } from "next/navigation";
import { BriefcaseBusiness, CalendarClock, Mail, ReceiptText, Scale, Users } from "lucide-react";
import { Reveal } from "@/components/effects/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  cases,
  getAttorney,
  getCase,
  getCaseDeadlines,
  getCaseDocuments,
  getCaseTimeEntries,
  getEntryAmount,
} from "@/lib/data";

export function generateStaticParams() {
  return cases.map((legalCase) => ({ id: legalCase.id }));
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function deadlineVariant(priority: string) {
  if (priority === "red") return "danger";
  if (priority === "orange") return "warning";
  if (priority === "yellow") return "default";
  return "success";
}

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const legalCase = getCase(id);

  if (!legalCase) notFound();

  const attorney = getAttorney(legalCase.attorneyId);
  const caseDocuments = getCaseDocuments(legalCase.id);
  const caseDeadlines = getCaseDeadlines(legalCase.id);
  const caseTimeEntries = getCaseTimeEntries(legalCase.id);
  const billableTotal = caseTimeEntries.reduce((total, entry) => total + getEntryAmount(entry), 0);
  const hoursTotal = caseTimeEntries.reduce((total, entry) => total + entry.hours, 0);

  return (
    <div className="space-y-20 md:space-y-[120px]">
      <Reveal>
      <section className="grid gap-5 lg:grid-cols-[1fr_22rem]">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{legalCase.caseNumber}</Badge>
              <Badge variant={legalCase.risk === "High" ? "danger" : legalCase.risk === "Medium" ? "warning" : "success"}>{legalCase.risk} risk</Badge>
              <Badge variant="purple">{legalCase.status}</Badge>
            </div>
            <CardTitle className="shimmer-text text-4xl font-extrabold md:text-5xl">{legalCase.title}</CardTitle>
            <CardDescription className="max-w-4xl text-base">{legalCase.summary}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Client</div>
              <div className="mt-2 font-medium text-white">{legalCase.client}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Court / venue</div>
              <div className="mt-2 font-medium text-white">{legalCase.court}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Matter value</div>
              <div className="mt-2 font-medium text-white">{legalCase.value}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Opened</div>
              <div className="mt-2 font-medium text-white">{legalCase.opened}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BriefcaseBusiness className="h-5 w-5 text-blue-200" /> Lead attorney</CardTitle>
            <CardDescription>Ownership, billing rate, and coverage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-xl font-semibold">{attorney?.name}</div>
              <div className="text-sm text-zinc-500">{attorney?.role} · {attorney?.email}</div>
            </div>
            <div className="rounded-xl bg-white/[0.04] p-4 text-sm text-zinc-300">
              <div className="flex justify-between"><span>Rate</span><span className="text-white">${attorney?.rate}/hr</span></div>
              <div className="mt-2 flex justify-between"><span>Billable total</span><span className="text-white">{money(billableTotal)}</span></div>
              <div className="mt-2 flex justify-between"><span>Hours logged</span><span className="text-white">{hoursTotal.toFixed(1)}</span></div>
            </div>
          </CardContent>
        </Card>
      </section>
      </Reveal>

      <Reveal>
      <Tabs defaultValue="parties" className="w-full">
        <TabsList className="flex w-full flex-wrap">
          <TabsTrigger value="parties"><Users className="mr-2 h-4 w-4" />Parties</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
        </TabsList>

        <TabsContent value="parties">
          <Card>
            <CardHeader><CardTitle>Parties and counsel</CardTitle><CardDescription>Principal matter participants and relationship map.</CardDescription></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {legalCase.parties.map((party) => (
                <div key={`${party.role}-${party.name}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <Badge variant="secondary">{party.role}</Badge>
                  <div className="mt-4 text-lg font-semibold">{party.name}</div>
                  {party.counsel ? <div className="mt-2 text-sm text-zinc-400">Counsel: {party.counsel}</div> : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader><CardTitle>Case timeline</CardTitle><CardDescription>Procedural events, strategy milestones, and upcoming deadlines.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              {legalCase.timeline.map((item) => (
                <div key={`${item.date}-${item.event}`} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-100"><Scale className="h-5 w-5" /></div>
                  <div><div className="text-sm text-zinc-500">{item.date} · {item.type}</div><div className="mt-1 font-medium">{item.event}</div></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader><CardTitle>Documents</CardTitle><CardDescription>Case file documents with folder, version, status, and owner.</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Folder</TableHead><TableHead>Version</TableHead><TableHead>Status</TableHead><TableHead>Updated</TableHead></TableRow></TableHeader>
                <TableBody>
                  {caseDocuments.map((document) => (
                    <TableRow key={document.id}><TableCell className="font-medium">{document.name}</TableCell><TableCell>{document.folder}</TableCell><TableCell>{document.version}</TableCell><TableCell><Badge variant="secondary">{document.status}</Badge></TableCell><TableCell>{document.updated}</TableCell></TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><ReceiptText className="h-5 w-5 text-emerald-200" /> Billing ledger</CardTitle><CardDescription>Timekeeper entries and calculated fee exposure.</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Phase</TableHead><TableHead>Description</TableHead><TableHead>Hours</TableHead><TableHead>Amount</TableHead></TableRow></TableHeader>
                <TableBody>
                  {caseTimeEntries.map((entry) => (
                    <TableRow key={entry.id}><TableCell>{entry.date}</TableCell><TableCell>{entry.phase}</TableCell><TableCell>{entry.description}</TableCell><TableCell>{entry.hours.toFixed(2)}</TableCell><TableCell>{money(getEntryAmount(entry))}</TableCell></TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5 text-violet-200" /> Communications</CardTitle><CardDescription>Client portal messages, emails, and internal legal operations updates.</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {legalCase.communications.map((message) => (
                <div key={`${message.date}-${message.subject}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2"><div className="font-medium">{message.subject}</div><Badge variant="purple">{message.channel}</Badge></div>
                  <div className="mt-2 text-sm text-zinc-400">{message.date} · From {message.from}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deadlines">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><CalendarClock className="h-5 w-5 text-orange-200" /> Deadlines</CardTitle><CardDescription>Critical dates connected to this case.</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {caseDeadlines.length ? caseDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div><div className="font-medium">{deadline.title}</div><div className="text-sm text-zinc-400">{deadline.date} · {deadline.type}</div></div>
                  <Badge variant={deadlineVariant(deadline.priority)}>{deadline.priority}</Badge>
                </div>
              )) : <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-zinc-400">No standalone deadline in the master deadline set; next deadline is {legalCase.nextDeadline}.</div>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </Reveal>
    </div>
  );
}
