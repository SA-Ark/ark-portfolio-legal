import { BookOpen, Bot, FileSearch, Gavel, Send, UserRound } from "lucide-react";
import { Reveal } from "@/components/effects/motion";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const qa = [
  {
    question: "Under New York law, when is a limitation-of-liability clause likely enforceable in a commercial MSA?",
    answer:
      "New York courts generally enforce negotiated limitation-of-liability clauses between sophisticated commercial parties unless the clause is unconscionable, violates public policy, or attempts to shield willful misconduct or gross negligence. The analyzer recommends preserving carve-outs for confidentiality, IP misuse, payment obligations, and data security incidents.",
    sources: ["Metropolitan Life Ins. Co. v. Noble Lowndes Intl.", "Sommer v. Federal Signal Corp.", "UCC § 2-719"],
  },
  {
    question: "What factors support a temporary restraining order for misuse of trade secrets?",
    answer:
      "The moving party should establish likelihood of success on protectable trade secret status and misappropriation, irreparable harm from disclosure or use, balance of equities, and public interest. Courts often focus on reasonable secrecy measures, access logs, speed of filing, and narrow tailoring of requested restraints.",
    sources: ["Defend Trade Secrets Act", "Fed. R. Civ. P. 65", "PepsiCo v. Redmond"],
  },
  {
    question: "What should be included in a BIPA motion-to-dismiss outline?",
    answer:
      "Key sections include standing and injury, statutory definitions of biometric identifier/information, consent and retention allegations, preemption or extraterritoriality if applicable, limitations period, class definition defects, and preservation of arbitration or forum issues.",
    sources: ["740 ILCS 14/1 et seq.", "Rosenbach v. Six Flags", "Tims v. Black Horse Carriers"],
  },
];

export default function ResearchPage() {
  return (
    <div className="space-y-20 md:space-y-[120px]">
      <PageHero badge="Legal Research RAG" badgeVariant="purple" title="Research assistant with cited answers">
        Pre-scripted retrieval-augmented Q&A that demonstrates legal analysis, citation surfacing, and workflow handoff to case strategy.
      </PageHero>

      <Reveal>
      <section className="grid gap-5 lg:grid-cols-[1fr_22rem]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-cyan-200" /> Research chat</CardTitle>
            <CardDescription>Scripted legal Q&A with authority snippets and practical drafting guidance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {qa.map((item) => (
              <div key={item.question} className="space-y-3">
                <div className="ml-auto flex max-w-3xl gap-3 rounded-2xl border border-cyan-300/20 bg-cyan-500/10 p-4">
                  <UserRound className="mt-1 h-5 w-5 shrink-0 text-cyan-200" />
                  <div className="leading-7 text-cyan-50">{item.question}</div>
                </div>
                <div className="flex max-w-4xl gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <Bot className="mt-1 h-5 w-5 shrink-0 text-violet-200" />
                  <div>
                    <p className="leading-7 text-[#e8e8ed]">{item.answer}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.sources.map((source) => <Badge key={source} variant="secondary">{source}</Badge>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-3 rounded-2xl border border-white/10 bg-[#050510]/70 p-3">
              <Input placeholder="Ask about venue, limitations, evidentiary standards..." />
              <Button><Send className="h-4 w-4" /> Ask</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileSearch className="h-5 w-5 text-emerald-200" /> Retrieval set</CardTitle>
              <CardDescription>Authorities ranked by relevance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Commercial contracts", "Privacy and biometrics", "Trade secret injunctions", "Employment releases"].map((topic, index) => (
                <div key={topic} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center justify-between"><span>{topic}</span><Badge variant="success">{96 - index * 7}%</Badge></div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Gavel className="h-5 w-5 text-orange-200" /> Drafting output</CardTitle>
            </CardHeader>
            <CardContent className="text-base leading-7 text-[#8888a0]">
              The assistant can convert answers into motion outlines, client memos, deposition topics, diligence checklists, or contract markups while preserving cited authority context.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-violet-200" /> Guardrails</CardTitle>
            </CardHeader>
            <CardContent className="text-base leading-7 text-[#8888a0]">
              Demo language flags jurisdiction, recency, and attorney-review requirements before use in live legal work.
            </CardContent>
          </Card>
        </div>
      </section>
      </Reveal>
    </div>
  );
}
