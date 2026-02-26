## 2026-05-27 - Password Validation Strategy
**Vulnerability:** Restrictive regex in password validation blocked valid special characters.
**Learning:** Using a specific list of special characters (e.g., `[!@#$%]`) excludes many valid symbols.
**Prevention:** Use negation regex `/[^A-Za-z0-9]/` to accept ANY non-alphanumeric character as a special character.
