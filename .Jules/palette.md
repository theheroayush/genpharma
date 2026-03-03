## 2025-03-03 - Added ARIA labels to icon-only buttons
**Learning:** Shadcn UI `<Button>` components utilizing the `size="icon"` variant frequently lack intrinsic screen reader accessibility because they contain only a Lucide icon component; an explicit `aria-label` must always be provided for these elements.
**Action:** Always check for `size="icon"` when reviewing `Button` usage, and ensure an `aria-label` is present if the button contains no text.
