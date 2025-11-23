import React from 'react';
import { Tab } from '@headlessui/react';
import {
  BookOpen,
  FileText,
  Video,
  Mic,
  Calculator,
  Link as LinkIcon,
  Users,
  GraduationCap,
  ExternalLink,
  Lock,
  LockOpen,
} from 'lucide-react';
import clsx from 'clsx';

/**
 * FrontmatterTabs Component
 *
 * Displays resource links organized by category (guidelines, articles, videos, etc.)
 * from article frontmatter.
 *
 * @example
 * ```tsx
 * // In frontmatter:
 * tabData:
 *   - id: guidelines
 *     links:
 *       - name: 'GINA 2024 Guidelines'
 *         link: 'https://ginasthma.org/'
 *         isOpenAccess: true
 *
 * // In MDX:
 * <FrontmatterTabs tabData={frontMatter.tabData} />
 * ```
 */

export interface TabLink {
  /** Display name of the resource */
  name: string;
  /** URL to the resource (optional for contributor info) */
  link?: string;
  /** Plain text notes (used for contributor info) */
  notes?: string;
  /** Whether resource is open access (no paywall) */
  isOpenAccess?: boolean;
}

export interface TabSection {
  /** Tab identifier (guidelines, articles, videos, etc.) */
  id: string;
  /** Array of links/resources for this tab */
  links: TabLink[];
}

export interface FrontmatterTabsProps {
  /** Array of tab sections from frontmatter */
  tabData?: TabSection[];
  /** Optional custom className */
  className?: string;
}

/**
 * Tab configuration: maps tab IDs to labels and icons
 */
const TAB_CONFIG: Record<
  string,
  { label: string; icon: React.ComponentType<{ size?: number }> }
> = {
  guidelines: { label: 'Guidelines', icon: BookOpen },
  articles: { label: 'Articles', icon: FileText },
  videos: { label: 'Videos', icon: Video },
  podcasts: { label: 'Podcasts', icon: Mic },
  calculators: { label: 'Calculators', icon: Calculator },
  related: { label: 'Related', icon: LinkIcon },
  forPatients: { label: 'For Patients', icon: GraduationCap },
  contributors: { label: 'Contributors', icon: Users },
};

/**
 * Get configuration for a tab by ID
 */
const getTabConfig = (
  tabId: string,
): { label: string; icon: React.ComponentType<{ size?: number }> } => {
  return TAB_CONFIG[tabId] || { label: tabId, icon: LinkIcon };
};

export default function FrontmatterTabs({
  tabData,
  className,
}: FrontmatterTabsProps): JSX.Element | null {
  // Don't render if no tab data
  if (!tabData || tabData.length === 0) {
    return null;
  }

  return (
    <div className={clsx('frontmatter-tabs-wrapper', className)} style={{ marginBottom: '2rem' }}>
      <Tab.Group>
        {/* Tab List */}
        <Tab.List
          style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '2px solid var(--aai-border)',
            marginBottom: '1.5rem',
            overflowX: 'auto',
            flexWrap: 'wrap',
          }}
        >
          {tabData.map((section) => {
            const config = getTabConfig(section.id);
            const Icon = config.icon;

            return (
              <Tab
                key={section.id}
                className={({ selected }) =>
                  clsx(
                    'tab-button',
                    selected ? 'tab-button-selected' : 'tab-button-unselected',
                  )
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={18} />
                {config.label}
              </Tab>
            );
          })}
        </Tab.List>

        {/* Tab Panels */}
        <Tab.Panels>
          {tabData.map((section) => (
            <Tab.Panel key={section.id} style={{ outline: 'none' }}>
              <div style={{ fontSize: '0.95rem' }}>
                {section.links.length === 0 ? (
                  <p style={{ color: 'var(--aai-text-secondary)', fontStyle: 'italic' }}>
                    No resources available yet.
                  </p>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {section.links.map((linkItem, index) => (
                      <li
                        key={index}
                        style={{
                          padding: '0.75rem 0',
                          borderBottom:
                            index < section.links.length - 1
                              ? `1px solid var(--aai-border)`
                              : 'none',
                        }}
                      >
                        {/* Link with external icon and open access indicator */}
                        {linkItem.link ? (
                          <a
                            href={linkItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              color: 'var(--aai-primary)',
                              textDecoration: 'none',
                              transition: 'color 200ms ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = 'var(--aai-primary-dark)';
                              e.currentTarget.style.textDecoration = 'underline';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'var(--aai-primary)';
                              e.currentTarget.style.textDecoration = 'none';
                            }}
                          >
                            <span style={{ flex: 1 }}>{linkItem.name}</span>

                            {/* Open access indicator */}
                            {linkItem.isOpenAccess !== undefined && (
                              <span
                                title={
                                  linkItem.isOpenAccess ? 'Open Access' : 'May require subscription'
                                }
                                style={{ flexShrink: 0 }}
                              >
                                {linkItem.isOpenAccess ? (
                                  <LockOpen size={16} aria-label="Open Access" />
                                ) : (
                                  <Lock size={16} aria-label="May require subscription" />
                                )}
                              </span>
                            )}

                            {/* External link icon */}
                            <ExternalLink size={16} aria-label="Opens in new tab" />
                          </a>
                        ) : (
                          // Plain text for contributor info
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <span style={{ fontWeight: 500 }}>{linkItem.name}</span>
                            {linkItem.notes && (
                              <span style={{ color: 'var(--aai-text-secondary)' }}>
                                {linkItem.notes}
                              </span>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {/* Custom styles for tab buttons */}
      <style>{`
        .tab-button-selected {
          color: var(--aai-primary) !important;
          border-bottom: 2px solid var(--aai-primary);
          margin-bottom: -2px;
        }

        .tab-button-unselected {
          color: var(--aai-text-secondary);
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
        }

        .tab-button-unselected:hover {
          color: var(--aai-primary-light);
        }

        .tab-button:focus {
          outline: 2px solid var(--aai-primary);
          outline-offset: 2px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
