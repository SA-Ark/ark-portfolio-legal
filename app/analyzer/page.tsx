import { AlertTriangle, CheckCircle2, FileUp, GitCompareArrows, ShieldCheck, Sparkles } from "lucide-react";
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
    <div className="space-y-8">
      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Badge variant="purple" className="mb-4">AI Contract Analyzer</Badge>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-gradient">Contract intelligence demo</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
            Upload simulation with pre-generated legal analysis for key terms, obligations, deadlines, risk flags, and side-by-side clause revision.
          </p>
        </div>
        <Card className="border-blue-400/20">
          <CardContent className="flex h-full min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-blue-300/30 bg-blue-500/5 p-8 text-center">
            <FileUp className="h-10 w-10 text-blue-200" />
            <div className="mt-4 text-xl font-semibold">Drop contract for analysis</div>
            <p className="mt-2 text-sm text-zinc-400">PDF, DOCX, or TXT. Demo uses seeded analysis below.</p>
            <Button className="mt-5"><Sparkles className="h-4 w-4" /> Run analyzer</Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-5">
        {analyzedContracts.map((contract) => (
          <Card key={contract.id} className={contract.id === selected.id ? "border-blue-300/40" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{contract.name}</CardTitle>
              <CardDescription>{contract.counterparty}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex items-center justify-between text-sm"><span>Risk score</span><span className="font-semibold text-white">{contract.riskScore}</span></div>
              <Progress value={contract.riskScore} />
            </CardContent>
          </Card>
        ))}
      </section>

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
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">{term.label}</div>
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
                <p className="mt-4 font-mono text-sm leading-7 text-zinc-300">{selected.excerpt}</p>
              </div>
              <div className="rounded-2xl border border-emerald-300/20 bg-emerald-500/8 p-5">
                <Badge variant="success"><ShieldCheck className="mr-1 h-3.5 w-3.5" />Suggested revision</Badge>
                <p className="mt-4 font-mono text-sm leading-7 text-zinc-300">{selected.revision}</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
