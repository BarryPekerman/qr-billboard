import QRCode from 'qrcode';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Get the URL from command line argument or use placeholder
const url = process.argv[2] || 'https://your-site-url.vercel.app';

async function generateQRCode() {
  try {
    console.log(`Generating QR code for: ${url}`);

    // Generate high-resolution QR code for billboard printing
    // 1024x1024 pixels with high error correction
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'H', // High error correction (30%)
      type: 'image/png',
      width: 1024,
      margin: 4,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    // Convert data URL to buffer
    const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Save to public directory
    const outputPath = join(process.cwd(), 'public', 'qr-code.png');
    writeFileSync(outputPath, buffer);

    console.log(`✓ QR code saved to: ${outputPath}`);
    console.log(`✓ Size: 1024x1024 pixels (suitable for billboard printing)`);
    console.log(`✓ URL encoded: ${url}`);
    console.log('\nYou can now access it at: /qr-code.png');
  } catch (error) {
    console.error('Error generating QR code:', error);
    process.exit(1);
  }
}

generateQRCode();

