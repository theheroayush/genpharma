import pg from "pg";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new pg.Client({
    host: process.env.DB_HOST || "db.kghhzhipheuhicrhahgs.supabase.co",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    database: process.env.DB_NAME || "postgres",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL_CA
        ? { rejectUnauthorized: true, ca: process.env.DB_SSL_CA }
        : { rejectUnauthorized: true },
});

async function run() {
    try {
        console.log("Connecting to Supabase PostgreSQL...");
        await client.connect();
        console.log("Connected!");

        const sql = readFileSync(join(__dirname, "migration.sql"), "utf8");
        console.log("Running migration...");
        await client.query(sql);
        console.log("Migration completed successfully!");
    } catch (err) {
        console.error("Migration failed:", err.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

run();
