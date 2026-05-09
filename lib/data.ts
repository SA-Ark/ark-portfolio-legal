export type Attorney = {
  id: string;
  name: string;
  role: string;
  email: string;
  rate: number;
  practiceAreas: string[];
};

export type CaseStatus = "Intake" | "Active" | "Discovery" | "Mediation" | "Trial Prep" | "Closing";

export type LegalCase = {
  id: string;
  caseNumber: string;
  title: string;
  client: string;
  opposingParty: string;
  practiceArea: string;
  status: CaseStatus;
  attorneyId: string;
  court: string;
  opened: string;
  value: string;
  nextDeadline: string;
  risk: "Low" | "Medium" | "High";
  summary: string;
  parties: { role: string; name: string; counsel?: string }[];
  timeline: { date: string; event: string; type: string }[];
  communications: { date: string; from: string; subject: string; channel: string }[];
};

export type LegalDocument = {
  id: string;
  caseId: string;
  name: string;
  folder: string;
  type: string;
  owner: string;
  updated: string;
  version: string;
  status: string;
  size: string;
  history: { version: string; date: string; note: string }[];
};

export type Deadline = {
  id: string;
  caseId: string;
  title: string;
  date: string;
  type: string;
  priority: "red" | "orange" | "yellow" | "green";
  owner: string;
};

export type TimeEntry = {
  id: string;
  caseId: string;
  attorneyId: string;
  date: string;
  description: string;
  hours: number;
  billable: boolean;
  phase: string;
};

export type AnalyzedContract = {
  id: string;
  name: string;
  counterparty: string;
  riskScore: number;
  summary: string;
  keyTerms: { label: string; value: string }[];
  obligations: string[];
  deadlines: string[];
  riskFlags: { severity: "High" | "Medium" | "Low"; text: string }[];
  excerpt: string;
  revision: string;
};

export const attorneys: Attorney[] = [
  { id: "atty-01", name: "Eleanor Voss", role: "Managing Partner", email: "evoss@silverstone.law", rate: 675, practiceAreas: ["Commercial Litigation", "Appellate"] },
  { id: "atty-02", name: "Marcus Chen", role: "Partner", email: "mchen@silverstone.law", rate: 625, practiceAreas: ["M&A", "Corporate"] },
  { id: "atty-03", name: "Priya Nair", role: "Partner", email: "pnair@silverstone.law", rate: 590, practiceAreas: ["Employment", "Investigations"] },
  { id: "atty-04", name: "Julian Brooks", role: "Senior Counsel", email: "jbrooks@silverstone.law", rate: 520, practiceAreas: ["Real Estate", "Finance"] },
  { id: "atty-05", name: "Amara Okafor", role: "Senior Associate", email: "aokafor@silverstone.law", rate: 430, practiceAreas: ["IP", "Technology"] },
  { id: "atty-06", name: "Nicolas Rivera", role: "Associate", email: "nrivera@silverstone.law", rate: 365, practiceAreas: ["Healthcare", "Regulatory"] },
  { id: "atty-07", name: "Sofia Lind", role: "Associate", email: "slind@silverstone.law", rate: 350, practiceAreas: ["Trusts", "Estates"] },
  { id: "atty-08", name: "David Mercer", role: "Of Counsel", email: "dmercer@silverstone.law", rate: 560, practiceAreas: ["Tax", "Private Equity"] },
  { id: "atty-09", name: "Leah Whitman", role: "Litigation Counsel", email: "lwhitman@silverstone.law", rate: 485, practiceAreas: ["Product Liability", "Class Action"] },
  { id: "atty-10", name: "Owen Park", role: "Counsel", email: "opark@silverstone.law", rate: 470, practiceAreas: ["Privacy", "Cybersecurity"] },
];

const caseSeeds = [
  ["SV-2025-001", "Northstar Foods v. Meridian Cold Chain", "Northstar Foods", "Meridian Cold Chain", "Commercial Litigation", "Discovery", "atty-01", "Delaware Chancery Court", "2025-01-08", "$4.8M", "2025-03-07", "High"],
  ["SV-2025-002", "Acme Robotics Series B Financing", "Acme Robotics", "Lead Investor Syndicate", "Corporate", "Closing", "atty-02", "Private Transaction", "2025-01-11", "$22M", "2025-02-28", "Medium"],
  ["SV-2025-003", "Harbor Health Wage Audit", "Harbor Health", "Department of Labor", "Employment", "Active", "atty-03", "DOL Administrative", "2025-01-14", "$1.2M", "2025-03-03", "Medium"],
  ["SV-2025-004", "Cedar Heights Lease Restructure", "Cedar Heights REIT", "Anchor Tenant LLC", "Real Estate", "Mediation", "atty-04", "Cook County Circuit", "2025-01-17", "$9.1M", "2025-03-11", "Medium"],
  ["SV-2025-005", "Kestrel Cloud IP Licensing", "Kestrel Cloud", "VectorForge Inc.", "Technology/IP", "Active", "atty-05", "Private Arbitration", "2025-01-21", "$3.4M", "2025-03-14", "Low"],
  ["SV-2025-006", "BrightPath HIPAA Remediation", "BrightPath Clinics", "OCR", "Healthcare Regulatory", "Active", "atty-06", "HHS OCR", "2025-01-23", "$850K", "2025-03-01", "High"],
  ["SV-2025-007", "Estate of Margaret Ellison", "Ellison Family Office", "Beneficiary Committee", "Trusts & Estates", "Intake", "atty-07", "Surrogate Court", "2025-01-25", "$18M", "2025-03-19", "Low"],
  ["SV-2025-008", "Apex Fund Tax Opinion", "Apex Growth Fund", "IRS", "Tax", "Active", "atty-08", "Federal Tax", "2025-01-27", "$6.2M", "2025-03-05", "Medium"],
  ["SV-2025-009", "Omni Battery Product Claims", "Omni Battery", "Consumer Plaintiffs", "Product Liability", "Trial Prep", "atty-09", "N.D. California", "2025-01-29", "$12.6M", "2025-02-26", "High"],
  ["SV-2025-010", "CipherMart Data Incident", "CipherMart", "State AG Coalition", "Privacy/Cybersecurity", "Discovery", "atty-10", "Multi-State AG", "2025-02-01", "$5.7M", "2025-03-09", "High"],
  ["SV-2025-011", "Blue Ridge Supply Contract", "Blue Ridge Supply", "Atlas Manufacturing", "Commercial Contracts", "Active", "atty-01", "AAA Arbitration", "2025-02-03", "$2.9M", "2025-03-21", "Medium"],
  ["SV-2025-012", "LumaGrid Acquisition", "LumaGrid", "Solstice Energy", "M&A", "Closing", "atty-02", "Private Transaction", "2025-02-05", "$48M", "2025-03-02", "Medium"],
  ["SV-2025-013", "Evergreen Executive Separation", "Evergreen Bank", "Former COO", "Employment", "Mediation", "atty-03", "JAMS", "2025-02-07", "$1.8M", "2025-03-13", "Low"],
  ["SV-2025-014", "Pinnacle Tower Easement", "Pinnacle Tower", "Metro Transit Authority", "Real Estate", "Active", "atty-04", "State Superior Court", "2025-02-09", "$7.5M", "2025-03-17", "Medium"],
  ["SV-2025-015", "NovaAI Model Terms", "NovaAI Labs", "Enterprise Customer", "Technology/IP", "Intake", "atty-05", "Private Transaction", "2025-02-11", "$11M", "2025-03-24", "Medium"],
  ["SV-2025-016", "Summit Labs FDA Response", "Summit Labs", "FDA", "Healthcare Regulatory", "Active", "atty-06", "FDA Administrative", "2025-02-13", "$2.1M", "2025-03-08", "High"],
  ["SV-2025-017", "Whitaker Charitable Trust", "Whitaker Foundation", "State Charity Bureau", "Trusts & Estates", "Closing", "atty-07", "State Charity Bureau", "2025-02-15", "$14.3M", "2025-03-28", "Low"],
  ["SV-2025-018", "Orion PE Carried Interest", "Orion Partners", "Limited Partners", "Tax", "Discovery", "atty-08", "Private Fund", "2025-02-17", "$31M", "2025-03-16", "Medium"],
  ["SV-2025-019", "HelioDrone Recall Defense", "HelioDrone", "CPSC", "Product Liability", "Trial Prep", "atty-09", "CPSC / Federal Court", "2025-02-19", "$8.4M", "2025-03-06", "High"],
  ["SV-2025-020", "Redwood Marketplace BIPA", "Redwood Marketplace", "Class Representatives", "Privacy/Cybersecurity", "Active", "atty-10", "N.D. Illinois", "2025-02-21", "$10.8M", "2025-03-22", "High"],
] as const;

export const cases: LegalCase[] = caseSeeds.map((item, index) => ({
  id: `case-${String(index + 1).padStart(2, "0")}`,
  caseNumber: item[0],
  title: item[1],
  client: item[2],
  opposingParty: item[3],
  practiceArea: item[4],
  status: item[5] as CaseStatus,
  attorneyId: item[6],
  court: item[7],
  opened: item[8],
  value: item[9],
  nextDeadline: item[10],
  risk: item[11] as LegalCase["risk"],
  summary: `${item[2]} has engaged Silverstone Legal for a ${item[4].toLowerCase()} matter involving ${item[3]}. Current workstreams include facts, documents, deadlines, strategy, and client reporting.`,
  parties: [
    { role: "Client", name: item[2], counsel: "Silverstone Legal" },
    { role: "Opposing Party", name: item[3], counsel: index % 3 === 0 ? "Barton & Vale" : index % 3 === 1 ? "Klein Ross LLP" : "In-house Legal" },
    { role: "Lead Attorney", name: attorneys.find((attorney) => attorney.id === item[6])?.name ?? "Silverstone Attorney" },
  ],
  timeline: [
    { date: item[8], event: "Matter opened and conflict clearance completed", type: "Intake" },
    { date: "2025-02-12", event: "Client strategy session and evidence map approved", type: "Strategy" },
    { date: item[10], event: "Next critical deadline", type: "Deadline" },
  ],
  communications: [
    { date: "2025-02-18", from: item[2], subject: "Weekly status update requested", channel: "Client Portal" },
    { date: "2025-02-20", from: attorneys.find((attorney) => attorney.id === item[6])?.name ?? "Silverstone Attorney", subject: "Action items and document requests", channel: "Email" },
    { date: "2025-02-23", from: "Legal Operations", subject: "Budget-to-actual report published", channel: "Dashboard" },
  ],
}));

const documentFolders = ["Pleadings", "Contracts", "Discovery", "Correspondence", "Evidence", "Billing", "Research", "Closing"];
const documentTypes = ["PDF", "DOCX", "XLSX", "EMAIL"];

export const documents: LegalDocument[] = cases.flatMap((legalCase, caseIndex) =>
  Array.from({ length: 4 }, (_, docIndex) => {
    const globalIndex = caseIndex * 4 + docIndex + 1;
    const folder = documentFolders[(caseIndex + docIndex) % documentFolders.length];
    return {
      id: `doc-${String(globalIndex).padStart(3, "0")}`,
      caseId: legalCase.id,
      name: `${legalCase.client} - ${folder} ${docIndex + 1}`,
      folder,
      type: documentTypes[(caseIndex + docIndex) % documentTypes.length],
      owner: attorneys[(caseIndex + docIndex) % attorneys.length].name,
      updated: `2025-02-${String(10 + ((globalIndex * 3) % 18)).padStart(2, "0")}`,
      version: `v${1 + (globalIndex % 5)}.${globalIndex % 3}`,
      status: globalIndex % 5 === 0 ? "Privileged" : globalIndex % 4 === 0 ? "Client Review" : "Indexed",
      size: `${(0.8 + (globalIndex % 9) * 0.7).toFixed(1)} MB`,
      history: [
        { version: "v1.0", date: "2025-02-01", note: "Initial upload and OCR extraction" },
        { version: `v${1 + (globalIndex % 5)}.0`, date: "2025-02-14", note: "Attorney annotations and metadata update" },
        { version: `v${1 + (globalIndex % 5)}.${globalIndex % 3}`, date: `2025-02-${String(10 + ((globalIndex * 3) % 18)).padStart(2, "0")}`, note: "Latest version indexed for search" },
      ],
    };
  })
);

export const deadlines: Deadline[] = [
  { id: "ddl-01", caseId: "case-09", title: "Opposition to class certification", date: "2025-02-26", type: "Filing", priority: "red", owner: "Leah Whitman" },
  { id: "ddl-02", caseId: "case-02", title: "Financing closing checklist", date: "2025-02-28", type: "Transaction", priority: "orange", owner: "Marcus Chen" },
  { id: "ddl-03", caseId: "case-06", title: "OCR corrective action plan", date: "2025-03-01", type: "Regulatory", priority: "red", owner: "Nicolas Rivera" },
  { id: "ddl-04", caseId: "case-12", title: "Acquisition disclosure schedules", date: "2025-03-02", type: "Transaction", priority: "orange", owner: "Marcus Chen" },
  { id: "ddl-05", caseId: "case-03", title: "DOL document production", date: "2025-03-03", type: "Production", priority: "orange", owner: "Priya Nair" },
  { id: "ddl-06", caseId: "case-08", title: "Tax memo to investment committee", date: "2025-03-05", type: "Advice", priority: "yellow", owner: "David Mercer" },
  { id: "ddl-07", caseId: "case-19", title: "Recall defense expert designations", date: "2025-03-06", type: "Expert", priority: "red", owner: "Leah Whitman" },
  { id: "ddl-08", caseId: "case-01", title: "Motion to compel hearing", date: "2025-03-07", type: "Hearing", priority: "red", owner: "Eleanor Voss" },
  { id: "ddl-09", caseId: "case-16", title: "FDA response package", date: "2025-03-08", type: "Regulatory", priority: "orange", owner: "Nicolas Rivera" },
  { id: "ddl-10", caseId: "case-10", title: "AG incident response status report", date: "2025-03-09", type: "Regulatory", priority: "orange", owner: "Owen Park" },
  { id: "ddl-11", caseId: "case-04", title: "Mediation statement exchange", date: "2025-03-11", type: "Mediation", priority: "yellow", owner: "Julian Brooks" },
  { id: "ddl-12", caseId: "case-13", title: "Settlement term sheet redline", date: "2025-03-13", type: "Negotiation", priority: "yellow", owner: "Priya Nair" },
  { id: "ddl-13", caseId: "case-05", title: "Source code escrow comments", date: "2025-03-14", type: "Contract", priority: "green", owner: "Amara Okafor" },
  { id: "ddl-14", caseId: "case-18", title: "LP privilege review completion", date: "2025-03-16", type: "Discovery", priority: "yellow", owner: "David Mercer" },
  { id: "ddl-15", caseId: "case-20", title: "BIPA motion-to-dismiss outline", date: "2025-03-22", type: "Drafting", priority: "green", owner: "Owen Park" },
];

const phases = ["Fact Development", "Drafting", "Research", "Client Communications", "Discovery", "Strategy"];

export const timeEntries: TimeEntry[] = Array.from({ length: 50 }, (_, index) => {
  const legalCase = cases[index % cases.length];
  const attorney = attorneys[index % attorneys.length];
  return {
    id: `time-${String(index + 1).padStart(3, "0")}`,
    caseId: legalCase.id,
    attorneyId: attorney.id,
    date: `2025-02-${String(1 + (index % 24)).padStart(2, "0")}`,
    description: [
      "Drafted strategy memorandum and client update",
      "Reviewed production set and privilege markers",
      "Prepared witness outline and chronology",
      "Negotiated redlines and revised closing deliverables",
      "Researched controlling authority and risk allocation",
    ][index % 5],
    hours: Number((0.7 + (index % 7) * 0.45).toFixed(2)),
    billable: index % 8 !== 0,
    phase: phases[index % phases.length],
  };
});

export const analyzedContracts: AnalyzedContract[] = [
  {
    id: "contract-01",
    name: "Master Services Agreement - VectorForge",
    counterparty: "VectorForge Inc.",
    riskScore: 82,
    summary: "Enterprise services agreement with broad audit rights, aggressive indemnity, and compressed renewal notice periods.",
    keyTerms: [
      { label: "Term", value: "36 months with automatic 12-month renewals" },
      { label: "Governing Law", value: "New York" },
      { label: "Liability Cap", value: "2x fees paid in prior 12 months" },
      { label: "Payment", value: "Net 30; 1.5% monthly late charge" },
    ],
    obligations: ["Maintain SOC 2 Type II controls", "Provide quarterly service reports", "Notify of security incidents within 48 hours"],
    deadlines: ["Renewal opt-out due 2025-05-01", "Annual audit package due 2025-06-15"],
    riskFlags: [
      { severity: "High", text: "Indemnity covers consequential damages without carve-out." },
      { severity: "Medium", text: "Audit rights lack reasonable frequency limits." },
      { severity: "Low", text: "Notice provision allows email but not portal notice." },
    ],
    excerpt: "Provider shall defend, indemnify, and hold Customer harmless from any and all losses arising from the Services...",
    revision: "Provider indemnity limited to third-party claims finally awarded, excluding indirect or consequential damages except for confidentiality breaches.",
  },
  {
    id: "contract-02",
    name: "Commercial Lease Amendment - Cedar Heights",
    counterparty: "Anchor Tenant LLC",
    riskScore: 68,
    summary: "Lease restructure resolves arrears but shifts significant maintenance obligations to landlord during extension period.",
    keyTerms: [
      { label: "Extension", value: "Five years" },
      { label: "Rent Credit", value: "$420,000 over 18 months" },
      { label: "CAM Cap", value: "5% annual increase" },
      { label: "Default Cure", value: "10 business days monetary / 30 days non-monetary" },
    ],
    obligations: ["Deliver HVAC certification", "Complete lobby remediation", "Issue estoppel within 12 business days"],
    deadlines: ["HVAC certification due 2025-04-10", "Rent credit schedule final by 2025-03-20"],
    riskFlags: [
      { severity: "Medium", text: "Abatement remedy triggered by partial service interruption." },
      { severity: "Medium", text: "No express waiver of prior disputed maintenance claims." },
      { severity: "Low", text: "Notice address for lender copy missing." },
    ],
    excerpt: "Tenant shall be entitled to abatement for any interruption materially affecting use of the premises...",
    revision: "Abatement applies only after five consecutive business days of material interruption caused by landlord's failure to perform required obligations.",
  },
  {
    id: "contract-03",
    name: "Data Processing Addendum - CipherMart",
    counterparty: "Retail Analytics Co.",
    riskScore: 91,
    summary: "Privacy addendum has strong processor controls but unacceptable breach notification and subprocessors ambiguity.",
    keyTerms: [
      { label: "Data Categories", value: "Biometric, device, purchase, account identifiers" },
      { label: "Breach Notice", value: "Without undue delay" },
      { label: "Subprocessors", value: "General authorization" },
      { label: "Deletion", value: "90 days after termination" },
    ],
    obligations: ["Maintain Article 32 safeguards", "Assist with DSAR requests", "Flow down DPA terms to subprocessors"],
    deadlines: ["Subprocessor list review due 2025-03-18", "BIPA consent workflow due 2025-04-01"],
    riskFlags: [
      { severity: "High", text: "Breach notice lacks fixed outer deadline." },
      { severity: "High", text: "Biometric data included without retention schedule." },
      { severity: "Medium", text: "Cross-border transfer mechanism not attached." },
    ],
    excerpt: "Processor shall notify Controller of a Personal Data Breach without undue delay after becoming aware...",
    revision: "Processor shall notify Controller no later than 24 hours after confirming a Personal Data Breach and provide rolling updates every 12 hours.",
  },
  {
    id: "contract-04",
    name: "Asset Purchase Agreement - LumaGrid",
    counterparty: "Solstice Energy",
    riskScore: 74,
    summary: "Purchase agreement is close to market; escrow release mechanics and interim operating covenants need precision.",
    keyTerms: [
      { label: "Purchase Price", value: "$48,000,000" },
      { label: "Escrow", value: "10% for 18 months" },
      { label: "Basket", value: "0.75% deductible" },
      { label: "Closing", value: "Third business day after conditions satisfied" },
    ],
    obligations: ["Deliver audited financials", "Obtain key customer consents", "Maintain ordinary course operations"],
    deadlines: ["Disclosure schedules due 2025-03-02", "Key consent status call 2025-03-12"],
    riskFlags: [
      { severity: "Medium", text: "Escrow release requires buyer consent without dispute mechanics." },
      { severity: "Medium", text: "Ordinary course covenant may limit needed inventory purchases." },
      { severity: "Low", text: "Schedules use inconsistent materiality qualifiers." },
    ],
    excerpt: "No portion of the Escrow Amount shall be released without Buyer's prior written confirmation...",
    revision: "Undisputed escrow amounts release automatically within five business days after the survival period, subject to pending claim reserves.",
  },
  {
    id: "contract-05",
    name: "Executive Separation Agreement - Evergreen",
    counterparty: "Former COO",
    riskScore: 57,
    summary: "Separation agreement is generally favorable; tighten cooperation scope and confidentiality remedies.",
    keyTerms: [
      { label: "Severance", value: "12 months base salary" },
      { label: "Release", value: "ADEA-compliant 21/7 period" },
      { label: "Cooperation", value: "Reasonable assistance in pending matters" },
      { label: "Non-disparagement", value: "Mutual, board and executives covered" },
    ],
    obligations: ["Return devices", "Provide transition memo", "Remain available for regulatory inquiry preparation"],
    deadlines: ["Revocation period ends 2025-03-04", "Transition memo due 2025-03-10"],
    riskFlags: [
      { severity: "Medium", text: "Cooperation covenant lacks hourly cap and reimbursement detail." },
      { severity: "Low", text: "Confidentiality clause should preserve whistleblower rights expressly." },
      { severity: "Low", text: "Reference response protocol not attached." },
    ],
    excerpt: "Executive agrees to cooperate with Company in connection with any matter as requested from time to time...",
    revision: "Executive will provide up to ten hours per month of reasonable cooperation, scheduled on advance notice and reimbursed for approved expenses.",
  },
];

export function getAttorney(attorneyId: string) {
  return attorneys.find((attorney) => attorney.id === attorneyId);
}

export function getCase(caseId: string) {
  return cases.find((legalCase) => legalCase.id === caseId);
}

export function getCaseDocuments(caseId: string) {
  return documents.filter((document) => document.caseId === caseId);
}

export function getCaseDeadlines(caseId: string) {
  return deadlines.filter((deadline) => deadline.caseId === caseId);
}

export function getCaseTimeEntries(caseId: string) {
  return timeEntries.filter((entry) => entry.caseId === caseId);
}

export function getEntryAmount(entry: TimeEntry) {
  const attorney = getAttorney(entry.attorneyId);
  return entry.billable && attorney ? entry.hours * attorney.rate : 0;
}
