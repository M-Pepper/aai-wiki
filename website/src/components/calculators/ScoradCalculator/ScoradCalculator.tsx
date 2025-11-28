/**
 * SCORAD Calculator Component
 *
 * Multi-step calculator for Atopic Dermatitis severity scoring
 */

import React, { useState, useRef } from 'react';
import {
  calculateScorad,
  createEmptyInput,
  type ScoradInput,
  type IntensityScore,
} from './scoradCalculations';
import NumberInput from '../shared/NumberInput';
import ButtonGroup from '../shared/ButtonGroup';
import ProgressSteps from '../shared/ProgressSteps';
import ScaleVisual from '../shared/ScaleVisual';
import ResultsCard from '../shared/ResultsCard';
import '../../../css/calculator.css';

const STEPS = ['Body Surface Area', 'Intensity', 'Symptoms', 'Results'];

const INTENSITY_OPTIONS = [
  { value: 0, label: 'None' },
  { value: 1, label: 'Mild' },
  { value: 2, label: 'Moderate' },
  { value: 3, label: 'Severe' },
];

const BODY_REGIONS = [
  { key: 'headNeck', label: 'Head & Neck', maxBsa: 9 },
  { key: 'upperLimbLeft', label: 'Upper Limb - Left', maxBsa: 9 },
  { key: 'upperLimbRight', label: 'Upper Limb - Right', maxBsa: 9 },
  { key: 'lowerLimbLeft', label: 'Lower Limb - Left', maxBsa: 18 },
  { key: 'lowerLimbRight', label: 'Lower Limb - Right', maxBsa: 18 },
  { key: 'anteriorTrunk', label: 'Anterior Trunk', maxBsa: 18 },
  { key: 'back', label: 'Back', maxBsa: 18 },
  { key: 'genitals', label: 'Genitals', maxBsa: 1 },
];

const INTENSITY_ITEMS = [
  { key: 'redness', label: 'Redness (Erythema)' },
  { key: 'swelling', label: 'Swelling (Edema/Papulation)' },
  { key: 'oozingCrusting', label: 'Oozing/Crusting' },
  { key: 'scratchMarks', label: 'Scratch Marks (Excoriation)' },
  { key: 'lichenification', label: 'Skin Thickening (Lichenification)' },
  { key: 'dryness', label: 'Dryness' },
];

export default function ScoradCalculator(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const [input, setInput] = useState<ScoradInput>(createEmptyInput());
  const [result, setResult] = useState<ReturnType<typeof calculateScorad> | null>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  // Calculate total BSA for display
  const calculateTotalBsa = () => {
    return Object.entries(input.bodyRegions).reduce((total, [key, percentage]) => {
      const region = BODY_REGIONS.find(r => r.key === key);
      if (!region) return total;
      return total + (percentage * region.maxBsa / 100);
    }, 0);
  };

  // Update body region percentage
  const updateBodyRegion = (key: string, value: number) => {
    setInput(prev => ({
      ...prev,
      bodyRegions: {
        ...prev.bodyRegions,
        [key]: value,
      },
    }));
  };

  // Update intensity score
  const updateIntensity = (key: string, value: IntensityScore) => {
    setInput(prev => ({
      ...prev,
      intensity: {
        ...prev.intensity,
        [key]: value,
      },
    }));
  };

  // Update subjective score
  const updateSubjective = (key: 'itch' | 'sleeplessness', value: number) => {
    setInput(prev => ({
      ...prev,
      subjective: {
        ...prev.subjective,
        [key]: value,
      },
    }));
  };

  // Scroll to top of calculator container
  const scrollToTop = () => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Navigate to next step
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollToTop();
    }
  };

  // Navigate to previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollToTop();
    }
  };

  // Calculate final result
  const handleCalculate = () => {
    const calculatedResult = calculateScorad(input);
    setResult(calculatedResult);
    setCurrentStep(3); // Go to results step
    scrollToTop();
  };

  // Reset calculator
  const handleReset = () => {
    setInput(createEmptyInput());
    setResult(null);
    setCurrentStep(0);
    scrollToTop();
  };

  // Render Step 1: Body Surface Area
  const renderBodySurfaceStep = () => (
    <div className="calculator-step">
      <h2>Body Surface Area</h2>
      <p>Estimate the percentage of each body region affected by atopic dermatitis:</p>

      <div className="number-input-grid">
        {BODY_REGIONS.map(region => (
          <NumberInput
            key={region.key}
            label={region.label}
            description={`Maximum: ${region.maxBsa}% of total BSA`}
            value={input.bodyRegions[region.key as keyof typeof input.bodyRegions]}
            min={0}
            max={100}
            step={5}
            unit="%"
            onChange={(value) => updateBodyRegion(region.key, value)}
          />
        ))}
      </div>

      <div className="calculator-total">
        Total BSA: {calculateTotalBsa().toFixed(1)}%
      </div>
    </div>
  );

  // Render Step 2: Intensity
  const renderIntensityStep = () => {
    const intensityTotal = Object.values(input.intensity).reduce((sum, val) => sum + val, 0);

    return (
      <div className="calculator-step">
        <h2>Intensity of Clinical Signs</h2>
        <p>Rate the intensity of these 6 signs (assess the most affected area):</p>

        {INTENSITY_ITEMS.map(item => (
          <ButtonGroup
            key={item.key}
            label={item.label}
            options={INTENSITY_OPTIONS}
            value={input.intensity[item.key as keyof typeof input.intensity]}
            onChange={(value) => updateIntensity(item.key, value as IntensityScore)}
          />
        ))}

        <div className="calculator-total">
          Intensity Score: {intensityTotal} / 18
        </div>
      </div>
    );
  };

  // Render Step 3: Subjective Symptoms
  const renderSubjectiveStep = () => {
    const subjectiveTotal = input.subjective.itch + input.subjective.sleeplessness;

    return (
      <div className="calculator-step">
        <h2>Subjective Symptoms</h2>
        <p>Rate these symptoms over the past 3 days:</p>

        <div style={{ marginBottom: '2rem' }}>
          <NumberInput
            label="Itching (Pruritus)"
            value={input.subjective.itch}
            min={0}
            max={10}
            step={1}
            onChange={(value) => updateSubjective('itch', value)}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <NumberInput
            label="Sleep Loss (Sleeplessness)"
            value={input.subjective.sleeplessness}
            min={0}
            max={10}
            step={1}
            onChange={(value) => updateSubjective('sleeplessness', value)}
          />
        </div>

        <div className="calculator-total">
          Subjective Score: {subjectiveTotal} / 20
        </div>
      </div>
    );
  };

  // Render Step 4: Results
  const renderResultsStep = () => {
    if (!result) {
      return (
        <div className="calculator-step">
          <p>Calculating results...</p>
        </div>
      );
    }

    const getSeverityDescription = () => {
      switch (result.interpretation) {
        case 'mild':
          return 'Score indicates mild atopic dermatitis severity (SCORAD < 25).';
        case 'moderate':
          return 'Score indicates moderate atopic dermatitis severity (SCORAD 25-50).';
        case 'severe':
          return 'Score indicates severe atopic dermatitis severity (SCORAD > 50).';
        default:
          return '';
      }
    };

    return (
      <ResultsCard
        title="SCORAD Results"
        score={result.totalScore}
        maxScore={103}
        interpretation={result.interpretation}
        severity={result.interpretation}
        breakdown={[
          {
            label: 'A (Body Surface Area)',
            value: result.aScore.toFixed(1),
            max: '100.0',
          },
          {
            label: 'I (Intensity)',
            value: result.iScore,
            max: '18',
          },
          {
            label: 'S (Subjective)',
            value: result.sScore,
            max: '20',
          },
        ]}
        description={getSeverityDescription()}
      />
    );
  };

  return (
    <div className="calculator-container" ref={calculatorRef}>
      <h1>SCORAD Calculator</h1>
      <p>SCORing Atopic Dermatitis - Severity assessment tool</p>

      <ProgressSteps steps={STEPS} currentStep={currentStep} isComplete={currentStep === 3 && result !== null} />

      {currentStep === 0 && renderBodySurfaceStep()}
      {currentStep === 1 && renderIntensityStep()}
      {currentStep === 2 && renderSubjectiveStep()}
      {currentStep === 3 && renderResultsStep()}

      <div className="calculator-actions">
        {currentStep > 0 && currentStep < 3 && (
          <button
            type="button"
            onClick={handleBack}
            className="calculator-button calculator-button--secondary"
          >
            ← Back
          </button>
        )}

        {currentStep < 2 && (
          <button
            type="button"
            onClick={handleNext}
            className="calculator-button calculator-button--primary"
          >
            Continue →
          </button>
        )}

        {currentStep === 2 && (
          <button
            type="button"
            onClick={handleCalculate}
            className="calculator-button calculator-button--primary"
          >
            Calculate Score
          </button>
        )}

        {currentStep === 3 && (
          <>
            <button
              type="button"
              onClick={handleReset}
              className="calculator-button calculator-button--secondary"
            >
              ↻ Start Over
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(0)}
              className="calculator-button calculator-button--secondary"
            >
              ← Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
