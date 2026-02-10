import { Infobip, AuthType } from '@infobip-api/sdk';

// Initialize Infobip client
function getInfobipClient() {
  const apiKey = process.env.INFOBIP_API_KEY;
  const baseUrl = process.env.INFOBIP_BASE_URL;

  if (!apiKey || !baseUrl) {
    throw new Error(
      'Infobip credentials not configured. Set INFOBIP_API_KEY and INFOBIP_BASE_URL in environment variables.'
    );
  }

  return new Infobip({
    baseUrl: baseUrl,
    apiKey: apiKey,
    authType: AuthType.ApiKey,
  });
}

export interface SendSMSParams {
  to: string; // Phone number in E.164 format (e.g., +972501234567)
  message: string;
}

/**
 * Send SMS via Infobip
 * @param params - SMS parameters (to, message)
 * @returns Message ID from Infobip
 */
export async function sendSMS(params: SendSMSParams): Promise<string> {
  const client = getInfobipClient();
  const from = process.env.INFOBIP_SENDER_ID || 'MarbleStone';

  try {
    const response = await client.channels.sms.send({
      messages: [
        {
          destinations: [
            {
              to: params.to,
            },
          ],
          from: from,
          text: params.message,
        },
      ],
    });

    const messageId = response.data.messages?.[0]?.messageId;

    console.log('SMS sent successfully via Infobip:', {
      messageId: messageId,
      to: params.to,
      status: response.data.messages?.[0]?.status,
    });

    return messageId || 'unknown';
  } catch (error) {
    console.error('Failed to send SMS via Infobip:', error);
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
