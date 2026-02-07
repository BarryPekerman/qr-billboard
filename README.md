# QR Billboard - Product Catalogue MVP

A Next.js-based product catalogue website designed to be accessed via QR codes on billboards. Features a clean product grid, detailed product pages, and lead capture forms.

## Features

- 📱 Mobile-optimized product catalogue
- 🎨 Modern, responsive UI with Tailwind CSS
- 📝 Lead capture forms for each product
- 💾 Turso SQLite database for storing leads
- 🔐 Secure API endpoints
- 📊 Ready for payment system integration

## Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Database:** Turso (SQLite over HTTP)
- **ORM:** Drizzle ORM
- **Hosting:** Vercel
- **QR Generation:** qrcode npm package

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A GitHub account
- A Turso account (free at https://turso.tech)
- A Vercel account (free at https://vercel.com)

## Setup Instructions

### 1. Clone and Install

```bash
cd qr-billboard
npm install
```

### 2. Set Up Turso Database

```bash
# Install Turso CLI (if not already installed)
curl -sSfL https://get.tur.so/install.sh | bash

# Login to Turso
turso auth login

# Create database
turso db create qr-billboard-leads

# Get database URL
turso db show qr-billboard-leads --url

# Create auth token
turso db tokens create qr-billboard-leads
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Turso credentials:

```env
TURSO_DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

### 4. Push Database Schema

```bash
npm run db:push
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment to Vercel

### Option 1: Via Vercel Dashboard (Recommended for First Deploy)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
6. Click "Deploy"

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add TURSO_DATABASE_URL
vercel env add TURSO_AUTH_TOKEN

# Deploy to production
vercel --prod
```

## Generate QR Code

After deployment, generate a QR code pointing to your live site:

```bash
# Replace with your actual Vercel URL
npm run generate-qr https://your-site.vercel.app
```

The QR code will be saved to `public/qr-code.png` (1024x1024 pixels, suitable for billboard printing).

You can access it at: `https://your-site.vercel.app/qr-code.png`

## Project Structure

```
qr-billboard/
├── app/
│   ├── layout.tsx              # Root layout with header/footer
│   ├── page.tsx                # Product catalogue grid
│   ├── products/[id]/
│   │   ├── page.tsx            # Product detail page
│   │   └── LeadForm.tsx        # Lead capture form component
│   └── api/leads/
│       └── route.ts            # API endpoint for lead submissions
├── lib/
│   ├── db.ts                   # Turso database client
│   ├── schema.ts               # Drizzle schema (leads table)
│   └── products.ts             # Product data
├── public/
│   ├── products/               # Product images
│   └── qr-code.png            # Generated QR code
├── scripts/
│   └── generate-qr.ts         # QR code generator script
└── drizzle.config.ts          # Drizzle ORM configuration
```

## Database Schema

### Leads Table

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key (auto-increment) |
| name | TEXT | Customer name (required) |
| phone | TEXT | Customer phone (required) |
| email | TEXT | Customer email (optional) |
| message | TEXT | Additional message (optional) |
| productId | TEXT | Product ID (required) |
| createdAt | TIMESTAMP | Timestamp of submission |

## Viewing Leads

### Option 1: Drizzle Studio (Local Development)

```bash
npm run db:studio
```

Opens a web interface at `https://local.drizzle.studio`

### Option 2: Turso CLI

```bash
turso db shell qr-billboard-leads

# SQL query
SELECT * FROM leads ORDER BY created_at DESC;
```

### Option 3: Turso Dashboard

Visit [https://turso.tech](https://turso.tech) and navigate to your database.

## Customization

### Adding Products

Edit `lib/products.ts` and add your products to the array. Each product needs:

- `id`: Unique identifier
- `name`: Product name
- `price`: Price in dollars
- `image`: Path to image in `/public/products/`
- `description`: Product description
- `features`: Array of feature strings

### Styling

The app uses Tailwind CSS. Modify classes in the component files to customize the design.

## Future Enhancements

This MVP is ready for:

- ✅ Payment integration (Stripe, PayPal)
- ✅ Admin dashboard for managing products and leads
- ✅ User authentication
- ✅ Email notifications
- ✅ Analytics tracking
- ✅ Docker containerization
- ✅ Migration to AWS (ECS, RDS)

## Troubleshooting

### Database Connection Errors

- Verify your `.env.local` file has correct Turso credentials
- Run `npm run db:push` to ensure schema is up to date
- Check Turso dashboard to confirm database is active

### Build Errors

- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

### Images Not Loading

- Ensure images are in `public/products/` directory
- Check that image paths in `lib/products.ts` match actual filenames

## Support

For issues or questions, please open an issue on GitHub.

## License

MIT License - feel free to use this for your projects!
