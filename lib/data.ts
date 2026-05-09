export type PracticeArea = "Corporate" | "Litigation" | "IP" | "Real Estate" | "Employment";
export type CaseStatus = "Active" | "Pending" | "Settled" | "Closed";

export type Attorney = {
  id: string;
  name: string;
  initials: string;
  specialty: PracticeArea;
  rate: number;
  email: string;
};

export type LegalCase = {
  id: string;
  caseNumber: string;
  clientName: string;
  matter: string;
  practiceArea: PracticeArea;
  status: CaseStatus;
  assignedAttorneyId: string;
  nextDeadline: string;
  lastActivity: string;
  risk: "Low" | "Medium" | "High";
  value: number;
  summary: string;
  parties: { role: string; name: string; counsel?: string }[];
  timeline: { date: string; title: string; description: string }[];
  communications: { from: string; date: string; subject: string; tone: string }[];
  notes: string[];
};

export type DocumentRecord = {
  id: string;
  caseId: string;
  folder: "Pleadings" | "Discovery" | "Correspondence" | "Contracts";
  title: string;
  type: string;
  version: number;
  updatedAt: string;
  size: string;
  excerpt: string;
};

export type Deadline = {
  id: string;
  caseId: string;
  title: string;
  dueDate: string;
  reminder: boolean;
  owner: string;
};

export type TimeEntry = {
  id: string;
  caseId: string;
  attorneyId: string;
  date: string;
  activity: string;
  hours: number;
  rate: number;
  billable: boolean;
};

export const attorneys: Attorney[] = [
  { id: "att-1", name: "Amelia Chen", initials: "AC", specialty: "Corporate", rate: 650, email: "achen@silverstonelegal.example" },
  { id: "att-2", name: "Marcus Reed", initials: "MR", specialty: "Litigation", rate: 725, email: "mreed@silverstonelegal.example" },
  { id: "att-3", name: "Priya Raman", initials: "PR", specialty: "IP", rate: 690, email: "praman@silverstonelegal.example" },
  { id: "att-4", name: "Elena Morales", initials: "EM", specialty: "Real Estate", rate: 610, email: "emorales@silverstonelegal.example" },
  { id: "att-5", name: "Jonah Whitaker", initials: "JW", specialty: "Employment", rate: 575, email: "jwhitaker@silverstonelegal.example" },
  { id: "att-6", name: "Nadia Okafor", initials: "NO", specialty: "Corporate", rate: 640, email: "nokafor@silverstonelegal.example" },
  { id: "att-7", name: "Thomas Hale", initials: "TH", specialty: "Litigation", rate: 700, email: "thale@silverstonelegal.example" },
  { id: "att-8", name: "Sofia Lind", initials: "SL", specialty: "IP", rate: 665, email: "slind@silverstonelegal.example" },
  { id: "att-9", name: "Caleb Brooks", initials: "CB", specialty: "Real Estate", rate: 590, email: "cbrooks@silverstonelegal.example" },
  { id: "att-10", name: "Mira Patel", initials: "MP", specialty: "Employment", rate: 555, email: "mpatel@silverstonelegal.example" },
];

const clientNames = [
  "Northstar Biologics", "Aster Capital Partners", "Harborline Foods", "QuantaGrid Systems", "Larkspur Studios",
  "CivicStone Development", "Evergreen Robotics", "Blue Ridge Hospitality", "Atlas Medical Group", "Meridian Solar",
  "Pioneer Logistics", "Verdant Retail", "OroWorks Manufacturing", "Cobalt Cloud", "Juniper Schools",
  "Summit Aviation", "Hearth & Home REIT", "Lumina Therapeutics", "Crescent Apparel", "Beacon Fintech",
  "Sterling Farms", "Vector Motors", "Mariner Insurance", "Keystone Dental",
];

const matters = [
  "Series D financing and investor rights", "Trade secret injunction", "Supply agreement renegotiation", "Data center lease dispute", "Copyright licensing portfolio",
  "Mixed-use tower acquisition", "Patent prosecution and freedom to operate", "Hotel management termination", "Physician non-compete review", "EPC contract risk review",
  "Warehouse accident defense", "Class action wage compliance", "Equipment purchase arbitration", "SaaS terms modernization", "Campus construction claims",
  "Aircraft purchase escrow", "Retail center refinancing", "Clinical trial collaboration", "Executive separation package", "Payments regulatory inquiry",
  "Agricultural easement dispute", "Autonomous vehicle joint venture", "Coverage denial litigation", "Practice acquisition diligence",
];

const practiceAreas: PracticeArea[] = ["Corporate", "Litigation", "Corporate", "Real Estate", "IP", "Real Estate", "IP", "Litigation", "Employment", "Corporate", "Litigation", "Employment", "Litigation", "Corporate", "Real Estate", "Corporate", "Real Estate", "IP", "Employment", "Corporate", "Real Estate", "Corporate", "Litigation", "Corporate"];
const statuses: CaseStatus[] = ["Active", "Active", "Pending", "Active", "Settled", "Active", "Active", "Pending", "Closed", "Active", "Active", "Pending", "Settled", "Active", "Active", "Closed", "Active", "Pending", "Settled", "Active", "Pending", "Active", "Active", "Closed"];

export const cases: LegalCase[] = clientNames.map((clientName, index) => {
  const practiceArea = practiceAreas[index];
  const attorney = attorneys.find((item) => item.specialty === practiceArea) ?? attorneys[index % attorneys.length];
  const caseNumber = `SL-${2026}-${String(index + 101).padStart(4, "0")}`;
  return {
    id: `case-${index + 1}`,
    caseNumber,
    clientName,
    matter: matters[index],
    practiceArea,
    status: statuses[index],
    assignedAttorneyId: attorney.id,
    nextDeadline: new Date(2026, 4, 5 + index * 3).toISOString(),
    lastActivity: ["Client strategy call", "Draft circulated", "Opposing counsel response", "AI document review completed", "Court filing accepted"][index % 5],
    risk: ["Low", "Medium", "High", "Medium"][index % 4] as LegalCase["risk"],
    value: 175000 + index * 86000,
    summary: `${clientName} retained Silverstone Legal for ${matters[index].toLowerCase()}. The team is coordinating deadlines, document intelligence, billing, and client communications in one matter workspace.`,
    parties: [
      { role: "Client", name: clientName, counsel: "Silverstone Legal" },
      { role: index % 3 === 0 ? "Counterparty" : "Opposing Party", name: ["Ridgeway Holdings", "Banyan Ventures", "Stone Arch LLC", "Helio Partners"][index % 4], counsel: ["Barton & Field", "Keene LLP", "Moss Legal", "Parker Trial Group"][index % 4] },
      { role: "Primary Contact", name: ["Dana Ellis", "Ruth Kim", "Owen Price", "Leah Foster"][index % 4] },
    ],
    timeline: [
      { date: "2026-01-14", title: "Matter opened", description: "Conflict check cleared and engagement letter executed." },
      { date: "2026-02-03", title: "Document intake", description: "Client uploaded source documents and prior correspondence to the secure workspace." },
      { date: "2026-03-18", title: "AI review complete", description: "Contract and pleading set analyzed for obligations, deadlines, and unusual clauses." },
      { date: "2026-04-26", title: "Strategy update", description: "Team updated case plan, budget, and next milestone owners." },
    ],
    communications: [
      { from: attorney.name, date: "2026-04-28", subject: "Weekly matter update", tone: "Reassuring" },
      { from: "Client Portal", date: "2026-04-29", subject: "New document uploaded for review", tone: "Action requested" },
      { from: "Opposing Counsel", date: "2026-05-01", subject: "Proposed scheduling stipulation", tone: "Neutral" },
    ],
    notes: [
      "Client prefers concise weekly updates with risk and spend summary.",
      "Use precedent bank for similar arguments before drafting dispositive motion.",
      "Partner review required for any settlement authority above threshold.",
    ],
  };
});

const folders: DocumentRecord["folder"][] = ["Pleadings", "Discovery", "Correspondence", "Contracts"];
const docTypes = ["PDF", "DOCX", "EMAIL", "XLSX"];
export const documents: DocumentRecord[] = cases.flatMap((legalCase, caseIndex) =>
  Array.from({ length: 4 }, (_, docIndex) => ({
    id: `doc-${caseIndex + 1}-${docIndex + 1}`,
    caseId: legalCase.id,
    folder: folders[docIndex % folders.length],
    title: `${folders[docIndex % folders.length]} - ${legalCase.matter.split(" ").slice(0, 4).join(" ")} ${docIndex + 1}`,
    type: docTypes[(caseIndex + docIndex) % docTypes.length],
    version: 1 + ((caseIndex + docIndex) % 5),
    updatedAt: new Date(2026, 3, 2 + ((caseIndex + docIndex) % 26)).toISOString(),
    size: `${(0.8 + ((caseIndex + docIndex) % 7) * 0.45).toFixed(1)} MB`,
    excerpt: `Contains clauses, correspondence, and procedural facts relevant to ${legalCase.clientName} and ${legalCase.practiceArea.toLowerCase()} strategy.`,
  }))
);

export const deadlines: Deadline[] = [
  "Responsive pleading due", "Expert designation", "Contract notice window", "Discovery cutoff", "Mediation brief", "Board consent package", "USPTO office action", "Lease diligence report", "Settlement conference", "Privilege log", "Motion hearing", "Invoice approval", "Client budget review", "Renewal option deadline", "Closing deliverables", "Witness interviews", "Draft agreement sign-off", "Regulatory response"
].map((title, index) => ({
  id: `deadline-${index + 1}`,
  caseId: cases[index % cases.length].id,
  title,
  dueDate: new Date(2026, 3 + Math.floor(index / 8), 25 + index * 2).toISOString(),
  reminder: index % 3 !== 0,
  owner: attorneys[index % attorneys.length].name,
}));

export const timeEntries: TimeEntry[] = Array.from({ length: 56 }, (_, index) => {
  const legalCase = cases[index % cases.length];
  const attorney = attorneys.find((item) => item.id === legalCase.assignedAttorneyId) ?? attorneys[index % attorneys.length];
  return {
    id: `time-${index + 1}`,
    caseId: legalCase.id,
    attorneyId: attorney.id,
    date: new Date(2026, 3, 1 + (index % 28)).toISOString(),
    activity: ["Contract analysis", "Client conference", "Legal research", "Draft revision", "Case strategy", "Court preparation", "Due diligence review"][index % 7],
    hours: Number((0.7 + (index % 6) * 0.6).toFixed(1)),
    rate: attorney.rate,
    billable: index % 9 !== 0,
  };
});

export const analyzedContracts = [
  {
    id: "contract-1",
    name: "Master Services Agreement - QuantaGrid",
    riskScore: 78,
    level: "Medium-high",
    snippet: "Supplier shall provide migration services under Exhibit B. Customer may terminate for convenience with thirty days notice. Liability shall not exceed fees paid in the prior three months, excluding confidentiality breaches.",
    keyTerms: ["30-day termination for convenience", "3-month fee liability cap", "Confidentiality carveout", "SLA credits capped at 8% monthly fees"],
    obligations: ["Deliver migration plan within 10 business days", "Maintain cyber insurance at $5M", "Escalate P1 outages within 30 minutes"],
    deadlines: ["Security questionnaire due May 12", "Renewal opt-out by July 1", "Data return certification within 15 days of termination"],
    flags: [
      { severity: "yellow", text: "Unilateral scope change right is broader than Silverstone baseline." },
      { severity: "red", text: "Indemnity excludes third-party IP claims in customer-hosted modules." },
    ],
  },
  {
    id: "contract-2",
    name: "Clinical Collaboration Agreement - Lumina",
    riskScore: 64,
    level: "Medium",
    snippet: "Each party retains background IP. Project inventions shall be jointly owned unless solely invented by one party personnel. Publication may be delayed up to ninety days for patent filings.",
    keyTerms: ["Joint ownership default", "90-day publication delay", "Background IP retained", "Milestone payments tied to enrollment"],
    obligations: ["IRB approvals before enrollment", "Quarterly safety reports", "Patent committee meeting every 45 days"],
    deadlines: ["Protocol amendment by May 18", "First milestone report June 3"],
    flags: [{ severity: "yellow", text: "Joint IP commercialization mechanics require additional detail." }],
  },
  {
    id: "contract-3",
    name: "Retail Center Purchase Agreement",
    riskScore: 42,
    level: "Moderate",
    snippet: "Buyer receives a forty-five day diligence period and may object to title exceptions prior to expiration. Seller representations survive closing for nine months.",
    keyTerms: ["45-day diligence", "Title objection right", "9-month rep survival", "Escrow holdback $1.2M"],
    obligations: ["Order updated survey", "Review leases and estoppels", "Deliver lender checklist"],
    deadlines: ["Diligence expires May 28", "Title objections by May 22", "Closing June 14"],
    flags: [{ severity: "yellow", text: "Environmental indemnity survival shorter than lender requirement." }],
  },
  {
    id: "contract-4",
    name: "Executive Separation Agreement",
    riskScore: 35,
    level: "Low-medium",
    snippet: "Employee receives severance equal to six months base salary in exchange for a general release, confidentiality, non-disparagement, and cooperation covenants.",
    keyTerms: ["6-month severance", "General release", "Non-disparagement", "Cooperation covenant"],
    obligations: ["Payment after revocation period", "Return devices within 5 days", "Mutual announcement approval"],
    deadlines: ["Revocation period ends May 9", "COBRA notice May 11"],
    flags: [{ severity: "yellow", text: "State-specific waiver language should be localized." }],
  },
  {
    id: "contract-5",
    name: "Autonomous Vehicle Joint Venture LOI",
    riskScore: 82,
    level: "High",
    snippet: "The parties intend to negotiate definitive documents. Exclusivity applies globally for twelve months. Break fee equals projected year-one gross margin if either party pursues a competing platform.",
    keyTerms: ["Global 12-month exclusivity", "Break fee tied to projected margin", "Non-binding economics", "Binding confidentiality"],
    obligations: ["Steering committee charter", "Data room completion", "Antitrust screen before definitive agreement"],
    deadlines: ["Exclusivity starts at signature", "Definitive documents by June 30"],
    flags: [
      { severity: "red", text: "Global exclusivity may be commercially overbroad and raise competition concerns." },
      { severity: "yellow", text: "Break fee formula lacks objective calculation source." },
    ],
  },
];

export const generatedDocuments = [
  {
    template: "NDA",
    caseId: "case-22",
    title: "Mutual Non-Disclosure Agreement",
    body: "This Mutual Non-Disclosure Agreement is entered into by Vector Motors and Silverstone Legal's designated transaction counterparties for the autonomous vehicle joint venture evaluation. Confidential Information includes technical roadmaps, fleet telemetry, pricing, source materials, and business plans disclosed through the secure diligence room.",
  },
  {
    template: "Engagement Letter",
    caseId: "case-1",
    title: "Engagement Letter - Northstar Biologics Series D",
    body: "Silverstone Legal LLP will represent Northstar Biologics in connection with its Series D financing, investor rights amendments, diligence responses, and closing deliverables. The matter team will be led by Amelia Chen with support from corporate associates and document intelligence workflows.",
  },
  {
    template: "Motion to Dismiss",
    caseId: "case-2",
    title: "Draft Motion to Dismiss - Trade Secret Claims",
    body: "Defendant respectfully moves to dismiss because the complaint pleads only generalized categories of business information and does not identify a trade secret with reasonable particularity. Similar Silverstone matters emphasize preemption, public-domain disclosures, and failure to allege improper acquisition.",
  },
];

export const researchAnswer = {
  question: "What arguments did we use in similar cases?",
  answer: "In comparable Silverstone matters, the strongest arguments were: (1) require particularized identification of the alleged trade secret before discovery expands; (2) show independent development through timestamped product records; (3) narrow injunctive relief by demonstrating customer-specific overbreadth; and (4) use proportionality objections to sequence discovery. The RAG search found SL-2026-0102, SL-2026-0111, and SL-2026-0123 as the closest precedent matters.",
  references: ["SL-2026-0102 — Trade secret injunction", "SL-2026-0111 — Warehouse accident defense", "SL-2026-0123 — Coverage denial litigation"],
};

export function attorneyForCase(legalCase: LegalCase) {
  return attorneys.find((attorney) => attorney.id === legalCase.assignedAttorneyId) ?? attorneys[0];
}

export function documentsForCase(caseId: string) {
  return documents.filter((document) => document.caseId === caseId);
}

export function deadlinesForCase(caseId: string) {
  return deadlines.filter((deadline) => deadline.caseId === caseId);
}

export function timeForCase(caseId: string) {
  return timeEntries.filter((entry) => entry.caseId === caseId);
}

export function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function shortDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}
