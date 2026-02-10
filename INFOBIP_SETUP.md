# Infobip SMS Setup Guide

Infobip SMS integration is now configured for your marble pattern selection app.

## ✅ Configuration (Already Done)

Your `.env.local` is configured with:
- **API Key**: `bdcf90bd...`
- **Base URL**: `ee1gjn.api.infobip.com`
- **Sender ID**: `MarbleStone` (or customize this)

## 📱 How It Works

### Automatic Confirmation SMS
When a customer submits a lead, they receive:
```
Hi [Name]! Thank you for your interest in [Product].
We received your request and our team will contact you
soon to discuss your marble project. - Premium Marble & Stone
```

### Phone Number Format
- Israeli numbers: `0501234567` → Auto-converted to `+972501234567`
- International: `+972501234567` → Used as-is

## 🧪 Testing Locally

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Submit a test lead**:
   - Go to http://localhost:3000
   - Select a marble pattern
   - Enter dimensions
   - Fill form with **your phone number**
   - Submit

3. **Check results**:
   - SMS should arrive on your phone
   - Check console logs for confirmation
   - View [Infobip Logs](https://portal.infobip.com/analyze/logs)

## 🚀 Deploy to Vercel

Add these environment variables in Vercel:

1. Go to: https://vercel.com/[your-project]/settings/environment-variables

2. Add:
   ```
   INFOBIP_API_KEY=bdcf90bd1d625466f799f32e77116063-1f2b1342-70c5-4bba-9e60-d573e7edc364
   INFOBIP_BASE_URL=https://ee1gjn.api.infobip.com
   INFOBIP_SENDER_ID=MarbleStone
   ```

3. Redeploy your app

## 💰 Pricing

- **Free Trial**: 60 days free (check your Infobip dashboard for limits)
- **Israel SMS**: ~$0.17 per message
- **No monthly fees**: Pure pay-as-you-go

## 🎯 Sender ID

The **Sender ID** (what appears as the sender name) is set to `MarbleStone`.

**To customize**:
1. Change `INFOBIP_SENDER_ID` in your env vars
2. Valid formats:
   - Alphanumeric (3-11 chars): `MarbleStone`, `PremiumMarble`
   - Phone number: `+972501234567`
   - Short code: `12345`

**Note**: Some countries restrict sender IDs. Israel allows alphanumeric sender IDs.

## 📊 Monitor SMS Activity

**Infobip Portal**: https://portal.infobip.com/
- **Logs**: View delivery status of each SMS
- **Analytics**: Track send rates, delivery rates
- **Balance**: Check remaining credits

## 🔧 Manual Follow-up SMS

Use this function to send follow-up messages:

```typescript
import { sendFollowUpSMS } from '@/lib/sms';

// Send follow-up to a customer
await sendFollowUpSMS('+972501234567', 'Customer Name');
```

This sends:
```
Hi [Name], our team will call you within 24 hours about
your marble order. Have questions? Reply to this SMS.
- Premium Marble & Stone
```

## 🐛 Troubleshooting

### SMS Not Sending

**Check console logs**:
```bash
npm run dev
# Look for: "SMS sent successfully via Infobip"
# Or: "Failed to send SMS via Infobip"
```

**Check Infobip Portal**:
- Go to [Logs](https://portal.infobip.com/analyze/logs)
- Look for your message
- Check delivery status

**Common Issues**:
- ❌ Invalid phone format → Use E.164 format (+972...)
- ❌ Out of credits → Check balance in portal
- ❌ Invalid sender ID → Use alphanumeric (3-11 chars)
- ❌ API key issues → Verify credentials in portal

### Lead Saves But No SMS

This is **by design**! SMS sending is non-blocking:
- If SMS fails, lead still saves
- Check console/logs to debug SMS issue
- Customer data is never lost

## 📖 API Documentation

- [Infobip SMS API](https://www.infobip.com/docs/api/channels/sms)
- [Node.js SDK](https://github.com/infobip/infobip-api-node-sdk)
- [Portal](https://portal.infobip.com/)

## 🔄 Migration to AWS SNS Later

When ready to scale to AWS SNS:
1. The SMS utility (`lib/sms.ts`) abstracts the provider
2. Create `lib/sms-sns.ts` with same interface
3. Swap import in `app/api/leads/route.ts`
4. Done! Rest of code unchanged

## 💡 Tips

**Optimize Costs**:
- Use message templates (shorter = cheaper)
- Batch messages if sending many at once
- Monitor delivery rates to optimize send times

**Improve Delivery**:
- Use dedicated sender ID (register with Infobip)
- Follow SMS best practices (no spam words)
- Send during business hours for better engagement

**Scale Up**:
- Enable two-way SMS for customer replies
- Add WhatsApp messaging (Infobip supports it)
- Set up automated follow-up campaigns

## 🎉 You're All Set!

SMS notifications are ready to go. Test locally, then deploy to Vercel!
