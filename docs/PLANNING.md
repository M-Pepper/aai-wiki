# AAI Wiki Planning & Analysis

## Project Overview
Creating an Allergy, Asthma, and Immunology (AAI) wiki based on the kidney.wiki structure, migrating from Astro to Docusaurus.

## Content Categories for AAI Wiki

Based on kidney wiki structure, proposed AAI categories:

### Clinical Topics
- **asthma/** - Asthma management, severity classifications, exacerbations
- **allergic-rhinitis/** - Allergic rhinitis, hay fever, environmental allergies
- **food-allergies/** - Food allergies, oral immunotherapy, food challenges
- **anaphylaxis/** - Anaphylaxis recognition and management
- **atopic-dermatitis/** - Eczema, atopic dermatitis management
- **urticaria-angioedema/** - Hives and angioedema
- **drug-allergies/** - Drug hypersensitivity, desensitization protocols
- **immunodeficiency/** - Primary and secondary immunodeficiencies
- **eosinophilic-disorders/** - EoE, EGID, hypereosinophilic syndromes
- **allergy-testing/** - Skin testing, IgE testing, patch testing

### Procedures & Management
- **biologics/** - Omalizumab, dupilumab, mepolizumab, etc.
- **immunotherapy/** - SCIT, SLIT, OIT protocols
- **pulmonary-function/** - Spirometry, PFT interpretation
- **environmental-control/** - Allergen avoidance, home modifications

### Special Populations
- **pediatric-specific/** - Age-specific considerations
- **pregnancy-lactation/** - AAI management in pregnancy

### Resources
- **drug-dosing/** - Medication dosing guides
- **educational-resources/** - Professional education, conferences
- **other-resources/** - Career resources, research tools

## Frontmatter Schema

### Standard Article Structure
```yaml
---
title: 'Article Title'
description: 'Brief description for SEO and preview'
draft: false  # Docusaurus standard
tags: ['asthma', 'pediatric']  # Optional tags
tabData:
- id: guidelines
  links:
  - name: 'Guideline name'
    link: 'https://...'
    isOpenAccess: true
- id: articles
  links:
  - name: 'Article name'
    link: 'https://...'
    isOpenAccess: false
- id: videos
  links:
  - name: 'Video title'
    link: 'https://youtube.com/...'
- id: podcasts
  links:
  - name: 'Podcast episode'
    link: 'https://...'
- id: forPatients
  links:
  - name: 'Patient education resource'
    link: 'https://...'
- id: contributors
  links:
  - name: 'Author(s):'
    notes: 'Name, MD'
  - name: 'Reviewed by:'
    notes: 'Community reviewed'
  - name: 'Last updated:'
    notes: '2024-11-23'
---
```

### Tab Types for AAI Wiki
- **guidelines** - Practice guidelines (GINA, PRACTALL, AAAAI/ACAAI)
- **articles** - Research articles and reviews
- **videos** - Educational videos
- **podcasts** - Relevant podcast episodes
- **calculators** - Clinical calculators (if needed)
- **related** - Related wiki articles
- **forPatients** - Patient education materials
- **contributors** - Author and review information

## Components to Migrate (Vue → React)

### Priority 1: Core Components
1. **FrontmatterTabs** - Tab interface for resources
   - Currently: `src/components/FrontmatterTabs.vue`
   - Migrate to: `src/components/FrontmatterTabs.tsx`
   - Uses Headless UI tabs
   - Displays guidelines, articles, videos, podcasts, etc.

2. **AsideMessage** - Alert/info boxes
   - Currently: `src/components/AsideMessage.vue`
   - Migrate to: `src/components/AsideMessage.tsx`
   - Types: note, warning, recall, stub

### Priority 2: Optional Components
3. **WordPopover** - Hover definitions
   - Currently: `src/components/WordPopover.vue`
   - Consider if needed for AAI wiki

4. **TableStandard** - Data tables
   - Currently: `src/components/TableStandard.vue`
   - May need for drug dosing, severity classifications

### Not Needed for AAI
- Calculator components (specific to nephrology)
- Flowchart components (unless creating AAI-specific ones)
- RSS/podcast reader (unless planning similar features)

## Design & Branding

### Color Scheme Suggestions
Current kidney wiki uses:
- Primary: `#1e6c93` (kidney blue)
- Light: `#a5c4d4`

AAI wiki could use:
- **Lung/respiratory theme**: Blues, light greens
- **Allergy theme**: Warm oranges, soft yellows
- **Professional medical**: Navy, teal, professional grays

### Typography
- Keep Inter font (clean, professional, accessible)
- Consider adding a medical-friendly heading font

## Technical Implementation Plan

### Phase 1: Setup (Complete after Node.js available)
- [ ] Install Node.js 18+
- [ ] Run `npx create-docusaurus@latest aai-wiki classic --typescript`
- [ ] Install dependencies: `@headlessui/react`, `lucide-react`, etc.

### Phase 2: Core Configuration
- [ ] Configure `docusaurus.config.js`
  - Site title, tagline, URL
  - Navbar structure
  - Footer links
- [ ] Set up content structure in `docs/`
- [ ] Configure sidebar categories

### Phase 3: Component Migration
- [ ] Create `FrontmatterTabs.tsx` in React
- [ ] Create `AsideMessage.tsx` in React
- [ ] Test components with sample content

### Phase 4: Content Template
- [ ] Create article templates
- [ ] Document writer workflow
- [ ] Create style guide for contributors

### Phase 5: Deployment
- [ ] Test build locally
- [ ] Set up GitHub repository
- [ ] Configure Cloudflare Pages
- [ ] Set up custom domain (if applicable)

## Writer Workflow (Post-Setup)

1. Create new MDX file: `docs/[category]/[topic].mdx`
2. Add frontmatter with title, description, tabData
3. Write content in Markdown
4. Add imports for React components if needed:
   ```jsx
   import AsideMessage from '@site/src/components/AsideMessage';
   import FrontmatterTabs from '@site/src/components/FrontmatterTabs';
   ```
5. Push to repository
6. Auto-deploy via Cloudflare Pages

## Navigation Structure Draft

```javascript
navbar: {
  items: [
    { to: '/docs/intro', label: 'Getting Started' },
    {
      label: 'Clinical Topics',
      items: [
        { label: 'Asthma', to: '/docs/asthma' },
        { label: 'Food Allergies', to: '/docs/food-allergies' },
        { label: 'Anaphylaxis', to: '/docs/anaphylaxis' },
        // ...
      ]
    },
    {
      label: 'Procedures',
      items: [
        { label: 'Biologics', to: '/docs/biologics' },
        { label: 'Immunotherapy', to: '/docs/immunotherapy' },
        // ...
      ]
    },
    { to: '/docs/resources', label: 'Resources' },
  ]
}
```

## Next Steps

1. Install Node.js on your system
2. Initialize Docusaurus project
3. Create sample content to test workflow
4. Migrate FrontmatterTabs component
5. Define final content categories with AAI experts
6. Establish contribution guidelines
