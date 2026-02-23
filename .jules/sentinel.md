## 2024-05-23 - [Insecure Local Storage Usage]
**Vulnerability:** Sensitive business data (Orders) was stored in `localStorage` keys like `gp_orders`, exposing patient data to XSS attacks.
**Learning:** Prototyping with `localStorage` persistence creates security debt that is hard to remove without implementing a full backend or accepting data loss on refresh.
**Prevention:** Use React Context or other in-memory state management for sensitive data. Only persist non-sensitive preferences or auth tokens (securely) in client storage.
