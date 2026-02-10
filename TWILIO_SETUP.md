# Twilio SMS Setup Guide

Twilio SMS integration for your marble pattern selection app.

## 🎯 Why Twilio?

- **Better Free Trial**: $15-20 in credits (vs Infobip's 15 messages)
- **~75-100 test messages** to Israel at $0.20/SMS
- **AWS SNS Compatible**: Easy migration path later
- **No verified numbers restriction** during trial (can send to any number)
- **Industry standard**: Widely used and documented

## 📝 Step 1: Sign Up for Twilio

1. Go to: https://www.twilio.com/try-twilio
2. Sign up for a free account
3. Verify your email and phone number
4. You'll receive **free trial credits** ($15-20)

## 🔑 Step 2: Get Your Credentials

After signing up, you'll need 3 things:

### Account SID & Auth Token
1. Go to: https://console.twilio.com/
2. You'll see your **Account SID** and **Auth Token** on the dashboard
3. Click "Show" to reveal your Auth Token
4. Copy both values

### Twilio Phone Number
1. In the Twilio Console, go to: **Phone Numbers** → **Manage** → **Buy a number**
2. Select country: **United States** (cheaper, works for international)
3. Check "SMS" capability
4. Click "Search"
5. Pick a number and click "Buy"
6. Your number will be in format: `+1234567890`

**Note**: Trial accounts get one free phone number. US numbers work for sending to Israel.

## ⚙️ Step 3: Configure Environment Variables

Add these to your `.env.local`:

```bash
# Twilio SMS Configuration
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

**Example:**
```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_32_chars_long_xx
TWILIO_PHONE_NUMBER=+15551234567
```

## 🧪 Step 4: Test Locally

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Submit a test lead**:
   - Go to http://localhost:3000
   - Select a marble pattern
   - Enter dimensions
   - Fill form with **any phone number** (no verification needed!)
   - Submit

3. **Check results**:
   - SMS should arrive on the phone
   - Check console logs for confirmation
   - View [Twilio Console Logs](https://console.twilio.com/us1/monitor/logs/sms)

## 🚀 Step 5: Deploy to Vercel

Add these environment variables in Vercel:

1. Go to: https://vercel.com/[your-project]/settings/environment-variables

2. Add (for Production):
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token_32_chars_long_xx
   TWILIO_PHONE_NUMBER=+15551234567
   ```

3. Redeploy your app (or it will auto-deploy on next push)

## 💰 Pricing

**Free Trial:**
- $15-20 in free credits
- Can send to any number (no verification needed)
- Trial lasts until credits run out

**After Trial:**
- **Israel SMS**: $0.20 per message (outbound)
- **US/Canada**: $0.0079 per message
- **No monthly fees**: Pure pay-as-you-go
- **Upgrade**: Add credit card to remove trial restrictions

## 🔄 Trial Restrictions

During trial:
- ✅ Send to **any phone number** (no verification!)
- ✅ Use your free trial credits
- ⚠️ Messages include "Sent from a Twilio trial account" prefix
- ⚠️ Need to verify each destination number in Console (one-time)

**To remove trial restrictions**: Add a credit card to your account.

## 📊 Monitor SMS Activity

**Twilio Console**: https://console.twilio.com/

- **SMS Logs**: Monitor → Logs → SMS
- **Usage**: Monitor → Usage
- **Balance**: View remaining trial credits on dashboard

## 📱 Phone Number Format

- Israeli numbers: `0501234567` → Auto-converted to `+972501234567`
- International: `+972501234567` → Used as-is
- US numbers: `+1234567890` → Used as-is

The app automatically formats Israeli numbers to E.164.

## 🐛 Troubleshooting

### SMS Not Sending

**Check console logs**:
```bash
npm run dev
# Look for: "SMS sent successfully via Twilio"
# Or: "Failed to send SMS via Twilio"
```

**Check Twilio Console**:
- Go to [SMS Logs](https://console.twilio.com/us1/monitor/logs/sms)
- Look for your message
- Check delivery status and error codes

**Common Issues**:
- ❌ Invalid phone format → Use E.164 format (+972...)
- ❌ Out of credits → Add more credits in console
- ❌ Unverified number (trial) → Verify in console first
- ❌ Wrong credentials → Double-check Account SID/Auth Token

### Trial Account: "Unverified Number"

If you get this error during trial:
1. Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/verified
2. Click "Add a new Caller ID"
3. Enter the destination phone number
4. Verify with the code Twilio sends
5. Try sending again

### Lead Saves But No SMS

This is **by design**! SMS sending is non-blocking:
- If SMS fails, lead still saves
- Check console/logs to debug SMS issue
- Customer data is never lost

## 📖 API Documentation

- [Twilio SMS API](https://www.twilio.com/docs/sms)
- [Node.js SDK](https://www.twilio.com/docs/libraries/node)
- [Pricing](https://www.twilio.com/en-us/sms/pricing/il)

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

## 🌍 International Sending

Twilio works globally. To send to other countries:
- **Israel**: $0.20/SMS
- **US/Canada**: $0.0079/SMS
- **UK**: $0.053/SMS
- **Australia**: $0.098/SMS

See full pricing: https://www.twilio.com/en-us/sms/pricing

## 🎉 You're All Set!

SMS notifications are ready to go. Test locally, then deploy to Vercel!

## 💡 Tips

**Optimize Costs**:
- Remove trial prefix by upgrading account
- Use shorter messages (longer = multiple segments)
- Send during business hours for better engagement

**Improve Delivery**:
- Get a local Israeli number (better delivery rates)
- Follow SMS best practices (no spam, clear opt-out)
- Monitor delivery reports to optimize

**Scale Up**:
- Enable two-way SMS for customer replies
- Add WhatsApp messaging (Twilio supports it)
- Set up automated follow-up campaigns
- Use Twilio Studio for complex workflows
