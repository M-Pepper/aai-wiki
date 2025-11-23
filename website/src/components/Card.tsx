import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

/**
 * Card Component
 *
 * Used for creating card-based layouts on landing/category pages
 */

export interface CardProps {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Link destination */
  href: string;
  /** Optional icon (emoji or React component) */
  icon?: React.ReactNode;
  /** Optional badge text (e.g., "New", "Updated") */
  badge?: string;
  /** Custom className */
  className?: string;
}

export default function Card({
  title,
  description,
  href,
  icon,
  badge,
  className,
}: CardProps): JSX.Element {
  return (
    <Link
      to={href}
      className={clsx('aai-card', className)}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Icon and Badge Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          {icon && (
            <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>
              {icon}
            </div>
          )}
          {badge && (
            <span
              style={{
                backgroundColor: 'var(--aai-primary)',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--aai-radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            marginTop: 0,
            marginBottom: '0.75rem',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--aai-text-primary)',
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            flex: 1,
            margin: 0,
            fontSize: '0.95rem',
            lineHeight: 1.6,
            color: 'var(--aai-text-secondary)',
          }}
        >
          {description}
        </p>

        {/* Arrow indicator */}
        <div
          style={{
            marginTop: '1rem',
            color: 'var(--aai-primary)',
            fontWeight: 500,
            fontSize: '0.9rem',
          }}
        >
          Learn more →
        </div>
      </div>
    </Link>
  );
}
