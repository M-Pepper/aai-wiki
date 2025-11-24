import React, { useState } from 'react';
import './DismissibleBanner.css';

export interface DismissibleBannerProps {
  /** Unique ID for localStorage persistence */
  id: string;
  /** Banner message content (can include JSX) */
  children: React.ReactNode;
  /** Banner color variant */
  variant?: 'info' | 'warning' | 'success' | 'danger';
}

export default function DismissibleBanner({
  id,
  children,
  variant = 'info'
}: DismissibleBannerProps): JSX.Element | null {
  const storageKey = `banner-dismissed-${id}`;

  const [isVisible, setIsVisible] = useState(() => {
    // Check if banner was previously dismissed
    if (typeof window !== 'undefined') {
      return localStorage.getItem(storageKey) !== 'true';
    }
    return true;
  });

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, 'true');
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`dismissible-banner dismissible-banner--${variant}`}>
      <div className="dismissible-banner__content">
        {children}
      </div>
      <button
        className="dismissible-banner__close"
        onClick={handleDismiss}
        aria-label="Dismiss banner"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 18L18 6M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
