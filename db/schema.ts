import { pgTable, text, timestamp, integer, numeric, boolean, jsonb, primaryKey } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: text("role").default("attorney"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({ compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }) })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({ compositePk: primaryKey({ columns: [verificationToken.identifier, verificationToken.token] }) })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({ compositePK: primaryKey({ columns: [authenticator.userId, authenticator.credentialID] }) })
);

export const attorneys = pgTable("attorneys", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  billingRate: numeric("billing_rate", { precision: 8, scale: 2 }).notNull(),
  email: text("email").notNull(),
});

export const cases = pgTable("cases", {
  id: text("id").primaryKey(),
  caseNumber: text("case_number").notNull().unique(),
  clientName: text("client_name").notNull(),
  practiceArea: text("practice_area").notNull(),
  status: text("status").notNull(),
  assignedAttorneyId: text("assigned_attorney_id").references(() => attorneys.id),
  nextDeadline: timestamp("next_deadline", { mode: "date" }),
  lastActivity: text("last_activity"),
  summary: text("summary"),
  parties: jsonb("parties"),
});

export const documents = pgTable("documents", {
  id: text("id").primaryKey(),
  caseId: text("case_id").references(() => cases.id),
  folder: text("folder").notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  version: integer("version").notNull().default(1),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull(),
  content: text("content"),
});

export const timeEntries = pgTable("time_entries", {
  id: text("id").primaryKey(),
  caseId: text("case_id").references(() => cases.id),
  attorneyId: text("attorney_id").references(() => attorneys.id),
  activity: text("activity").notNull(),
  hours: numeric("hours", { precision: 5, scale: 2 }).notNull(),
  rate: numeric("rate", { precision: 8, scale: 2 }).notNull(),
  entryDate: timestamp("entry_date", { mode: "date" }).notNull(),
  billable: boolean("billable").notNull().default(true),
});

export const deadlines = pgTable("deadlines", {
  id: text("id").primaryKey(),
  caseId: text("case_id").references(() => cases.id),
  title: text("title").notNull(),
  dueDate: timestamp("due_date", { mode: "date" }).notNull(),
  reminderSent: boolean("reminder_sent").notNull().default(false),
  priority: text("priority").notNull(),
});
