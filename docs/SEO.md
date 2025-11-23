# SEO Strategy for AAI Wiki

## Current SEO Implementation

### 1. **robots.txt** ✅
Location: `website/static/robots.txt`

Allows all search engines to crawl the entire site:
- All clinical content directories
- Blog posts
- About, Contributing, and Assets pages
- Sitemap location declared

### 2. **Sitemap** ✅
Automatically generated at: `https://aai.wiki/sitemap.xml`

Configuration in `docusaurus.config.ts`:
- Weekly change frequency
- Priority: 0.5 (balanced)
- Excludes tag pages to reduce noise

### 3. **Meta Tags** ✅

**Primary Keywords:**
- allergy
- asthma
- immunology
- clinical guidelines
- AAI
- evidence-based medicine
- allergic rhinitis
- anaphylaxis
- immunotherapy
- medical reference

**Meta Description:**
> AAI Wiki is a free, open-source, evidence-based clinical reference for healthcare professionals treating allergies, asthma, and immunological conditions.

**Open Graph Tags:**
- og:type: website
- og:site_name: AAI Wiki
- og:title: AAI Wiki - Evidence-Based Clinical Reference
- og:description: Free, open-source clinical reference for allergy, asthma, and immunology professionals
- og:image: favicon-512.png (512x512 PNG)
- og:url: https://aai.wiki

**Twitter Card Tags:**
- twitter:card: summary_large_image
- twitter:title: AAI Wiki - Evidence-Based Clinical Reference
- twitter:description: Same as Open Graph

### 4. **Structured Data** (Future Enhancement)

Consider adding JSON-LD structured data for:
- Organization schema
- MedicalWebPage schema
- MedicalGuide schema
- Article schema for blog posts

Example:
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "AAI Wiki",
  "description": "Evidence-based clinical reference for allergy, asthma, and immunology",
  "about": {
    "@type": "MedicalSpecialty",
    "name": "Allergy and Immunology"
  },
  "audience": {
    "@type": "MedicalAudience",
    "audienceType": "Healthcare Professionals"
  }
}
```

---

## Google Search Appearance

### Expected Search Results

**Query: "aai wiki"**
```
AAI Wiki - Evidence-Based Clinical Reference
https://aai.wiki
AAI Wiki is a free, open-source, evidence-based clinical reference for
healthcare professionals treating allergies, asthma, and immunological
conditions. Topics include asthma management, allergic rhinitis...
```

**Query: "asthma guidelines wiki"**
```
Asthma - AAI Wiki
https://aai.wiki/asthma
Evidence-based guidelines for asthma diagnosis, management, and treatment.
Includes GINA guidelines, acute exacerbation protocols, pediatric and adult
management strategies.
```

**Query: "anaphylaxis treatment protocol"**
```
Anaphylaxis - AAI Wiki
https://aai.wiki/anaphylaxis
Emergency management of anaphylaxis. Step-by-step treatment protocols,
epinephrine administration, differential diagnosis, and post-reaction care.
```

### Improving Search Rankings

#### Content Strategy
1. **Quality over Quantity**: Focus on comprehensive, evidence-based articles
2. **Regular Updates**: Keep content current with latest guidelines (signals freshness)
3. **Internal Linking**: Link related topics within articles
4. **External Citations**: Reference authoritative sources (GINA, AAAAI, ACAAI)

#### Technical SEO
5. **Page Speed**: Docusaurus is already optimized, but monitor Core Web Vitals
6. **Mobile Friendly**: Responsive design ✅
7. **HTTPS**: Cloudflare provides SSL ✅
8. **Clean URLs**: Semantic URLs like `/asthma/acute-exacerbation` ✅

#### Content Best Practices
9. **H1 Tags**: One per page, descriptive
10. **H2-H6 Hierarchy**: Proper heading structure
11. **Alt Text**: Add to all images
12. **Meta Descriptions**: Unique for each major page (add to frontmatter)

---

## Frontmatter SEO Best Practices

For each MDX file, include:

```yaml
---
title: Acute Asthma Exacerbation
description: Emergency assessment and management of acute asthma attacks in adults and children
keywords: [asthma attack, acute asthma, emergency asthma, asthma exacerbation, status asthmaticus]
---
```

**Title**: 60 characters or less (Google truncates at ~60)
**Description**: 150-160 characters (appears in search results)
**Keywords**: 5-10 relevant terms

---

## Google Search Console Setup

### Post-Launch Tasks

1. **Verify Ownership**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add property: `https://aai.wiki`
   - Verify via DNS (recommended) or meta tag

2. **Submit Sitemap**
   - URL: `https://aai.wiki/sitemap.xml`
   - Monitor indexing status

3. **Monitor Performance**
   - Track impressions, clicks, CTR
   - Identify high-performing pages
   - Find opportunities (high impressions, low clicks)

4. **Fix Crawl Errors**
   - Monitor Coverage report
   - Fix 404s and broken links

5. **Mobile Usability**
   - Ensure no mobile usability issues

---

## Bing Webmaster Tools

Don't forget Bing! It powers ~6% of searches and is used by healthcare systems.

1. Add site to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Submit sitemap: `https://aai.wiki/sitemap.xml`
3. Verify via DNS or meta tag

---

## Social Media Optimization

When sharing links on social platforms:

### Twitter/X
- Uses twitter:card tags ✅
- Image: 1200x628 px (current: 512x512 - consider upgrading)

### LinkedIn
- Uses Open Graph tags ✅
- Good for professional medical audience

### Facebook
- Uses Open Graph tags ✅
- Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

---

## Analytics Setup (Recommended)

### Google Analytics 4

Add to `docusaurus.config.ts`:

```typescript
gtag: {
  trackingID: 'G-XXXXXXXXXX',
  anonymizeIP: true, // Important for healthcare compliance
},
```

### Privacy Considerations
- **HIPAA Compliance**: No patient data should ever be in analytics
- **Anonymize IP**: Enabled by default
- **Cookie Consent**: Consider adding banner for EU visitors (GDPR)

---

## Link Building Strategy

### Internal Links
- Link between related topics (asthma → allergic rhinitis → immunotherapy)
- Create topic clusters
- Use descriptive anchor text

### External Links
1. **Get Listed On:**
   - Medical education directories
   - Open-source healthcare resources
   - Allergy/immunology society resource pages

2. **Collaborate With:**
   - Medical schools
   - Residency programs
   - Healthcare organizations

3. **Content Partnerships:**
   - Guest posts on medical blogs
   - Interviews with allergists
   - Podcast appearances

---

## Monitoring & Maintenance

### Weekly
- Check Google Search Console for errors
- Review new indexed pages

### Monthly
- Analyze search performance trends
- Update outdated content
- Add new content based on search queries

### Quarterly
- Comprehensive SEO audit
- Update meta descriptions based on performance
- Review and improve low-performing pages

---

## Quick Wins

1. ✅ **robots.txt** - Allows crawling
2. ✅ **Sitemap** - Auto-generated
3. ✅ **Meta tags** - Comprehensive
4. ✅ **Mobile-friendly** - Responsive design
5. ✅ **HTTPS** - Cloudflare SSL
6. ⏳ **Google Search Console** - Needs verification
7. ⏳ **Structured data** - Future enhancement
8. ⏳ **Page-specific meta** - Add to key pages
9. ⏳ **Social card image** - Upgrade to 1200x628px

---

## Target Search Queries

### Primary (High Priority)
- "asthma guidelines"
- "anaphylaxis treatment"
- "allergic rhinitis management"
- "immunotherapy protocols"
- "allergy testing interpretation"

### Secondary (Medium Priority)
- "acute asthma exacerbation"
- "epinephrine administration"
- "allergen immunotherapy"
- "food allergy management"
- "urticaria treatment"

### Long-Tail (Opportunity)
- "how to manage acute asthma attack emergency department"
- "anaphylaxis treatment protocol emergency room"
- "when to refer for allergy immunotherapy"
- "interpreting skin prick test results"

---

## Competitive Analysis

### Similar Sites
- UpToDate (commercial, subscription)
- Wikipedia (general, not specialized)
- GINA website (asthma-specific)
- AAAAI/ACAAI (professional societies)

### Our Advantages
- ✅ **Free and open-source**
- ✅ **Focused on AAI only**
- ✅ **Evidence-based and curated**
- ✅ **Community-driven**
- ✅ **Modern, fast interface**
- ✅ **Mobile-optimized**

---

## Success Metrics

### 6 Months
- Google Search Console: 1,000+ impressions/month
- Indexed pages: 50+
- Average position: <30 for target keywords

### 1 Year
- Impressions: 10,000+/month
- Clicks: 500+/month
- Average position: <20 for target keywords
- Backlinks: 20+ from medical/educational domains

### 2 Years
- Impressions: 50,000+/month
- Clicks: 2,500+/month
- Average position: <10 for target keywords
- Established as go-to reference for AAI professionals

---

**Last Updated:** 2025-11-23
**Next Review:** 2026-02-23
