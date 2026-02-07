# Quick Start Guide

## 🚀 Get Up and Running in 15 Minutes

### Step 1: Get Turso Credentials (5 min)

**Option A - Web Dashboard (Easiest):**
1. Go to https://turso.tech
2. Sign in with GitHub
3. Click "Create Database" → name it `qr-billboard-leads`
4. Copy the **Database URL** and **Auth Token**

**Option B - CLI:**
```bash
curl -sSfL https://get.tur.so/install.sh | bash
turso auth login
turso db create qr-billboard-leads
turso db show qr-billboard-leads --url
turso db tokens create qr-billboard-leads
```

### Step 2: Configure Environment (1 min)

```bash
cd /home/berry/github/qr-billboard
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token-here
```

### Step 3: Initialize Database (1 min)

```bash
npm run db:push
```

### Step 4: Test Locally (2 min)

```bash
npm run dev
```

Open http://localhost:3000 and test the lead form!

### Step 5: Deploy to Vercel (5 min)

**Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/qr-billboard.git
git push -u origin main
```

**Deploy:**
1. Go to https://vercel.com/new
2. Import your repository
3. Add environment variables (same as `.env.local`)
4. Click "Deploy"

### Step 6: Generate QR Code (1 min)

```bash
npm run generate-qr https://your-vercel-url.vercel.app
git add public/qr-code.png
git commit -m "Add QR code"
git push
```

## ✅ Done!

Your QR code is at: `https://your-vercel-url.vercel.app/qr-code.png`

## 📱 Test on Phone

Scan the QR code and verify:
- ✅ Catalogue loads
- ✅ Products clickable
- ✅ Form submits
- ✅ Success message appears

## 🔍 View Leads

```bash
turso db shell qr-billboard-leads
```

Then:
```sql
SELECT * FROM leads ORDER BY created_at DESC;
```

## 🆘 Problems?

- **Database error?** Check `.env.local` has correct credentials
- **Build fails?** Run `npm install` again
- **Images missing?** They're in `public/products/`
- **QR not working?** Regenerate with correct URL

## 📚 More Help

- Full instructions: `README.md`
- Detailed setup: `SETUP_GUIDE.md`
- Deployment checklist: `DEPLOYMENT_CHECKLIST.md`

---

**Need credentials reminder?**

Turso URL format: `libsql://database-name-org.turso.io`
Turso Token: Long string starting with `eyJ...`

Both found in Turso dashboard: https://turso.tech

