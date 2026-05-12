"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarClock, Filter, Scale, Search, ShieldAlert, Users } from "lucide-react";
import { Magnetic, Reveal, Stagger, StaggerItem } from "@/components/effects/motion";
import { ParticleHeroDynamic } from "@/components/effects/particle-hero-dynamic";
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
  const [searchQuery, setSearchQuery] = useState("");

  const highRisk = cases.filter((legalCase) => legalCase.risk === "High").length;
  const inCourt = cases.filter((legalCase) => legalCase.court !== "Private Transaction").length;

  const filteredCases = searchQuery.trim()
    ? cases.filter((legalCase) => {
        const attorney = getAttorney(legalCase.attorneyId);
        const haystack = [
          legalCase.caseNumber,
          legalCase.client,
          legalCase.title,
          legalCase.practiceArea,
          legalCase.status,
          legalCase.risk,
          legalCase.nextDeadline,
          attorney?.name ?? "",
          attorney?.role ?? "",
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(searchQuery.toLowerCase());
      })
    : cases;

  return (
    <div className="space-y-20 md:space-y-[120px]">
      <Reveal>
        <section className="relative isolate overflow-hidden rounded-[28px] border border-white/[0.06] bg-white/[0.025] px-5 py-10 shadow-2xl shadow-violet-950/20 md:px-8 md:py-14">
          <ParticleHeroDynamic />
          <span className="hero-orb left-10 top-10 h-24 w-24 bg-cyan-400/20" aria-hidden="true" />
          <span className="hero-orb bottom-6 right-12 h-32 w-32 bg-violet-600/20 [animation-delay:1.2s]" aria-hidden="true" />
          <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <Badge variant="purple" className="mb-4">Matter Command Dashboard</Badge>
              <h1 className="shimmer-text max-w-4xl font-heading text-5xl font-extrabold tracking-tight md:text-7xl">
                Legal case management demo
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#b7b7c7]">
                Twenty active matters with client, practice group, attorney ownership, deadline intelligence, and case-file access in a professional dark workspace.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Magnetic><Button variant="secondary"><Filter className="h-4 w-4" /> Filter matters</Button></Magnetic>
              <Magnetic><Button><Scale className="h-4 w-4" /> New intake</Button></Magnetic>
            </div>
          </div>
        </section>
      </Reveal>

      <Stagger className="grid gap-4 md:grid-cols-4">
        <StaggerItem>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Open cases</CardDescription>
              <CardTitle className="text-3xl">{cases.length}</CardTitle>
            </CardHeader>
            <CardContent className="text-base text-[#8888a0]">Across {new Set(cases.map((legalCase) => legalCase.practiceArea)).size} practice areas</CardContent>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>High-risk matters</CardDescription>
              <CardTitle className="flex items-center gap-2 text-3xl text-red-100"><ShieldAlert className="h-6 w-6" />{highRisk}</CardTitle>
            </CardHeader>
            <CardContent className="text-base text-[#8888a0]">Trial, regulatory, and privacy exposure</CardContent>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Attorney bench</CardDescription>
              <CardTitle className="flex items-center gap-2 text-3xl"><Users className="h-6 w-6 text-cyan-200" />{attorneys.length}</CardTitle>
            </CardHeader>
            <CardContent className="text-base text-[#8888a0]">Partners, counsel, and associates</CardContent>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Court / agency matters</CardDescription>
              <CardTitle className="text-3xl">{inCourt}</CardTitle>
            </CardHeader>
            <CardContent className="text-base text-[#8888a0]">Deadlines tracked through calendar controls</CardContent>
          </Card>
        </StaggerItem>
      </Stagger>

      <Reveal>
        <Card>
          <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Case inventory</CardTitle>
              <CardDescription>Grid/list view of active client matters and next required action.</CardDescription>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#8888a0]" />
              <Input className="pl-9" placeholder="Search client, case #, attorney..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
                {filteredCases.map((legalCase) => {
                  const attorney = getAttorney(legalCase.attorneyId);
                  return (
                    <TableRow key={legalCase.id}>
                      <TableCell className="font-mono text-base text-cyan-200">{legalCase.caseNumber}</TableCell>
                      <TableCell>
                        <div className="font-medium text-white">{legalCase.client}</div>
                        <div className="text-base text-[#8888a0]">{legalCase.title}</div>
                      </TableCell>
                      <TableCell className="text-[#d8d8e5]">{legalCase.practiceArea}</TableCell>
                      <TableCell><Badge variant={statusVariant(legalCase.status)}>{legalCase.status}</Badge></TableCell>
                      <TableCell>
                        <div className="text-white">{attorney?.name}</div>
                        <div className="text-base text-[#8888a0]">{attorney?.role}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-white"><CalendarClock className="h-4 w-4 text-orange-200" />{legalCase.nextDeadline}</div>
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
      </Reveal>
    </div>
  );
}
