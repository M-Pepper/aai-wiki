import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

/**
 * Card Component
 *
 * Clean, technical card style inspired by modern API docs
 */

export interface CardProps {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Link destination */
  href: string;
  /** Optional icon (Lucide component or SVG) */
  icon?: React.ReactNode;
  /** Optional badge text */
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
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '1.25rem',
        border: '1px solid var(--aai-border)',
        borderRadius: 'var(--aai-radius-md)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        backgroundColor: 'var(--aai-bg-primary)',
      }}
    >
      {badge && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
          <span
            style={{
              backgroundColor: 'var(--aai-bg-secondary)',
              color: 'var(--aai-text-secondary)',
              border: '1px solid var(--aai-border)',
              padding: '0.125rem 0.5rem',
              borderRadius: '1rem',
              fontSize: '0.7rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}
          >
            {badge}
          </span>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        {icon && (
          <div style={{ 
            color: 'var(--aai-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
            flexShrink: 0
          }}>
            {icon}
          </div>
        )}
        <h3
          style={{
            margin: 0,
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--aai-text-primary)',
            lineHeight: 1.2
          }}
        >
          {title}
        </h3>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: '0.875rem',
          lineHeight: 1.5,
          color: 'var(--aai-text-secondary)',
          flex: 1,
        }}
      >
        {description}
      </p>
    </Link>
  );
}
