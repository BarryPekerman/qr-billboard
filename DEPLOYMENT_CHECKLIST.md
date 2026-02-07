# Deployment Checklist

Use this checklist to ensure everything is ready for deployment.

## Pre-Deployment

### 1. Turso Database Setup
- [ ] Turso account created at https://turso.tech
- [ ] Database `qr-billboard-leads` created
- [ ] Database URL copied
- [ ] Auth token generated and copied

### 2. Local Environment
- [ ] `.env.local` file created from `.env.example`
- [ ] `TURSO_DATABASE_URL` added to `.env.local`
- [ ] `TURSO_AUTH_TOKEN` added to `.env.local`
- [ ] Database schema pushed: `npm run db:push`

### 3. Local Testing
- [ ] Dev server runs without errors: `npm run dev`
- [ ] Catalogue page loads at http://localhost:3000
- [ ] All 6 products display correctly
- [ ] Product detail page loads when clicking a product
- [ ] Lead form accepts input
- [ ] Lead form submits successfully
- [ ] Success message appears after submission
- [ ] Lead appears in Turso database

### 4. Code Repository
- [ ] Code committed to Git
- [ ] Repository pushed to GitHub
- [ ] Repository is accessible

## Deployment to Vercel

### 5. Vercel Account
- [ ] Vercel account created at https://vercel.com
- [ ] Signed in with GitHub

### 6. Vercel Project Setup
- [ ] Project imported from GitHub
- [ ] Environment variables added:
  - [ ] `TURSO_DATABASE_URL`
  - [ ] `TURSO_AUTH_TOKEN`
- [ ] Deployment initiated

### 7. Deployment Verification
- [ ] Build completed successfully
- [ ] Production URL obtained (e.g., https://qr-billboard-xyz.vercel.app)
- [ ] Website loads in browser
- [ ] Catalogue page displays correctly
- [ ] Product pages load
- [ ] Lead form works on production

## Post-Deployment

### 8. QR Code Generation
- [ ] QR code generated with production URL: `npm run generate-qr https://your-url.vercel.app`
- [ ] QR code file exists at `public/qr-code.png`
- [ ] QR code committed and pushed to GitHub
- [ ] Vercel auto-deployed the update
- [ ] QR code accessible at https://your-url.vercel.app/qr-code.png

### 9. Final Testing
- [ ] QR code downloaded/printed
- [ ] QR code scanned with phone
- [ ] Website opens on phone
- [ ] Navigation works on mobile
- [ ] Lead form works on mobile
- [ ] Test lead submitted from phone
- [ ] Test lead appears in Turso database

### 10. Demo Preparation
- [ ] QR code ready to show (on screen or printed)
- [ ] Production URL bookmarked
- [ ] Turso dashboard accessible to show leads
- [ ] Demo script reviewed (see SETUP_GUIDE.md)

## Troubleshooting Commands

If something goes wrong, use these commands:

```bash
# Check local environment
cat .env.local

# Test database connection
npm run db:push

# View database contents
turso db shell qr-billboard-leads
SELECT * FROM leads;

# Check Vercel deployment logs
vercel logs

# Redeploy to Vercel
vercel --prod --force

# Regenerate QR code
npm run generate-qr https://your-actual-url.vercel.app
```

## Success Criteria

You're ready for the demo when:

✅ Website is live and accessible via HTTPS
✅ QR code scans and opens the website
✅ All features work on mobile devices
✅ Leads are being captured in the database
✅ You can demonstrate the complete flow

## Demo Day Checklist

On the day of the demo:

- [ ] Test QR code 5 minutes before demo
- [ ] Have production URL ready as backup
- [ ] Have Turso dashboard open to show leads
- [ ] Clear any test leads or leave a few for demonstration
- [ ] Prepare to explain the payment-ready architecture

## Contact Information

**Turso Dashboard:** https://turso.tech
**Vercel Dashboard:** https://vercel.com
**Production URL:** ___________________ (fill in after deployment)
**QR Code URL:** ___________________ (fill in after deployment)

---

Good luck with your demo! 🚀

