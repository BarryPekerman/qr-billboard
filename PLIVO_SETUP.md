# Plivo SMS Setup Guide

This guide will help you set up Plivo for SMS notifications in your marble pattern selection app.

## Step 1: Create Plivo Account

1. Visit [Plivo Free Trial](https://www.plivo.com/try-plivo/)
2. Sign up for a free trial account
3. Verify your email address
4. You'll receive free trial credits to test SMS

## Step 2: Get Your Credentials

1. Log in to [Plivo Console](https://console.plivo.com/dashboard/)
2. On the dashboard, you'll see:
   - **Auth ID** (example format: `MAXXXXXXXXXXXXXXXXXX`)
   - **Auth Token** (example format: `YourAuthTokenHere123456789`)
3. Copy both values

## Step 3: Get a Phone Number

### Option A: Trial Number (Free, Limited)
- Plivo trial accounts can send SMS to verified numbers only
- Good for testing

### Option B: Buy a Number (Recommended for Production)
1. Go to [Phone Numbers](https://console.plivo.com/phone-numbers/search/)
2. Search for a number in your region (Israel: +972)
3. Purchase the number (~$0.80-1.50/month)
4. This number will be your sender ID

**Important**: For Israel, you might need to use an international number (US/UK) or check [Plivo's Israel coverage](https://www.plivo.com/sms/pricing/il/)

## Step 4: Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Plivo SMS Configuration
PLIVO_AUTH_ID=your_actual_auth_id_here
PLIVO_AUTH_TOKEN=your_actual_auth_token_here
PLIVO_PHONE_NUMBER=+1234567890  # Your purchased or trial number
```

**Note**: Also add these to your Vercel environment variables for production!

## Step 5: Test SMS

### Local Testing:
1. Start your dev server: `npm run dev`
2. Submit a test lead form
3. Check Plivo Console → [Logs](https://console.plivo.com/logs/) to see SMS status

### Phone Number Format:
- Israeli numbers should be in E.164 format: `+972501234567`
- The app automatically converts Israeli numbers:
  - Input: `0501234567` → Converted to: `+972501234567`
  - Input: `+972501234567` → Used as-is

## Step 6: Deploy to Vercel

1. Go to your Vercel project settings
2. Add environment variables:
   - `PLIVO_AUTH_ID`
   - `PLIVO_AUTH_TOKEN`
   - `PLIVO_PHONE_NUMBER`
3. Redeploy your app

## SMS Messages

### Confirmation SMS (Automatic)
Sent immediately when a customer submits a lead:
```
Hi [Name]! Thank you for your interest in [Product]. We received your request and our team will contact you soon to discuss your marble project. - Premium Marble & Stone
```

### Follow-up SMS (Manual)
Use the `sendFollowUpSMS` function for manual follow-ups:
```typescript
import { sendFollowUpSMS } from '@/lib/sms';

await sendFollowUpSMS('+972501234567', 'Customer Name');
```

## Pricing

- **Free Trial**: ~$10 credit for testing
- **Israel SMS**: ~$0.18 per message
- **Phone Number**: ~$1/month

## Troubleshooting

### "Plivo credentials not configured"
- Make sure `.env.local` has all three Plivo variables
- Restart your dev server after adding env vars

### SMS not sending
- Check Plivo Console logs
- Verify phone number format (must include country code)
- Check trial account has credits remaining
- For trial accounts, verify the recipient number in Plivo Console

### "Phone number not verified" (Trial)
- Add recipient numbers in [Verified Caller IDs](https://console.plivo.com/phlo/verified-caller-ids/)
- Upgrade to paid account to send to any number

## Migration to AWS SNS Later

When ready to scale:
1. The SMS utility (`lib/sms.ts`) abstracts the provider
2. Create a new `lib/sms-sns.ts` with similar interface
3. Swap the import in `app/api/leads/route.ts`
4. Done! The rest of your code stays the same

## Support

- [Plivo Documentation](https://www.plivo.com/docs/)
- [Plivo SMS API](https://www.plivo.com/docs/sms/api/message)
- [Plivo Support](https://support.plivo.com/)
