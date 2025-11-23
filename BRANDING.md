# AAI Wiki Branding Guidelines

## Brand Identity

### Mission Statement
To provide evidence-based, accessible clinical information for allergy, asthma, and immunology healthcare professionals.

### Target Audience
- Allergists/Immunologists
- Pediatricians managing allergic conditions
- Fellows in training
- Medical students and residents
- Advanced practice providers (NPs, PAs)

## Visual Identity

### Color Palette Options

#### Option 1: Respiratory/Lung Theme
Emphasizes the pulmonary aspect of allergy and asthma.

**Primary Colors:**
- `#2563eb` - Blue 600 (primary action color)
- `#0ea5e9` - Sky 500 (accent, links)
- `#10b981` - Emerald 500 (success, healthy lungs)

**Secondary Colors:**
- `#64748b` - Slate 500 (text, neutral)
- `#f1f5f9` - Slate 100 (light background)
- `#0f172a` - Slate 900 (dark background)

**Usage:**
```css
:root {
  --aai-primary: #2563eb;
  --aai-primary-light: #60a5fa;
  --aai-primary-dark: #1e40af;
  --aai-accent: #0ea5e9;
  --aai-success: #10b981;
}
```

#### Option 2: Allergy/Warm Theme
Warmer palette suggesting care and attention.

**Primary Colors:**
- `#f59e0b` - Amber 500 (primary)
- `#ef4444` - Red 500 (alerts, anaphylaxis)
- `#06b6d4` - Cyan 500 (accent)

**Secondary Colors:**
- `#64748b` - Slate 500 (text)
- `#fef3c7` - Amber 100 (light background)
- `#1e293b` - Slate 800 (dark background)

#### Option 3: Professional Medical (Recommended)
Clean, trustworthy, professional palette.

**Primary Colors:**
- `#0891b2` - Cyan 600 (primary)
- `#0369a1` - Sky 700 (secondary)
- `#059669` - Emerald 600 (success)

**Accent Colors:**
- `#f59e0b` - Amber 500 (warnings)
- `#dc2626` - Red 600 (critical alerts)
- `#8b5cf6` - Violet 500 (special features)

**Neutral Colors:**
- `#1e293b` - Slate 800 (dark text)
- `#64748b` - Slate 500 (muted text)
- `#f8fafc` - Slate 50 (light background)
- `#0f172a` - Slate 900 (dark mode background)

**CSS Variables:**
```css
:root {
  --aai-primary: #0891b2;
  --aai-primary-light: #06b6d4;
  --aai-primary-dark: #0e7490;
  --aai-secondary: #0369a1;
  --aai-success: #059669;
  --aai-warning: #f59e0b;
  --aai-danger: #dc2626;
  --aai-accent: #8b5cf6;
}

.dark {
  --aai-bg: #0f172a;
  --aai-text: #e2e8f0;
}
```

### Typography

#### Heading Font
**Inter** (sans-serif)
- Clean, modern, highly legible
- Excellent for medical content
- Wide range of weights
- Already used in kidney.wiki

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

#### Body Font
**Inter** (consistency across all text)

#### Code/Monospace Font
**JetBrains Mono** or **Fira Code**
- For dosing calculations, medication names
- Clear distinction between regular text and technical content

### Logo Concepts

#### Option 1: Text-Based Logo
```
AAI Wiki
Allergy • Asthma • Immunology
```
- Clean wordmark
- Medical bullet separators
- Professional typography

#### Option 2: Icon + Text
Potential icon elements:
- Stylized antibody (Y-shape)
- Lungs outline
- Allergen particle
- Stethoscope

#### Option 3: Abbreviation Focus
```
AAI
WIKI
```
- Bold, stacked letters
- Minimal, modern
- Memorable

### Dark Mode

Support both light and dark themes:

**Light Mode:**
- Background: `#ffffff` or `#f8fafc`
- Text: `#1e293b`
- Cards: `#ffffff` with subtle shadow

**Dark Mode:**
- Background: `#0f172a`
- Text: `#e2e8f0`
- Cards: `#1e293b` with subtle border

## UI Components

### Article Cards
```
┌─────────────────────────────────┐
│ [Icon] Article Title           │
│                                 │
│ Brief description of the        │
│ article content...              │
│                                 │
│ [Guidelines] [Articles] [Videos]│
└─────────────────────────────────┘
```

### Alert Boxes (AsideMessage)

**Note (Blue):**
- Background: Light blue tint
- Border: Blue left border (4px)
- Icon: Info circle

**Warning (Amber):**
- Background: Light amber tint
- Border: Amber left border (4px)
- Icon: Warning triangle

**Critical (Red):**
- Background: Light red tint
- Border: Red left border (4px)
- Icon: Alert octagon

**Recall (Purple):**
- Background: Light purple tint
- Border: Purple left border (4px)
- Icon: Bell

### Navigation

**Sidebar:**
- Collapsible categories
- Active state highlighting
- Breadcrumb trail
- Search prominently placed

**Mobile:**
- Hamburger menu
- Bottom navigation (optional)
- Sticky search

## Content Style

### Article Headers
```markdown
# Asthma: Overview
Brief description of asthma management in pediatric patients

[Guidelines] [Articles] [Videos] [For Patients]
```

### Severity Classifications
Use color-coded tables or cards:
- **Mild**: Green
- **Moderate**: Amber
- **Severe**: Red

### Drug Dosing Tables
- Clear, scannable layout
- Age-based or weight-based groupings
- Units clearly marked
- Reference citations inline

## Iconography

### Icon Library
**Lucide React** (recommended)
- Clean, consistent
- Medical-appropriate
- 1,000+ icons
- Tree-shakeable

### Custom Icons Needed
- Inhaler
- Epinephrine auto-injector
- Allergen symbols (peanut, tree nut, shellfish, etc.)
- Immunoglobulin molecules
- Skin testing

### Icon Style
- Outline style (not filled)
- 24x24px or 20x20px base size
- 2px stroke width
- Rounded line caps

## Imagery

### Photos
- Avoid stock photos with obvious staging
- Use authentic clinical images (with permission)
- Diversity in representation
- Professional quality

### Diagrams
- Clean, minimal design
- Consistent color usage
- Clear labels
- SVG format for scalability

### Illustrations
- Medical illustrations for:
  - Anatomy (respiratory system, skin layers)
  - Pathophysiology (IgE response, mast cell degranulation)
  - Procedures (skin testing, spirometry)

## Accessibility

### WCAG 2.1 AA Compliance
- Color contrast ratios ≥ 4.5:1 for text
- Color contrast ratios ≥ 3:1 for UI components
- Don't rely on color alone for information
- Keyboard navigation support
- Screen reader compatibility

### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- Meaningful link text
- Alt text for images
- ARIA labels where appropriate

## Brand Voice

### Tone
- **Professional** but approachable
- **Evidence-based** with clear citations
- **Practical** with actionable guidance
- **Concise** without sacrificing clarity

### Writing Style
- Active voice preferred
- Present tense for current guidelines
- Bullet points for scannability
- Tables for comparisons
- Clear section headers

### Terminology
- Use standard medical terminology
- Define abbreviations on first use
- Provide hover definitions for complex terms
- Link to related articles

## Domain Name Suggestions

- `aai.wiki`
- `aairefs.com`
- `allergyimm.wiki`
- `aaaiwiki.com`
- `immunologyref.com`
- `allergyatlas.wiki`

## Tagline Options

1. "Evidence-based AAI clinical reference"
2. "Your go-to resource for allergy and immunology"
3. "Clinical guidance for allergists and immunologists"
4. "Practical AAI knowledge at your fingertips"
5. "Modern clinical reference for AAI providers"

## Social Media Presence (Future)

### Platforms
- Twitter/X: Quick updates, new articles
- LinkedIn: Professional networking
- Instagram: Visual education (infographics)

### Hashtags
- #AAIwiki
- #AllergyEducation
- #AsthmaManagement
- #Immunology
- #MedEd

## Launch Considerations

### Beta Testing
- Private launch to select AAI community
- Gather feedback on usability
- Refine content based on user needs

### Community Building
- Encourage contributions from experts
- Credit all contributors
- Regular updates and new content
- Newsletter for updates (optional)
