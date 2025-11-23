# AAI Wiki - Technical Requirements

## Overview
This document defines the technical requirements for theming, layout, and usability features for the AAI Wiki, a Docusaurus-based clinical reference site.

**Reference Sites:**
- [Hasura Docs](https://hasura.io/docs/3.0/index/) - Clean layout, excellent theming
- [kidney.wiki](https://kidney.wiki) - Content structure inspiration

---

## 1. Theming System

### 1.1 Color Palette
**Selected: Professional Medical (Option 3 from BRANDING.md)**

#### Light Mode
```css
:root {
  /* Primary Colors */
  --aai-primary: #0891b2;        /* Cyan 600 */
  --aai-primary-light: #06b6d4;  /* Cyan 500 */
  --aai-primary-dark: #0e7490;   /* Cyan 700 */

  /* Accent Colors */
  --aai-secondary: #0369a1;      /* Sky 700 */
  --aai-success: #059669;        /* Emerald 600 */
  --aai-warning: #f59e0b;        /* Amber 500 */
  --aai-danger: #dc2626;         /* Red 600 */
  --aai-accent: #8b5cf6;         /* Violet 500 */

  /* Neutral Colors */
  --aai-text-primary: #1e293b;   /* Slate 800 */
  --aai-text-secondary: #64748b; /* Slate 500 */
  --aai-bg-primary: #ffffff;
  --aai-bg-secondary: #f8fafc;   /* Slate 50 */
  --aai-border: #e2e8f0;         /* Slate 200 */
}
```

#### Dark Mode
```css
[data-theme='dark'] {
  /* Primary Colors (slightly lighter for dark bg) */
  --aai-primary: #22d3ee;        /* Cyan 400 */
  --aai-primary-light: #67e8f9;  /* Cyan 300 */
  --aai-primary-dark: #06b6d4;   /* Cyan 500 */

  /* Accent Colors */
  --aai-secondary: #38bdf8;      /* Sky 400 */
  --aai-success: #10b981;        /* Emerald 500 */
  --aai-warning: #fbbf24;        /* Amber 400 */
  --aai-danger: #f87171;         /* Red 400 */
  --aai-accent: #a78bfa;         /* Violet 400 */

  /* Neutral Colors */
  --aai-text-primary: #e2e8f0;   /* Slate 200 */
  --aai-text-secondary: #94a3b8; /* Slate 400 */
  --aai-bg-primary: #0f172a;     /* Slate 900 */
  --aai-bg-secondary: #1e293b;   /* Slate 800 */
  --aai-border: #334155;         /* Slate 700 */
}
```

### 1.2 Dark Mode Implementation
- **Toggle location:** Header (top-right, near search)
- **Persistence:** localStorage with fallback to system preference
- **Transition:** Smooth CSS transitions (200ms) on theme change
- **Default:** System preference detection on first visit

**Docusaurus Config:**
```js
themeConfig: {
  colorMode: {
    defaultMode: 'light',
    disableSwitch: false,
    respectPrefersColorScheme: true,
  },
}
```

### 1.3 Typography

#### Font Stack
```css
/* Headings & Body */
--font-family-base: 'Inter', -apple-system, BlinkMacSystemFont,
                    'Segoe UI', Roboto, sans-serif;

/* Code/Medical Dosing */
--font-family-mono: 'JetBrains Mono', 'Fira Code',
                    'Courier New', monospace;
```

#### Font Sizes
```css
/* Headings */
--h1-size: 2.5rem;    /* 40px */
--h2-size: 2rem;      /* 32px */
--h3-size: 1.5rem;    /* 24px */
--h4-size: 1.25rem;   /* 20px */
--h5-size: 1.125rem;  /* 18px */

/* Body */
--text-base: 1rem;    /* 16px */
--text-sm: 0.875rem;  /* 14px */
--text-xs: 0.75rem;   /* 12px */
```

#### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## 2. Layout Structure

### 2.1 Grid System

#### Desktop Layout (≥1280px)
```
┌─────────────────────────────────────────────────────┐
│ Header (full width, 60px height, sticky)           │
├──────────┬──────────────────────────────┬──────────┤
│ Sidebar  │ Main Content                 │ TOC      │
│ 280px    │ max-width: 800px             │ 240px    │
│ sticky   │ padding: 2rem                │ sticky   │
│          │                              │          │
│          │                              │          │
└──────────┴──────────────────────────────┴──────────┘
│ Footer (full width)                                 │
└─────────────────────────────────────────────────────┘
```

#### Tablet Layout (768px - 1279px)
```
┌─────────────────────────────────────────┐
│ Header (60px, sticky)                   │
├──────────┬──────────────────────────────┤
│ Sidebar  │ Main Content                 │
│ 260px    │ flex: 1                      │
│ sticky   │ max-width: none              │
│          │ TOC: top of content          │
└──────────┴──────────────────────────────┘
│ Footer                                  │
└─────────────────────────────────────────┘
```

#### Mobile Layout (<768px)
```
┌───────────────────┐
│ Header (60px)     │
│ + Hamburger Menu  │
├───────────────────┤
│ Main Content      │
│ full width        │
│ padding: 1rem     │
│                   │
│ TOC: inline       │
└───────────────────┘
│ Footer            │
└───────────────────┘
```

### 2.2 Spacing System
```css
/* Consistent spacing scale */
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
```

### 2.3 Component Dimensions

#### Header
- **Height:** 60px (sticky)
- **Background:** `var(--aai-bg-primary)` with subtle border
- **Z-index:** 100
- **Content:** Logo, Nav, Search, Theme Toggle

#### Sidebar
- **Width:** 280px (desktop), 260px (tablet)
- **Position:** Sticky (top: 60px)
- **Scrollable:** Independent scroll
- **Collapsible sections:** Yes

#### Main Content
- **Max-width:** 800px (readable line length)
- **Padding:** 2rem (desktop), 1rem (mobile)
- **Line-height:** 1.7 (optimal readability)

#### Table of Contents (TOC)
- **Width:** 240px (desktop only)
- **Position:** Sticky (top: 80px)
- **Max-height:** calc(100vh - 100px)
- **Scrollable:** Yes

### 2.4 Shadows & Borders
```css
/* Elevation system */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

/* Borders */
--border-radius-sm: 0.25rem;  /* 4px */
--border-radius-md: 0.5rem;   /* 8px */
--border-radius-lg: 0.75rem;  /* 12px */
```

---

## 3. Page Types & Layouts

### 3.1 Landing/Index Pages (Card Layout)
**Examples:** Homepage, Category overview pages (e.g., `/asthma`, `/food-allergies`)

**Features:**
- Hero section with title and description
- **Card grid** for navigation to subtopics
- 2-column layout (desktop), 1-column (mobile)
- Cards with icon, title, description, link

**Card Component Spec:**
```tsx
<Card>
  <CardIcon>{icon}</CardIcon>
  <CardTitle>Topic Title</CardTitle>
  <CardDescription>Brief description...</CardDescription>
  <CardLink href="/path">Learn more →</CardLink>
</Card>
```

**Visual:**
```
┌─────────────────────────────────────┐
│ Category: Asthma                    │
│ Overview description...             │
├─────────────────┬───────────────────┤
│ 📘 Overview     │ 🚨 Exacerbations  │
│ Basic concepts  │ Emergency mgmt    │
│ Learn more →    │ Learn more →      │
├─────────────────┼───────────────────┤
│ 💊 Medications  │ 📊 Monitoring     │
│ Controller meds │ PFTs & control    │
│ Learn more →    │ Learn more →      │
└─────────────────┴───────────────────┘
```

### 3.2 Article Pages (Traditional MDX)
**Examples:** Individual clinical articles (e.g., `/asthma/acute-exacerbation`)

**Features:**
- Standard MDX content with Markdown
- Table of contents on right (desktop)
- FrontmatterTabs component for resources
- AsideMessage for clinical alerts
- Traditional wiki reading experience

**Layout:**
- Readable line length (800px max)
- Clear heading hierarchy
- Inline images and tables
- Citation footnotes

---

## 4. Search Implementation

### 4.1 Algolia DocSearch
**Selected:** Algolia (premium, powerful search)

**Configuration:**
```js
// docusaurus.config.js
themeConfig: {
  algolia: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_SEARCH_API_KEY',
    indexName: 'aai-wiki',
    contextualSearch: true,
    searchParameters: {},
    searchPagePath: 'search',
  },
}
```

**Features Required:**
- ✅ Keyboard shortcut (Cmd+K / Ctrl+K)
- ✅ Search highlighting in results
- ✅ Category filtering (by topic area)
- ✅ Recent searches
- ✅ Mobile-friendly search modal

**Indexing Strategy:**
- Index all MDX content
- Prioritize headings and frontmatter
- Include metadata (tags, categories)
- Update index on deployment

### 4.2 Search UI
- **Location:** Header (prominent)
- **Placeholder:** "Search clinical topics..."
- **Icon:** Magnifying glass (Lucide Search icon)
- **Modal:** Full-screen overlay on mobile, centered modal on desktop

---

## 5. Announcement Bar System

### 5.1 Site-Wide Announcement Bar
**Use cases:**
- Critical clinical updates
- Guideline changes (e.g., "New GINA 2024 guidelines published")
- Site maintenance notices
- Community announcements

**Configuration:**
```js
// docusaurus.config.js
themeConfig: {
  announcementBar: {
    id: 'guideline_update_2024',  // Change to reset dismissal
    content: '🎉 <strong>New GINA 2024 guidelines</strong> now available. <a href="/asthma/guidelines-2024">Read more</a>',
    backgroundColor: '#0891b2',
    textColor: '#ffffff',
    isCloseable: true,
  },
}
```

**Features:**
- Dismissible (persists in localStorage)
- Sticky at top (above header)
- Supports HTML/links
- Configurable colors per announcement type

### 5.2 Per-Page Alert Bars
**Use cases:**
- Page-specific warnings (e.g., "This article is under review")
- Related content alerts
- Recall notices for specific medications

**Implementation:**
Use existing **AsideMessage** component at top of MDX:

```mdx
---
title: 'Epinephrine Auto-Injectors'
---

<AsideMessage type="warning">
  **Recall Notice:** Certain lots of EpiPen recalled in November 2024.
  [View details](#recall-info)
</AsideMessage>

## Overview
...
```

**AsideMessage Types:**
- `type="note"` - Blue (informational)
- `type="warning"` - Amber (caution)
- `type="critical"` - Red (urgent)
- `type="recall"` - Purple (product recalls)

---

## 6. Responsive Design

### 6.1 Breakpoints
```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small desktops */
--breakpoint-xl: 1280px;  /* Large desktops */
--breakpoint-2xl: 1536px; /* Extra large */
```

### 6.2 Mobile Optimizations
- **Hamburger menu:** For main navigation
- **Collapsible TOC:** Inline, above content
- **Touch-friendly:** 44px minimum tap targets
- **Reduced spacing:** Smaller padding/margins
- **Hidden elements:** Hide sidebar nav on mobile
- **Optimized cards:** Single column on mobile

### 6.3 Touch Interactions
- Swipe to open/close sidebar (optional)
- Pull-to-refresh (browser default)
- Tap to expand collapsible sections
- Long-press for context menus (future)

---

## 7. Component Specifications

### 7.1 Card Component (for Landing Pages)
```tsx
// src/components/Card.tsx
interface CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href: string;
  badge?: string;  // "New", "Updated", etc.
}
```

**Visual Design:**
- Background: `var(--aai-bg-primary)`
- Border: `1px solid var(--aai-border)`
- Border radius: `var(--border-radius-lg)`
- Padding: `1.5rem`
- Hover: Lift effect (shadow-md)
- Transition: 200ms ease

### 7.2 FrontmatterTabs Component
**Purpose:** Display resources at top of articles

**Tabs:**
- Guidelines
- Articles
- Videos
- Podcasts
- For Patients
- Contributors

**Design:**
- Horizontal tabs (desktop)
- Dropdown selector (mobile)
- Active tab: Primary color underline
- Tab content: List of links with icons

### 7.3 AsideMessage Component
**Already defined in COMPONENT_MIGRATION.md**

**Enhancement for announcements:**
- Add `dismissible` prop (optional)
- Persist dismissal in localStorage
- Add icon variants per type

---

## 8. Accessibility Requirements

### 8.1 WCAG 2.1 AA Compliance
- ✅ Color contrast ≥4.5:1 (text)
- ✅ Color contrast ≥3:1 (UI components)
- ✅ Keyboard navigation (Tab, Enter, Esc)
- ✅ Screen reader support (ARIA labels)
- ✅ Skip-to-content link
- ✅ Focus indicators (visible outlines)

### 8.2 Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- `<nav>`, `<main>`, `<article>`, `<aside>` tags
- Alt text for all images
- `aria-label` for icon-only buttons

---

## 9. Performance Requirements

### 9.1 Metrics
- **First Contentful Paint (FCP):** <1.5s
- **Time to Interactive (TTI):** <3.0s
- **Lighthouse Score:** ≥90 (all categories)
- **Bundle size:** <200KB (initial load)

### 9.2 Optimizations
- Code splitting (per route)
- Image optimization (WebP, lazy loading)
- Font subsetting (Inter variable font)
- CSS minification
- Tree-shaking (remove unused code)

---

## 10. Browser Support

### 10.1 Supported Browsers
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android 8+)

### 10.2 Graceful Degradation
- Progressive enhancement
- Fallbacks for CSS custom properties (PostCSS)
- Polyfills for older browsers (if needed)

---

## 11. Docusaurus Plugins Required

### 11.1 Core Plugins
- `@docusaurus/preset-classic` (included)
- `@docusaurus/plugin-content-docs`
- `@docusaurus/plugin-content-pages`
- `@docusaurus/theme-classic`

### 11.2 Additional Plugins
- `@docusaurus/plugin-google-gtag` (analytics)
- `@docusaurus/plugin-sitemap` (SEO)
- `docusaurus-plugin-sass` (if using SCSS)

### 11.3 Optional Enhancements
- `@docusaurus/plugin-pwa` (offline support)
- `@docusaurus/plugin-ideal-image` (image optimization)
- `docusaurus-plugin-image-zoom` (click to zoom images)

---

## 12. Implementation Checklist

### Phase 1: Base Setup
- [ ] Initialize Docusaurus project
- [ ] Configure `docusaurus.config.js`
- [ ] Set up custom CSS variables
- [ ] Implement dark mode toggle
- [ ] Configure Algolia search

### Phase 2: Layout
- [ ] Customize header layout
- [ ] Configure sidebar navigation
- [ ] Set up responsive breakpoints
- [ ] Test mobile/tablet/desktop views

### Phase 3: Components
- [ ] Create Card component
- [ ] Migrate FrontmatterTabs to React
- [ ] Migrate AsideMessage to React
- [ ] Test components in MDX

### Phase 4: Content
- [ ] Set up announcement bar
- [ ] Create landing page templates
- [ ] Create article page templates
- [ ] Test with sample content

### Phase 5: Polish
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile testing

---

## 13. Future Enhancements

### 13.1 v2.0 Features
- Versioning (guideline versions by year)
- Multi-language support (i18n)
- Advanced search filters (by date, author, topic)
- User accounts (saved searches, bookmarks)

### 13.2 Interactive Features
- Dosing calculators (BMI-based, weight-based)
- Interactive flowcharts (decision trees)
- Severity assessment tools
- Patient education material generator

---

**Document Version:** 1.0
**Last Updated:** 2024-11-23
**Status:** Planning Phase
**Next Step:** Review and approve technical requirements
