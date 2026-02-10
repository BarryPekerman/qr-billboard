import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads } from '@/lib/schema';
import { desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Simple authentication - check for admin key
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_KEY || 'demo-admin-key';
    
    if (authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all leads
    const allLeads = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt));

    // Convert to CSV
    const csvHeader = 'ID,Name,Phone,Email,City,Street,Street Number,Message,Product ID,Created At\n';
    const csvRows = allLeads.map(lead => {
      const createdAt = new Date(lead.createdAt).toISOString();
      return [
        lead.id,
        `"${lead.name}"`,
        `"${lead.phone}"`,
        `"${lead.email || ''}"`,
        `"${lead.city || ''}"`,
        `"${lead.street || ''}"`,
        `"${lead.streetNumber || ''}"`,
        `"${(lead.message || '').replace(/"/g, '""')}"`,
        lead.productId,
        createdAt,
      ].join(',');
    }).join('\n');

    const csv = csvHeader + csvRows;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="marble-leads-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting leads:', error);
    return NextResponse.json(
      { error: 'Failed to export leads' },
      { status: 500 }
    );
  }
}

