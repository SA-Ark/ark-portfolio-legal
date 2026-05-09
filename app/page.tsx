import Link from "next/link";
import { ArrowUpRight, CalendarClock, Filter, Scale, Search, ShieldAlert, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { attorneys, cases, getAttorney } from "@/lib/data";

function statusVariant(status: string) {
  if (["Trial Prep", "Discovery"].includes(status)) return "danger";
  if (["Mediation", "Active"].includes(status)) return "warning";
  if (status === "Closing") return "success";
  return "secondary";
}

function riskVariant(risk: string) {
  if (risk === "High") return "danger";
  if (risk === "Medium") return "warning";
  return "success";
}

export default function Home() {
  const highRisk = cases.filter((legalCase) => legalCase.risk === "High").length;
  const inCourt = cases.filter((legalCase) => legalCase.court !== "Private Transaction").length;

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <Badge variant="purple" className="mb-4">Matter Command Dashboard</Badge>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-gradient md:text-5xl">
            Legal case management demo
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
            Twenty active matters with client, practice group, attorney ownership, deadline intelligence, and case-file access in a professional dark workspace.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary"><Filter className="h-4 w-4" /> Filter matters</Button>
          <Button><Scale className="h-4 w-4" /> New intake</Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Open cases</CardDescription>
            <CardTitle className="text-3xl">{cases.length}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-400">Across {new Set(cases.map((legalCase) => legalCase.practiceArea)).size} practice areas</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>High-risk matters</CardDescription>
            <CardTitle className="flex items-center gap-2 text-3xl text-red-100"><ShieldAlert className="h-6 w-6" />{highRisk}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-400">Trial, regulatory, and privacy exposure</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Attorney bench</CardDescription>
            <CardTitle className="flex items-center gap-2 text-3xl"><Users className="h-6 w-6 text-blue-200" />{attorneys.length}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-400">Partners, counsel, and associates</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Court / agency matters</CardDescription>
            <CardTitle className="text-3xl">{inCourt}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-400">Deadlines tracked through calendar controls</CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Case inventory</CardTitle>
            <CardDescription>Grid/list view of active client matters and next required action.</CardDescription>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-500" />
            <Input className="pl-9" placeholder="Search client, case #, attorney..." />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case #</TableHead>
                <TableHead>Client / matter</TableHead>
                <TableHead>Practice area</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attorney</TableHead>
                <TableHead>Next deadline</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead className="text-right">Open</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((legalCase) => {
                const attorney = getAttorney(legalCase.attorneyId);
                return (
                  <TableRow key={legalCase.id}>
                    <TableCell className="font-mono text-xs text-blue-200">{legalCase.caseNumber}</TableCell>
                    <TableCell>
                      <div className="font-medium text-white">{legalCase.client}</div>
                      <div className="text-sm text-zinc-500">{legalCase.title}</div>
                    </TableCell>
                    <TableCell className="text-zinc-300">{legalCase.practiceArea}</TableCell>
                    <TableCell><Badge variant={statusVariant(legalCase.status)}>{legalCase.status}</Badge></TableCell>
                    <TableCell>
                      <div className="text-zinc-100">{attorney?.name}</div>
                      <div className="text-xs text-zinc-500">{attorney?.role}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-zinc-100"><CalendarClock className="h-4 w-4 text-orange-200" />{legalCase.nextDeadline}</div>
                    </TableCell>
                    <TableCell><Badge variant={riskVariant(legalCase.risk)}>{legalCase.risk}</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/cases/${legalCase.id}`}>Detail <ArrowUpRight className="h-3.5 w-3.5" /></Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
