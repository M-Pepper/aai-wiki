/**
 * Unit tests for SCORAD calculator
 */

import {
  calculateScorad,
  createEmptyInput,
  validateBodyRegions,
  validateTotalBsa,
  validateIntensity,
  validateSubjective,
  calculateTotalBsa,
  type ScoradInput,
  type BodyRegions,
  type IntensityScores,
  type SubjectiveScores
} from './scoradCalculations';

describe('SCORAD Calculator', () => {
  describe('createEmptyInput', () => {
    test('creates empty input with all zeros', () => {
      const input = createEmptyInput();

      expect(input.bodyRegions.headNeck).toBe(0);
      expect(input.intensity.redness).toBe(0);
      expect(input.subjective.itch).toBe(0);
      expect(input.subjective.sleeplessness).toBe(0);
    });
  });

  describe('calculateScorad - basic cases', () => {
    test('calculates zero score for no symptoms', () => {
      const input = createEmptyInput();
      const result = calculateScorad(input);

      expect(result.aScore).toBe(0);
      expect(result.iScore).toBe(0);
      expect(result.sScore).toBe(0);
      expect(result.totalScore).toBe(0);
      expect(result.interpretation).toBe('mild');
    });

    test('calculates maximum possible score (103)', () => {
      const input: ScoradInput = {
        bodyRegions: {
          headNeck: 100,
          upperLimbLeft: 100,
          upperLimbRight: 100,
          lowerLimbLeft: 100,
          lowerLimbRight: 100,
          anteriorTrunk: 100,
          back: 100,
          genitals: 100
        },
        intensity: {
          redness: 3,
          swelling: 3,
          oozingCrusting: 3,
          scratchMarks: 3,
          lichenification: 3,
          dryness: 3
        },
        subjective: {
          itch: 10,
          sleeplessness: 10
        }
      };

      const result = calculateScorad(input);

      expect(result.aScore).toBe(100);
      expect(result.iScore).toBe(18);
      expect(result.sScore).toBe(20);
      // (100/5) + (7*18/2) + 20 = 20 + 63 + 20 = 103
      expect(result.totalScore).toBe(103);
      expect(result.interpretation).toBe('severe');
    });

    test('calculates score with only body surface area', () => {
      const input = createEmptyInput();
      input.bodyRegions.headNeck = 50; // 50% of head/neck = 4.5% BSA

      const result = calculateScorad(input);

      expect(result.aScore).toBe(4.5);
      // (4.5/5) + 0 + 0 = 0.9
      expect(result.totalScore).toBe(0.9);
      expect(result.interpretation).toBe('mild');
    });

    test('calculates score with only intensity', () => {
      const input = createEmptyInput();
      input.intensity.redness = 2;
      input.intensity.dryness = 1;

      const result = calculateScorad(input);

      expect(result.iScore).toBe(3);
      // 0 + (7*3/2) + 0 = 10.5
      expect(result.totalScore).toBe(10.5);
      expect(result.interpretation).toBe('mild');
    });

    test('calculates score with only subjective symptoms', () => {
      const input = createEmptyInput();
      input.subjective.itch = 5;
      input.subjective.sleeplessness = 3;

      const result = calculateScorad(input);

      expect(result.sScore).toBe(8);
      expect(result.totalScore).toBe(8);
      expect(result.interpretation).toBe('mild');
    });
  });

  describe('calculateScorad - formula validation', () => {
    test('validates SCORAD formula: (A/5) + (7I/2) + S', () => {
      const input: ScoradInput = {
        bodyRegions: {
          headNeck: 100,      // 9% BSA
          upperLimbLeft: 0,
          upperLimbRight: 0,
          lowerLimbLeft: 0,
          lowerLimbRight: 0,
          anteriorTrunk: 100, // 18% BSA
          back: 0,
          genitals: 0
        },
        intensity: {
          redness: 2,
          swelling: 1,
          oozingCrusting: 0,
          scratchMarks: 1,
          lichenification: 0,
          dryness: 2
        },
        subjective: {
          itch: 6,
          sleeplessness: 4
        }
      };

      const result = calculateScorad(input);

      // A = (100 * 0.09) + (100 * 0.18) = 9 + 18 = 27
      expect(result.aScore).toBe(27);

      // I = 2 + 1 + 0 + 1 + 0 + 2 = 6
      expect(result.iScore).toBe(6);

      // S = 6 + 4 = 10
      expect(result.sScore).toBe(10);

      // SCORAD = (27/5) + (7*6/2) + 10 = 5.4 + 21 + 10 = 36.4
      expect(result.totalScore).toBe(36.4);
      expect(result.interpretation).toBe('moderate');
    });
  });

  describe('calculateScorad - interpretation thresholds', () => {
    test('interprets score < 25 as mild', () => {
      const input = createEmptyInput();
      input.subjective.itch = 10;
      input.subjective.sleeplessness = 10; // S = 20

      const result = calculateScorad(input);

      expect(result.totalScore).toBe(20);
      expect(result.interpretation).toBe('mild');
    });

    test('interprets score = 25 as moderate', () => {
      const input = createEmptyInput();
      input.bodyRegions.headNeck = 100; // A = 9
      input.subjective.itch = 10;
      input.subjective.sleeplessness = 10; // S = 20
      // (9/5) + 0 + 20 = 1.8 + 20 = 21.8 (still mild)

      // Need to add intensity to reach 25
      input.intensity.redness = 1; // I = 1
      // (9/5) + (7*1/2) + 20 = 1.8 + 3.5 + 20 = 25.3

      const result = calculateScorad(input);

      expect(result.totalScore).toBe(25.3);
      expect(result.interpretation).toBe('moderate');
    });

    test('interprets score = 50 as severe', () => {
      const input = createEmptyInput();
      input.bodyRegions.anteriorTrunk = 100; // A = 18
      input.bodyRegions.back = 100; // A += 18 = 36
      input.intensity.redness = 3;
      input.intensity.dryness = 3; // I = 6
      input.subjective.itch = 8;
      input.subjective.sleeplessness = 8; // S = 16

      const result = calculateScorad(input);

      // (36/5) + (7*6/2) + 16 = 7.2 + 21 + 16 = 44.2 (moderate)

      // Increase to reach severe
      input.intensity.swelling = 2; // I = 8
      // (36/5) + (7*8/2) + 16 = 7.2 + 28 + 16 = 51.2

      const result2 = calculateScorad(input);
      expect(result2.totalScore).toBe(51.2);
      expect(result2.interpretation).toBe('severe');
    });
  });

  describe('calculateTotalBsa', () => {
    test('calculates total BSA correctly with weighted regions', () => {
      const regions: BodyRegions = {
        headNeck: 100,        // 100% * 0.09 = 9
        upperLimbLeft: 100,   // 100% * 0.09 = 9
        upperLimbRight: 100,  // 100% * 0.09 = 9
        lowerLimbLeft: 100,   // 100% * 0.18 = 18
        lowerLimbRight: 100,  // 100% * 0.18 = 18
        anteriorTrunk: 100,   // 100% * 0.18 = 18
        back: 100,            // 100% * 0.18 = 18
        genitals: 100         // 100% * 0.01 = 1
      };

      const total = calculateTotalBsa(regions);
      expect(total).toBe(100);
    });

    test('calculates partial BSA correctly', () => {
      const regions: BodyRegions = {
        headNeck: 50,         // 50% * 0.09 = 4.5
        upperLimbLeft: 0,
        upperLimbRight: 0,
        lowerLimbLeft: 25,    // 25% * 0.18 = 4.5
        lowerLimbRight: 0,
        anteriorTrunk: 0,
        back: 0,
        genitals: 0
      };

      const total = calculateTotalBsa(regions);
      expect(total).toBe(9);
    });
  });

  describe('validation functions', () => {
    describe('validateBodyRegions', () => {
      test('accepts valid body region percentages', () => {
        const regions: BodyRegions = {
          headNeck: 50,
          upperLimbLeft: 0,
          upperLimbRight: 100,
          lowerLimbLeft: 25,
          lowerLimbRight: 75,
          anteriorTrunk: 10,
          back: 90,
          genitals: 5
        };

        const result = validateBodyRegions(regions);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      test('rejects negative percentages', () => {
        const regions = createEmptyInput().bodyRegions;
        regions.headNeck = -10;

        const result = validateBodyRegions(regions);
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('headNeck');
      });

      test('rejects percentages > 100', () => {
        const regions = createEmptyInput().bodyRegions;
        regions.anteriorTrunk = 150;

        const result = validateBodyRegions(regions);
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('anteriorTrunk');
      });
    });

    describe('validateTotalBsa', () => {
      test('warns when total BSA exceeds 100%', () => {
        const regions: BodyRegions = {
          headNeck: 100,
          upperLimbLeft: 100,
          upperLimbRight: 100,
          lowerLimbLeft: 100,
          lowerLimbRight: 100,
          anteriorTrunk: 100,
          back: 100,
          genitals: 100
        };

        const result = validateTotalBsa(regions);
        expect(result.valid).toBe(true); // Still valid, just warns
        expect(result.totalBsa).toBe(100);
        expect(result.warning).toBeUndefined();
      });

      test('does not warn for total BSA <= 100%', () => {
        const regions = createEmptyInput().bodyRegions;
        regions.headNeck = 50;

        const result = validateTotalBsa(regions);
        expect(result.valid).toBe(true);
        expect(result.warning).toBeUndefined();
      });
    });

    describe('validateIntensity', () => {
      test('accepts valid intensity scores (0-3)', () => {
        const intensity: IntensityScores = {
          redness: 0,
          swelling: 1,
          oozingCrusting: 2,
          scratchMarks: 3,
          lichenification: 2,
          dryness: 1
        };

        const result = validateIntensity(intensity);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      test('rejects invalid intensity scores', () => {
        const intensity: any = {
          redness: 4,
          swelling: 1,
          oozingCrusting: 2,
          scratchMarks: 3,
          lichenification: 2,
          dryness: 1
        };

        const result = validateIntensity(intensity);
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('redness');
      });
    });

    describe('validateSubjective', () => {
      test('accepts valid subjective scores (0-10)', () => {
        const subjective: SubjectiveScores = {
          itch: 0,
          sleeplessness: 10
        };

        const result = validateSubjective(subjective);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      test('rejects itch score < 0', () => {
        const subjective: SubjectiveScores = {
          itch: -1,
          sleeplessness: 5
        };

        const result = validateSubjective(subjective);
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('Itch');
      });

      test('rejects itch score > 10', () => {
        const subjective: SubjectiveScores = {
          itch: 11,
          sleeplessness: 5
        };

        const result = validateSubjective(subjective);
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('Itch');
      });

      test('rejects sleeplessness score out of range', () => {
        const subjective: SubjectiveScores = {
          itch: 5,
          sleeplessness: 15
        };

        const result = validateSubjective(subjective);
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('Sleeplessness');
      });
    });
  });

  describe('calculateScorad - error handling', () => {
    test('throws error for invalid body regions', () => {
      const input = createEmptyInput();
      (input.bodyRegions as any).headNeck = -10;

      expect(() => calculateScorad(input)).toThrow('Invalid body regions');
    });

    test('throws error for invalid intensity scores', () => {
      const input = createEmptyInput();
      (input.intensity as any).redness = 5;

      expect(() => calculateScorad(input)).toThrow('Invalid intensity scores');
    });

    test('throws error for invalid subjective scores', () => {
      const input = createEmptyInput();
      input.subjective.itch = 15;

      expect(() => calculateScorad(input)).toThrow('Invalid subjective scores');
    });
  });

  describe('calculateScorad - rounding', () => {
    test('rounds results to 1 decimal place', () => {
      const input = createEmptyInput();
      input.bodyRegions.headNeck = 33; // 33% * 0.09 = 2.97

      const result = calculateScorad(input);

      expect(result.aScore).toBe(3.0);
      expect(result.totalScore).toBe(0.6);
    });
  });
});
