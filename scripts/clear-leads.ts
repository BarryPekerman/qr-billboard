import 'dotenv/config';
import { db } from '../lib/db';
import { leads } from '../lib/schema';

async function clearLeads() {
  try {
    console.log('Clearing all leads from database...');
    await db.delete(leads);
    console.log('✓ All leads cleared successfully');
  } catch (error) {
    console.error('Error clearing leads:', error);
    process.exit(1);
  }
}

clearLeads();
