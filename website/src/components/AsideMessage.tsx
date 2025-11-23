import React from 'react';
import { Info, AlertTriangle, AlertOctagon, Bell } from 'lucide-react';
import clsx from 'clsx';

/**
 * AsideMessage Component
 *
 * Displays important clinical information, warnings, or alerts in articles.
 *
 * @example
 * ```tsx
 * <AsideMessage type="warning">
 *   Always assess for anaphylaxis in acute allergic reactions.
 * </AsideMessage>
 * ```
 */

export type AsideMessageType = 'note' | 'warning' | 'critical' | 'recall';

export interface AsideMessageProps {
  /** Type of message - determines color and icon */
  type: AsideMessageType;
  /** Message content (can include JSX) */
  children: React.ReactNode;
  /** Optional title for the message */
  title?: string;
  /** Optional custom className */
  className?: string;
}

/**
 * Get icon component based on message type
 */
const getIcon = (type: AsideMessageType) => {
  const iconProps = {
    size: 24,
    'aria-hidden': 'true',
  };

  switch (type) {
    case 'note':
      return <Info {...iconProps} />;
    case 'warning':
      return <AlertTriangle {...iconProps} />;
    case 'critical':
      return <AlertOctagon {...iconProps} />;
    case 'recall':
      return <Bell {...iconProps} />;
    default:
      return <Info {...iconProps} />;
  }
};

/**
 * Get default title based on message type
 */
const getDefaultTitle = (type: AsideMessageType): string => {
  switch (type) {
    case 'note':
      return 'Note';
    case 'warning':
      return 'Warning';
    case 'critical':
      return 'Critical';
    case 'recall':
      return 'Recall';
    default:
      return 'Note';
  }
};

/**
 * Get ARIA role based on message type
 */
const getAriaRole = (type: AsideMessageType): string => {
  switch (type) {
    case 'critical':
      return 'alert';
    case 'warning':
      return 'alert';
    default:
      return 'note';
  }
};

export default function AsideMessage({
  type,
  children,
  title,
  className,
}: AsideMessageProps): JSX.Element {
  const displayTitle = title || getDefaultTitle(type);
  const icon = getIcon(type);
  const ariaRole = getAriaRole(type);

  return (
    <aside
      className={clsx('aai-aside', `aai-aside-${type}`, className)}
      role={ariaRole}
      aria-labelledby={`aside-${type}-title`}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        {/* Icon */}
        <div style={{ flexShrink: 0, paddingTop: '0.125rem' }}>
          {icon}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {/* Title */}
          <div
            id={`aside-${type}-title`}
            style={{
              fontWeight: 600,
              fontSize: '1rem',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.025em',
            }}
          >
            {displayTitle}
          </div>

          {/* Message content */}
          <div style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
