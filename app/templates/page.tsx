import { ClipboardList, Download, FileSignature, WandSparkles } from "lucide-react";
import { Magnetic, Reveal } from "@/components/effects/motion";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const templates = [
  { name: "NDA", description: "Mutual confidentiality agreement with trade-secret protections", fields: 8 },
  { name: "Engagement Letter", description: "Client engagement scope, fees, conflicts, and consent", fields: 12 },
  { name: "Motion Outline", description: "Litigation motion structure with authorities and exhibits", fields: 10 },
  { name: "Board Consent", description: "Corporate authorization package with recitals", fields: 7 },
  { name: "Settlement Term Sheet", description: "Payment, release, confidentiality, and enforcement terms", fields: 11 },
];

export default function TemplatesPage() {
  return (
    <div className="space-y-20 md:space-y-[120px]">
      <PageHero badge="Document Generator" badgeVariant="purple" title="Template picker and generated preview">
        Select a legal template, enter matter-specific facts, and preview generated document language for attorney review.
      </PageHero>

      <Reveal>
        <section className="grid gap-5 lg:grid-cols-[22rem_1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5 text-cyan-200" /> Template picker</CardTitle>
              <CardDescription>Reusable practice-area documents.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {templates.map((template, index) => (
                <div key={template.name} className={`rounded-2xl border p-4 transition hover:-translate-y-1 ${index === 1 ? "border-cyan-300/40 bg-cyan-500/10 shadow-[0_0_30px_rgba(0,212,255,0.10)]" : "border-white/10 bg-white/[0.03]"}`}>
                  <div className="flex items-center justify-between"><div className="font-semibold">{template.name}</div><Badge variant="secondary">{template.fields} fields</Badge></div>
                  <p className="mt-2 text-base leading-7 text-[#8888a0]">{template.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><WandSparkles className="h-5 w-5 text-violet-200" /> Generator inputs</CardTitle>
                <CardDescription>Engagement letter template selected.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div><label className="mb-2 block text-base text-[#8888a0]">Client</label><Input defaultValue="Northstar Foods" /></div>
                <div><label className="mb-2 block text-base text-[#8888a0]">Matter type</label><Select defaultValue="litigation"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="litigation">Commercial Litigation</SelectItem><SelectItem value="corporate">Corporate Transaction</SelectItem><SelectItem value="privacy">Privacy / Cybersecurity</SelectItem></SelectContent></Select></div>
                <div><label className="mb-2 block text-base text-[#8888a0]">Lead attorney</label><Input defaultValue="Eleanor Voss" /></div>
                <div><label className="mb-2 block text-base text-[#8888a0]">Fee structure</label><Input defaultValue="Hourly, monthly invoice, evergreen retainer" /></div>
                <div className="md:col-span-2"><label className="mb-2 block text-base text-[#8888a0]">Scope notes</label><Textarea defaultValue="Representation in commercial dispute involving cold-chain logistics contract, document discovery, mediation, dispositive motion practice, and trial readiness." /></div>
                <div className="md:col-span-2 flex flex-wrap gap-3"><Magnetic><Button><FileSignature className="h-4 w-4" /> Generate document</Button></Magnetic><Magnetic><Button variant="secondary"><Download className="h-4 w-4" /> Export DOCX</Button></Magnetic></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated document preview</CardTitle>
                <CardDescription>Attorney-review draft generated from selected template and matter facts.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-2xl border border-white/10 bg-[#050510]/80 p-8 shadow-2xl shadow-cyan-950/20">
                  <div className="mx-auto max-w-3xl rounded bg-zinc-100 p-8 text-zinc-950">
                    <div className="text-center font-serif text-2xl font-bold">Silverstone Legal LLP</div>
                    <div className="mt-1 text-center text-base text-[#63637a]">Engagement Letter · Attorney-Review Draft</div>
                    <div className="mt-8 text-base leading-7">
                      <p>Dear Northstar Foods,</p>
                      <p className="mt-4">
                        We are pleased to confirm that Silverstone Legal LLP will represent Northstar Foods in connection with the commercial dispute involving the cold-chain logistics contract with Meridian Cold Chain. The scope of this engagement includes document discovery, pleadings, mediation preparation, dispositive motion practice, and trial readiness activities.
                      </p>
                      <p className="mt-4">
                        Eleanor Voss will serve as lead attorney. Fees will be billed hourly according to the firm rate schedule, invoiced monthly, and supported by an evergreen retainer held in client trust until earned or otherwise authorized.
                      </p>
                      <p className="mt-4">
                        This draft preserves standard conflicts, confidentiality, client cooperation, records retention, electronic communication, and termination provisions. Please review all generated terms before execution.
                      </p>
                      <div className="mt-10 grid grid-cols-2 gap-8 text-base"><div><div className="border-t border-zinc-400 pt-2">Silverstone Legal LLP</div></div><div><div className="border-t border-zinc-400 pt-2">Northstar Foods</div></div></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
