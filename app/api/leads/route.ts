import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads } from '@/lib/schema';
import { desc } from 'drizzle-orm';
import { sendLeadConfirmationSMS } from '@/lib/sms';
import { getProductById } from '@/lib/products';

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

    return NextResponse.json(
      { leads: allLeads, total: allLeads.length },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, phone, city, productId } = body;

    if (!name || !phone || !city || !productId) {
      return NextResponse.json(
        { error: 'Name, phone, city, and productId are required' },
        { status: 400 }
      );
    }

    // Validate name (at least 2 characters)
    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Validate phone (basic check for numbers)
    if (phone.trim().length < 6) {
      return NextResponse.json(
        { error: 'Please provide a valid phone number' },
        { status: 400 }
      );
    }

    // Validate city (at least 2 characters)
    if (city.trim().length < 2) {
      return NextResponse.json(
        { error: 'City must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Insert lead into database
    const newLead = await db.insert(leads).values({
      name: name.trim(),
      phone: phone.trim(),
      email: body.email?.trim() || null,
      city: city.trim(),
      street: body.street?.trim() || null,
      streetNumber: body.streetNumber?.trim() || null,
      message: body.message?.trim() || null,
      productId: productId,
    }).returning();

    // Send SMS confirmation (non-blocking - don't fail if SMS fails)
    try {
      const product = getProductById(productId);
      const productName = product?.name || 'our marble';

      // Ensure phone number is in E.164 format
      let formattedPhone = phone.trim();
      if (!formattedPhone.startsWith('+')) {
        // Assume Israeli number if no country code
        formattedPhone = `+972${formattedPhone.replace(/^0/, '')}`;
      }

      await sendLeadConfirmationSMS(
        formattedPhone,
        name.trim(),
        productName
      );
      console.log('SMS confirmation sent to:', formattedPhone);
    } catch (smsError) {
      // Log SMS error but don't fail the lead submission
      console.error('Failed to send SMS confirmation:', smsError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Lead submitted successfully',
        leadId: newLead[0].id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting lead:', error);
    
    // Check if it's a database connection error
    if (error instanceof Error && error.message.includes('TURSO')) {
      return NextResponse.json(
        { error: 'Database configuration error. Please check environment variables.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit lead. Please try again later.' },
      { status: 500 }
    );
  }
}

