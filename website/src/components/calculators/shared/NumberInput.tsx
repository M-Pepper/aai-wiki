/**
 * NumberInput Component
 *
 * Simple number input with +/- buttons for easy mobile interaction
 */

import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
  description?: string;
  className?: string;
}

export default function NumberInput({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit,
  description,
  className = '',
}: NumberInputProps): JSX.Element {
  const handleIncrement = () => {
    if (value < max) {
      onChange(Math.min(value + step, max));
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(Math.max(value - step, min));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(newValue);
  };

  return (
    <div className={`number-input ${className}`}>
      <label className="number-input__label">
        {label}
        {description && (
          <span className="number-input__description">{description}</span>
        )}
      </label>

      <div className="number-input__controls">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className="number-input__button number-input__button--decrement"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>

        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          className="number-input__input"
          aria-label={label}
        />

        {unit && <span className="number-input__unit">{unit}</span>}

        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="number-input__button number-input__button--increment"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>

      <input
        type="range"
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        className="number-input__slider"
        aria-label={`${label} slider`}
      />
    </div>
  );
}
