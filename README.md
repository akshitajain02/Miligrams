# 🌾 MILIGRAMS
### *From Farm to Buyer, Every Gram Accountable.*

An elite, production-grade agricultural ecosystem connecting farmers, smart warehouses, and commercial buyers through transparent crop tracking, quantity accountability, a tamper-evident digital ledger, and intelligent crop planning.

---

## 🌟 Product Vision & Architecture

Miligrams solves the critical transparency, weight discrepancy, and post-harvest loss problems in modern agricultural supply chains. Through a combination of sovereign digital identity, tamper-evident SHA-256 cryptographic logging, certified weighbridge intake verification, and rule-based agronomic intelligence, Miligrams ensures that **every gram is accounted for from harvest to settlement.**

```
🌾 FARM GATE (Declared Qty) ➡️ 🏢 WEIGHBRIDGE INTAKE (Verified Qty & Discrepancy) ➡️ 🛒 MARKETPLACE (Fair-Trade Settlement)
                                      ⬇️
                        🔗 SHA-256 TAMPER-EVIDENT LEDGER
                                      ⬆️
                        🧠 FARMISTOR (Smart Crop Planning)
```

---

## 🏛️ Core Product Modules

### 1. Miligrams — Crop Traceability & Quantity Accountability
- **Farmer Identity & KYC**: Unique Farmer ID integrated with AgriStack principles and KYC verification workflows.
- **Harvest Lot Registration**: Granular crop logging with crop type, variety, harvest date, location, imagery, and expected price.
- **Declared vs. Warehouse-Verified Quantity**: Eliminates phantom deductions. Farmers declare estimated harvest weight (`declaredQuantity`), and warehouses record certified weighbridge intake (`verifiedQuantity`). Discrepancies (`discrepancy = verifiedQuantity - declaredQuantity`) and dockage notes are permanently captured.
- **Vertical Chronological Timeline**: Every milestone (Harvest ➡️ Intake ➡️ 15-Day Aging ➡️ Sale) is rendered as a clean, immutable event node. Historical records are never overwritten; corrections are appended as new blocks.

### 2. Farmistor — Smart Crop Planning
- **Multi-Step Agronomic Engine**: Guided wizard collecting soil type (Alluvial, Black Cotton, Loamy Clay, Sandy Loam, Red Sandy), land acreage, water availability (Canal, Borewell, Drip, Rainfed), seasonal window (Kharif, Rabi, Zaid), budget per acre, and farming objectives.
- **Rule-Based Recommendations**: Transparent agronomic matching based on ICAR and State Agricultural University standards.
- **Suitability & Financial Modeling**: Real-time suitability scoring (0–100%), growing duration, estimated input cost, expected yield ranges, and projected net profits.
- **Explainability**: Clear "Why this crop is recommended" justifications and crop-specific risk indicators (e.g., frost vulnerability, pest risks).
- **Side-by-Side Comparison**: Multi-crop matrix comparing economics, water needs, and risk levels.
- **Honest Disclaimers**: All projections are explicitly labeled as rule-based estimates to prevent misleading farmers.

### 3. Tamper-Evident Digital Ledger
- **SHA-256 Chained Event Blocks**: Every supply chain milestone computes `hash = SHA256(index + previousHash + timestamp + merkleRoot + data)`.
- **Merkle Tree Root**: Deterministic payload integrity proof.
- **Ledger Explorer**: Filter and inspect blocks by event type (`HARVEST_REGISTERED`, `WAREHOUSE_QUANTITY_VERIFIED`, `15_DAY_AGING_VERIFIED`, `MARKETPLACE_SOLD`).
- **Cryptographic Truth Disclaimer**: Clear, professional notice stating that cryptographic hashes prove tamper-evident audit history and record integrity, not the empirical truth of manually entered field data.
- **Educational Tamper Sandbox**: One-click simulation of memory corruption to demonstrate real-time cryptographic validation failure and restoration.

### 4. Smart Warehouse Management
- **Silo Capacity Telemetry**: Real-time monitoring of 25,000 Quintal silo capacity across grain silos, cold storage, and ventilated sheds.
- **Weighbridge Intake Audit**: Dedicated interface for operators to compare farmer-declared weights against weighbridge scales, capture dockage or moisture deductions, and assign storage bays.
- **15-Day Aging Audits**: Automated alerts and scheduled quality verifications to prevent spoilage and trigger progressive market discounts.

### 5. Farmer–Buyer Marketplace
- **Direct Procurement**: Seamless commerce connecting commercial buyers directly with KYC-verified farmers.
- **Lot Dossiers**: Full traceability history, origin farmer profile, and weighbridge verification certificates visible prior to purchase.
- **Transparent Pricing**: Real-time 15-day aging discounts and instant order settlement.
- **Farmer Reputation**: Post-sale review and 5-star rating system establishing trusted, top-tier agricultural producers.

---

## 🎨 Visual Identity & Design System

The redesign adheres to **"The Future of Agriculture meets Premium Digital Craft"**:

| Color Token | Hex Code | Role |
|---|---|---|
| **Deep Forest Green** | `#173D2B` | Primary brand anchor, hero backgrounds, primary actions |
| **Botanical Green** | `#2E6847` | Accent tone, interactive hovers, verified badges |
| **Leaf Green** | `#8DBB78` | Growth indicators, success highlights, active steppers |
| **Warm Ivory** | `#F6F4EC` | Editorial background, light surfaces, cards |
| **Muted Sand** | `#E8E1D1` | Subdued borders, table lines, secondary containers |
| **Harvest Gold** | `#D6A75C` | Warehouse telemetry, aging cycles, pricing accents |
| **Deep Charcoal** | `#202720` | High-contrast typography, dark mode surfaces |

- **Typography**: Editorial display serif (`Alice` / `Playfair Display`) paired with precision UI sans-serif (`Plus Jakarta Sans`) and cryptographic monospace (`JetBrains Mono`).
- **Bilingual Experience**: Instant toggle between Hindi (हिन्दी) and English across all portals.
- **Dynamic Themes**: Professional Light and Obsidian Dark themes with persistent user preference.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (v9+)
- *MongoDB is completely optional*: Miligrams includes an embedded in-memory MongoDB engine that spins up automatically if a local MongoDB daemon is not detected.

### Run Locally

```bash
# 1. Install all dependencies (root, server, and client)
npm run install:all

# 2. Start both backend server and frontend client concurrently
npm run dev
```

- **Frontend Client**: [http://localhost:3000](http://localhost:3000)
- **Backend REST API**: [http://localhost:5000](http://localhost:5000)
- **Standalone Blockchain Test Suite**: `npm run test:blockchain`

---

## 📡 API Reference

### Crop & Traceability
- `POST /api/crops/upload` — Register new harvest lot and mint genesis crop block.
- `GET /api/crops/:id` — Retrieve crop dossier, quantity breakdown, and ledger history.
- `GET /api/crops` — List crops with optional filters (`farmerId`, `stage`).

### Farmistor Planning Engine
- `POST /api/farmistor/recommend` — Rule-based agronomic recommendations with yield and profit projections.
- `GET /api/farmistor/crops` — Comprehensive crop catalog and ICAR agro-climatic requirements.

### Warehouse Operations
- `PUT /api/warehouse/update-stock` — Record weighbridge intake, compute declared vs. received discrepancy, and mint verification block.
- `GET /api/warehouse/stock` — Silo inventory and storage bay telemetry.

### Tamper-Evident Ledger
- `GET /api/ledger/blocks` — Retrieve chained blocks.
- `GET /api/ledger/verify-chain` — Traverse and cryptographically verify SHA-256 hashes and Merkle roots.
- `GET /api/ledger/crop-history/:cropId` — Chronological block sequence for a specific crop.
- `POST /api/ledger/simulate-tamper` — Simulate block payload corruption.
- `POST /api/ledger/restore-chain` — Restore immutable state from persistent store.

---

## 🔒 Security & Privacy Policy
- **No Computer Vision**: Computer vision and AI image analysis are completely excluded in favor of verifiable weighbridge metrics and empirical ledger records.
- **Cryptographic Provenance**: Chained SHA-256 digests ensure that historical milestones cannot be modified without invalidating downstream blocks.
