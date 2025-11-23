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
      label: '🫁 Asthma',
      collapsed: false,
      items: [
        'asthma/index',
        'asthma/acute-exacerbation-simple',
      ],
    },
    {
      type: 'category',
      label: '🥜 Allergies',
      collapsed: true,
      items: [
        'allergies/index',
      ],
    },
    {
      type: 'category',
      label: '🚨 Anaphylaxis',
      collapsed: true,
      items: [
        'anaphylaxis/index',
      ],
    },
    // Coming soon: Immunology and Procedures sections
  ],
};

export default sidebars;
