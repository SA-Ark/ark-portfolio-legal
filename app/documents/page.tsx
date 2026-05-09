import { Clock3, File, FileArchive, Folder, History, Search } from "lucide-react";
import { Reveal } from "@/components/effects/motion";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cases, documents } from "@/lib/data";

const folders = Array.from(new Set(documents.map((document) => document.folder))).map((folder) => ({
  name: folder,
  count: documents.filter((document) => document.folder === folder).length,
}));

export default function DocumentsPage() {
  const featuredDocument = documents[2];

  return (
    <div className="space-y-20 md:space-y-[120px]">
      <PageHero badge="Document Management" badgeVariant="default" title="Indexed legal document vault">
        Eighty seeded documents organized by matter folder, version history, OCR status, and review owner for rapid portfolio review.
      </PageHero>

      <Reveal>
      <section className="grid gap-5 lg:grid-cols-[20rem_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileArchive className="h-5 w-5 text-cyan-200" /> File tree</CardTitle>
            <CardDescription>Folders across all case workspaces.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {folders.map((folder) => (
              <div key={folder.name} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
                <div className="flex items-center gap-3"><Folder className="h-4 w-4 text-cyan-200" /><span>{folder.name}</span></div>
                <Badge variant="secondary">{folder.count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Document library</CardTitle>
              <CardDescription>Searchable matter files, evidence, correspondence, research, and billing records.</CardDescription>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#8888a0]" />
              <Input className="pl-9" placeholder="Search files, folders, owners..." />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Matter</TableHead>
                  <TableHead>Folder</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.slice(0, 40).map((document) => {
                  const legalCase = cases.find((item) => item.id === document.caseId);
                  return (
                    <TableRow key={document.id}>
                      <TableCell>
                        <div className="flex items-center gap-3"><File className="h-4 w-4 text-[#8888a0]" /><span className="font-medium">{document.name}</span></div>
                        <div className="ml-7 text-base text-[#8888a0]">{document.size} · Owner: {document.owner}</div>
                      </TableCell>
                      <TableCell className="max-w-60 truncate text-[#d8d8e5]">{legalCase?.caseNumber} · {legalCase?.client}</TableCell>
                      <TableCell>{document.folder}</TableCell>
                      <TableCell>{document.type}</TableCell>
                      <TableCell className="font-mono text-base text-cyan-200">{document.version}</TableCell>
                      <TableCell><Badge variant={document.status === "Privileged" ? "danger" : document.status === "Client Review" ? "warning" : "success"}>{document.status}</Badge></TableCell>
                      <TableCell>{document.updated}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
      </Reveal>

      <Reveal>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><History className="h-5 w-5 text-violet-200" /> Version history preview</CardTitle>
          <CardDescription>Every document carries version history for auditability and attorney review.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-[1fr_2fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-base text-[#8888a0]">Selected document</div>
            <div className="mt-2 text-xl font-semibold">{featuredDocument.name}</div>
            <div className="mt-3 flex flex-wrap gap-2"><Badge variant="secondary">{featuredDocument.folder}</Badge><Badge variant="purple">{featuredDocument.version}</Badge></div>
          </div>
          <div className="space-y-3">
            {featuredDocument.history.map((event) => (
              <div key={`${event.version}-${event.date}`} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <Clock3 className="mt-0.5 h-4 w-4 text-cyan-200" />
                <div><div className="font-medium">{event.version} · {event.date}</div><div className="mt-1 text-base text-[#8888a0]">{event.note}</div></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </Reveal>
    </div>
  );
}
