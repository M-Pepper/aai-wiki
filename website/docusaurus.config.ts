import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AAI Wiki',
  tagline: 'Evidence-based clinical reference for allergy, asthma, and immunology',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://aai-wiki.pages.dev', // Change to custom domain when ready
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config (if using GitHub)
  // organizationName: 'yourusername',
  // projectName: 'aai-wiki',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
        blog: false, // Disable blog for now
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
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/',
      },
    ],
  ],

  plugins: [],

  themeConfig: {
    // Replace with AAI Wiki social card when created
    // image: 'img/aai-wiki-social-card.jpg',

    // Color mode configuration
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    // Announcement bar (uncomment and customize for important updates)
    // announcementBar: {
    //   id: 'guideline_update_2024',
    //   content: '🎉 <strong>New GINA 2024 guidelines</strong> now available. <a href="/docs/asthma/guidelines-2024">Read more</a>',
    //   backgroundColor: '#0891b2',
    //   textColor: '#ffffff',
    //   isCloseable: true,
    // },

    // Navbar configuration
    navbar: {
      title: 'AAI Wiki',
      // logo: {
      //   alt: 'AAI Wiki Logo',
      //   src: 'img/logo.svg',
      // },
      items: [
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
          to: '/assets',
          label: 'Assets',
          position: 'left',
        },
        // Uncomment when GitHub repo is set up
        // {
        //   href: 'https://github.com/yourusername/aai-wiki',
        //   label: 'GitHub',
        //   position: 'right',
        // },

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
              to: '/docs/intro',
            },
            // Add more as content is created
            // {
            //   label: 'Asthma',
            //   to: '/docs/asthma',
            // },
            // {
            //   label: 'Food Allergies',
            //   to: '/docs/food-allergies',
            // },
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
              to: '/docs/contributing', // Will create this later
            },
            // Uncomment when GitHub is set up
            // {
            //   label: 'GitHub',
            //   href: 'https://github.com/yourusername/aai-wiki',
            // },
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
