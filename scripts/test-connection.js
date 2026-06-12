const { Client } = require('pg');
require('dotenv').config({ path: './src/main/admission_management_system/.env' });

async function main() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to PostgreSQL successfully!");
    
    // Get all tables in public schema
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    
    console.log("Tables found:");
    for (let row of res.rows) {
      const countRes = await client.query(`SELECT COUNT(*) FROM "${row.table_name}";`);
      console.log(`- ${row.table_name}: ${countRes.rows[0].count} rows`);
    }
  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await client.end();
  }
}

main();
