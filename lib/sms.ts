import plivo from 'plivo';

// Initialize Plivo client
function getPlivoClient() {
  const authId = process.env.PLIVO_AUTH_ID;
  const authToken = process.env.PLIVO_AUTH_TOKEN;

  if (!authId || !authToken) {
    throw new Error('Plivo credentials not configured. Set PLIVO_AUTH_ID and PLIVO_AUTH_TOKEN in environment variables.');
  }

  return new plivo.Client(authId, authToken);
}

export interface SendSMSParams {
  to: string; // Phone number in E.164 format (e.g., +972501234567)
  message: string;
}

/**
 * Send SMS via Plivo
 * @param params - SMS parameters (to, message)
 * @returns Message UUID from Plivo
 */
export async function sendSMS(params: SendSMSParams): Promise<string> {
  const client = getPlivoClient();
  const src = process.env.PLIVO_PHONE_NUMBER;

  if (!src) {
    throw new Error('PLIVO_PHONE_NUMBER not configured in environment variables.');
  }

  try {
    const response = await client.messages.create({
      src: src,
      dst: params.to,
      text: params.message,
    });

    console.log('SMS sent successfully:', {
      messageUuid: response.messageUuid,
      to: params.to,
    });

    return response.messageUuid[0];
  } catch (error) {
    console.error('Failed to send SMS:', error);
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
