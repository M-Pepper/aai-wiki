/**
 * SCORAD (SCORing Atopic Dermatitis) Calculator
 *
 * Calculates the severity of atopic dermatitis based on:
 * - Body Surface Area (A): 0-100%
 * - Intensity of 6 clinical signs (I): 0-18
 * - Subjective symptoms (S): 0-20
 *
 * Formula: SCORAD = (A/5) + (7I/2) + S
 * Range: 0-103
 *
 * Reference: European Task Force on Atopic Dermatitis (1993)
 * https://www.campus.sanofi/qa/patient-support/Atopic-Dermatitis/2022/ar/scorad
 */

// Type definitions
export type IntensityScore = 0 | 1 | 2 | 3;
export type SubjectiveScore = number; // 0-10

export interface BodyRegions {
  headNeck: number;        // BSA percentage (0-9)
  upperLimbLeft: number;   // BSA percentage (0-9)
  upperLimbRight: number;  // BSA percentage (0-9)
  lowerLimbLeft: number;   // BSA percentage (0-18)
  lowerLimbRight: number;  // BSA percentage (0-18)
  anteriorTrunk: number;   // BSA percentage (0-18)
  back: number;            // BSA percentage (0-18)
  genitals: number;        // BSA percentage (0-1)
}

export interface IntensityScores {
  redness: IntensityScore;
  swelling: IntensityScore;
  oozingCrusting: IntensityScore;
  scratchMarks: IntensityScore;
  lichenification: IntensityScore;
  dryness: IntensityScore;
}

export interface SubjectiveScores {
  itch: SubjectiveScore;        // Visual analogue scale 0-10
  sleeplessness: SubjectiveScore; // Visual analogue scale 0-10
}

export interface ScoradInput {
  bodyRegions: BodyRegions;
  intensity: IntensityScores;
  subjective: SubjectiveScores;
}

export interface ScoradResult {
  aScore: number;      // Body surface area component (0-100)
  iScore: number;      // Intensity component (0-18)
  sScore: number;      // Subjective component (0-20)
  totalScore: number;  // Final SCORAD (0-103)
  interpretation: 'mild' | 'moderate' | 'severe';
}

// Maximum BSA values for each region according to SCORAD methodology
const REGION_MAX_BSA: Record<keyof BodyRegions, number> = {
  headNeck: 9,
  upperLimbLeft: 9,
  upperLimbRight: 9,
  lowerLimbLeft: 18,
  lowerLimbRight: 18,
  anteriorTrunk: 18,
  back: 18,
  genitals: 1
};

/**
 * Validates that all body region BSA values are within valid range (0-maxBSA for each region)
 */
export function validateBodyRegions(regions: BodyRegions): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  Object.entries(regions).forEach(([region, bsaValue]) => {
    const maxBsa = REGION_MAX_BSA[region as keyof BodyRegions];
    if (bsaValue < 0 || bsaValue > maxBsa) {
      errors.push(`${region}: ${bsaValue}% is out of range (0-${maxBsa})`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates that total BSA does not exceed 100%
 * Note: This is a warning, not a hard error, as clinical assessment may vary
 */
export function validateTotalBsa(regions: BodyRegions): { valid: boolean; totalBsa: number; warning?: string } {
  const totalBsa = calculateTotalBsa(regions);

  return {
    valid: true, // Don't block calculation
    totalBsa,
    warning: totalBsa > 100
      ? `Total BSA (${totalBsa.toFixed(1)}%) exceeds 100%. Please review region assessments.`
      : undefined
  };
}

/**
 * Validates intensity scores are within range (0-3)
 */
export function validateIntensity(intensity: IntensityScores): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  Object.entries(intensity).forEach(([item, score]) => {
    if (![0, 1, 2, 3].includes(score)) {
      errors.push(`${item}: ${score} is not a valid intensity score (0-3)`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates subjective scores are within range (0-10)
 */
export function validateSubjective(subjective: SubjectiveScores): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (subjective.itch < 0 || subjective.itch > 10) {
    errors.push(`Itch score ${subjective.itch} is out of range (0-10)`);
  }

  if (subjective.sleeplessness < 0 || subjective.sleeplessness > 10) {
    errors.push(`Sleeplessness score ${subjective.sleeplessness} is out of range (0-10)`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Calculates the total Body Surface Area affected
 * Used for validation and display purposes
 */
export function calculateTotalBsa(regions: BodyRegions): number {
  return Object.values(regions).reduce((total, bsaValue) => total + bsaValue, 0);
}

/**
 * Calculates the A score (Body Surface Area component)
 * A = sum of BSA percentages for all affected body regions
 */
function calculateAScore(regions: BodyRegions): number {
  return Object.values(regions).reduce((sum, bsaValue) => sum + bsaValue, 0);
}

/**
 * Calculates the I score (Intensity component)
 * I = sum of 6 intensity items (range: 0-18)
 */
function calculateIScore(intensity: IntensityScores): number {
  return Object.values(intensity).reduce((sum, score) => sum + score, 0);
}

/**
 * Calculates the S score (Subjective component)
 * S = itch + sleeplessness (range: 0-20)
 */
function calculateSScore(subjective: SubjectiveScores): number {
  return subjective.itch + subjective.sleeplessness;
}

/**
 * Interprets the SCORAD score severity
 * Based on common clinical thresholds:
 * - Mild: < 25
 * - Moderate: 25-50
 * - Severe: > 50
 */
function interpretScore(totalScore: number): 'mild' | 'moderate' | 'severe' {
  if (totalScore < 25) {
    return 'mild';
  } else if (totalScore < 50) {
    return 'moderate';
  } else {
    return 'severe';
  }
}

/**
 * Main SCORAD calculation function
 *
 * Formula: SCORAD = (A/5) + (7I/2) + S
 * Where:
 * - A = Body Surface Area score (0-100)
 * - I = Intensity score (0-18)
 * - S = Subjective score (0-20)
 *
 * @param input - SCORAD input data
 * @returns SCORAD result with component scores and interpretation
 * @throws Error if input validation fails
 */
export function calculateScorad(input: ScoradInput): ScoradResult {
  // Validate inputs
  const bodyValidation = validateBodyRegions(input.bodyRegions);
  if (!bodyValidation.valid) {
    throw new Error(`Invalid body regions: ${bodyValidation.errors.join(', ')}`);
  }

  const intensityValidation = validateIntensity(input.intensity);
  if (!intensityValidation.valid) {
    throw new Error(`Invalid intensity scores: ${intensityValidation.errors.join(', ')}`);
  }

  const subjectiveValidation = validateSubjective(input.subjective);
  if (!subjectiveValidation.valid) {
    throw new Error(`Invalid subjective scores: ${subjectiveValidation.errors.join(', ')}`);
  }

  // Calculate component scores
  const aScore = calculateAScore(input.bodyRegions);
  const iScore = calculateIScore(input.intensity);
  const sScore = calculateSScore(input.subjective);

  // Calculate total SCORAD using the formula: (A/5) + (7I/2) + S
  const totalScore = (aScore / 5) + (7 * iScore / 2) + sScore;

  // Determine interpretation
  const interpretation = interpretScore(totalScore);

  return {
    aScore: Math.round(aScore * 10) / 10,  // Round to 1 decimal place
    iScore,
    sScore,
    totalScore: Math.round(totalScore * 10) / 10,  // Round to 1 decimal place
    interpretation
  };
}

/**
 * Creates an empty SCORAD input with all values set to 0
 * Useful for initializing forms
 */
export function createEmptyInput(): ScoradInput {
  return {
    bodyRegions: {
      headNeck: 0,
      upperLimbLeft: 0,
      upperLimbRight: 0,
      lowerLimbLeft: 0,
      lowerLimbRight: 0,
      anteriorTrunk: 0,
      back: 0,
      genitals: 0
    },
    intensity: {
      redness: 0,
      swelling: 0,
      oozingCrusting: 0,
      scratchMarks: 0,
      lichenification: 0,
      dryness: 0
    },
    subjective: {
      itch: 0,
      sleeplessness: 0
    }
  };
}
