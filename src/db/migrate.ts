import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // e.g. "postgres://user:pass@localhost:5432/dbname"
  });

  const db: NodePgDatabase = drizzle(pool);

  console.log("🚀 Starting migration...");
  await migrate(db, { migrationsFolder: "src/db/drizzle" });
  console.log("✅ Migration complete.");

  await pool.end();
}

main().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
