/**
 * ProgressSteps Component
 *
 * Shows progress through multi-step form
 */

import React from 'react';

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export default function ProgressSteps({
  steps,
  currentStep,
  className = '',
}: ProgressStepsProps): JSX.Element {
  return (
    <div className={`progress-steps ${className}`}>
      <div className="progress-steps__dots" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={steps.length}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={index}
              className={`progress-steps__dot ${
                isCompleted ? 'progress-steps__dot--completed' : ''
              } ${isCurrent ? 'progress-steps__dot--current' : ''}`}
              aria-label={`${step}${isCurrent ? ' (current)' : isCompleted ? ' (completed)' : ''}`}
            >
              {isCompleted ? '✓' : index + 1}
            </div>
          );
        })}
      </div>

      <div className="progress-steps__label">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
      </div>
    </div>
  );
}
