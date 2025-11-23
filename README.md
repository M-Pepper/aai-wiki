# AAI Wiki - Planning Documentation

## Project Overview

This is the planning repository for the **Allergy, Asthma, and Immunology (AAI) Wiki** - a community-driven clinical reference for AAI healthcare professionals.

**Inspired by:** [kidney.wiki](https://kidney.wiki)
**Framework:** Docusaurus v3 (React, TypeScript)
**Hosting:** Cloudflare Pages (free static hosting)

## Current Status

🟢 **Implementation Phase** - Core site built and running locally

## Documentation

This repository contains comprehensive planning documents:

1. **[PLANNING.md](./PLANNING.md)** - Complete project plan
   - Content categories for AAI topics
   - Frontmatter schema design
   - Navigation structure
   - Technical implementation phases
   - Writer workflow documentation

2. **[COMPONENT_MIGRATION.md](./COMPONENT_MIGRATION.md)** - Component migration guide
   - Vue to React component conversions
   - FrontmatterTabs implementation
   - AsideMessage implementation
   - Usage examples in MDX
   - Testing strategy

3. **[BRANDING.md](./BRANDING.md)** - Visual identity and brand guidelines
   - Color palette options
   - Typography recommendations
   - Logo concepts
   - UI component specifications
   - Accessibility requirements
   - Brand voice and tone

## Quick Start

### Prerequisites
```bash
# Node.js 18+ required
node --version  # v22.20.0 (currently installed)
npm --version   # 10.9.3 (currently installed)
```

### Local Development
```bash
# Navigate to the website directory
cd /home/mckenzie.a.pepper@internal.pepperlabs.org/Documents/aai-wiki/website

# Install dependencies (already done)
npm install

# Start development server
npm start
# Opens http://localhost:3000 with hot-reload

# Build for production
npm run build

# Test production build locally
npm run serve
```

### Deployment to Cloudflare Pages
```bash
# Login to Cloudflare (first time only)
npx wrangler login

# Deploy to Cloudflare Pages
npx wrangler pages deploy build --project-name aai-wiki
```

## Project Structure

```
aai-wiki/
├── website/                       # Docusaurus site (CURRENT LOCATION)
│   ├── docs/                      # Content directory
│   │   ├── intro.mdx             # Homepage (docs-only mode)
│   │   ├── contributing.mdx      # Contributing guide
│   │   ├── asthma/
│   │   │   ├── index.mdx         # Asthma overview
│   │   │   └── acute-exacerbation-simple.mdx
│   │   ├── allergies/
│   │   │   └── index.mdx
│   │   └── anaphylaxis/
│   │       └── index.mdx
│   ├── src/
│   │   ├── components/
│   │   │   ├── AsideMessage.tsx      # Alert boxes (✅ Implemented)
│   │   │   ├── FrontmatterTabs.tsx   # Resource tabs (✅ Implemented)
│   │   │   └── Card.tsx              # Card tiles (✅ Implemented)
│   │   └── css/
│   │       └── custom.css            # Professional Medical theme
│   ├── static/                       # Static assets
│   │   └── img/
│   ├── docusaurus.config.ts          # Main configuration (TypeScript)
│   ├── sidebars.ts                   # Sidebar navigation
│   ├── package.json
│   └── .docusaurus/                  # Build cache (gitignored)
├── PLANNING.md
├── CONTRIBUTING.md
├── BRANDING.md
├── COMPONENT_MIGRATION.md
├── TECHNICAL_REQUIREMENTS.md
├── MOCKUPS.md
├── DEPLOYMENT.md
├── STYLE_GUIDE.md
└── README.md                          # This file
```

## Key Design Decisions

### Why Docusaurus?
- ✅ Purpose-built for documentation
- ✅ Large community and ecosystem
- ✅ Excellent MDX support
- ✅ Built-in search, versioning, i18n
- ✅ React-based (easier to find contributors)
- ✅ Static site generation (works on Cloudflare Pages)

### Implementation Approach
- ✅ **Docs-only mode**: Homepage is `/docs/intro.mdx` with sidebar always visible
- ✅ **TypeScript**: All config and components use TypeScript for type safety
- ✅ **No TailwindCSS**: Using CSS custom properties instead for simpler maintenance
- ✅ **Professional Medical theme**: Cyan-based color palette (#0891b2 primary)

### Content Strategy
**Frontmatter-driven resource tabs:**
- Guidelines (GINA, PRACTALL, etc.)
- Research articles
- Videos
- Podcasts
- Patient education materials
- Contributors/reviewers

**Organized by clinical topic:**
- Asthma
- Food allergies
- Anaphylaxis
- Atopic dermatitis
- And more...

## Technical Writer Workflow

### Creating New Content

1. **Create MDX file**
   ```bash
   # Example: docs/asthma/acute-exacerbation.mdx
   ```

2. **Add frontmatter**
   ```yaml
   ---
   title: 'Acute Asthma Exacerbation'
   description: 'Emergency management of acute asthma'
   draft: false
   tabData:
     - id: guidelines
       links:
         - name: 'GINA Acute Asthma Management'
           link: 'https://...'
           isOpenAccess: true
   ---
   ```

3. **Write content**
   ```markdown
   import AsideMessage from '@site/src/components/AsideMessage';

   ## Overview

   <AsideMessage type="warning">
     Always assess severity immediately.
   </AsideMessage>

   ## Management
   ...
   ```

4. **Push to repository**
   ```bash
   git add .
   git commit -m "Add acute asthma exacerbation article"
   git push
   ```

5. **Auto-deploy** via Cloudflare Pages

## Implementation Progress

### Phase 1: Setup ✅
- ✅ Install Node.js v22.20.0
- ✅ Initialize Docusaurus project with TypeScript
- ✅ Install dependencies (@headlessui/react, lucide-react, clsx, wrangler)
- ✅ Set up folder structure

### Phase 2: Core Components ✅
- ✅ Create AsideMessage component (note, warning, critical, recall)
- ✅ Create FrontmatterTabs component (resource links with tabs)
- ✅ Create Card component (tile layouts for landing pages)
- ✅ Test components with sample content
- ✅ Document component usage

### Phase 3: Content & Design ✅
- ✅ Implement Professional Medical color palette (Cyan #0891b2)
- ✅ Configure docusaurus.config.ts (docs-only mode)
- ✅ Set up navigation structure (sidebar with emoji categories)
- ✅ Create homepage with gradient banner and card tiles
- ⏳ Create logo/branding assets (placeholder)

### Phase 4: Sample Content ✅
- ✅ Create intro.mdx homepage
- ✅ Create contributing.mdx guide
- ✅ Create asthma/acute-exacerbation-simple.mdx sample article
- ✅ Create category index pages (asthma, allergies, anaphylaxis)
- ⏳ Write additional sample articles

### Phase 5: Deployment ⏳
- ⏳ Create GitHub repository
- ⏳ Push initial content
- ⏳ Set up Cloudflare Pages (wrangler installed, ready to deploy)
- ⏳ Configure custom domain
- ⏳ Test deployment

### Phase 6: Launch Prep ⏳
- ⏳ Beta test with select users
- ✅ Create contribution guidelines
- ⏳ Finalize style guide for contributors
- ⏳ Set up feedback mechanism
- ⏳ Configure Algolia search

## Resources

### Docusaurus Documentation
- [Official Docs](https://docusaurus.io/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Deployment Guide](https://docusaurus.io/docs/deployment)

### Component Libraries
- [Headless UI (React)](https://headlessui.com/)
- [Lucide Icons](https://lucide.dev/)
- [TailwindCSS](https://tailwindcss.com/)

### Cloudflare Pages
- [Getting Started](https://developers.cloudflare.com/pages/)
- [Framework Guides](https://developers.cloudflare.com/pages/framework-guides/)

### Inspiration
- [kidney.wiki](https://kidney.wiki) - Original inspiration
- [Nextra](https://nextra.site/) - Alternative docs framework
- [Docusaurus Showcase](https://docusaurus.io/showcase) - Real-world examples

## Comparison: Kidney Wiki vs AAI Wiki

| Feature | Kidney Wiki | AAI Wiki |
|---------|-------------|----------|
| **Framework** | Astro + Vue | Docusaurus + React |
| **Focus** | Nephrology | Allergy/Asthma/Immunology |
| **Calculators** | Many (GFR, dialysis, etc.) | Few or none initially |
| **Content Tabs** | Yes (Vue component) | Yes (React component) |
| **Dark Mode** | Yes | Yes (planned) |
| **Search** | Lunr.js | Algolia or local search |
| **Mobile** | Responsive | Responsive (planned) |
| **Deployment** | Netlify (assumed) | Cloudflare Pages |

## Key Questions to Answer

Before starting implementation:

1. **Domain name:** What will the URL be?
   - Options in BRANDING.md
   - Purchase before launch

2. **Color scheme:** Which palette?
   - See BRANDING.md for 3 options
   - Professional Medical (Option 3) recommended

3. **Content priorities:** What topics first?
   - Asthma (most common)
   - Anaphylaxis (critical)
   - Food allergies (common)
   - Others?

4. **Contributors:** Who will write content?
   - Solo project initially?
   - Invite colleagues?
   - Open to community?

5. **Licensing:** Content license?
   - Creative Commons?
   - All rights reserved?
   - Open source?

## Contact & Collaboration

This is a planning repository. Implementation will begin after:
1. Node.js environment is set up
2. Key design decisions are finalized
3. Initial content outline is approved

## License

Planning documents: MIT License (or your choice)
Future content license: TBD

---

**Created:** 2024-11-23
**Last Updated:** 2025-11-23
**Status:** Implementation Phase - Core site functional
**Next Milestone:** Deploy to Cloudflare Pages and set up GitHub repository
