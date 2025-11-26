/**
 * ButtonGroup Component
 *
 * Radio button group styled as large tappable buttons
 * Perfect for 0-3 scale selections on mobile
 */

import React from 'react';

interface ButtonOption {
  value: number;
  label: string;
  description?: string;
}

interface ButtonGroupProps {
  label: string;
  options: ButtonOption[];
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export default function ButtonGroup({
  label,
  options,
  value,
  onChange,
  className = '',
}: ButtonGroupProps): JSX.Element {
  return (
    <div className={`button-group ${className}`}>
      <label className="button-group__label">{label}</label>

      <div className="button-group__options" role="radiogroup" aria-label={label}>
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`button-group__option ${
                isSelected ? 'button-group__option--selected' : ''
              }`}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${option.label} (${option.value})`}
            >
              <span className="button-group__option-label">{option.label}</span>
              <span className="button-group__option-value">{option.value}</span>
              {option.description && (
                <span className="button-group__option-description">
                  {option.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
