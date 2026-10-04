# First Money Gold (FMG) Web Application

Official web application repository for **First Money Gold (FMG)** - Tamilnadu's #1 Used Gold Buying & Low-Interest Gold Loan Partner.

---

## 🌟 Key Application Features

### 1. Daily VIP 100% Gold Loan Scarcity Offer (`#vip-offer`)
- **Daily Scarcity**: Limited strictly to **10 members per day**.
- **Live Midnight Countdown**: Resets automatically every midnight.
- **Viral Referral Mechanism**: Requires sharing to 10 WhatsApp groups or friends to unlock the VIP gold loan voucher.
- **Anti-Fraud Mathematical Passcode Binding**:
  - Each customer enters their 10-digit mobile number.
  - A deterministic tamper-proof passcode is generated in format: `FMG-VIP-[Last4Digits]-[Checksum]`.
  - Checksum algorithm: `((DigitsSum * Day * 17 + Month * 13) % 90) + 10`.
  - Locked to user's registered mobile number, device IP, and today's calendar date.

---

## 🛠️ Secret Staff / Admin Verification Portal

> **IMPORTANT / STAFF ACCESS ONLY:**
> The **"Staff / Admin: Verify Customer Secret Passcode & Phone Match"** feature is completely secret and hidden from ordinary website visitors to prevent fraud.

### How to Open the Secret Staff Verifier:
1. Scroll to the **"Core Services"** section (`#services`) on the website.
2. **Click directly on the special heading words "Core Services"** (`#core-services-heading`).
3. The **Secret Staff / Admin Verification Modal** (`#staff-verifier-modal`) will pop up instantly on screen.
4. It also reveals the inline verifier tool in the VIP section (`#staff-admin-verifier-container`).

### How Staff Verifies a Customer:
1. Enter the customer's **10-Digit Mobile Number** (e.g. `9876543210`).
2. Enter the customer's **VIP Secret Passcode** presented on WhatsApp or in-branch (e.g. `FMG-VIP-3210-89`).
3. Click **"🔍 Verify Passcode & Phone Match Now"**.
4. The system validates the passcode mathematically:
   - **✅ AUTHENTIC MATCH**: Confirms customer mobile number, passcode, date, and authorizes 100% full market value payout.
   - **❌ MISMATCH / INVALID**: Warns staff that the passcode is fake, altered, or generated for a different mobile number or date.
5. **Quick Test**: Click *"⚡ Auto-Fill Sample Test (9876543210)"* in the modal to run an instant verification test.

---

## 📍 Core Business Services & Branch Network

- **60% Used Gold Buying**: Immediate cash/UPI/IMPS bank payout at 100% today's live 22K 916 market rate.
- **Release Pledged Gold**: Clear high-interest loans at pawn shops and banks with FMG direct funds.
- **40% Fast Gold Loans**: Instant disbursal from 0.99%/month interest.
- **Multi-Branch Coverage**:
  - **Chennai**: Head Office (Parrys / Broadway)
  - **Theni**: Main Branch (Madurai Main Road)
  - **Dindigul**: City Center (Clock Tower)
  - **Batlagundu**: Bus Stand Branch (Main Bazaar)
  - **Nilakottai**: Market Branch (Madurai Road)
- **Direct WhatsApp Redirection**: All call and contact buttons redirect directly to WhatsApp (+91 63806 30242).
- **Bilingual Interface**: Seamless instant English ⇄ தமிழ் language toggle.

---

## 💻 Tech Stack & Architecture

- **Core**: HTML5, Vanilla JavaScript (ES Modules), Tailwind CSS
- **Bundler & Build Tool**: [Vite](https://vitejs.dev/)
- **Typography & Icons**: Plus Jakarta Sans, Outfit, Google Fonts, SVG Lucide Icons
- **Deployment**: Single-click cPanel automated packager (`package_for_cpanel.js`)

---

## 🚀 Development & Deployment

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Dev server starts at `http://localhost:5173`.

### 3. Build & Package for cPanel Deployment
```bash
node package_for_cpanel.js
```
This command automatically:
1. Compiles the minified production bundle into `dist/`.
2. Copies `.htaccess`, `robots.txt`, and `sitemap.xml`.
3. Creates **`cpanel_deploy.zip`** ready for immediate upload to cPanel `public_html`.
