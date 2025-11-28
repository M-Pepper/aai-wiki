# Component Migration Guide: Vue → React

## Overview
This document explains the architecture of the key React components used in AAI Wiki, migrated from the original Vue codebase.

## 1. FrontmatterTabs Component

### Implementation
File: `src/components/FrontmatterTabs.tsx`

**Features:**
- Tab-based interface using Headless UI
- Dynamic icon rendering based on tab ID
- Support for links with metadata (openAccess, isAdult, etc.)
- Uses standard icon libraries (Lucide, Heroicons) instead of `unplugin-icons`.

**Usage:**
```tsx
import FrontmatterTabs from '@site/src/components/FrontmatterTabs';

<FrontmatterTabs content={frontMatter.tabData} />
```

## 2. AsideMessage Component

### Implementation
File: `src/components/AsideMessage.tsx`

**Types supported:**
- `note` - Information callout (Blue)
- `warning` - Warning callout (Amber)
- `recall` - Recall/reminder box (Purple)
- `stub` - Indicates incomplete article (Slate)
- `critical` - Critical/Danger alert (Red) - **New in React version**

**Usage:**
```tsx
import AsideMessage from '@site/src/components/AsideMessage';

<AsideMessage type="note">
  This is an important note regarding clinical practice.
</AsideMessage>
```

## 3. Card Component

### Implementation
File: `src/components/Card.tsx`

**Features:**
- Clean, professional tile layout for landing pages.
- Interactive hover states.
- Supports Lucide icons passed as components.
- Layout: Icon + Title (top), Badge (top-right), Description (body).

**Usage:**
```tsx
import Card from '@site/src/components/Card';
import { Activity } from 'lucide-react';

<Card
  icon={<Activity size={20} />}
  title="Topic Title"
  description="Brief description of the topic."
  href="/topic/link"
  badge="New"
/>
```

## 4. DismissibleBanner Component

### Implementation
File: `src/components/DismissibleBanner/DismissibleBanner.tsx`

**Features:**
- Persistent dismissal state (localStorage).
- Used for site-wide announcements or WIP warnings.

**Usage:**
```tsx
import DismissibleBanner from '@site/src/components/DismissibleBanner/DismissibleBanner';

<DismissibleBanner id="banner-id" variant="info">
  Banner content here.
</DismissibleBanner>
```

## 5. Styling & Theme

The migration moved away from Tailwind CSS utility classes to standard **CSS Modules** and **Docusaurus Theme Variables** (`custom.css`).

*   **Variables:** All colors use `var(--aai-...)` variables defined in `src/css/custom.css` to support light/dark mode automatically.
*   **Layout:** The site uses a fluid 95% width container (`--ifm-container-width-xl: 95%`) with a compact Table of Contents.