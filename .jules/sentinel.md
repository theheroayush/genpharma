## 2024-05-14 - Removed hardcoded DB info from migrate.js
**Vulnerability:** The backend migration script (`backend/migrate.js`) contained hardcoded default database connection strings and credentials (like Supabase host URL and user defaults).
**Learning:** Hardcoding database credentials and hostnames in source code exposes sensitive infrastructure information and can lead to unauthorized access or accidental execution against the wrong environment.
**Prevention:** Always rely strictly on environment variables for sensitive configuration and implement explicit checks at script startup to fail fast if required variables are missing, instead of falling back to insecure defaults.
