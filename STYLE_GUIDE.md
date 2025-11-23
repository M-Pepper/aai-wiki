# AAI Wiki Style Guide

This guide helps writers create clear, consistent, evidence-based content for the AAI Wiki.

## 🎯 Writing Philosophy

**Goal:** Provide practical, evidence-based clinical guidance that busy healthcare professionals can quickly scan and apply.

**Principles:**
- **Actionable** over theoretical
- **Concise** over comprehensive
- **Current** over exhaustive
- **Practical** over academic
- **Scannable** over narrative

## 📝 Tone and Voice

### Voice: Professional but Approachable

**We are:**
- Professional and authoritative
- Evidence-based and current
- Practical and actionable
- Clear and concise

**We are NOT:**
- Overly academic or theoretical
- Promotional or biased
- Vague or wishy-washy
- Condescending or patronizing

### Active Voice Preferred

✅ **Good:** "Administer albuterol 2.5 mg via nebulizer"
❌ **Avoid:** "Albuterol 2.5 mg should be administered via nebulizer"

✅ **Good:** "GINA 2024 recommends ICS as first-line treatment"
❌ **Avoid:** "ICS is recommended by GINA 2024 as first-line treatment"

### Present Tense for Guidelines

✅ **Good:** "Current guidelines recommend..."
❌ **Avoid:** "Guidelines have recommended..."

### Person and Perspective

- **Second person** for instructions: "Assess the patient's vital signs"
- **Third person** for descriptions: "The patient presents with..."
- **Avoid first person** unless giving editorial context: ~~"We recommend..."~~ → "Guidelines recommend..."

## 📐 Content Structure

### Article Template

```mdx
---
title: '[Condition/Topic Name]'
description: '[One-sentence description for SEO]'
draft: false
tags: ['tag1', 'tag2', 'tag3']
tabData:
  - id: guidelines
    links:
      - name: 'Guideline Name'
        link: 'https://...'
        isOpenAccess: true
---

import AsideMessage from '@site/src/components/AsideMessage';

# [Article Title]

[2-3 sentence introduction providing context and scope]

<AsideMessage type="warning">
  [Critical safety information if applicable]
</AsideMessage>

## Overview

[Brief overview of the condition/topic]

## [Major Section 1]

Content...

### [Subsection]

Content...

## [Major Section 2]

Content...

## References

[If needed - or use inline citations]
```

### Heading Hierarchy

Use semantic heading levels:

- **H1 (`#`)** - Page title (once per page, matches frontmatter title)
- **H2 (`##`)** - Major sections (Assessment, Management, Follow-up)
- **H3 (`###`)** - Subsections (Initial Treatment, Escalation)
- **H4 (`####`)** - Minor headings (rarely needed)

**Never skip levels:** H1 → H2 → H3 (NOT H1 → H3)

### Standard Sections for Clinical Topics

Most articles should include these sections (adapt as needed):

1. **Overview** - What it is, epidemiology, pathophysiology (brief)
2. **Clinical Presentation** - Signs, symptoms, triggers
3. **Diagnosis** - Criteria, testing, differential diagnosis
4. **Classification** - Severity, phenotypes, endotypes
5. **Management** - Treatment approach (stepwise if applicable)
6. **Monitoring** - Follow-up, outcomes, control assessment
7. **Special Populations** - Pediatric, pregnancy, elderly
8. **Complications** - What to watch for
9. **Patient Education** - Key counseling points

**Adapt this structure** to fit the topic - not all sections apply to all articles.

### Length Guidelines

- **Introduction:** 2-3 sentences
- **Section paragraphs:** 3-5 sentences max
- **Total article:** 800-2,000 words (aim for scannable, not exhaustive)
- **Lists:** 3-7 items ideal (break longer lists into categories)

## 🔤 Terminology and Style

### Medical Terminology

- **Use standard medical terminology** (accepted in AAI practice)
- **Define abbreviations on first use:** "Allergic rhinitis (AR)"
- **Spell out on first use in EACH article** (don't assume reader saw other pages)
- **Use the abbreviation consistently after definition**

**Example:**
```markdown
Acute asthma exacerbations (AAE) require rapid assessment. AAE severity
determines treatment intensity.
```

### Drug Names

**Format:** generic (Brand) [class]

✅ **Good:** "albuterol (ProAir, Ventolin) [SABA]"
✅ **Good:** "fluticasone/salmeterol (Advair Diskus) [ICS/LABA]"

**First mention:** Include brand name(s) and class
**Subsequent mentions:** Generic name only

**Capitalization:**
- Generic names: lowercase (albuterol, omalizumab)
- Brand names: capitalize (ProAir, Xolair)

### Dosing Format

**Include:**
- Dose + units
- Route
- Frequency
- Age/weight-based if applicable

✅ **Good:** "Albuterol 2.5-5 mg via nebulizer every 20 minutes for 3 doses"
✅ **Good:** "Prednisone 1-2 mg/kg PO once daily (max 60 mg) for 5 days"
❌ **Avoid:** "Give albuterol as needed" (too vague)

**Use code formatting for doses:**
```markdown
Administer `2.5-5 mg` via nebulizer every 20 minutes.
```

Renders as: Administer `2.5-5 mg` via nebulizer every 20 minutes.

### Units

**Preferred:**
- mg, mcg, g, kg (NOT milligrams, micrograms)
- mL, L (NOT cc)
- mg/kg, mcg/kg/dose
- IU, units

**Spaces:**
- Space between number and unit: `2.5 mg` (NOT `2.5mg`)
- No space for percent: `95%` (NOT `95 %`)

### Numbers

- **Spell out** one through nine: "five studies"
- **Use numerals** for 10 and above: "12 patients"
- **Always use numerals** for doses, ages, vital signs: "3 mg", "2 years old"
- **Use commas** in large numbers: "1,000 patients" (NOT "1000")

### Ages

- **Format:** "[number] years old" or "[number]-year-old [noun]"
  - "The patient is 8 years old"
  - "An 8-year-old child"
  - "Children <5 years old"

### Capitalization

- **Headings:** Sentence case (not Title Case)
  - ✅ "Assessment of asthma severity"
  - ❌ "Assessment of Asthma Severity"

- **Guidelines:** Capitalize official names
  - ✅ "Global Initiative for Asthma (GINA)"
  - ✅ "PRACTALL Guidelines"

## 📊 Tables and Lists

### When to Use Lists

**Bulleted lists** for:
- Items without hierarchy
- Symptoms, signs, differential diagnoses
- Criteria (when order doesn't matter)

**Numbered lists** for:
- Sequential steps (protocols, procedures)
- Hierarchical items (stepwise treatment)
- Ranked items (first-line, second-line)

### List Formatting

**Parallel structure:**

✅ **Good:**
```markdown
Initial assessment includes:
- Vital signs (HR, RR, BP, O2 saturation)
- Peak expiratory flow (if able)
- Work of breathing (accessory muscle use)
- Ability to speak in full sentences
```

❌ **Avoid:**
```markdown
Initial assessment:
- Check vital signs
- Peak flow
- Is the patient using accessory muscles?
- Can they speak?
```
(Inconsistent structure)

**Capitalization in lists:**
- Capitalize first word of each item
- Use periods if items are complete sentences
- No periods for fragments (unless very long or multiple sentences)

### Tables

**Use tables for:**
- Dosing charts (age/weight-based)
- Severity classifications
- Comparing options (medications, approaches)
- Diagnostic criteria

**Table guidelines:**
- **Keep simple** - 3-5 columns max
- **Headers clear** - Self-explanatory
- **Responsive** - Stacks on mobile
- **Aligned** - Left-align text, right-align numbers

**Example:**

```markdown
| Severity | PEF (% predicted) | O2 Sat | Clinical Features |
|----------|-------------------|--------|-------------------|
| Mild     | >70%              | >95%   | Minimal dyspnea   |
| Moderate | 40-70%            | 90-95% | Moderate distress |
| Severe   | <40%              | <90%   | Severe distress   |
```

Renders as:

| Severity | PEF (% predicted) | O2 Sat | Clinical Features |
|----------|-------------------|--------|-------------------|
| Mild     | >70%              | >95%   | Minimal dyspnea   |
| Moderate | 40-70%            | 90-95% | Moderate distress |
| Severe   | <40%              | <90%   | Severe distress   |

## 🎨 Formatting and Markdown

### Emphasis

- **Bold (`**text**`)** for key terms, first mention, emphasis
- *Italic (`*text*`)* for Latin terms, gene names, *in vitro*
- `Code (`text`)` for doses, specific values, technical terms

**Examples:**
- "**IgE-mediated** food allergy"
- "The *in vivo* response differs from *in vitro* findings"
- "Administer `2.5 mg` via nebulizer"

### Links

**Inline links preferred:**

✅ **Good:**
```markdown
According to [GINA 2024](https://ginasthma.org/reports/), ICS is first-line treatment.
```

**Reference-style links** (if many citations):
```markdown
Multiple guidelines support this approach [1, 2, 3].

[1]: https://ginasthma.org/ "GINA 2024"
[2]: https://practall.org/ "PRACTALL"
[3]: https://aaaai.org/ "AAAAI"
```

**Link text should be descriptive:**
- ✅ "See the [GINA 2024 guidelines](https://...)"
- ❌ "Click [here](https://...) for guidelines"

### Special Components

#### AsideMessage

Use for important callouts:

```mdx
<AsideMessage type="warning">
  Always assess for anaphylaxis in acute allergic reactions.
</AsideMessage>
```

**Types:**
- `type="note"` - Additional information (blue)
- `type="warning"` - Caution, important considerations (amber)
- `type="critical"` - Life-threatening issues, emergencies (red)
- `type="recall"` - Product recalls, drug safety alerts (purple)

**When to use:**
- **Warning:** Safety concerns, common errors to avoid
- **Critical:** Life-threatening features, emergency situations
- **Note:** Clinical pearls, additional context
- **Recall:** Medication/device recalls

**Keep brief:** 1-3 sentences ideal

#### Code Blocks

For long protocols or algorithms:

````markdown
```
1. Assess airway, breathing, circulation
2. Administer epinephrine 0.01 mg/kg IM (max 0.5 mg)
3. Place patient supine, elevate legs
4. Give oxygen to maintain O2 sat >95%
5. Establish IV access
```
````

## 📚 Citations and References

### Citation Standards

**Every clinical claim needs a source** - especially:
- Treatment recommendations
- Dosing regimens
- Diagnostic criteria
- Epidemiologic data
- Controversial statements

**Preferred citation style:** Inline links

```markdown
GINA 2024 recommends ICS as first-line controller therapy for persistent
asthma [GINA 2024](https://ginasthma.org/reports/).
```

### Source Hierarchy

Prefer higher-quality evidence:

1. **Major guidelines** (GINA, PRACTALL, AAAAI/ACAAI)
2. **Systematic reviews** (Cochrane, meta-analyses)
3. **RCTs** (high-quality trials)
4. **Consensus statements** (expert panels)
5. **Textbooks** (for background only)

### Guideline Updates

**Always use the most recent version:**
- ✅ "GINA 2024"
- ❌ "GINA 2020" (unless specifically discussing historical context)

**Check annually** for updates (most AAI guidelines update yearly)

### Open Access Indicators

In frontmatter tabs, mark open access resources:

```yaml
tabData:
  - id: guidelines
    links:
      - name: 'GINA 2024 Guidelines'
        link: 'https://ginasthma.org/'
        isOpenAccess: true  # Free, no paywall
      - name: 'PRACTALL Consensus Report'
        link: 'https://pubmed.../12345'
        isOpenAccess: false  # Behind paywall
```

## 🧪 Clinical Content Guidelines

### Evidence Levels

**When making recommendations, indicate strength:**

✅ **Strong evidence:**
- "Guidelines recommend..."
- "Evidence supports..."
- "Studies consistently show..."

✅ **Moderate evidence:**
- "Guidelines suggest..."
- "Evidence indicates..."
- "Studies suggest..."

✅ **Weak/expert opinion:**
- "Expert opinion supports..."
- "Common practice is..."
- "Experts suggest..."

**Acknowledge uncertainty:**
```markdown
Data in children <2 years is limited. Expert opinion suggests...
```

### Controversies

**Don't hide disagreement - document it:**

```markdown
## Controversies

Expert opinion differs on the use of ICS/formoterol as reliever therapy:

**Supporting evidence:** SYGMA trials demonstrated reduced exacerbations
compared to SABA alone [Citation].

**Concerns:** Limited pediatric data, cost, and insurance coverage issues
in some regions [Citation].

**Current guideline stance:** GINA 2024 includes this as an option for
adults but notes limited data in children <12 years [Citation].
```

### Patient Safety

**Highlight safety concerns prominently:**

```mdx
<AsideMessage type="critical">
  **Red flags requiring immediate escalation:**
  - Silent chest
  - Altered mental status
  - Cyanosis
  - Bradycardia or hypotension
</AsideMessage>
```

**Common safety topics:**
- Anaphylaxis recognition
- Medication errors (look-alike/sound-alike)
- Contraindications
- Drug interactions
- Adverse effects

## 🌍 Inclusive and Accessible Language

### Patient-First Language

✅ **Good:** "Patient with asthma"
❌ **Avoid:** "Asthmatic patient"

✅ **Good:** "Child with peanut allergy"
❌ **Avoid:** "Peanut-allergic child"

**Exception:** When describing clinical features:
- ✅ "Atopic dermatitis" (NOT "person with atopic dermatitis" in every mention)

### Gender-Neutral Language

- Use "they/their" for singular generic references
- Alternate pronouns in examples (he, she) or use "the patient"
- Avoid gendered assumptions ("pregnant women" is appropriate when discussing pregnancy)

### Cultural Sensitivity

- Avoid assumptions about diet, religion, culture
- Acknowledge that access to care varies
- Use "in resource-limited settings" instead of "third world"

### Accessibility

**Alt text for images:**
```markdown
![Spirometry showing obstructive pattern with FEV1/FVC <0.7](./image.png)
```

**Describe visual information:**
```markdown
The graph shows a dose-response curve (see Figure 1) with peak effect
at 100 mg/day.
```

## ✏️ Common Grammar and Style Issues

### Comma Usage

**Serial comma (Oxford comma):** Always use

✅ "Asthma, rhinitis, and eczema comprise the atopic march"
❌ "Asthma, rhinitis and eczema comprise the atopic march"

**Introductory phrases:**

✅ "In severe cases, systemic corticosteroids are indicated."
❌ "In severe cases systemic corticosteroids are indicated."

### Hyphenation

**Compound modifiers before noun:**

✅ "Weight-based dosing"
✅ "5-year-old child"
✅ "Evidence-based medicine"

**Not after noun:**

✅ "The child is 5 years old" (NOT "5-years-old")
✅ "Dosing based on weight" (NOT "based-on-weight")

### Common Errors

| ❌ Avoid | ✅ Use |
|----------|--------|
| "effect" (as verb) | "affect" (to influence) |
| "less patients" | "fewer patients" |
| "comprised of" | "composed of" or "comprises" |
| "regime" | "regimen" |
| "insure" | "ensure" |
| "principle treatment" | "principal treatment" |

## 📋 Frontmatter Guidelines

### Required Fields

```yaml
---
title: 'Descriptive Title'        # Required
description: 'SEO description'    # Required (150-160 chars)
draft: false                      # Required (true = not published)
---
```

### Optional Fields

```yaml
---
tags: ['asthma', 'pediatric', 'emergency']  # Optional, aids search
tabData:                                     # Optional, resource links
  - id: guidelines
    links:
      - name: 'GINA 2024'
        link: 'https://...'
        isOpenAccess: true
---
```

### Tags

**Use consistent tags:**
- Condition: `asthma`, `food-allergy`, `anaphylaxis`
- Population: `pediatric`, `adult`, `pregnancy`
- Context: `emergency`, `outpatient`, `inpatient`
- Type: `diagnosis`, `treatment`, `monitoring`

**3-5 tags per article** (don't over-tag)

## 🖼️ Images and Media

### When to Use Images

**Helpful:**
- Anatomical diagrams (respiratory system, skin layers)
- Pathophysiology illustrations (IgE-mediated response)
- Procedures (skin testing technique)
- Devices (inhalers, auto-injectors)
- Flowcharts (treatment algorithms)

**Not needed:**
- Generic stock photos ("doctor with patient")
- Decorative images
- Content that works better as text

### Image Guidelines

**Technical:**
- Format: WebP preferred (fallback: PNG, JPG)
- Size: <500 KB (optimize before uploading)
- Dimensions: Max width 1200px
- Location: `static/img/[category]/filename.webp`

**Accessibility:**
- Always include alt text (descriptive, concise)
- Describe visual information in caption or text
- Don't rely on color alone (use patterns, labels)

**Copyright:**
- Use original images (with permission)
- Public domain or Creative Commons
- Properly attribute
- Never use copyrighted images without permission

**Example:**
```markdown
![Diagram of IgE-mediated mast cell degranulation showing allergen crosslinking IgE on mast cell surface, leading to histamine release](./img/ige-mast-cell.webp)
```

## ✅ Before Publishing Checklist

Before submitting your article:

### Content Review
- [ ] Evidence-based (all claims cited)
- [ ] Current guidelines referenced (2024 versions)
- [ ] No promotional language
- [ ] Clinically accurate
- [ ] No plagiarism
- [ ] Conflicts of interest disclosed

### Structure Review
- [ ] Clear introduction (2-3 sentences)
- [ ] Logical section headings
- [ ] Scannable (lists, tables, short paragraphs)
- [ ] Appropriate length (800-2,000 words)
- [ ] AsideMessage for safety concerns

### Style Review
- [ ] Follows style guide (terminology, dosing format)
- [ ] Active voice preferred
- [ ] Present tense for guidelines
- [ ] Patient-first language
- [ ] Consistent abbreviations

### Technical Review
- [ ] Builds without errors (`npm run build`)
- [ ] All links work (internal and external)
- [ ] Images optimized (<500 KB)
- [ ] Alt text on images
- [ ] Mobile-friendly (test locally)
- [ ] Proper frontmatter

## 📖 Examples

### Example: Good Article Opening

```mdx
---
title: 'Acute Asthma Exacerbation'
description: 'Emergency assessment and management of acute asthma attacks in children and adults'
draft: false
tags: ['asthma', 'emergency', 'pediatric']
---

import AsideMessage from '@site/src/components/AsideMessage';

# Acute Asthma Exacerbation

Acute asthma exacerbations (AAE) are episodes of progressive worsening
of asthma symptoms requiring urgent evaluation and treatment. Prompt
assessment and early intervention improve outcomes and reduce
hospitalizations.

<AsideMessage type="critical">
  **Life-threatening features requiring ICU consultation:**
  Silent chest, altered mental status, cyanosis, bradycardia, or hypotension.
</AsideMessage>

## Assessment

Initial evaluation should include:

- **Vital signs:** Heart rate, respiratory rate, blood pressure, oxygen saturation
- **Peak expiratory flow (PEF):** If patient able to perform (compare to personal best)
- **Work of breathing:** Accessory muscle use, retractions, tripod positioning
- **Speech:** Ability to speak in full sentences vs. words only
- **Mental status:** Alertness, agitation, altered consciousness

[Continue with severity classification, management sections...]
```

### Example: Dosing Table

```markdown
## Albuterol Dosing

| Age Group | Nebulizer Dose | MDI Dose (90 mcg/puff) |
|-----------|----------------|------------------------|
| <5 years  | 2.5 mg q20min  | 4-8 puffs q20min      |
| ≥5 years  | 2.5-5 mg q20min| 4-8 puffs q20min      |

Give up to 3 doses in first hour, then reassess.
```

### Example: Warning Box

```mdx
<AsideMessage type="warning">
  **Common error:** Do not use long-acting beta-agonists (LABA) as
  monotherapy. Always prescribe LABA in combination with inhaled
  corticosteroids (ICS).
</AsideMessage>
```

## 🔄 Updating Existing Articles

When updating content:

1. **Check guideline updates** - Most guidelines update annually
2. **Review new evidence** - Major trials, meta-analyses
3. **Update citations** - Remove outdated references
4. **Revise dosing** - If recommendations changed
5. **Note changes in commit message**

**Commit message example:**
```
Update asthma management per GINA 2024

- Update ICS dosing recommendations
- Add ICS/formoterol as reliever option
- Remove outdated SMART therapy dosing
- Add references to SYGMA trials
```

## 💬 Questions?

If you're unsure about style decisions:

- Check existing articles for examples
- Ask in GitHub Discussions
- Email maintainers
- When in doubt, prioritize **clarity** over style

---

**This is a living document.** As the AAI Wiki evolves, so will this guide. Suggestions for improvements are welcome!

**Last Updated:** 2024-11-23
