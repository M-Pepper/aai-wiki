/**
 * UAS7 Calculator Component
 *
 * 7-day urticaria activity tracking calculator
 */

import React, { useState, useRef } from 'react';
import {
  calculateUas7,
  createEmptyInput,
  type Uas7Input,
  type WhealScore,
  type ItchingScore,
  WHEAL_DESCRIPTIONS,
  ITCHING_DESCRIPTIONS,
} from './uas7Calculations';
import ButtonGroup from '../shared/ButtonGroup';
import ProgressSteps from '../shared/ProgressSteps';
import ResultsCard from '../shared/ResultsCard';
import '../../../css/calculator.css';

const WHEALS_OPTIONS = [
  { value: 0, label: 'None', description: WHEAL_DESCRIPTIONS[0] },
  { value: 1, label: '< 20', description: 'Mild' },
  { value: 2, label: '20-50', description: 'Moderate' },
  { value: 3, label: '> 50', description: 'Intense' },
];

const ITCHING_OPTIONS = [
  { value: 0, label: 'None', description: ITCHING_DESCRIPTIONS[0] },
  { value: 1, label: 'Mild', description: 'Present but not troublesome' },
  { value: 2, label: 'Moderate', description: 'Troublesome' },
  { value: 3, label: 'Severe', description: 'Interferes with activity' },
];

const DAYS = [1, 2, 3, 4, 5, 6, 7];

export default function Uas7Calculator(): JSX.Element {
  const [input, setInput] = useState<Uas7Input>(createEmptyInput());
  const [currentDay, setCurrentDay] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof calculateUas7> | null>(null);
  const [showResults, setShowResults] = useState(false);
  const calculatorRef = useRef<HTMLDivElement>(null);

  // Update wheals score for current day
  const updateWheals = (value: WhealScore) => {
    setInput(prev => ({
      dailyScores: prev.dailyScores.map((day, index) =>
        index === currentDay ? { ...day, wheals: value } : day
      ),
    }));
  };

  // Update itching score for current day
  const updateItching = (value: ItchingScore) => {
    setInput(prev => ({
      dailyScores: prev.dailyScores.map((day, index) =>
        index === currentDay ? { ...day, itching: value } : day
      ),
    }));
  };

  // Get current day data
  const getCurrentDayData = () => {
    return input.dailyScores[currentDay];
  };

  // Calculate current day total
  const getCurrentDayTotal = () => {
    const day = getCurrentDayData();
    return day.wheals + day.itching;
  };

  // Check if all days are completed
  const allDaysCompleted = () => {
    return input.dailyScores.every(day =>
      day.wheals !== undefined && day.itching !== undefined
    );
  };

  // Scroll to top of calculator container
  const scrollToTop = () => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Navigate to next day
  const handleNextDay = () => {
    if (currentDay < 6) {
      setCurrentDay(currentDay + 1);
      scrollToTop();
    }
  };

  // Navigate to previous day
  const handlePreviousDay = () => {
    if (currentDay > 0) {
      setCurrentDay(currentDay - 1);
      scrollToTop();
    }
  };

  // Calculate final result
  const handleCalculate = () => {
    try {
      const calculatedResult = calculateUas7(input);
      setResult(calculatedResult);
      setShowResults(true);
      scrollToTop();
    } catch (error) {
      alert('Please complete all 7 days before calculating');
    }
  };

  // Reset calculator
  const handleReset = () => {
    setInput(createEmptyInput());
    setResult(null);
    setShowResults(false);
    setCurrentDay(0);
    scrollToTop();
  };

  // Render daily scoring form
  const renderDailyScoring = () => {
    const dayData = getCurrentDayData();
    const dayTotal = getCurrentDayTotal();

    return (
      <div className="calculator-step">
        <h2>Day {currentDay + 1} of 7</h2>
        <p>Score your hives and itching for this day:</p>

        <ButtonGroup
          label="Wheals (Number of hives in past 24 hours)"
          options={WHEALS_OPTIONS}
          value={dayData.wheals}
          onChange={(value) => updateWheals(value as WhealScore)}
        />

        <ButtonGroup
          label="Itching (Pruritus severity)"
          options={ITCHING_OPTIONS}
          value={dayData.itching}
          onChange={(value) => updateItching(value as ItchingScore)}
        />

        <div className="calculator-total">
          Daily Total: {dayTotal} / 6
        </div>

        {/* Summary of all days */}
        <div className="week-summary">
          <h3>Week Summary</h3>
          <div className="week-summary__grid">
            {DAYS.map((day) => {
              const dayIndex = day - 1;
              const dayScore = input.dailyScores[dayIndex];
              const total = dayScore.wheals + dayScore.itching;
              const isCurrent = dayIndex === currentDay;

              return (
                <div
                  key={day}
                  className={`week-summary__day ${isCurrent ? 'week-summary__day--current' : ''}`}
                  onClick={() => {
                    setCurrentDay(dayIndex);
                    scrollToTop();
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setCurrentDay(dayIndex);
                      scrollToTop();
                    }
                  }}
                  aria-label={`Go to Day ${day}`}
                >
                  <div className="week-summary__day-label">D{day}</div>
                  <div className="week-summary__day-score">{total > 0 ? total : '-'}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Render results
  const renderResults = () => {
    if (!result) {
      return (
        <div className="calculator-step">
          <p>Calculating results...</p>
        </div>
      );
    }

    const getSeverityDescription = () => {
      switch (result.interpretation) {
        case 'well-controlled':
          return 'Score indicates well-controlled urticaria (UAS7 = 0).';
        case 'mild':
          return 'Score indicates mild urticaria activity (UAS7 1-6).';
        case 'moderate':
          return 'Score indicates moderate urticaria activity (UAS7 7-15).';
        case 'severe':
          return 'Score indicates severe urticaria activity (UAS7 16-42). A score ≥11 has been validated for identifying patients requiring therapeutic intervention.';
        default:
          return '';
      }
    };

    // Create breakdown with daily scores
    const dailyBreakdown = result.dailyScores.map((day) => ({
      label: `Day ${day.day}`,
      value: `${day.wheals} + ${day.itching}`,
      max: day.dailyTotal,
    }));

    return (
      <ResultsCard
        title="UAS7 Results"
        score={result.weeklyTotal}
        maxScore={42}
        interpretation={result.interpretation}
        severity={result.interpretation}
        breakdown={[
          {
            label: 'Weekly Total',
            value: result.weeklyTotal,
            max: '42',
          },
          {
            label: 'Average Daily Score',
            value: result.averageDaily.toFixed(1),
            max: '6.0',
          },
          ...dailyBreakdown,
        ]}
        description={getSeverityDescription()}
      />
    );
  };

  if (showResults) {
    return (
      <div className="calculator-container" ref={calculatorRef}>
        <h1>UAS7 Calculator</h1>
        <p>Urticaria Activity Score (7-day)</p>

        {renderResults()}

        <div className="calculator-actions">
          <button
            type="button"
            onClick={handleReset}
            className="calculator-button calculator-button--secondary"
          >
            ↻ Start Over
          </button>
          <button
            type="button"
            onClick={() => setShowResults(false)}
            className="calculator-button calculator-button--secondary"
          >
            ← Edit Scores
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="calculator-container" ref={calculatorRef}>
      <h1>UAS7 Calculator</h1>
      <p>Track your urticaria activity over 7 consecutive days</p>

      <ProgressSteps
        steps={DAYS.map(d => `Day ${d}`)}
        currentStep={currentDay}
      />

      {renderDailyScoring()}

      <div className="calculator-actions">
        {currentDay > 0 && (
          <button
            type="button"
            onClick={handlePreviousDay}
            className="calculator-button calculator-button--secondary"
          >
            ← Day {currentDay}
          </button>
        )}

        {currentDay < 6 && (
          <button
            type="button"
            onClick={handleNextDay}
            className="calculator-button calculator-button--primary"
          >
            Day {currentDay + 2} →
          </button>
        )}

        {allDaysCompleted() && (
          <button
            type="button"
            onClick={handleCalculate}
            className="calculator-button calculator-button--primary"
          >
            Calculate Score
          </button>
        )}
      </div>
    </div>
  );
}
