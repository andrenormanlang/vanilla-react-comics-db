const { Pool } = require('pg');

// PostgreSQL connection configuration
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:IN49KBWYHzXM@ep-weathered-darkness-a6roilpc.us-west-2.aws.neon.tech/dres_comics_db?sslmode=require'
});

module.exports = pool;