# ATOMA MVP (UI Demo)

UI-only Next.js demo for **ATOMA**, an Afghanistan telecom concept site. All data is static / in-memory, persisted in `localStorage` under `atoma-mvp-demo`. No real backend, SMS, or payments.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Demo credentials

| Role     | How to sign in                                      |
|----------|-----------------------------------------------------|
| Customer | Mobile `0771234567` → OTP any 6 digits              |
| Admin    | Mobile `0700000000` → OTP any 6 digits **or** `/admin/login` password `admin123` |

Seed customer: **Ahmad Karimi**, prepaid **ATOMA Plus 599**, balance **450 AFN**, one active SIM.

## What’s included

- Public: home, plans, prepaid/postpaid, VAS, roaming, app, finance, stores, ATOMA Pay, coverage, help
- Auth: login / register with mock OTP
- Self-care: dashboard, profile, SIM, usage, recharge, bills/invoices, plan change, complaints
- Support tickets + global chatbot
- Shop + order flow
- Admin: dashboard, banner CRUD, CMS edit, ticket/complaint moderation

Language toggle: **EN / دری / پښتو** (nav and common labels).

**Fonts:** English uses Space Grotesk + Figtree. Dari and Pashto use **Bahij Zar** by Bahij Virtual Academy (personal use) from `src/fonts/bahij-zar/` — also installed for the current Windows user. Switching to دری or پښتو applies Bahij Zar and RTL layout.

Use **Reset demo data** in the footer to clear `localStorage` and restore seeds.
