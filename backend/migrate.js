import pg from "pg";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new pg.Client({
    host: "db.kghhzhipheuhicrhahgs.supabase.co",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "Ayush12padh@",
    ssl: { rejectUnauthorized: false },
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
