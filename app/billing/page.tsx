import { Banknote, BarChart3, CircleDollarSign, FileCheck2, ReceiptText } from "lucide-react";
import { PhaseFeesChartDynamic } from "@/components/charts/phase-fees-chart-dynamic";
import { Reveal, Stagger, StaggerItem } from "@/components/effects/motion";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cases, getAttorney, getCase, getEntryAmount, timeEntries } from "@/lib/data";

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

const totalFees = timeEntries.reduce((total, entry) => total + getEntryAmount(entry), 0);
const totalHours = timeEntries.reduce((total, entry) => total + entry.hours, 0);
const invoices = cases.slice(0, 8).map((legalCase, index) => {
  const entries = timeEntries.filter((entry) => entry.caseId === legalCase.id);
  const amount = entries.reduce((total, entry) => total + getEntryAmount(entry), 0) + 4200 + index * 725;
  return {
    id: `INV-2025-${String(index + 101).padStart(3, "0")}`,
    client: legalCase.client,
    matter: legalCase.caseNumber,
    amount,
    status: index % 4 === 0 ? "Draft" : index % 3 === 0 ? "Sent" : "Approved",
    due: `2025-03-${String(8 + index * 2).padStart(2, "0")}`,
  };
});

const trustAccounts = [
  { client: "Northstar Foods", balance: 185000, reserved: 62000, label: "Litigation reserve" },
  { client: "LumaGrid", balance: 420000, reserved: 210000, label: "Closing escrow" },
  { client: "Ellison Family Office", balance: 95000, reserved: 25000, label: "Estate administration" },
  { client: "Orion Partners", balance: 260000, reserved: 88000, label: "Tax diligence" },
];

const phaseTotals = ["Fact Development", "Drafting", "Research", "Client Communications", "Discovery", "Strategy"].map((phase) => ({
  phase,
  total: timeEntries.filter((entry) => entry.phase === phase).reduce((sum, entry) => sum + getEntryAmount(entry), 0),
}));

export default function BillingPage() {
  return (
    <div className="space-y-20 md:space-y-[120px]">
      <PageHero badge="Billing & Trust Accounting" badgeVariant="success" title="Financial command center">
        Time entries, invoices, trust balances, and chart summaries for law-firm matter economics.
      </PageHero>

      <Stagger className="grid gap-4 md:grid-cols-4">
        <StaggerItem><Card><CardHeader className="pb-2"><CardDescription>Total fees</CardDescription><CardTitle className="flex items-center gap-2 text-3xl"><CircleDollarSign className="h-6 w-6 text-emerald-200" />{money(totalFees)}</CardTitle></CardHeader><CardContent className="text-base text-[#8888a0]">From 50 time entries</CardContent></Card></StaggerItem>
        <StaggerItem><Card><CardHeader className="pb-2"><CardDescription>Total hours</CardDescription><CardTitle className="text-3xl">{totalHours.toFixed(1)}</CardTitle></CardHeader><CardContent className="text-base text-[#8888a0]">Billable and non-billable</CardContent></Card></StaggerItem>
        <StaggerItem><Card><CardHeader className="pb-2"><CardDescription>Invoice pipeline</CardDescription><CardTitle className="text-3xl">{money(invoices.reduce((sum, invoice) => sum + invoice.amount, 0))}</CardTitle></CardHeader><CardContent className="text-base text-[#8888a0]">Draft, sent, approved</CardContent></Card></StaggerItem>
        <StaggerItem><Card><CardHeader className="pb-2"><CardDescription>Trust balances</CardDescription><CardTitle className="text-3xl">{money(trustAccounts.reduce((sum, account) => sum + account.balance, 0))}</CardTitle></CardHeader><CardContent className="text-base text-[#8888a0]">Client funds held separately</CardContent></Card></StaggerItem>
      </Stagger>

      <Reveal>
      <section className="grid gap-5 lg:grid-cols-[1fr_24rem]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ReceiptText className="h-5 w-5 text-cyan-200" /> Timesheet</CardTitle>
            <CardDescription>Recent timekeeper entries with attorney rates and fee calculation.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Matter</TableHead><TableHead>Attorney</TableHead><TableHead>Description</TableHead><TableHead>Hours</TableHead><TableHead>Fee</TableHead></TableRow></TableHeader>
              <TableBody>
                {timeEntries.slice(0, 18).map((entry) => {
                  const legalCase = getCase(entry.caseId);
                  const attorney = getAttorney(entry.attorneyId);
                  return (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{legalCase?.caseNumber}</TableCell>
                      <TableCell>{attorney?.name}</TableCell>
                      <TableCell className="max-w-96 truncate">{entry.description}</TableCell>
                      <TableCell>{entry.hours.toFixed(2)}</TableCell>
                      <TableCell>{money(getEntryAmount(entry))}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-violet-200" /> Summary chart</CardTitle>
            <CardDescription>Fees by work phase.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <PhaseFeesChartDynamic data={phaseTotals} />
            {phaseTotals.map((item) => (
              <div key={item.phase} className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                <span>{item.phase}</span>
                <span className="font-semibold text-cyan-100">{money(item.total)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      </Reveal>

      <Reveal>
      <section className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><FileCheck2 className="h-5 w-5 text-orange-200" /> Invoices</CardTitle><CardDescription>Draft and issued invoices awaiting client action.</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div><div className="font-medium">{invoice.id} · {invoice.client}</div><div className="mt-1 text-base text-[#8888a0]">{invoice.matter} · Due {invoice.due}</div></div>
                <div className="text-right"><div className="font-semibold">{money(invoice.amount)}</div><Badge variant={invoice.status === "Approved" ? "success" : invoice.status === "Sent" ? "warning" : "secondary"}>{invoice.status}</Badge></div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Banknote className="h-5 w-5 text-emerald-200" /> Trust accounting</CardTitle><CardDescription>Client trust ledger balances and reserved amounts.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {trustAccounts.map((account) => (
              <div key={account.client} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex justify-between gap-3"><div><div className="font-medium">{account.client}</div><div className="text-base text-[#8888a0]">{account.label}</div></div><div className="font-semibold">{money(account.balance)}</div></div>
                <div className="mt-3"><div className="mb-1 flex justify-between text-base text-[#8888a0]"><span>Reserved</span><span>{money(account.reserved)}</span></div><Progress value={(account.reserved / account.balance) * 100} /></div>
              </div>
            ))}
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4 text-base text-emerald-50">All client funds are displayed separately from operating invoices for ethical accounting controls.</div>
          </CardContent>
        </Card>
      </section>
      </Reveal>
    </div>
  );
}
