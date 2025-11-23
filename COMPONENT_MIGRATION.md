# Component Migration Guide: Vue → React

## Overview
This document shows how to migrate the key kidney wiki Vue components to React for Docusaurus.

## 1. FrontmatterTabs Component

### Current Vue Implementation
File: `kidney-wiki-fork/src/components/FrontmatterTabs.vue`

**Key Features:**
- Tab-based interface using Headless UI
- Dynamic icon rendering based on tab ID
- Support for links with metadata (openAccess, isAdult, etc.)
- Icons from multiple libraries (Lucide, Heroicons, custom)

### React Migration

**Dependencies needed:**
```json
{
  "@headlessui/react": "^1.7.18",
  "lucide-react": "^0.309.0",
  "@heroicons/react": "^2.1.1",
  "clsx": "^2.1.0"
}
```

**Proposed React component:**

```tsx
// src/components/FrontmatterTabs.tsx
import React from 'react';
import { Tab } from '@headlessui/react';
import {
  ExternalLink,
  Users,
  ListChecks,
  FileText,
  Mic,
  Edit,
  PlayCircle,
  Cross,
  ListPlus,
} from 'lucide-react';
import { CalculatorIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface TabLink {
  name: string;
  link?: string;
  notes?: string;
  isAdult?: boolean;
  isOpenAccess?: boolean;
}

interface TabDataItem {
  id: string;
  links: TabLink[];
}

interface FrontmatterTabsProps {
  content: TabDataItem[];
  defaultTab?: string | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  related: Users,
  calculators: CalculatorIcon,
  links: ExternalLink,
  guidelines: ListChecks,
  articles: FileText,
  videos: PlayCircle,
  podcasts: Mic,
  slides: PlayCircle,
  noteTemplates: ListPlus,
  forPatients: Cross,
  contributors: Edit,
};

const getIcon = (id: string) => iconMap[id] || ExternalLink;

const getName = (id: string) => {
  const normalCase = id.replace(/([A-Z])/g, (letter) => ' ' + letter.toLowerCase()).trim();
  return normalCase.charAt(0).toUpperCase() + normalCase.slice(1);
};

export default function FrontmatterTabs({ content, defaultTab = null }: FrontmatterTabsProps) {
  const defaultIndex = defaultTab === null ? 0 : content.findIndex((tab) => tab.id === defaultTab);

  return (
    <div className="mb-4 mt-8">
      <div className="w-full px-2 sm:px-0">
        <Tab.Group defaultIndex={defaultIndex}>
          <Tab.List className="flex space-x-4 overflow-x-auto rounded-xl bg-sky-200/40 p-1 dark:bg-sky-300/20">
            {content.map((topic) => {
              const Icon = getIcon(topic.id);
              return (
                <Tab
                  key={topic.id}
                  className={({ selected }) =>
                    clsx(
                      'inline-flex w-full items-center justify-center rounded-lg px-2 py-2.5 text-sm font-medium leading-5 xl:whitespace-nowrap',
                      'ring-sky/60 ring-offset-2 ring-offset-sky-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-sky-700/[0.15] text-sky-700 shadow dark:bg-sky-300'
                        : 'text-slate-700 transition duration-500 hover:bg-sky-700/[0.1] hover:text-sky-900 dark:text-sky-100 dark:hover:bg-white/[0.12] dark:hover:text-white'
                    )
                  }
                >
                  <Icon className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {getName(topic.id)}
                </Tab>
              );
            })}
          </Tab.List>

          <Tab.Panels className="mt-2">
            {content.map((topic, idx) => (
              <Tab.Panel
                key={idx}
                className="px-3 overflow-auto ring-white/60 ring-offset-2 ring-offset-sky-400 focus:outline-none"
              >
                <ul className="h-[8.1rem] list-disc pl-5 text-sm md:h-[5.6rem]">
                  {topic.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      {link.link ? (
                        <a
                          className="font-medium text-sky-700 underline hover:text-sky-500 focus:text-sky-500 dark:text-sky-600 dark:hover:text-sky-400 dark:focus:text-sky-400"
                          href={link.link}
                        >
                          {link.name}
                        </a>
                      ) : (
                        <span className="font-medium text-sky-700 dark:text-sky-600">{link.name}</span>
                      )}
                      <div className="inline-flex gap-1 pl-1 align-middle">
                        {link.notes}
                        {link.isOpenAccess === true && <span title="Open Access">🔓</span>}
                        {link.isOpenAccess === false && <span title="Closed Access">🔒</span>}
                        {link.isAdult && <span title="Adult content">18+</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
```

## 2. AsideMessage Component

### Current Vue Implementation
File: `kidney-wiki-fork/src/components/AsideMessage.vue`

**Types supported:**
- `note` - Information callout
- `warning` - Warning callout
- `recall` - Recall/reminder box
- `stub` - Indicates incomplete article

### React Migration

```tsx
// src/components/AsideMessage.tsx
import React from 'react';
import { Info, AlertTriangle, Bell, FileText } from 'lucide-react';
import clsx from 'clsx';

interface AsideMessageProps {
  type: 'note' | 'warning' | 'recall' | 'stub';
  children?: React.ReactNode;
}

const config = {
  note: {
    icon: Info,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-900 dark:text-blue-100',
    iconColor: 'text-blue-600 dark:text-blue-400',
    defaultText: 'Note',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
    textColor: 'text-amber-900 dark:text-amber-100',
    iconColor: 'text-amber-600 dark:text-amber-400',
    defaultText: 'Warning',
  },
  recall: {
    icon: Bell,
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    textColor: 'text-purple-900 dark:text-purple-100',
    iconColor: 'text-purple-600 dark:text-purple-400',
    defaultText: 'Recall',
  },
  stub: {
    icon: FileText,
    bgColor: 'bg-slate-50 dark:bg-slate-800/20',
    borderColor: 'border-slate-200 dark:border-slate-700',
    textColor: 'text-slate-900 dark:text-slate-100',
    iconColor: 'text-slate-600 dark:text-slate-400',
    defaultText: 'This article is a stub and needs expansion.',
  },
};

export default function AsideMessage({ type, children }: AsideMessageProps) {
  const { icon: Icon, bgColor, borderColor, textColor, iconColor, defaultText } = config[type];

  return (
    <aside
      className={clsx(
        'my-4 rounded-lg border-l-4 p-4',
        bgColor,
        borderColor,
        textColor
      )}
    >
      <div className="flex items-start">
        <Icon className={clsx('h-5 w-5 flex-shrink-0 mt-0.5 mr-3', iconColor)} />
        <div className="flex-1">
          {children || <p className="font-medium">{defaultText}</p>}
        </div>
      </div>
    </aside>
  );
}
```

## 3. Usage in MDX Files

### Kidney Wiki (Astro/Vue)
```mdx
---
title: 'Example Article'
---
import AsideMessage from '../../../components/AsideMessage.vue';

<AsideMessage type="note">This is an important note.</AsideMessage>
```

### AAI Wiki (Docusaurus/React)
```mdx
---
title: 'Example Article'
---
import AsideMessage from '@site/src/components/AsideMessage';
import FrontmatterTabs from '@site/src/components/FrontmatterTabs';

<AsideMessage type="note">This is an important note.</AsideMessage>

<FrontmatterTabs content={frontMatter.tabData} defaultTab={frontMatter.defaultTab} />
```

## 4. Styling Considerations

### TailwindCSS Setup
Both kidney wiki and Docusaurus support TailwindCSS. Configuration needed:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './docs/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // AAI-specific colors
        'aai-primary': '#...', // To be defined
        'aai-secondary': '#...',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

## 5. Migration Checklist

- [ ] Install React component dependencies
- [ ] Set up TailwindCSS in Docusaurus
- [ ] Create `src/components/FrontmatterTabs.tsx`
- [ ] Create `src/components/AsideMessage.tsx`
- [ ] Test with sample MDX content
- [ ] Document usage for writers
- [ ] Create component storybook/examples (optional)

## 6. Testing Strategy

Create test MDX files for each component:

```mdx
// docs/examples/component-showcase.mdx
---
title: Component Showcase
tabData:
  - id: guidelines
    links:
      - name: Test Guideline
        link: https://example.com
        isOpenAccess: true
---

import AsideMessage from '@site/src/components/AsideMessage';
import FrontmatterTabs from '@site/src/components/FrontmatterTabs';

## AsideMessage Examples

<AsideMessage type="note">
  This is a note callout.
</AsideMessage>

<AsideMessage type="warning">
  This is a warning callout.
</AsideMessage>

<AsideMessage type="recall">
  Remember this important point!
</AsideMessage>

<AsideMessage type="stub" />

## FrontmatterTabs Example

<FrontmatterTabs content={frontMatter.tabData} />
```

## 7. Differences from Vue Version

### Simplified Icon Handling
- Remove dependency on `unplugin-icons`
- Use standard icon libraries (Lucide, Heroicons)
- Simpler import/export pattern

### TypeScript Support
- Full TypeScript definitions
- Better IDE autocomplete
- Type-safe props

### Docusaurus Integration
- Use `@site/` alias for imports
- Access frontmatter via `frontMatter` object in MDX
- Better MDX v3 support
