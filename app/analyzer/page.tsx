import { AlertTriangle, CheckCircle2, FileUp, GitCompareArrows, ShieldCheck, Sparkles } from "lucide-react";
import { Magnetic, Reveal, Stagger, StaggerItem } from "@/components/effects/motion";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyzedContracts } from "@/lib/data";

function riskVariant(severity: string) {
  if (severity === "High") return "danger";
  if (severity === "Medium") return "warning";
  return "success";
}

export default function AnalyzerPage() {
  const selected = analyzedContracts[0];

  return (
    <div className="space-y-20 md:space-y-[120px]">
      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <PageHero badge="AI Contract Analyzer" badgeVariant="purple" title="Contract intelligence demo" compact>
          Upload simulation with pre-generated legal analysis for key terms, obligations, deadlines, risk flags, and side-by-side clause revision.
        </PageHero>
        <Reveal>
          <Card className="h-full border-cyan-400/20">
            <CardContent className="flex h-full min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-300/30 bg-cyan-500/5 p-8 text-center">
              <FileUp className="h-10 w-10 text-cyan-200" />
              <div className="mt-4 text-2xl font-semibold text-white">Drop contract for analysis</div>
              <p className="mt-2 text-base text-[#8888a0]">PDF, DOCX, or TXT. Demo uses seeded analysis below.</p>
              <Magnetic><Button className="mt-5"><Sparkles className="h-4 w-4" /> Run analyzer</Button></Magnetic>
            </CardContent>
          </Card>
        </Reveal>
      </section>

      <Stagger className="grid gap-4 md:grid-cols-5">
        {analyzedContracts.map((contract) => (
          <StaggerItem key={contract.id}>
            <Card className={contract.id === selected.id ? "border-cyan-300/40" : ""}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{contract.name}</CardTitle>
                <CardDescription>{contract.counterparty}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex items-center justify-between text-base"><span>Risk score</span><span className="font-semibold text-white">{contract.riskScore}</span></div>
                <Progress value={contract.riskScore} />
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal>
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>{selected.name}</CardTitle>
                <CardDescription>{selected.summary}</CardDescription>
              </div>
              <Badge variant="danger">Risk score {selected.riskScore}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="terms">
              <TabsList className="flex flex-wrap">
                <TabsTrigger value="terms">Key terms</TabsTrigger>
                <TabsTrigger value="obligations">Obligations</TabsTrigger>
                <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
                <TabsTrigger value="risks">Risk flags</TabsTrigger>
                <TabsTrigger value="compare"><GitCompareArrows className="mr-2 h-4 w-4" />Side-by-side</TabsTrigger>
              </TabsList>
              <TabsContent value="terms" className="grid gap-4 md:grid-cols-4">
                {selected.keyTerms.map((term) => (
                  <div key={term.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs uppercase tracking-[0.2em] text-[#8888a0]">{term.label}</div>
                    <div className="mt-3 font-medium text-white">{term.value}</div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="obligations" className="space-y-3">
                {selected.obligations.map((obligation) => (
                  <div key={obligation} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"><CheckCircle2 className="h-5 w-5 text-emerald-300" />{obligation}</div>
                ))}
              </TabsContent>
              <TabsContent value="deadlines" className="space-y-3">
                {selected.deadlines.map((deadline) => (
                  <div key={deadline} className="rounded-2xl border border-orange-300/20 bg-orange-500/10 p-4 text-orange-50">{deadline}</div>
                ))}
              </TabsContent>
              <TabsContent value="risks" className="grid gap-3 md:grid-cols-3">
                {selected.riskFlags.map((flag) => (
                  <div key={flag.text} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <Badge variant={riskVariant(flag.severity)}><AlertTriangle className="mr-1 h-3.5 w-3.5" />{flag.severity}</Badge>
                    <p className="mt-4 leading-7 text-zinc-300">{flag.text}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="compare" className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-red-300/20 bg-red-500/8 p-5">
                  <Badge variant="danger">Original clause</Badge>
                  <p className="mt-4 font-mono text-base leading-7 text-zinc-300">{selected.excerpt}</p>
                </div>
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-500/8 p-5">
                  <Badge variant="success"><ShieldCheck className="mr-1 h-3.5 w-3.5" />Suggested revision</Badge>
                  <p className="mt-4 font-mono text-base leading-7 text-zinc-300">{selected.revision}</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
