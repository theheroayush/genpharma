# Palette's Journal

## 2024-10-24 - Accessibility Patterns
**Learning:** Initializing the journal for UX learnings.
**Action:** Will document critical accessibility findings and interaction patterns here.

## 2024-10-24 - Drag & Drop Accessibility
**Learning:** Standard HTML5 drag-and-drop zones are often inaccessible to keyboard users because `<div>` elements are not focusable by default.
**Action:** Always add `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler (Enter/Space) to trigger the hidden file input. This ensures keyboard users can "click" the upload area. Also, `handleDragLeave` on a container fires when entering its children, causing flicker. Checking `e.currentTarget.contains(e.relatedTarget)` prevents this.
