import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * AAI Wiki Sidebar Configuration
 *
 * Organized by clinical topic areas for easy navigation
 */
const sidebars: SidebarsConfig = {
  aaiSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Asthma',
      link: {
        type: 'doc',
        id: 'asthma/index',
      },
      collapsed: false,
      items: [
        'asthma/acute-exacerbation-simple',
      ],
    },
    {
      type: 'category',
      label: 'Allergies',
      link: {
        type: 'doc',
        id: 'allergies/index',
      },
      collapsed: true,
      items: [],
    },
    {
      type: 'category',
      label: 'Anaphylaxis',
      link: {
        type: 'doc',
        id: 'anaphylaxis/index',
      },
      collapsed: true,
      items: [],
    },
    {
      type: 'category',
      label: 'Immunology',
      link: {
        type: 'doc',
        id: 'immunology/index',
      },
      collapsed: true,
      items: [],
    },
    {
      type: 'category',
      label: 'Procedures',
      link: {
        type: 'doc',
        id: 'procedures/index',
      },
      collapsed: true,
      items: [],
    },
    {
      type: 'category',
      label: 'Clinical Calculators',
      collapsed: false,
      items: [
        'calculators/scorad',
        'calculators/uas7',
      ],
    },
    // Coming soon: Immunology and Procedures sections
    {
      type: 'category',
      label: 'Resources',
      collapsed: true,
      items: [
        'about',
        'contributing',
        'assets',
        'writing-guide',
      ],
    },
  ],
};

export default sidebars;
