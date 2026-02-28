## 2024-10-24 - [Add ARIA labels to Layout Buttons]
**Learning:** React requires exact match replacing or careful regex when using scripts to add JSX properties like `aria-label`, as simple string replacement can easily duplicate attributes and break the build.
**Action:** Use regex specifically designed to replace existing attributes or use AST parsers for safer code modifications to avoid build breakages when implementing accessibility fixes.
