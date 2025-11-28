import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AAI Wiki',
  tagline: 'Evidence-based clinical reference for allergy, asthma, and immunology',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://aai.wiki',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'M-Pepper',
  projectName: 'aai-wiki',

  // SEO Configuration
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: 'AAI Wiki is a free, open-source, evidence-based clinical reference for healthcare professionals treating allergies, asthma, and immunological conditions.',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:type',
        content: 'website',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:site_name',
        content: 'AAI Wiki',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'canonical',
        href: 'https://aai.wiki',
      },
    },
  ],

  onBrokenLinks: 'throw',

  // Markdown configuration (v4 compatible)
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Internationalization config
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/M-Pepper/aai-wiki/edit/main/website/',
          routeBasePath: '/', // Docs-only mode - docs are the site
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        blog: {
          blogTitle: 'AAI Wiki Blog',
          blogDescription: 'Articles, updates, and insights on allergy, asthma, and immunology',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 10,
          showReadingTime: true,
          editUrl: 'https://github.com/M-Pepper/aai-wiki/edit/main/website/',
          routeBasePath: 'blog',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: false,
        docsRouteBasePath: '/',
      },
    ],
  ],

  plugins: [],

  themeConfig: {
    // Social card for sharing (will use favicon until custom card is created)
    image: 'img/docusaurus-social-card.jpg',

    // SEO Metadata
    metadata: [
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'AAI Wiki - Evidence-Based Clinical Reference'},
      {name: 'twitter:description', content: 'Free, open-source clinical reference for allergy, asthma, and immunology professionals'},
      {property: 'og:title', content: 'AAI Wiki - Evidence-Based Clinical Reference'},
      {property: 'og:description', content: 'Free, open-source clinical reference for allergy, asthma, and immunology professionals'},
      {property: 'og:image', content: 'https://aai.wiki/img/docusaurus-social-card.jpg'},
      {property: 'og:url', content: 'https://aai.wiki'},
    ],

    // Color mode configuration
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    // Announcement bar (customize for important updates)
    announcementBar: {
      id: 'site_launch_2025',
      content: '🚀 <strong>AAI Wiki is now live!</strong> Free, open-source clinical reference for allergy, asthma, and immunology. <a href="/contributing">Join us</a>',
      backgroundColor: '#334155',
      textColor: '#ffffff',
      isCloseable: true,
    },

    // Navbar configuration
    navbar: {
      title: 'AAI Wiki',
      // logo: {
      //   alt: 'AAI Wiki Logo',
      //   src: 'img/logo.svg',
      // },
      items: [
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          to: '/contributing',
          label: 'Contributing',
          position: 'left',
        },
        {
          to: '/about',
          label: 'About',
          position: 'left',
        },
        {
          href: 'https://github.com/M-Pepper/aai-wiki',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },

        // Search will be added here when Algolia is configured
        // {
        //   type: 'search',
        //   position: 'right',
        // },
      ],
    },

    // Footer configuration
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Clinical Topics',
          items: [
            {
              label: 'Getting Started',
              to: '/',
            },
            {
              label: 'Asthma',
              to: '/asthma',
            },
            {
              label: 'Allergies',
              to: '/allergies',
            },
            {
              label: 'Anaphylaxis',
              to: '/anaphylaxis',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GINA Guidelines',
              href: 'https://ginasthma.org/',
            },
            {
              label: 'AAAAI',
              href: 'https://www.aaaai.org/',
            },
            {
              label: 'ACAAI',
              href: 'https://acaai.org/',
            },
          ],
        },
        {
          title: 'Contribute',
          items: [
            {
              label: 'Contributing Guide',
              to: '/contributing',
            },
            {
              label: 'Assets',
              to: '/assets',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/M-Pepper/aai-wiki',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Terms & Disclaimer',
              to: '/terms-of-use',
            },
            {
              label: 'Privacy Policy',
              to: '/privacy-policy',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AAI Wiki Contributors. Content licensed under CC BY-SA 4.0.`,
    },

    // Code syntax highlighting
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },

    // Algolia search configuration (add when ready)
    // algolia: {
    //   appId: 'YOUR_APP_ID',
    //   apiKey: 'YOUR_SEARCH_API_KEY',
    //   indexName: 'aai-wiki',
    //   contextualSearch: true,
    //   searchParameters: {},
    //   searchPagePath: 'search',
    // },

  } satisfies Preset.ThemeConfig,
};

export default config;
