# 📊 Admin Dashboard Guide

## 🎉 New Features Added

Your QR Billboard MVP now includes:

1. ✅ **Vercel Analytics** - Track website visitors automatically
2. ✅ **Admin Dashboard** - View and manage all leads
3. ✅ **Lead Export** - Download leads as CSV

---

## 🔐 Accessing the Admin Dashboard

### URL
**https://qr-billboard.vercel.app/admin**

### Login
- **Admin Key:** `demo-admin-key`
- ⚠️ **Change this in production!** (see security section below)

### Steps:
1. Visit https://qr-billboard.vercel.app/admin
2. Enter admin key: `demo-admin-key`
3. Click "Sign in"

The key is saved in your browser, so you won't need to enter it again.

---

## 📊 Admin Dashboard Features

### 1. **Statistics Overview**
At the top of the dashboard, you'll see:
- **Total Leads** - All submissions
- **With Email** - How many provided email
- **With Message** - How many left a message

### 2. **Lead Management Table**
View all leads with:
- ID
- Name
- Phone
- Email
- Product name
- Message (truncated)
- Submission date

### 3. **Search & Filter**
Search box filters by:
- Name
- Phone number
- Email
- Product ID

### 4. **Export to CSV**
Click "Export CSV" button to download all leads as a spreadsheet:
- Opens in Excel, Google Sheets, etc.
- Includes all fields
- Filename: `leads-[timestamp].csv`

---

## 📈 Vercel Analytics

### What It Tracks
- Page views
- Unique visitors
- Top pages
- Device types (mobile vs desktop)
- Geographic locations
- Referral sources

### Viewing Analytics

**Option 1: Vercel Dashboard**
1. Go to https://vercel.com
2. Navigate to your project: `qr-billboard`
3. Click "Analytics" tab

**Option 2: Real-time (requires upgrade)**
- Free tier: 24-hour delay
- Pro tier: Real-time analytics

### What You'll See
- **Daily visitors** - Track growth over time
- **Popular products** - Which products get the most views
- **QR scan success** - How many people scan vs direct visits
- **Mobile vs Desktop** - Verify billboard scans (should be 99% mobile)

---

## 🔒 Security Configuration

### Change the Admin Key (IMPORTANT!)

**For Production, change `demo-admin-key` to something secure:**

#### Method 1: Via Vercel Dashboard
1. Go to https://vercel.com
2. Project settings → Environment Variables
3. Edit `ADMIN_KEY`
4. Set new secure value (e.g., `MyS3cur3K3y!2026`)
5. Redeploy

#### Method 2: Via Vercel CLI
```bash
vercel env rm ADMIN_KEY production --token YOUR_TOKEN --yes
echo -n "YourNewSecureKey" | vercel env add ADMIN_KEY production --token YOUR_TOKEN
vercel --prod
```

#### Method 3: Local Update + Push
Edit `.env.local`:
```bash
ADMIN_KEY=YourNewSecureKey
```

Then update Vercel environment and redeploy.

### Best Practices
- ✅ Use a strong, random key (16+ characters)
- ✅ Mix letters, numbers, and symbols
- ✅ Don't share the key in public
- ✅ Change it periodically
- ❌ Don't use "password", "admin", or "123456"

**Example strong keys:**
- `qR-B1llb0ard-2026!Adm1n`
- `Sec#uR3-K3y-f0R-L3ads`
- `MyC0mp@ny-Adm!n-P@55`

---

## 📤 Lead Export Details

### CSV Format
```
ID,Name,Phone,Email,Message,Product ID,Created At
1,"John Doe","1234567890","john@example.com","Interested in bulk order",1,2026-02-07T20:15:00.000Z
2,"Jane Smith","0987654321","","",3,2026-02-07T21:30:00.000Z
```

### Use Cases
- **Import to CRM** - Salesforce, HubSpot, etc.
- **Email Marketing** - Import to Mailchimp, SendGrid
- **Analysis** - Open in Excel for charts
- **Backup** - Regular exports for data security

### Automated Export (Advanced)
You can automate CSV export using the API:

```bash
curl -X GET https://qr-billboard.vercel.app/api/leads/export \
  -H "Authorization: Bearer YourAdminKey" \
  -o leads.csv
```

Schedule this with cron or CI/CD for automatic backups.

---

## 🔍 Viewing Individual Lead Details

In the admin table:
- **Hover over truncated messages** to see full text (coming soon)
- **Click product name** to view that product page
- **Export CSV** to see full messages in spreadsheet

---

## 📱 Mobile Access

The admin dashboard is **fully responsive**:
- ✅ Works on tablets
- ✅ Works on phones (but table scrolls horizontally)
- ✅ Touch-friendly buttons

Best viewed on desktop/laptop for the table view.

---

## 🚨 Troubleshooting

### "Unauthorized" Error
- Check your admin key is correct
- Make sure `ADMIN_KEY` environment variable is set in Vercel
- Clear browser cache and try again

### No Leads Showing
- Check if leads exist by submitting a test form
- Verify Turso database is connected
- Check browser console for errors (F12)

### Export Not Working
- Ensure you're authenticated
- Check browser allows downloads
- Try a different browser

### Analytics Not Showing
- Wait 24 hours for initial data
- Check Vercel dashboard directly
- Verify @vercel/analytics is installed

---

## 🎯 Demo Day Tips

### Before the Demo:
1. ✅ Test the admin dashboard
2. ✅ Clear or prepare sample leads
3. ✅ Bookmark the admin URL
4. ✅ Test CSV export

### During the Demo:
1. Show a test lead submission on phone
2. Switch to admin dashboard
3. Show the lead appeared in the table
4. Demonstrate search/filter
5. Export to CSV and open in Excel
6. Show analytics (if available)

### Talking Points:
- "All leads are captured instantly"
- "You can search by any field"
- "Export to Excel anytime for your sales team"
- "Analytics show how many people scan the QR code"
- "Secure admin access - only you have the key"

---

## 🔮 Future Enhancements

Easy to add later:
- Email notifications when new leads arrive
- Lead status tracking (new, contacted, closed)
- Notes/comments on each lead
- Bulk delete
- Date range filters
- Product performance analytics
- Auto-response emails to customers
- Integration with CRM systems
- Two-factor authentication

---

## 📞 Quick Reference

| Feature | URL/Command |
|---------|-------------|
| Admin Dashboard | https://qr-billboard.vercel.app/admin |
| Login Key | `demo-admin-key` (change in production!) |
| Export CSV | Click button in admin dashboard |
| Analytics | https://vercel.com → Project → Analytics |
| View Leads API | `GET /api/leads` with Authorization header |
| Export API | `GET /api/leads/export` with Authorization header |

---

## ✅ Checklist for Production

Before going live with real customers:

- [ ] Change `ADMIN_KEY` to a secure value
- [ ] Test admin login with new key
- [ ] Set up regular CSV export schedule
- [ ] Enable Vercel Analytics notifications
- [ ] Document your admin key securely
- [ ] Train staff on admin dashboard
- [ ] Test lead export workflow
- [ ] Set up backup process

---

**Everything is ready to go! 🚀**

Access your admin dashboard at: **https://qr-billboard.vercel.app/admin**

Key: `demo-admin-key`

