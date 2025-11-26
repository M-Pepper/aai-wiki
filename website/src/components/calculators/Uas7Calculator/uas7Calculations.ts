/**
 * UAS7 (Urticaria Activity Score over 7 days) Calculator
 *
 * Assesses chronic urticaria disease activity over a 7-day period.
 * Each day scores:
 * - Wheals: 0-3
 * - Itching: 0-3
 * Daily total: 0-6
 * Weekly total (UAS7): 0-42
 *
 * Reference: Hawro et al. (2017)
 * https://www.mdcalc.com/calc/10226/urticaria-activity-score-uas
 */

// Type definitions
export type WhealScore = 0 | 1 | 2 | 3;
export type ItchingScore = 0 | 1 | 2 | 3;

export interface DailyUasScore {
  day: number;              // 1-7
  wheals: WhealScore;       // 0-3
  itching: ItchingScore;    // 0-3
  dailyTotal?: number;      // Auto-calculated: wheals + itching (0-6)
}

export interface Uas7Input {
  dailyScores: DailyUasScore[];  // Should contain exactly 7 days
}

export interface Uas7Result {
  dailyScores: DailyUasScore[];  // Includes calculated dailyTotal for each day
  weeklyTotal: number;           // Sum of all daily totals (0-42)
  interpretation: 'well-controlled' | 'mild' | 'moderate' | 'severe';
  averageDaily: number;          // Average daily score (0-6)
}

// Score descriptions for reference
export const WHEAL_DESCRIPTIONS = {
  0: 'None',
  1: 'Mild (<20 wheals/24 hrs)',
  2: 'Moderate (20-50 wheals/24 hrs)',
  3: 'Intense (>50 wheals/24 hrs or large confluent areas)'
} as const;

export const ITCHING_DESCRIPTIONS = {
  0: 'None',
  1: 'Mild (present but not annoying or troublesome)',
  2: 'Moderate (troublesome but does not interfere with normal daily activity or sleep)',
  3: 'Intense (severe, interferes with normal daily activity or sleep)'
} as const;

/**
 * Validates that a daily score is within valid range
 */
export function validateDailyScore(score: DailyUasScore): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (score.day < 1 || score.day > 7) {
    errors.push(`Day ${score.day} is out of range (1-7)`);
  }

  if (![0, 1, 2, 3].includes(score.wheals)) {
    errors.push(`Wheals score ${score.wheals} is invalid (must be 0-3)`);
  }

  if (![0, 1, 2, 3].includes(score.itching)) {
    errors.push(`Itching score ${score.itching} is invalid (must be 0-3)`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates that exactly 7 days of data are provided
 */
export function validateUas7Input(input: Uas7Input): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check that we have exactly 7 days
  if (input.dailyScores.length !== 7) {
    errors.push(`Expected 7 days of data, got ${input.dailyScores.length}`);
  }

  // Validate each daily score
  input.dailyScores.forEach((dayScore) => {
    const validation = validateDailyScore(dayScore);
    if (!validation.valid) {
      errors.push(`Day ${dayScore.day}: ${validation.errors.join(', ')}`);
    }
  });

  // Check that days 1-7 are all present (no duplicates or missing days)
  const days = input.dailyScores.map(s => s.day).sort();
  const expectedDays = [1, 2, 3, 4, 5, 6, 7];
  const daysMatch = JSON.stringify(days) === JSON.stringify(expectedDays);

  if (!daysMatch) {
    errors.push(`Days must be numbered 1-7 without duplicates. Got: ${days.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Calculates the daily UAS score (wheals + itching)
 */
export function calculateDailyTotal(wheals: WhealScore, itching: ItchingScore): number {
  return wheals + itching;
}

/**
 * Interprets the UAS7 score severity
 * Based on clinical thresholds:
 * - Well-controlled: 0
 * - Mild: 1-6
 * - Moderate: 7-15
 * - Severe: 16-42
 *
 * Note: Score ≥11 has been validated with 74% sensitivity and 86% specificity
 */
function interpretScore(weeklyTotal: number): 'well-controlled' | 'mild' | 'moderate' | 'severe' {
  if (weeklyTotal === 0) {
    return 'well-controlled';
  } else if (weeklyTotal <= 6) {
    return 'mild';
  } else if (weeklyTotal <= 15) {
    return 'moderate';
  } else {
    return 'severe';
  }
}

/**
 * Main UAS7 calculation function
 *
 * Calculates the weekly UAS7 score by summing daily scores (wheals + itching)
 * over 7 consecutive days.
 *
 * @param input - UAS7 input data with 7 daily scores
 * @returns UAS7 result with weekly total and interpretation
 * @throws Error if input validation fails
 */
export function calculateUas7(input: Uas7Input): Uas7Result {
  // Validate input
  const validation = validateUas7Input(input);
  if (!validation.valid) {
    throw new Error(`Invalid UAS7 input: ${validation.errors.join('; ')}`);
  }

  // Calculate daily totals
  const dailyScores = input.dailyScores.map(day => ({
    ...day,
    dailyTotal: calculateDailyTotal(day.wheals, day.itching)
  }));

  // Calculate weekly total (sum of all daily totals)
  const weeklyTotal = dailyScores.reduce((sum, day) => sum + (day.dailyTotal || 0), 0);

  // Calculate average daily score
  const averageDaily = Math.round((weeklyTotal / 7) * 10) / 10; // Round to 1 decimal

  // Determine interpretation
  const interpretation = interpretScore(weeklyTotal);

  return {
    dailyScores,
    weeklyTotal,
    interpretation,
    averageDaily
  };
}

/**
 * Creates an empty UAS7 input with all values set to 0
 * Useful for initializing forms
 */
export function createEmptyInput(): Uas7Input {
  return {
    dailyScores: [
      { day: 1, wheals: 0, itching: 0 },
      { day: 2, wheals: 0, itching: 0 },
      { day: 3, wheals: 0, itching: 0 },
      { day: 4, wheals: 0, itching: 0 },
      { day: 5, wheals: 0, itching: 0 },
      { day: 6, wheals: 0, itching: 0 },
      { day: 7, wheals: 0, itching: 0 }
    ]
  };
}

/**
 * Creates a daily score entry
 * Useful for form state management
 */
export function createDailyScore(day: number, wheals: WhealScore = 0, itching: ItchingScore = 0): DailyUasScore {
  return {
    day,
    wheals,
    itching,
    dailyTotal: wheals + itching
  };
}

/**
 * Updates a specific day's score in the input
 */
export function updateDayScore(
  input: Uas7Input,
  day: number,
  wheals?: WhealScore,
  itching?: ItchingScore
): Uas7Input {
  return {
    dailyScores: input.dailyScores.map(dayScore => {
      if (dayScore.day === day) {
        return {
          ...dayScore,
          wheals: wheals !== undefined ? wheals : dayScore.wheals,
          itching: itching !== undefined ? itching : dayScore.itching
        };
      }
      return dayScore;
    })
  };
}
