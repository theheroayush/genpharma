import pg from "pg";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (!process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
    console.error("Migration failed: Missing required database environment variables (DB_HOST, DB_NAME, DB_USER, DB_PASSWORD)");
    process.exit(1);
}

const client = new pg.Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
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
