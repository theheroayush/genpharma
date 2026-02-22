## 2026-02-22 - [Unapproved Admin Access]
**Vulnerability:** Admin role users could access protected routes without approval because approval checks were hardcoded for 'pharmacist' role only.
**Learning:** Hardcoding role-specific security checks in shared components leads to bypasses when new or other privileged roles are introduced.
**Prevention:** Apply security checks (like approval status) universally or to all privileged roles by default, rather than whitelisting specific roles.
