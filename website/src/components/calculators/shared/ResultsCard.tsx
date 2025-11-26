/**
 * ResultsCard Component
 *
 * Displays calculator results with severity interpretation
 */

import React from 'react';

interface ResultsCardProps {
  title: string;
  score: number;
  maxScore: number;
  interpretation: string;
  severity: 'mild' | 'moderate' | 'severe' | 'well-controlled';
  breakdown?: Array<{
    label: string;
    value: number | string;
    max?: number | string;
  }>;
  description?: string;
  className?: string;
}

export default function ResultsCard({
  title,
  score,
  maxScore,
  interpretation,
  severity,
  breakdown,
  description,
  className = '',
}: ResultsCardProps): JSX.Element {
  const severityColors = {
    'well-controlled': 'success',
    'mild': 'success',
    'moderate': 'warning',
    'severe': 'danger',
  };

  const severityColor = severityColors[severity];
  const percentage = (score / maxScore) * 100;

  return (
    <div className={`results-card ${className}`}>
      <h2 className="results-card__title">{title}</h2>

      <div className={`results-card__score results-card__score--${severityColor}`}>
        <div className="results-card__score-value">{score}</div>
        <div className="results-card__score-max">/ {maxScore}</div>
      </div>

      <div className={`results-card__severity results-card__severity--${severityColor}`}>
        {interpretation.toUpperCase()}
      </div>

      <div className="results-card__gauge">
        <div className="results-card__gauge-track">
          <div
            className={`results-card__gauge-fill results-card__gauge-fill--${severityColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="results-card__gauge-labels">
          <span>0</span>
          <span>{maxScore}</span>
        </div>
      </div>

      {breakdown && breakdown.length > 0 && (
        <div className="results-card__breakdown">
          <h3 className="results-card__breakdown-title">Score Breakdown</h3>
          <table className="results-card__breakdown-table">
            <tbody>
              {breakdown.map((item, index) => (
                <tr key={index}>
                  <td className="results-card__breakdown-label">{item.label}</td>
                  <td className="results-card__breakdown-value">
                    {item.value}
                    {item.max && ` / ${item.max}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {description && (
        <div className={`results-card__description results-card__description--${severityColor}`}>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}
