import twilio from 'twilio';

// Initialize Twilio client
function getTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    throw new Error(
      'Twilio credentials not configured. Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in environment variables.'
    );
  }

  return twilio(accountSid, authToken);
}

export interface SendSMSParams {
  to: string; // Phone number in E.164 format (e.g., +972501234567)
  message: string;
}

/**
 * Send SMS via Twilio
 * @param params - SMS parameters (to, message)
 * @returns Message SID from Twilio
 */
export async function sendSMS(params: SendSMSParams): Promise<string> {
  const client = getTwilioClient();
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!from) {
    throw new Error(
      'Twilio phone number not configured. Set TWILIO_PHONE_NUMBER in environment variables.'
    );
  }

  try {
    const message = await client.messages.create({
      body: params.message,
      from: from,
      to: params.to,
    });

    console.log('SMS sent successfully via Twilio:', {
      sid: message.sid,
      to: params.to,
      status: message.status,
    });

    return message.sid;
  } catch (error) {
    console.error('Failed to send SMS via Twilio:', error);
    throw error;
  }
}

/**
 * Send lead confirmation SMS
 */
export async function sendLeadConfirmationSMS(
  phone: string,
  customerName: string,
  productName: string
): Promise<void> {
  const message = `Hi ${customerName}! Thank you for your interest in ${productName}. We received your request and our team will contact you soon to discuss your marble project. - Premium Marble & Stone`;

  await sendSMS({
    to: phone,
    message: message,
  });
}

/**
 * Send follow-up SMS (to be called manually or via scheduler)
 */
export async function sendFollowUpSMS(
  phone: string,
  customerName: string
): Promise<void> {
  const message = `Hi ${customerName}, our team will call you within 24 hours about your marble order. Have questions? Reply to this SMS. - Premium Marble & Stone`;

  await sendSMS({
    to: phone,
    message: message,
  });
}
