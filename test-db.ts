import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Query leads
    const result = await client.execute('SELECT * FROM leads ORDER BY created_at DESC LIMIT 5');
    
    console.log('\n✅ Database connection successful!');
    console.log(`\nFound ${result.rows.length} leads:\n`);
    
    result.rows.forEach((row, index) => {
      console.log(`Lead #${index + 1}:`);
      console.log(`  ID: ${row.id}`);
      console.log(`  Name: ${row.name}`);
      console.log(`  Phone: ${row.phone}`);
      console.log(`  Email: ${row.email || 'N/A'}`);
      console.log(`  Product ID: ${row.product_id}`);
      console.log(`  Created: ${row.created_at}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Database error:', error);
  }
}

testDatabase();

