export type PlanType = "prepaid" | "postpaid" | "fiber";

export type Plan = {
  id: string;
  name: string;
  type: PlanType;
  price: number;
  currency: string;
  dataGb: number;
  voiceMins: number;
  sms: number;
  validityDays: number;
  featured?: boolean;
  description: string;
};

export type Store = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type Device = {
  id: string;
  name: string;
  category: "device" | "accessory" | "sim";
  price: number;
  description: string;
};

export type VAS = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export type RoamingPack = {
  id: string;
  name: string;
  region: string;
  price: number;
  dataGb: number;
  days: number;
  description: string;
};

export type CoverageRegion = {
  id: string;
  name: string;
  status: "excellent" | "good" | "fair" | "limited";
  tech: string[];
  notes: string;
};

export type Banner = {
  id: string;
  title: string;
  body: string;
  active: boolean;
};

export type ContentPage = {
  id: string;
  slug: string;
  title: string;
  body: string;
};

export type Sim = {
  id: string;
  number: string;
  status: "active" | "blocked";
  primary: boolean;
  planId: string;
};

export type Bill = {
  id: string;
  period: string;
  amount: number;
  dueDate: string;
  status: "unpaid" | "paid";
  items: { label: string; amount: number }[];
};

export type Complaint = {
  id: string;
  subject: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
};

export type Ticket = {
  id: string;
  subject: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
  from: string;
};

export type Order = {
  id: string;
  itemId: string;
  itemName: string;
  price: number;
  name: string;
  mobile: string;
  address: string;
  status: "confirmed" | "processing" | "shipped";
  createdAt: string;
};

export type Recharge = {
  id: string;
  amount: number;
  method: string;
  createdAt: string;
};

export type UsagePeriod = {
  label: string;
  dataUsedGb: number;
  dataTotalGb: number;
  voiceUsedMins: number;
  voiceTotalMins: number;
  smsUsed: number;
  smsTotal: number;
};

export const PLANS: Plan[] = [
  {
    id: "pp-199",
    name: "ATOMA Start 199",
    type: "prepaid",
    price: 199,
    currency: "AFN",
    dataGb: 5,
    voiceMins: 100,
    sms: 100,
    validityDays: 30,
    description: "Everyday prepaid essentials for light use.",
  },
  {
    id: "pp-599",
    name: "ATOMA Plus 599",
    type: "prepaid",
    price: 599,
    currency: "AFN",
    dataGb: 25,
    voiceMins: 500,
    sms: 500,
    validityDays: 30,
    featured: true,
    description: "Best value prepaid for streaming and calls.",
  },
  {
    id: "pp-999",
    name: "ATOMA Max 999",
    type: "prepaid",
    price: 999,
    currency: "AFN",
    dataGb: 60,
    voiceMins: 1000,
    sms: 1000,
    validityDays: 30,
    description: "Heavy data prepaid for power users.",
  },
  {
    id: "po-799",
    name: "ATOMA Post 799",
    type: "postpaid",
    price: 799,
    currency: "AFN",
    dataGb: 30,
    voiceMins: 800,
    sms: 800,
    validityDays: 30,
    featured: true,
    description: "Postpaid comfort with monthly billing.",
  },
  {
    id: "po-1499",
    name: "ATOMA Post Pro 1499",
    type: "postpaid",
    price: 1499,
    currency: "AFN",
    dataGb: 80,
    voiceMins: 2000,
    sms: 2000,
    validityDays: 30,
    description: "Business-ready postpaid with high allowances.",
  },
  {
    id: "fb-1200",
    name: "ATOMA Fiber 50",
    type: "fiber",
    price: 1200,
    currency: "AFN",
    dataGb: 0,
    voiceMins: 0,
    sms: 0,
    validityDays: 30,
    featured: true,
    description: "50 Mbps home fiber — unlimited fair-use data.",
  },
  {
    id: "fb-2200",
    name: "ATOMA Fiber 100",
    type: "fiber",
    price: 2200,
    currency: "AFN",
    dataGb: 0,
    voiceMins: 0,
    sms: 0,
    validityDays: 30,
    description: "100 Mbps fiber for households and small offices.",
  },
];

export const STORES: Store[] = [
  {
    id: "s1",
    name: "ATOMA Kabul Center",
    city: "Kabul",
    address: "Shar-e-Naw, Street 5",
    phone: "0700111222",
    hours: "9:00 – 20:00",
  },
  {
    id: "s2",
    name: "ATOMA Herat Mall",
    city: "Herat",
    address: "Herat City Center, Level 1",
    phone: "0700222333",
    hours: "10:00 – 21:00",
  },
  {
    id: "s3",
    name: "ATOMA Mazar Branch",
    city: "Mazar-e-Sharif",
    address: "Balkh Road, Block B",
    phone: "0700333444",
    hours: "9:00 – 19:00",
  },
  {
    id: "s4",
    name: "ATOMA Kandahar Hub",
    city: "Kandahar",
    address: "Spin Boldak Road, Shop 12",
    phone: "0700444555",
    hours: "9:00 – 19:00",
  },
  {
    id: "s5",
    name: "ATOMA Jalalabad Point",
    city: "Jalalabad",
    address: "Main Bazaar, Lane 3",
    phone: "0700555666",
    hours: "9:00 – 18:30",
  },
];

export const FAQS: FAQ[] = [
  {
    id: "f1",
    category: "Recharge",
    question: "How do I recharge my prepaid balance?",
    answer:
      "Use ATOMA Pay, the self-care Recharge page, or visit any ATOMA store. In this demo, go to Account → Recharge.",
  },
  {
    id: "f2",
    category: "Plans",
    question: "Can I change my plan anytime?",
    answer:
      "Yes. Open Account → Plans, pick a new plan, and confirm. Changes apply instantly in this demo.",
  },
  {
    id: "f3",
    category: "SIM",
    question: "How do I block a lost SIM?",
    answer:
      "Sign in, open Account → SIM management, and tap Block. You can unblock later from the same screen.",
  },
  {
    id: "f4",
    category: "Bills",
    question: "Where can I see my invoices?",
    answer:
      "Postpaid customers find bills under Account → Bills. Tap an invoice for line-item detail.",
  },
  {
    id: "f5",
    category: "Roaming",
    question: "How do I activate roaming?",
    answer:
      "Visit the Roaming page, choose a pack for your destination, and activate. Demo-only — no real network change.",
  },
  {
    id: "f6",
    category: "Support",
    question: "How do I raise a complaint?",
    answer:
      "Use Account → Complaints, the support tickets page, or ask the chatbot to escalate.",
  },
];

export const DEVICES: Device[] = [
  {
    id: "d1",
    name: "ATOMA Pulse Phone",
    category: "device",
    price: 12999,
    description: "Dual-SIM Android with long battery for daily use.",
  },
  {
    id: "d2",
    name: "ATOMA Signal 5G",
    category: "device",
    price: 24999,
    description: "5G-ready handset with crisp display.",
  },
  {
    id: "d3",
    name: "PowerBank 20k",
    category: "accessory",
    price: 1499,
    description: "Fast-charge power bank for travel.",
  },
  {
    id: "d4",
    name: "ATOMA EarPods",
    category: "accessory",
    price: 999,
    description: "Wireless earbuds with clear calls.",
  },
  {
    id: "d5",
    name: "Prepaid SIM Kit",
    category: "sim",
    price: 100,
    description: "Starter SIM with welcome balance (demo).",
  },
  {
    id: "d6",
    name: "Postpaid SIM Kit",
    category: "sim",
    price: 200,
    description: "Postpaid SIM kit for new lines.",
  },
];

export const VAS_LIST: VAS[] = [
  {
    id: "v1",
    name: "Caller Tune",
    price: 30,
    description: "Personalize what callers hear.",
  },
  {
    id: "v2",
    name: "Missed Call Alert",
    price: 20,
    description: "SMS when someone calls while you are offline.",
  },
  {
    id: "v3",
    name: "International Bundle SMS",
    price: 50,
    description: "Extra SMS to selected countries.",
  },
  {
    id: "v4",
    name: "Night Data Boost",
    price: 80,
    description: "Extra data 12am–6am.",
  },
];

export const ROAMING_PACKS: RoamingPack[] = [
  {
    id: "r1",
    name: "Gulf Roam 7",
    region: "GCC",
    price: 450,
    dataGb: 3,
    days: 7,
    description: "UAE, Saudi, Qatar and nearby.",
  },
  {
    id: "r2",
    name: "Asia Roam 14",
    region: "Asia",
    price: 890,
    dataGb: 8,
    days: 14,
    description: "Pakistan, India, Turkey and more.",
  },
  {
    id: "r3",
    name: "World Roam 30",
    region: "Global",
    price: 1890,
    dataGb: 15,
    days: 30,
    description: "Multi-region pack for frequent travelers.",
  },
];

export const COVERAGE_REGIONS: CoverageRegion[] = [
  {
    id: "c1",
    name: "Kabul",
    status: "excellent",
    tech: ["4G", "5G (pilot)"],
    notes: "Dense urban coverage with strong indoor signal.",
  },
  {
    id: "c2",
    name: "Herat",
    status: "excellent",
    tech: ["4G", "3G"],
    notes: "City-wide 4G with expanding outskirts.",
  },
  {
    id: "c3",
    name: "Mazar-e-Sharif",
    status: "good",
    tech: ["4G", "3G"],
    notes: "Reliable along main corridors.",
  },
  {
    id: "c4",
    name: "Kandahar",
    status: "good",
    tech: ["4G", "3G"],
    notes: "Strong in city; fair in rural belts.",
  },
  {
    id: "c5",
    name: "Bamyan",
    status: "fair",
    tech: ["3G", "4G (select)"],
    notes: "Mountain terrain — expect variable speeds.",
  },
  {
    id: "c6",
    name: "Nuristan",
    status: "limited",
    tech: ["2G", "3G"],
    notes: "Limited sites; voice prioritized.",
  },
];

export const SEED_BANNERS: Banner[] = [
  {
    id: "b1",
    title: "Eid Data Bonus",
    body: "Get 5GB extra on Plus 599 this week.",
    active: true,
  },
  {
    id: "b2",
    title: "Fiber Launch",
    body: "ATOMA Fiber now in select Kabul districts.",
    active: true,
  },
];

export const SEED_CONTENT: ContentPage[] = [
  {
    id: "cp1",
    slug: "about",
    title: "About ATOMA",
    body: "ATOMA connects Afghanistan with reliable mobile, fiber, and digital payments — built for mountain towns and city streets alike.",
  },
  {
    id: "cp2",
    slug: "privacy",
    title: "Privacy Notice",
    body: "This is a UI demo. No real customer data is collected or transmitted.",
  },
  {
    id: "cp3",
    slug: "terms",
    title: "Terms of Use",
    body: "Demo terms only. Services, prices, and coverage shown are illustrative.",
  },
];

export const SEED_SIMS: Sim[] = [
  {
    id: "sim1",
    number: "0771234567",
    status: "active",
    primary: true,
    planId: "pp-599",
  },
];

export const SEED_BILLS: Bill[] = [
  {
    id: "inv-1001",
    period: "Sep 2026",
    amount: 799,
    dueDate: "2026-10-05",
    status: "unpaid",
    items: [
      { label: "Plan charge", amount: 699 },
      { label: "VAS", amount: 50 },
      { label: "Tax", amount: 50 },
    ],
  },
  {
    id: "inv-1000",
    period: "Aug 2026",
    amount: 820,
    dueDate: "2026-09-05",
    status: "paid",
    items: [
      { label: "Plan charge", amount: 699 },
      { label: "Roaming", amount: 71 },
      { label: "Tax", amount: 50 },
    ],
  },
];

export const SEED_USAGE: Record<string, UsagePeriod> = {
  "7d": {
    label: "Last 7 days",
    dataUsedGb: 4.2,
    dataTotalGb: 25,
    voiceUsedMins: 85,
    voiceTotalMins: 500,
    smsUsed: 40,
    smsTotal: 500,
  },
  "30d": {
    label: "Last 30 days",
    dataUsedGb: 18.5,
    dataTotalGb: 25,
    voiceUsedMins: 310,
    voiceTotalMins: 500,
    smsUsed: 180,
    smsTotal: 500,
  },
  "90d": {
    label: "Last 90 days",
    dataUsedGb: 52,
    dataTotalGb: 75,
    voiceUsedMins: 900,
    voiceTotalMins: 1500,
    smsUsed: 520,
    smsTotal: 1500,
  },
};

export const ADMIN_MOBILE = "0700000000";
export const ADMIN_PASSWORD = "admin123";
export const SEED_USER_MOBILE = "0771234567";
export const SEED_USER_NAME = "Ahmad Karimi";
export const STORAGE_KEY = "atoma-mvp-demo";

export function getPlanById(id: string) {
  return PLANS.find((p) => p.id === id);
}
