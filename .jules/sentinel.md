## 2024-05-24 - [Privilege Escalation via Supabase User Metadata]
**Vulnerability:** In Supabase trigger `handle_new_user`, `user_role` was assigned via `COALESCE(NEW.raw_user_meta_data->>'role', 'patient')`. This allows an attacker to specify a custom role like 'admin' or 'pharmacist' during sign-up to escalate privileges.
**Learning:** `raw_user_meta_data` is client-controllable during `auth.signUp` in Supabase. Trusting it for privileged logic like role assignment can lead to critical vulnerabilities.
**Prevention:** Hardcode default roles (e.g., 'patient') in backend triggers, or use a strictly validated, server-side process for assigning roles, ignoring metadata for critical fields.
