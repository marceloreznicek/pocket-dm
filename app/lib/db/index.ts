import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'marcelo',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'pocketdm',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

export default pool;