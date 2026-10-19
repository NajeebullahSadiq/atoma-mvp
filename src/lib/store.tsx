"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ADMIN_MOBILE,
  ADMIN_PASSWORD,
  PLANS,
  SEED_BANNERS,
  SEED_BILLS,
  SEED_CONTENT,
  SEED_SIMS,
  SEED_USAGE,
  SEED_USER_MOBILE,
  SEED_USER_NAME,
  STORAGE_KEY,
  type Banner,
  type Bill,
  type Complaint,
  type ContentPage,
  type Order,
  type Recharge,
  type Sim,
  type Ticket,
  type UsagePeriod,
} from "./data";
import type { Lang } from "./i18n";

export type UserRole = "customer" | "admin";

export type Profile = {
  name: string;
  mobile: string;
  email: string;
  address: string;
};

export type Session = {
  mobile: string;
  role: UserRole;
} | null;

export type Notice = {
  id: string;
  message: string;
  type: "success" | "info" | "error";
} | null;

export type DemoState = {
  hydrated: boolean;
  language: Lang;
  session: Session;
  profile: Profile;
  balance: number;
  walletBalance: number;
  planId: string;
  sims: Sim[];
  recharges: Recharge[];
  bills: Bill[];
  complaints: Complaint[];
  tickets: Ticket[];
  orders: Order[];
  banners: Banner[];
  contentPages: ContentPage[];
  activatedVAS: string[];
  activatedRoaming: string[];
  notice: Notice;
  usage: Record<string, UsagePeriod>;
};

type DemoContextValue = DemoState & {
  tKey: (key: string) => string;
  setLanguage: (lang: Lang) => void;
  showNotice: (message: string, type?: Notice extends null ? never : NonNullable<Notice>["type"]) => void;
  clearNotice: () => void;
  requestOtp: (mobile: string) => void;
  loginWithOtp: (mobile: string, otp: string) => boolean;
  loginAdminPassword: (password: string) => boolean;
  register: (name: string, mobile: string, otp: string) => boolean;
  logout: () => void;
  updateProfile: (patch: Partial<Profile>) => void;
  setPrimarySim: (id: string) => void;
  toggleSimBlock: (id: string) => void;
  addSim: (number: string) => void;
  recharge: (amount: number, method: string) => void;
  payBill: (id: string) => void;
  changePlan: (planId: string) => void;
  createComplaint: (subject: string, description: string) => void;
  updateComplaintStatus: (id: string, status: Complaint["status"]) => void;
  createTicket: (subject: string, description: string, from?: string) => void;
  updateTicketStatus: (id: string, status: Ticket["status"]) => void;
  placeOrder: (input: {
    itemId: string;
    itemName: string;
    price: number;
    name: string;
    mobile: string;
    address: string;
  }) => void;
  toggleVAS: (id: string) => void;
  activateRoaming: (id: string) => void;
  walletTopUp: (amount: number) => void;
  walletSend: (to: string, amount: number) => boolean;
  addBanner: (title: string, body: string) => void;
  updateBanner: (id: string, patch: Partial<Banner>) => void;
  deleteBanner: (id: string) => void;
  updateContentPage: (id: string, patch: Partial<ContentPage>) => void;
  resetDemo: () => void;
};

const defaultProfile: Profile = {
  name: SEED_USER_NAME,
  mobile: SEED_USER_MOBILE,
  email: "ahmad.karimi@example.af",
  address: "Karte Se, Kabul",
};

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function seedState(): Omit<DemoState, "hydrated" | "notice"> {
  return {
    language: "en",
    session: null,
    profile: defaultProfile,
    balance: 450,
    walletBalance: 1200,
    planId: "pp-599",
    sims: SEED_SIMS,
    recharges: [
      {
        id: "rc-seed",
        amount: 200,
        method: "wallet",
        createdAt: "2026-10-01T10:00:00.000Z",
      },
    ],
    bills: SEED_BILLS,
    complaints: [],
    tickets: [
      {
        id: "tk-seed",
        subject: "Slow data in evenings",
        description: "Speeds drop after 8pm near home.",
        status: "Open",
        createdAt: "2026-10-10T08:00:00.000Z",
        from: SEED_USER_MOBILE,
      },
    ],
    orders: [],
    banners: SEED_BANNERS,
    contentPages: SEED_CONTENT,
    activatedVAS: ["v2"],
    activatedRoaming: [],
    usage: SEED_USAGE,
  };
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(() => ({
    ...seedState(),
    hydrated: false,
    notice: null,
  }));

  useEffect(() => {
    let cancelled = false;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<DemoState>;
        if (!cancelled) {
          setState((prev) => ({
            ...seedState(),
            ...parsed,
            // Never clobber a session that was set before hydrate finished.
            session: prev.session ?? parsed.session ?? null,
            profile: prev.session ? prev.profile : (parsed.profile ?? prev.profile),
            hydrated: true,
            notice: null,
          }));
        }
        return () => {
          cancelled = true;
        };
      }
    } catch {
      /* ignore corrupt storage */
    }
    if (!cancelled) setState((prev) => ({ ...prev, hydrated: true }));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    const {
      hydrated: _h,
      notice: _n,
      ...persist
    } = state;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
    } catch {
      /* ignore quota / private mode */
    }
  }, [state]);

  const showNotice = useCallback(
    (message: string, type: "success" | "info" | "error" = "success") => {
      setState((s) => ({
        ...s,
        notice: { id: uid("n"), message, type },
      }));
    },
    [],
  );

  const clearNotice = useCallback(() => {
    setState((s) => ({ ...s, notice: null }));
  }, []);

  const setLanguage = useCallback((language: Lang) => {
    setState((s) => ({ ...s, language }));
  }, []);

  const requestOtp = useCallback(
    (mobile: string) => {
      showNotice(`Demo OTP sent to ${mobile}. Enter any 6 digits.`, "info");
    },
    [showNotice],
  );

  const loginWithOtp = useCallback(
    (mobile: string, otp: string) => {
      if (!/^\d{6}$/.test(otp)) {
        showNotice("Enter any 6-digit OTP.", "error");
        return false;
      }
      const role: UserRole = mobile === ADMIN_MOBILE ? "admin" : "customer";
      setState((s) => ({
        ...s,
        session: { mobile, role },
        profile:
          mobile === SEED_USER_MOBILE
            ? s.profile
            : mobile === ADMIN_MOBILE
              ? {
                  name: "ATOMA Admin",
                  mobile: ADMIN_MOBILE,
                  email: "admin@atoma.af",
                  address: "HQ Kabul",
                }
              : {
                  ...s.profile,
                  mobile,
                  name: s.profile.mobile === mobile ? s.profile.name : "Guest User",
                },
      }));
      showNotice(role === "admin" ? "Admin session started." : "Logged in.");
      return true;
    },
    [showNotice],
  );

  const loginAdminPassword = useCallback(
    (password: string) => {
      if (password !== ADMIN_PASSWORD) {
        showNotice("Invalid admin password.", "error");
        return false;
      }
      setState((s) => ({
        ...s,
        session: { mobile: ADMIN_MOBILE, role: "admin" },
        profile: {
          name: "ATOMA Admin",
          mobile: ADMIN_MOBILE,
          email: "admin@atoma.af",
          address: "HQ Kabul",
        },
      }));
      showNotice("Admin session started.");
      return true;
    },
    [showNotice],
  );

  const register = useCallback(
    (name: string, mobile: string, otp: string) => {
      if (!/^\d{6}$/.test(otp)) {
        showNotice("Enter any 6-digit OTP.", "error");
        return false;
      }
      setState((s) => ({
        ...s,
        session: { mobile, role: "customer" },
        profile: {
          name,
          mobile,
          email: "",
          address: "",
        },
        balance: 100,
        planId: "pp-199",
        sims: [
          {
            id: uid("sim"),
            number: mobile,
            status: "active",
            primary: true,
            planId: "pp-199",
          },
        ],
      }));
      showNotice("Account created.");
      return true;
    },
    [showNotice],
  );

  const logout = useCallback(() => {
    setState((s) => ({ ...s, session: null }));
    showNotice("Logged out.", "info");
  }, [showNotice]);

  const updateProfile = useCallback(
    (patch: Partial<Profile>) => {
      setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }));
      showNotice("Profile updated.");
    },
    [showNotice],
  );

  const setPrimarySim = useCallback(
    (id: string) => {
      setState((s) => ({
        ...s,
        sims: s.sims.map((sim) => ({ ...sim, primary: sim.id === id })),
      }));
      showNotice("Primary SIM updated.");
    },
    [showNotice],
  );

  const toggleSimBlock = useCallback(
    (id: string) => {
      setState((s) => ({
        ...s,
        sims: s.sims.map((sim) =>
          sim.id === id
            ? {
                ...sim,
                status: sim.status === "active" ? "blocked" : "active",
              }
            : sim,
        ),
      }));
      showNotice("SIM status updated.");
    },
    [showNotice],
  );

  const addSim = useCallback(
    (number: string) => {
      setState((s) => ({
        ...s,
        sims: [
          ...s.sims,
          {
            id: uid("sim"),
            number,
            status: "active",
            primary: s.sims.length === 0,
            planId: s.planId,
          },
        ],
      }));
      showNotice("SIM added.");
    },
    [showNotice],
  );

  const recharge = useCallback(
    (amount: number, method: string) => {
      setState((s) => ({
        ...s,
        balance: s.balance + amount,
        walletBalance: method === "wallet" ? Math.max(0, s.walletBalance - amount) : s.walletBalance,
        recharges: [
          {
            id: uid("rc"),
            amount,
            method,
            createdAt: new Date().toISOString(),
          },
          ...s.recharges,
        ],
      }));
      showNotice(`Recharged ${amount} AFN via ${method}.`);
    },
    [showNotice],
  );

  const payBill = useCallback(
    (id: string) => {
      setState((s) => {
        const bill = s.bills.find((b) => b.id === id);
        if (!bill || bill.status === "paid") return s;
        return {
          ...s,
          balance: Math.max(0, s.balance - bill.amount),
          bills: s.bills.map((b) =>
            b.id === id ? { ...b, status: "paid" as const } : b,
          ),
        };
      });
      showNotice("Bill paid.");
    },
    [showNotice],
  );

  const changePlan = useCallback(
    (planId: string) => {
      const plan = PLANS.find((p) => p.id === planId);
      setState((s) => ({
        ...s,
        planId,
        sims: s.sims.map((sim) =>
          sim.primary ? { ...sim, planId } : sim,
        ),
      }));
      showNotice(`Plan changed to ${plan?.name ?? planId}.`);
    },
    [showNotice],
  );

  const createComplaint = useCallback(
    (subject: string, description: string) => {
      setState((s) => ({
        ...s,
        complaints: [
          {
            id: uid("cmp"),
            subject,
            description,
            status: "Open",
            createdAt: new Date().toISOString(),
          },
          ...s.complaints,
        ],
      }));
      showNotice("Complaint submitted.");
    },
    [showNotice],
  );

  const updateComplaintStatus = useCallback(
    (id: string, status: Complaint["status"]) => {
      setState((s) => ({
        ...s,
        complaints: s.complaints.map((c) =>
          c.id === id ? { ...c, status } : c,
        ),
      }));
      showNotice(`Complaint marked ${status}.`);
    },
    [showNotice],
  );

  const createTicket = useCallback(
    (subject: string, description: string, from?: string) => {
      setState((s) => ({
        ...s,
        tickets: [
          {
            id: uid("tk"),
            subject,
            description,
            status: "Open",
            createdAt: new Date().toISOString(),
            from: from ?? s.session?.mobile ?? "guest",
          },
          ...s.tickets,
        ],
      }));
      showNotice("Ticket created.");
    },
    [showNotice],
  );

  const updateTicketStatus = useCallback(
    (id: string, status: Ticket["status"]) => {
      setState((s) => ({
        ...s,
        tickets: s.tickets.map((t) => (t.id === id ? { ...t, status } : t)),
      }));
      showNotice(`Ticket marked ${status}.`);
    },
    [showNotice],
  );

  const placeOrder = useCallback(
    (input: {
      itemId: string;
      itemName: string;
      price: number;
      name: string;
      mobile: string;
      address: string;
    }) => {
      setState((s) => ({
        ...s,
        orders: [
          {
            id: uid("ord"),
            ...input,
            status: "confirmed",
            createdAt: new Date().toISOString(),
          },
          ...s.orders,
        ],
      }));
      showNotice("Order confirmed.");
    },
    [showNotice],
  );

  const toggleVAS = useCallback(
    (id: string) => {
      setState((s) => {
        const on = s.activatedVAS.includes(id);
        return {
          ...s,
          activatedVAS: on
            ? s.activatedVAS.filter((v) => v !== id)
            : [...s.activatedVAS, id],
        };
      });
      showNotice("VAS updated.");
    },
    [showNotice],
  );

  const activateRoaming = useCallback(
    (id: string) => {
      setState((s) => ({
        ...s,
        activatedRoaming: s.activatedRoaming.includes(id)
          ? s.activatedRoaming
          : [...s.activatedRoaming, id],
      }));
      showNotice("Roaming pack activated.");
    },
    [showNotice],
  );

  const walletTopUp = useCallback(
    (amount: number) => {
      setState((s) => ({ ...s, walletBalance: s.walletBalance + amount }));
      showNotice(`Wallet topped up by ${amount} AFN.`);
    },
    [showNotice],
  );

  const walletSend = useCallback(
    (to: string, amount: number) => {
      let ok = false;
      setState((s) => {
        if (amount <= 0 || amount > s.walletBalance) return s;
        ok = true;
        return { ...s, walletBalance: s.walletBalance - amount };
      });
      if (ok) showNotice(`Sent ${amount} AFN to ${to}.`);
      else showNotice("Insufficient wallet balance.", "error");
      return ok;
    },
    [showNotice],
  );

  const addBanner = useCallback(
    (title: string, body: string) => {
      setState((s) => ({
        ...s,
        banners: [
          { id: uid("bn"), title, body, active: true },
          ...s.banners,
        ],
      }));
      showNotice("Banner added.");
    },
    [showNotice],
  );

  const updateBanner = useCallback(
    (id: string, patch: Partial<Banner>) => {
      setState((s) => ({
        ...s,
        banners: s.banners.map((b) => (b.id === id ? { ...b, ...patch } : b)),
      }));
      showNotice("Banner updated.");
    },
    [showNotice],
  );

  const deleteBanner = useCallback(
    (id: string) => {
      setState((s) => ({
        ...s,
        banners: s.banners.filter((b) => b.id !== id),
      }));
      showNotice("Banner deleted.");
    },
    [showNotice],
  );

  const updateContentPage = useCallback(
    (id: string, patch: Partial<ContentPage>) => {
      setState((s) => ({
        ...s,
        contentPages: s.contentPages.map((p) =>
          p.id === id ? { ...p, ...patch } : p,
        ),
      }));
      showNotice("Content saved.");
    },
    [showNotice],
  );

  const resetDemo = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ ...seedState(), hydrated: true, notice: null });
    showNotice("Demo state reset.", "info");
  }, [showNotice]);

  const value = useMemo<DemoContextValue>(() => {
    // lazy import avoided — t provided via hook wrapper in components
    return {
      ...state,
      tKey: (key: string) => key,
      setLanguage,
      showNotice,
      clearNotice,
      requestOtp,
      loginWithOtp,
      loginAdminPassword,
      register,
      logout,
      updateProfile,
      setPrimarySim,
      toggleSimBlock,
      addSim,
      recharge,
      payBill,
      changePlan,
      createComplaint,
      updateComplaintStatus,
      createTicket,
      updateTicketStatus,
      placeOrder,
      toggleVAS,
      activateRoaming,
      walletTopUp,
      walletSend,
      addBanner,
      updateBanner,
      deleteBanner,
      updateContentPage,
      resetDemo,
    };
  }, [
    state,
    setLanguage,
    showNotice,
    clearNotice,
    requestOtp,
    loginWithOtp,
    loginAdminPassword,
    register,
    logout,
    updateProfile,
    setPrimarySim,
    toggleSimBlock,
    addSim,
    recharge,
    payBill,
    changePlan,
    createComplaint,
    updateComplaintStatus,
    createTicket,
    updateTicketStatus,
    placeOrder,
    toggleVAS,
    activateRoaming,
    walletTopUp,
    walletSend,
    addBanner,
    updateBanner,
    deleteBanner,
    updateContentPage,
    resetDemo,
  ]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
