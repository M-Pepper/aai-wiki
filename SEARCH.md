# Search Configuration

## Current Implementation: Local Search

AAI Wiki currently uses **@easyops-cn/docusaurus-search-local** for client-side search functionality.

### Features
- ✅ Works offline
- ✅ No external dependencies
- ✅ Free and open-source
- ✅ Indexes all documentation automatically
- ✅ Highlights search terms on target pages
- ✅ Keyboard shortcuts (Ctrl+K or Cmd+K)

### Configuration

Located in `website/docusaurus.config.ts`:

```typescript
themes: [
  [
    '@easyops-cn/docusaurus-search-local',
    {
      hashed: true,
      language: ['en'],
      highlightSearchTermsOnTargetPage: true,
      explicitSearchResultPath: true,
      indexDocs: true,
      indexBlog: false,
      indexPages: false,
      docsRouteBasePath: '/',
    },
  ],
],
```

### How It Works

1. During build time, the plugin indexes all documentation content
2. Generates a searchable index file
3. Client-side JavaScript performs searches in the browser
4. Results are displayed in a dropdown with instant filtering

---

## Future: Algolia DocSearch (Recommended for Production)

Once the site is public and has substantial content, you can apply for **Algolia DocSearch** (free for open-source projects).

### Benefits of Algolia DocSearch

- ⚡ Faster search (server-side indexing)
- 🎯 Better relevance ranking
- 📊 Search analytics
- 🔍 Advanced features (typo tolerance, synonyms)
- 🌐 Handles large documentation sites better

### How to Apply

1. **Ensure your site meets requirements:**
   - Public and production-ready
   - Documentation is the primary content
   - Site is open-source (✅ we are!)

2. **Apply at:** https://docsearch.algolia.com/apply/

3. **Fill out the form:**
   - Website URL: `https://aai-wiki.pages.dev` (or custom domain)
   - GitHub repository: `https://github.com/M-Pepper/aai-wiki`
   - Email: [your-email]
   - Select "Docusaurus v3"
   - Describe the project as an open-source medical reference

4. **Wait for approval** (usually 1-2 weeks)

5. **Receive credentials:**
   - App ID
   - API Key
   - Index Name

### Configuration After Approval

Once you receive Algolia credentials:

1. **Update `website/docusaurus.config.ts`:**

```typescript
// Remove the local search theme
themes: [],

// Add Algolia config to themeConfig
themeConfig: {
  // ... existing config ...

  algolia: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_SEARCH_API_KEY',
    indexName: 'aai-wiki',

    // Optional: Contextual search
    contextualSearch: true,

    // Optional: Search parameters
    searchParameters: {
      facetFilters: ['language:en'],
    },

    // Optional: Custom search page path
    searchPagePath: 'search',
  },
}
```

2. **Remove local search plugin:**

```bash
npm uninstall @easyops-cn/docusaurus-search-local
```

3. **Rebuild and deploy:**

```bash
npm run build
npx wrangler pages deploy build
```

### Algolia Crawler Configuration

Algolia will provide a crawler that runs automatically to index your site. You can customize what gets indexed:

**Example `algolia-config.json`:**

```json
{
  "index_name": "aai-wiki",
  "start_urls": [
    "https://aai-wiki.pages.dev/"
  ],
  "selectors": {
    "lvl0": {
      "selector": ".menu__link--sublist.menu__link--active",
      "global": true,
      "default_value": "Documentation"
    },
    "lvl1": "article h1",
    "lvl2": "article h2",
    "lvl3": "article h3",
    "lvl4": "article h4",
    "lvl5": "article h5",
    "text": "article p, article li"
  },
  "selectors_exclude": [
    ".hash-link",
    ".table-of-contents"
  ],
  "custom_settings": {
    "attributesForFaceting": ["language", "version"]
  }
}
```

---

## Search Best Practices

### For Content Writers

To ensure content is searchable:

1. **Use clear headings** (H1, H2, H3) with descriptive text
2. **Include keywords** naturally in the first paragraph
3. **Use descriptive link text** instead of "click here"
4. **Add meta descriptions** in frontmatter
5. **Use tags** in frontmatter for categorization

Example frontmatter:

```yaml
---
title: Acute Asthma Exacerbation
description: Emergency assessment and management of acute asthma attacks in adults and children
tags: [asthma, emergency, pediatric, adult, exacerbation]
keywords: [asthma attack, acute asthma, emergency asthma, asthma exacerbation]
---
```

### Search Analytics

Once on Algolia, you can:
- Track popular search queries
- Identify content gaps (searches with no results)
- Monitor search performance
- A/B test search relevance

---

## Troubleshooting

### Local Search Issues

**Search not appearing:**
- Clear `.docusaurus` cache: `rm -rf .docusaurus`
- Rebuild: `npm start`

**Search results incomplete:**
- Check `docsRouteBasePath` matches your config
- Ensure `indexDocs: true` in plugin config

**Performance issues:**
- Consider switching to Algolia for large sites (>1000 pages)

### Algolia Issues

**No results appearing:**
- Check if crawler has run recently
- Verify API key permissions
- Check browser console for errors

**Outdated results:**
- Trigger a manual crawl in Algolia dashboard
- Check crawler schedule

---

## Migration Path

**Now:** Local search (instant, works offline)
**After launch:** Apply for Algolia DocSearch
**Once approved:** Migrate to Algolia (better performance)

The local search plugin works well for small-to-medium documentation sites. Only migrate to Algolia if:
- You have 500+ pages
- You need search analytics
- You want faster, more relevant results
- Site traffic justifies it

---

**Current Status:** ✅ Local search configured and working
**Next Step:** Apply for Algolia DocSearch after public launch
