/**
 * ScaleVisual Component
 *
 * Simple visual representation of a scale (e.g., 0-10)
 * Shows a bar with marker at current value
 */

import React from 'react';

interface ScaleVisualProps {
  value: number;
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
}

export default function ScaleVisual({
  value,
  min,
  max,
  minLabel = '',
  maxLabel = '',
  className = '',
}: ScaleVisualProps): JSX.Element {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`scale-visual ${className}`}>
      <div className="scale-visual__track">
        <div
          className="scale-visual__fill"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="scale-visual__marker"
          style={{ left: `${percentage}%` }}
          aria-hidden="true"
        />
      </div>

      {(minLabel || maxLabel) && (
        <div className="scale-visual__labels">
          <span className="scale-visual__label scale-visual__label--min">
            {minLabel}
          </span>
          <span className="scale-visual__label scale-visual__label--max">
            {maxLabel}
          </span>
        </div>
      )}
    </div>
  );
}
