/**
 * Unit tests for UAS7 calculator
 */

import {
  calculateUas7,
  createEmptyInput,
  createDailyScore,
  updateDayScore,
  validateDailyScore,
  validateUas7Input,
  calculateDailyTotal,
  type Uas7Input,
  type DailyUasScore
} from './uas7Calculations';

describe('UAS7 Calculator', () => {
  describe('createEmptyInput', () => {
    test('creates empty input with 7 days of zeros', () => {
      const input = createEmptyInput();

      expect(input.dailyScores).toHaveLength(7);
      expect(input.dailyScores[0].day).toBe(1);
      expect(input.dailyScores[0].wheals).toBe(0);
      expect(input.dailyScores[0].itching).toBe(0);
      expect(input.dailyScores[6].day).toBe(7);
    });
  });

  describe('createDailyScore', () => {
    test('creates daily score with defaults', () => {
      const score = createDailyScore(1);

      expect(score.day).toBe(1);
      expect(score.wheals).toBe(0);
      expect(score.itching).toBe(0);
      expect(score.dailyTotal).toBe(0);
    });

    test('creates daily score with specified values', () => {
      const score = createDailyScore(3, 2, 1);

      expect(score.day).toBe(3);
      expect(score.wheals).toBe(2);
      expect(score.itching).toBe(1);
      expect(score.dailyTotal).toBe(3);
    });
  });

  describe('updateDayScore', () => {
    test('updates wheals for specific day', () => {
      const input = createEmptyInput();
      const updated = updateDayScore(input, 3, 2);

      expect(updated.dailyScores[2].wheals).toBe(2);
      expect(updated.dailyScores[2].itching).toBe(0);
      expect(updated.dailyScores[0].wheals).toBe(0); // Others unchanged
    });

    test('updates itching for specific day', () => {
      const input = createEmptyInput();
      const updated = updateDayScore(input, 5, undefined, 3);

      expect(updated.dailyScores[4].wheals).toBe(0);
      expect(updated.dailyScores[4].itching).toBe(3);
    });

    test('updates both scores for specific day', () => {
      const input = createEmptyInput();
      const updated = updateDayScore(input, 2, 1, 2);

      expect(updated.dailyScores[1].wheals).toBe(1);
      expect(updated.dailyScores[1].itching).toBe(2);
    });
  });

  describe('calculateDailyTotal', () => {
    test('calculates daily total correctly', () => {
      expect(calculateDailyTotal(0, 0)).toBe(0);
      expect(calculateDailyTotal(1, 2)).toBe(3);
      expect(calculateDailyTotal(3, 3)).toBe(6);
      expect(calculateDailyTotal(2, 1)).toBe(3);
    });
  });

  describe('calculateUas7 - basic cases', () => {
    test('calculates zero score for no symptoms', () => {
      const input = createEmptyInput();
      const result = calculateUas7(input);

      expect(result.weeklyTotal).toBe(0);
      expect(result.averageDaily).toBe(0);
      expect(result.interpretation).toBe('well-controlled');
      expect(result.dailyScores).toHaveLength(7);
    });

    test('calculates maximum possible score (42)', () => {
      const input: Uas7Input = {
        dailyScores: [
          { day: 1, wheals: 3, itching: 3 },
          { day: 2, wheals: 3, itching: 3 },
          { day: 3, wheals: 3, itching: 3 },
          { day: 4, wheals: 3, itching: 3 },
          { day: 5, wheals: 3, itching: 3 },
          { day: 6, wheals: 3, itching: 3 },
          { day: 7, wheals: 3, itching: 3 }
        ]
      };

      const result = calculateUas7(input);

      expect(result.weeklyTotal).toBe(42);
      expect(result.averageDaily).toBe(6);
      expect(result.interpretation).toBe('severe');
    });

    test('calculates daily totals for each day', () => {
      const input: Uas7Input = {
        dailyScores: [
          { day: 1, wheals: 1, itching: 2 },
          { day: 2, wheals: 2, itching: 1 },
          { day: 3, wheals: 0, itching: 3 },
          { day: 4, wheals: 3, itching: 0 },
          { day: 5, wheals: 1, itching: 1 },
          { day: 6, wheals: 2, itching: 2 },
          { day: 7, wheals: 0, itching: 0 }
        ]
      };

      const result = calculateUas7(input);

      expect(result.dailyScores[0].dailyTotal).toBe(3);
      expect(result.dailyScores[1].dailyTotal).toBe(3);
      expect(result.dailyScores[2].dailyTotal).toBe(3);
      expect(result.dailyScores[3].dailyTotal).toBe(3);
      expect(result.dailyScores[4].dailyTotal).toBe(2);
      expect(result.dailyScores[5].dailyTotal).toBe(4);
      expect(result.dailyScores[6].dailyTotal).toBe(0);
    });

    test('calculates weekly total correctly', () => {
      const input: Uas7Input = {
        dailyScores: [
          { day: 1, wheals: 1, itching: 1 }, // 2
          { day: 2, wheals: 2, itching: 1 }, // 3
          { day: 3, wheals: 1, itching: 2 }, // 3
          { day: 4, wheals: 0, itching: 1 }, // 1
          { day: 5, wheals: 2, itching: 2 }, // 4
          { day: 6, wheals: 1, itching: 0 }, // 1
          { day: 7, wheals: 0, itching: 0 }  // 0
        ]
      };

      const result = calculateUas7(input);

      expect(result.weeklyTotal).toBe(14); // 2+3+3+1+4+1+0
      expect(result.averageDaily).toBe(2); // 14/7 = 2.0
    });
  });

  describe('calculateUas7 - interpretation thresholds', () => {
    test('interprets score = 0 as well-controlled', () => {
      const input = createEmptyInput();
      const result = calculateUas7(input);

      expect(result.weeklyTotal).toBe(0);
      expect(result.interpretation).toBe('well-controlled');
    });

    test('interprets score 1-6 as mild', () => {
      const input = createEmptyInput();
      input.dailyScores[0].wheals = 1;
      input.dailyScores[1].itching = 1;
      input.dailyScores[2].wheals = 1;
      input.dailyScores[2].itching = 1;
      // Total: 1 + 1 + 2 = 4

      const result = calculateUas7(input);

      expect(result.weeklyTotal).toBe(4);
      expect(result.interpretation).toBe('mild');
    });

    test('interprets score 7-15 as moderate', () => {
      const input: Uas7Input = {
        dailyScores: [
          { day: 1, wheals: 1, itching: 1 }, // 2
          { day: 2, wheals: 1, itching: 1 }, // 2
          { day: 3, wheals: 1, itching: 1 }, // 2
          { day: 4, wheals: 1, itching: 1 }, // 2
          { day: 5, wheals: 1, itching: 1 }, // 2
          { day: 6, wheals: 0, itching: 0 }, // 0
          { day: 7, wheals: 0, itching: 0 }  // 0
        ]
      };

      const result = calculateUas7(input);

      expect(result.weeklyTotal).toBe(10);
      expect(result.interpretation).toBe('moderate');
    });

    test('interprets score 16-42 as severe', () => {
      const input: Uas7Input = {
        dailyScores: [
          { day: 1, wheals: 2, itching: 2 }, // 4
          { day: 2, wheals: 2, itching: 2 }, // 4
          { day: 3, wheals: 2, itching: 0 }, // 2
          { day: 4, wheals: 2, itching: 2 }, // 4
          { day: 5, wheals: 1, itching: 1 }, // 2
          { day: 6, wheals: 0, itching: 0 }, // 0
          { day: 7, wheals: 0, itching: 0 }  // 0
        ]
      };

      const result = calculateUas7(input);

      expect(result.weeklyTotal).toBe(16);
      expect(result.interpretation).toBe('severe');
    });

    test('interprets boundary score = 6 as mild', () => {
      const input = createEmptyInput();
      input.dailyScores[0].wheals = 3;
      input.dailyScores[0].itching = 3; // Day 1 = 6

      const result = calculateUas7(input);

      expect(result.weeklyTotal).toBe(6);
      expect(result.interpretation).toBe('mild');
    });

    test('interprets boundary score = 7 as moderate', () => {
      const input = createEmptyInput();
      input.dailyScores[0].wheals = 3;
      input.dailyScores[0].itching = 3; // Day 1 = 6
      input.dailyScores[1].wheals = 1;  // Day 2 = 1
      // Total = 7

      const result = calculateUas7(input);

      expect(result.weeklyTotal).toBe(7);
      expect(result.interpretation).toBe('moderate');
    });

    test('interprets boundary score = 15 as moderate', () => {
      const input: Uas7Input = {
        dailyScores: [
          { day: 1, wheals: 2, itching: 1 }, // 3
          { day: 2, wheals: 1, itching: 2 }, // 3
          { day: 3, wheals: 2, itching: 1 }, // 3
          { day: 4, wheals: 1, itching: 2 }, // 3
          { day: 5, wheals: 2, itching: 1 }, // 3
          { day: 6, wheals: 0, itching: 0 }, // 0
          { day: 7, wheals: 0, itching: 0 }  // 0
        ]
      };

      const result = calculateUas7(input);

      expect(result.weeklyTotal).toBe(15);
      expect(result.interpretation).toBe('moderate');
    });

    test('interprets boundary score = 16 as severe', () => {
      const input: Uas7Input = {
        dailyScores: [
          { day: 1, wheals: 2, itching: 1 }, // 3
          { day: 2, wheals: 1, itching: 2 }, // 3
          { day: 3, wheals: 2, itching: 1 }, // 3
          { day: 4, wheals: 1, itching: 2 }, // 3
          { day: 5, wheals: 2, itching: 1 }, // 3
          { day: 6, wheals: 1, itching: 0 }, // 1
          { day: 7, wheals: 0, itching: 0 }  // 0
        ]
      };

      const result = calculateUas7(input);

      expect(result.weeklyTotal).toBe(16);
      expect(result.interpretation).toBe('severe');
    });
  });

  describe('calculateUas7 - average daily calculation', () => {
    test('calculates average daily score correctly', () => {
      const input: Uas7Input = {
        dailyScores: [
          { day: 1, wheals: 2, itching: 2 }, // 4
          { day: 2, wheals: 1, itching: 1 }, // 2
          { day: 3, wheals: 3, itching: 3 }, // 6
          { day: 4, wheals: 0, itching: 0 }, // 0
          { day: 5, wheals: 1, itching: 2 }, // 3
          { day: 6, wheals: 2, itching: 1 }, // 3
          { day: 7, wheals: 1, itching: 1 }  // 2
        ]
      };

      const result = calculateUas7(input);

      expect(result.weeklyTotal).toBe(20);
      expect(result.averageDaily).toBe(2.9); // 20/7 ≈ 2.857 → 2.9
    });
  });

  describe('validation functions', () => {
    describe('validateDailyScore', () => {
      test('accepts valid daily scores', () => {
        const score: DailyUasScore = {
          day: 3,
          wheals: 2,
          itching: 1
        };

        const result = validateDailyScore(score);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      test('rejects day < 1', () => {
        const score: DailyUasScore = {
          day: 0,
          wheals: 1,
          itching: 1
        };

        const result = validateDailyScore(score);
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('Day 0');
      });

      test('rejects day > 7', () => {
        const score: DailyUasScore = {
          day: 8,
          wheals: 1,
          itching: 1
        };

        const result = validateDailyScore(score);
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('Day 8');
      });

      test('rejects invalid wheals score', () => {
        const score: any = {
          day: 1,
          wheals: 4,
          itching: 1
        };

        const result = validateDailyScore(score);
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('Wheals');
      });

      test('rejects invalid itching score', () => {
        const score: any = {
          day: 1,
          wheals: 1,
          itching: 5
        };

        const result = validateDailyScore(score);
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('Itching');
      });
    });

    describe('validateUas7Input', () => {
      test('accepts valid 7-day input', () => {
        const input = createEmptyInput();
        const result = validateUas7Input(input);

        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      test('rejects input with less than 7 days', () => {
        const input: Uas7Input = {
          dailyScores: [
            { day: 1, wheals: 0, itching: 0 },
            { day: 2, wheals: 0, itching: 0 }
          ]
        };

        const result = validateUas7Input(input);
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('Expected 7 days');
      });

      test('rejects input with more than 7 days', () => {
        const input: Uas7Input = {
          dailyScores: [
            { day: 1, wheals: 0, itching: 0 },
            { day: 2, wheals: 0, itching: 0 },
            { day: 3, wheals: 0, itching: 0 },
            { day: 4, wheals: 0, itching: 0 },
            { day: 5, wheals: 0, itching: 0 },
            { day: 6, wheals: 0, itching: 0 },
            { day: 7, wheals: 0, itching: 0 },
            { day: 8, wheals: 0, itching: 0 }
          ]
        };

        const result = validateUas7Input(input);
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('Expected 7 days');
      });

      test('rejects input with duplicate days', () => {
        const input: Uas7Input = {
          dailyScores: [
            { day: 1, wheals: 0, itching: 0 },
            { day: 1, wheals: 0, itching: 0 },
            { day: 3, wheals: 0, itching: 0 },
            { day: 4, wheals: 0, itching: 0 },
            { day: 5, wheals: 0, itching: 0 },
            { day: 6, wheals: 0, itching: 0 },
            { day: 7, wheals: 0, itching: 0 }
          ]
        };

        const result = validateUas7Input(input);
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('Days must be numbered 1-7');
      });

      test('rejects input with missing days', () => {
        const input: Uas7Input = {
          dailyScores: [
            { day: 1, wheals: 0, itching: 0 },
            { day: 2, wheals: 0, itching: 0 },
            { day: 3, wheals: 0, itching: 0 },
            { day: 5, wheals: 0, itching: 0 },
            { day: 6, wheals: 0, itching: 0 },
            { day: 7, wheals: 0, itching: 0 },
            { day: 8, wheals: 0, itching: 0 }
          ]
        };

        const result = validateUas7Input(input);
        expect(result.valid).toBe(false);
      });

      test('rejects input with invalid daily scores', () => {
        const input: any = {
          dailyScores: [
            { day: 1, wheals: 5, itching: 0 },
            { day: 2, wheals: 0, itching: 0 },
            { day: 3, wheals: 0, itching: 0 },
            { day: 4, wheals: 0, itching: 0 },
            { day: 5, wheals: 0, itching: 0 },
            { day: 6, wheals: 0, itching: 0 },
            { day: 7, wheals: 0, itching: 0 }
          ]
        };

        const result = validateUas7Input(input);
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('Day 1'))).toBe(true);
      });
    });
  });

  describe('calculateUas7 - error handling', () => {
    test('throws error for less than 7 days', () => {
      const input: Uas7Input = {
        dailyScores: [
          { day: 1, wheals: 0, itching: 0 }
        ]
      };

      expect(() => calculateUas7(input)).toThrow('Invalid UAS7 input');
    });

    test('throws error for invalid scores', () => {
      const input: any = {
        dailyScores: [
          { day: 1, wheals: 10, itching: 0 },
          { day: 2, wheals: 0, itching: 0 },
          { day: 3, wheals: 0, itching: 0 },
          { day: 4, wheals: 0, itching: 0 },
          { day: 5, wheals: 0, itching: 0 },
          { day: 6, wheals: 0, itching: 0 },
          { day: 7, wheals: 0, itching: 0 }
        ]
      };

      expect(() => calculateUas7(input)).toThrow();
    });
  });
});
