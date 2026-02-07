# Setup Guide - Next Steps

## ✅ What's Been Completed

The entire codebase is ready! Here's what has been built:

1. ✅ Next.js project with TypeScript and Tailwind CSS
2. ✅ Database schema and Turso configuration
3. ✅ Product catalogue with 6 sample products
4. ✅ Product detail pages with lead capture forms
5. ✅ API endpoint for saving leads
6. ✅ QR code generation script
7. ✅ Complete documentation

## 🚀 What You Need to Do Now

### Step 1: Set Up Turso Database (5 minutes)

You need to create a Turso database and get credentials. Here are two options:

#### Option A: Using Turso CLI (Recommended)

```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Login to Turso (opens browser)
turso auth login

# Create database
turso db create qr-billboard-leads

# Get database URL (copy this)
turso db show qr-billboard-leads --url

# Create auth token (copy this)
turso db tokens create qr-billboard-leads
```

#### Option B: Using Turso Web Dashboard

1. Go to https://turso.tech
2. Sign up/login with GitHub
3. Click "Create Database"
4. Name it: `qr-billboard-leads`
5. Select a location (closest to you)
6. Copy the **Database URL** and **Auth Token** from the dashboard

### Step 2: Configure Environment Variables

Create a `.env.local` file with your Turso credentials:

```bash
cd /home/berry/github/qr-billboard
cp .env.example .env.local
```

Edit `.env.local` and paste your credentials:

```env
TURSO_DATABASE_URL=libsql://qr-billboard-leads-your-org.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...
```

### Step 3: Push Database Schema

```bash
npm run db:push
```

This creates the `leads` table in your Turso database.

### Step 4: Test Locally

```bash
npm run dev
```

Open http://localhost:3000 and test:

1. ✅ Catalogue page shows 6 products
2. ✅ Click a product → detail page loads
3. ✅ Fill out the lead form and submit
4. ✅ You should see "Thank you! We'll contact you soon."

Verify the lead was saved:

```bash
turso db shell qr-billboard-leads
```

Then run:

```sql
SELECT * FROM leads;
```

You should see your test submission!

### Step 5: Deploy to Vercel

#### Option A: Vercel Dashboard (Easiest)

1. **Push to GitHub:**

```bash
git add .
git commit -m "Initial commit - QR Billboard MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/qr-billboard.git
git push -u origin main
```

2. **Deploy on Vercel:**
   - Go to https://vercel.com/new
   - Sign in with GitHub
   - Click "Import" next to your `qr-billboard` repository
   - Add environment variables:
     - `TURSO_DATABASE_URL`: (paste your Turso URL)
     - `TURSO_AUTH_TOKEN`: (paste your Turso token)
   - Click "Deploy"

3. **Wait 2-3 minutes** for deployment to complete

4. **Copy your deployment URL** (e.g., `https://qr-billboard-abc123.vercel.app`)

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variables
vercel env add TURSO_DATABASE_URL production
# Paste your Turso URL when prompted

vercel env add TURSO_AUTH_TOKEN production
# Paste your Turso token when prompted

# Deploy to production
vercel --prod
```

### Step 6: Generate QR Code

Once deployed, generate the QR code with your actual Vercel URL:

```bash
npm run generate-qr https://your-actual-url.vercel.app
```

This creates `public/qr-code.png` (1024x1024 pixels, perfect for billboards).

**Redeploy to include the QR code:**

```bash
git add public/qr-code.png
git commit -m "Add QR code"
git push
```

Vercel will auto-deploy. Your QR code will be available at:
`https://your-site.vercel.app/qr-code.png`

### Step 7: Test the Complete Flow

1. Open the QR code: `https://your-site.vercel.app/qr-code.png`
2. Scan it with your phone
3. It should open your catalogue
4. Click a product, submit a lead
5. Verify it's saved in Turso:

```bash
turso db shell qr-billboard-leads
SELECT * FROM leads ORDER BY created_at DESC LIMIT 5;
```

## 📋 Checklist for Tomorrow's Demo

- [ ] Turso database created and credentials saved
- [ ] `.env.local` configured
- [ ] Local testing successful (can submit leads)
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] QR code generated with production URL
- [ ] QR code tested on phone
- [ ] At least one test lead in database

## 🎯 Demo Script for Client

1. **Show the QR code** (pull it up on your screen or print it)
2. **Scan with phone** → catalogue opens instantly
3. **Browse products** → "Here are the 6 products we're showcasing"
4. **Click a product** → "Each product has details and a lead form"
5. **Submit a lead** → "Customers can leave their info right here"
6. **Show the database** → "All leads are captured and ready for follow-up"
7. **Explain next steps** → "This is ready for payment integration when you're ready"

## 🆘 Troubleshooting

### "TURSO_DATABASE_URL is not set" error

- Make sure `.env.local` exists and has the correct variables
- Restart the dev server after creating `.env.local`

### Database connection fails

- Check that your Turso database is active (visit turso.tech dashboard)
- Verify the URL and token are correct (no extra spaces)
- Try regenerating the token: `turso db tokens create qr-billboard-leads`

### Images not showing

- The placeholder images should be in `public/products/`
- Run: `ls -la public/products/` to verify they exist
- If missing, re-download: `cd public/products && curl -o product-1.jpg "https://picsum.photos/seed/headphones/800/800"` (repeat for 2-6)

### Vercel deployment fails

- Check the build logs in Vercel dashboard
- Ensure environment variables are set in Vercel project settings
- Try redeploying: `vercel --prod --force`

## 📞 Need Help?

If you run into issues:

1. Check the main README.md for detailed documentation
2. Review the Turso docs: https://docs.turso.tech
3. Review the Vercel docs: https://vercel.com/docs
4. Check Next.js docs: https://nextjs.org/docs

## 🎉 You're Ready!

Once you complete these steps, you'll have:

- ✅ A live website accessible via QR code
- ✅ A professional product catalogue
- ✅ Working lead capture system
- ✅ A billboard-ready QR code
- ✅ A secure, scalable foundation for future features

Good luck with your demo tomorrow! 🚀

