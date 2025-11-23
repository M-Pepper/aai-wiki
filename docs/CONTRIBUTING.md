# Contributing to AAI Wiki

Welcome to the AAI Wiki! We're building a community-driven clinical reference for allergy, asthma, and immunology healthcare professionals. Your contributions help improve patient care.

## 🎯 Who Can Contribute?

We welcome contributions from:

- **Allergists and Immunologists** - Board-certified or in practice
- **Fellows in Training** - AAI fellowship programs
- **Pediatricians** - Managing allergic conditions
- **Advanced Practice Providers** - NPs, PAs specializing in AAI
- **Residents and Medical Students** - With faculty review
- **Other Healthcare Professionals** - Pharmacists, respiratory therapists, etc.
- **Anyone** - For typos, broken links, and technical improvements

## 📚 Types of Contributions

### 1. **Quick Fixes** (No Git Experience Needed)
- Fix typos or grammatical errors
- Correct broken links
- Update outdated information
- Clarify confusing language

**How:** Click "Edit this page" at the bottom of any article → Make changes → Submit

### 2. **Content Updates**
- Update articles based on new guidelines (e.g., GINA 2024)
- Add recent evidence or studies
- Expand existing articles with missing information
- Update drug dosing or treatment algorithms

### 3. **New Articles**
- Write comprehensive articles on AAI topics
- Create clinical protocols or management guides
- Add procedure descriptions or techniques
- Contribute educational resources

### 4. **Technical Improvements**
- Improve site performance or accessibility
- Fix bugs in React components
- Enhance mobile responsiveness
- Add new features

## 🚀 Getting Started

### Option A: Easy Web-Based Editing (No Installation)

Perfect for quick fixes and small updates.

1. **Navigate to the article** you want to edit
2. **Click "Edit this page"** at the bottom (opens GitHub editor)
3. **Make your changes** in the web editor
4. **Preview** your changes (optional)
5. **Scroll down** and describe your changes:
   - **Title:** "Fix typo in asthma exacerbation article"
   - **Description:** "Changed 'exacerbaton' to 'exacerbation'"
6. **Choose:** "Create a new branch and start a pull request"
7. **Click** "Propose changes"
8. **Wait for review** - A maintainer will review and merge

### Option B: Local Development (For Larger Changes)

For new articles or significant updates.

#### Prerequisites
```bash
# Install Node.js 18+ (if not already installed)
# On Fedora:
sudo dnf install nodejs

# Verify
node --version  # Should be 18.0.0+
npm --version
```

#### Setup Process

1. **Fork the repository**
   - Go to https://github.com/[username]/aai-wiki
   - Click "Fork" (top right)

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/aai-wiki.git
   cd aai-wiki
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b article/acute-asthma-exacerbation
   # Or: fix/typo-in-overview
   # Or: update/gina-2024-guidelines
   ```

5. **Start development server**
   ```bash
   npm start
   # Opens http://localhost:3000
   # Auto-reloads when you save changes
   ```

6. **Make your changes**
   - Edit files in `docs/` folder
   - Use `.mdx` extension for Markdown files
   - See [Style Guide](STYLE_GUIDE.md) for formatting

7. **Test your changes**
   ```bash
   # Build the site (checks for errors)
   npm run build

   # Serve the built site
   npm run serve
   ```

8. **Commit your changes**
   ```bash
   git add docs/asthma/acute-exacerbation.mdx
   git commit -m "Add acute asthma exacerbation article

   - Covers emergency assessment and management
   - Includes severity classification
   - Cites GINA 2024 guidelines"
   ```

9. **Push to your fork**
   ```bash
   git push origin article/acute-asthma-exacerbation
   ```

10. **Create a pull request**
    - Go to your fork on GitHub
    - Click "Contribute" → "Open pull request"
    - Fill out the PR template
    - Click "Create pull request"

## ✍️ Writing Content

### Article Structure

Every article should follow this structure:

```mdx
---
title: 'Acute Asthma Exacerbation'
description: 'Emergency management and treatment of acute asthma attacks'
draft: false
tags: ['asthma', 'emergency', 'pediatric']
tabData:
  - id: guidelines
    links:
      - name: 'GINA Acute Asthma Management'
        link: 'https://ginasthma.org/...'
        isOpenAccess: true
  - id: articles
    links:
      - name: 'Key Study on Severe Asthma'
        link: 'https://pubmed.ncbi.nlm.nih.gov/...'
        isOpenAccess: false
---

import AsideMessage from '@site/src/components/AsideMessage';

# Acute Asthma Exacerbation

Brief introduction paragraph (2-3 sentences).

<AsideMessage type="warning">
  Critical safety information or warning here.
</AsideMessage>

## Assessment

Content here...

## Management

Content here...

## Follow-up

Content here...
```

### Required Elements

Every article must include:

- ✅ **Frontmatter** (title, description)
- ✅ **Main heading** (H1, matches title)
- ✅ **Introduction** (2-3 sentences)
- ✅ **Section headings** (H2 for major sections)
- ✅ **Citations** (links to guidelines or studies)
- ✅ **Evidence-based content** (no opinion without citation)

### Optional Elements

- **AsideMessage** for warnings, notes, recalls
- **FrontmatterTabs** data (guidelines, articles, videos)
- **Tables** for dosing, classification, comparisons
- **Images** (optimized, <500KB, with alt text)
- **Code blocks** for dosing calculations

See [STYLE_GUIDE.md](STYLE_GUIDE.md) for detailed writing guidelines.

## 🔬 Content Guidelines

### Evidence-Based Medicine

All clinical content must be:

1. **Evidence-based** - Cite guidelines, systematic reviews, or RCTs
2. **Current** - Use the most recent guidelines (e.g., GINA 2024, not 2020)
3. **Unbiased** - No promotional content for drugs, devices, or companies
4. **Balanced** - Present controversies fairly when expert opinion differs

### Citations

**Preferred sources (in order):**

1. **Major guidelines**
   - GINA (Global Initiative for Asthma)
   - PRACTALL (Practical Allergy)
   - AAAAI/ACAAI Joint Task Force reports
   - EAACI (European Academy of Allergy)
   - WAO (World Allergy Organization)

2. **Systematic reviews and meta-analyses**
   - Cochrane reviews
   - High-quality meta-analyses

3. **Randomized controlled trials**
   - Published in peer-reviewed journals

4. **Expert consensus statements**
   - When high-quality evidence is lacking

5. **Textbooks** (for background/basics)
   - Middleton's Allergy
   - Pediatric Allergy: Principles and Practice

**How to cite:**

```markdown
According to GINA 2024, first-line treatment includes... [1]

[1]: [GINA 2024 Guidelines](https://ginasthma.org/gina-reports/)
```

Or inline:

```markdown
[GINA 2024](https://ginasthma.org) recommends ICS as first-line...
```

### Conflicts of Interest

**Disclose in your PR if:**
- You receive research funding related to the topic
- You consult for pharmaceutical/device companies
- You authored cited studies
- You have financial relationships with mentioned products

**Example:**
```
## Conflicts of Interest
I receive research funding from [Company] for studies on biologics
in severe asthma. This article cites one of my published studies.
```

Disclosures do NOT disqualify contributions - transparency is key.

## 📋 Pull Request Checklist

Before submitting a PR, ensure:

### Content Checklist
- [ ] Content is evidence-based (cites sources)
- [ ] Citations are current (prefer recent guidelines)
- [ ] No promotional or biased language
- [ ] Clinically accurate (reviewed by expert if trainee)
- [ ] Follows [STYLE_GUIDE.md](STYLE_GUIDE.md)
- [ ] Appropriate frontmatter (title, description, tags)
- [ ] No plagiarism (original writing or proper quotes)

### Technical Checklist
- [ ] Builds without errors (`npm run build`)
- [ ] Previewed locally (`npm start`)
- [ ] No broken links
- [ ] Images optimized (<500KB each)
- [ ] Alt text on all images
- [ ] Mobile-friendly (tested on preview)
- [ ] Proper heading hierarchy (h1 → h2 → h3)

### PR Description
- [ ] Clear title (e.g., "Add acute asthma exacerbation article")
- [ ] Description of changes
- [ ] Type of change selected (bug fix, new content, etc.)
- [ ] Conflicts of interest disclosed (if applicable)

## 👥 Review Process

### What Happens After You Submit a PR?

1. **Automated checks run** (~2 min)
   - Build succeeds (no errors)
   - Preview deployment created

2. **Maintainer reviews** (1-7 days)
   - Checks for obvious issues
   - Assigns expert reviewer if needed
   - May request changes

3. **Expert review** (if applicable)
   - Clinical accuracy verified
   - Evidence quality assessed
   - May suggest improvements

4. **Discussion** (if controversial)
   - GitHub Discussions thread created
   - Community weighs in
   - Consensus documented

5. **Approval and merge**
   - PR approved by reviewer(s)
   - Merged by maintainer
   - Auto-deploys to site (~5 min)

6. **You're credited!**
   - Your GitHub username in commit history
   - Optional: Add yourself to Contributors page

### Response Times

- **Quick fixes (typos):** Usually merged within 24 hours
- **Content updates:** 1-7 days (needs expert review)
- **New articles:** 1-2 weeks (thorough review)
- **Controversial topics:** May take longer (discussion needed)

We're all volunteers - thank you for your patience!

## 🤝 Community Guidelines

### Code of Conduct

We are committed to providing a welcoming and professional environment.

**Expected behavior:**
- ✅ Be respectful and professional
- ✅ Assume good faith
- ✅ Provide constructive feedback
- ✅ Debate ideas, not people
- ✅ Follow medical ethics
- ✅ Disclose conflicts of interest
- ✅ Use inclusive language

**Unacceptable behavior:**
- ❌ Harassment or discrimination
- ❌ Personal attacks or insults
- ❌ Trolling or inflammatory comments
- ❌ Promoting unproven treatments
- ❌ Plagiarism or copyright violation
- ❌ Sharing patient information (HIPAA)

**Reporting:** Contact maintainers at [email] if you experience or witness unacceptable behavior.

### Clinical Debates

Disagreement is expected in medicine - we welcome respectful debate!

**For controversial topics:**
- Focus on evidence quality
- Cite sources for your position
- Acknowledge uncertainty when appropriate
- Respect differing expert opinions
- Document consensus OR note ongoing controversy

**Example:**
```markdown
## Controversies

### ICS/Formoterol as Reliever

Expert opinion is divided on this approach:

**Proponents** cite the SYGMA trials showing reduced exacerbations [1].

**Critics** note limited pediatric data and guideline variability [2].

**Current guideline stance:** GINA 2024 includes as an option for
adults; data in children <12 years is limited [3].

[Citations...]
```

## 🛠️ Technical Contributions

### Component Development

If you're comfortable with React:

- Components live in `src/components/`
- Use TypeScript (`.tsx`)
- Follow existing patterns (see `FrontmatterTabs.tsx`)
- Ensure accessibility (ARIA labels, keyboard nav)
- Test in light and dark modes

### Styling

- Use CSS custom properties (defined in `src/css/custom.css`)
- Follow existing spacing scale
- Ensure 4.5:1 contrast ratio (WCAG AA)
- Test on mobile, tablet, desktop

### Performance

- Optimize images (WebP, <500KB)
- Lazy load below-the-fold content
- Code split large components
- Target Lighthouse score ≥90

## 📖 Resources

### Documentation
- [Docusaurus Docs](https://docusaurus.io/docs)
- [MDX Syntax](https://mdxjs.com/)
- [React Documentation](https://react.dev/)

### Guidelines
- [GINA Asthma Guidelines](https://ginasthma.org/)
- [PRACTALL Guidelines](https://www.practall.org/)
- [AAAAI Practice Parameters](https://www.aaaai.org/conditions-treatments/practice-parameters)

### AAI Wiki Docs
- [README.md](README.md) - Project overview
- [STYLE_GUIDE.md](STYLE_GUIDE.md) - Writing style guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment details
- [TECHNICAL_REQUIREMENTS.md](TECHNICAL_REQUIREMENTS.md) - Tech specs

## 💬 Getting Help

### Questions About Content
- Open a [GitHub Discussion](https://github.com/[username]/aai-wiki/discussions)
- Tag as "Content Question"

### Questions About Technical Issues
- Open a [GitHub Issue](https://github.com/[username]/aai-wiki/issues)
- Include error messages and steps to reproduce

### General Questions
- Check existing issues/discussions first
- Email maintainers: [email]

## 🎉 Recognition

We value all contributions! Ways we recognize contributors:

- **Commit history** - Your GitHub username permanently in git log
- **Contributors page** - Optional listing on website
- **Article attribution** - "Contributed by" at bottom of articles you write
- **Reviewer credits** - Recognition for expert reviews
- **Shoutouts** - Periodic social media recognition of top contributors

## 📜 License

By contributing to AAI Wiki, you agree that your contributions will be licensed under the [LICENSE TYPE - TBD, e.g., CC BY-SA 4.0].

This means:
- Your work will be freely available
- Others can adapt your work (with attribution)
- Derivative works must use the same license
- You retain copyright of your original work

## 🙏 Thank You!

Your contributions improve clinical care for patients with allergic and immunologic conditions. Every typo fix, citation update, and new article makes a difference.

Welcome to the community!

---

**Questions?** Open an issue or discussion, or email [maintainer email]

**Found a bug?** Please report it: [GitHub Issues](https://github.com/[username]/aai-wiki/issues)

**Want to discuss a topic?** Start a conversation: [GitHub Discussions](https://github.com/[username]/aai-wiki/discussions)
