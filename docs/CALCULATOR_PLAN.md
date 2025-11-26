# Clinical Calculator Implementation Plan

This document outlines the implementation plan for the SCORAD and UAS7 calculators.

---

## Phase 1: Calculation Logic & Data Structures

### SCORAD Calculator

#### Data Structure
```typescript
interface ScoradInput {
  // Body Surface Area (BSA) - percentages for each region
  bodyRegions: {
    headNeck: number;        // 0-100% of region (max 9% total BSA)
    upperLimbLeft: number;   // 0-100% of region (max 9% total BSA)
    upperLimbRight: number;  // 0-100% of region (max 9% total BSA)
    lowerLimbLeft: number;   // 0-100% of region (max 18% total BSA)
    lowerLimbRight: number;  // 0-100% of region (max 18% total BSA)
    anteriorTrunk: number;   // 0-100% of region (max 18% total BSA)
    back: number;            // 0-100% of region (max 18% total BSA)
    genitals: number;        // 0-100% of region (max 1% total BSA)
  };

  // Intensity items (each 0-3: none, mild, moderate, severe)
  intensity: {
    redness: 0 | 1 | 2 | 3;
    swelling: 0 | 1 | 2 | 3;
    oozingCrusting: 0 | 1 | 2 | 3;
    scratchMarks: 0 | 1 | 2 | 3;
    lichenification: 0 | 1 | 2 | 3;
    dryness: 0 | 1 | 2 | 3;
  };

  // Subjective symptoms (0-10 VAS)
  subjective: {
    itch: number;        // 0-10
    sleeplessness: number; // 0-10
  };
}

interface ScoradResult {
  aScore: number;      // Body surface area component (0-100)
  iScore: number;      // Intensity component (0-18)
  sScore: number;      // Subjective component (0-20)
  totalScore: number;  // Final SCORAD (0-103)
  interpretation: 'mild' | 'moderate' | 'severe';
}
```

#### Calculation Algorithm
```typescript
function calculateScorad(input: ScoradInput): ScoradResult {
  // A = Weighted BSA calculation
  const regionWeights = {
    headNeck: 0.09,
    upperLimbLeft: 0.09,
    upperLimbRight: 0.09,
    lowerLimbLeft: 0.18,
    lowerLimbRight: 0.18,
    anteriorTrunk: 0.18,
    back: 0.18,
    genitals: 0.01
  };

  const aScore = Object.entries(input.bodyRegions).reduce((sum, [region, percentage]) => {
    const weight = regionWeights[region];
    return sum + (percentage * weight);
  }, 0);

  // I = Sum of intensity scores (0-18)
  const iScore = Object.values(input.intensity).reduce((sum, val) => sum + val, 0);

  // S = Sum of subjective scores (0-20)
  const sScore = input.subjective.itch + input.subjective.sleeplessness;

  // SCORAD = (A/5) + (7I/2) + S
  const totalScore = (aScore / 5) + (7 * iScore / 2) + sScore;

  // Interpretation (common thresholds)
  let interpretation: 'mild' | 'moderate' | 'severe';
  if (totalScore < 25) {
    interpretation = 'mild';
  } else if (totalScore < 50) {
    interpretation = 'moderate';
  } else {
    interpretation = 'severe';
  }

  return {
    aScore: Math.round(aScore * 10) / 10,
    iScore,
    sScore,
    totalScore: Math.round(totalScore * 10) / 10,
    interpretation
  };
}
```

#### Validation Rules
- All body region percentages: 0-100
- Total BSA cannot exceed 100%
- All intensity items: 0-3
- All subjective items: 0-10
- Total SCORAD range: 0-103

---

### UAS7 Calculator

#### Data Structure
```typescript
interface DailyUasScore {
  day: number;        // 1-7
  wheals: 0 | 1 | 2 | 3;
  itching: 0 | 1 | 2 | 3;
  dailyTotal: number; // 0-6 (wheals + itching)
}

interface Uas7Input {
  dailyScores: DailyUasScore[];  // Array of 7 days
}

interface Uas7Result {
  dailyScores: DailyUasScore[];
  weeklyTotal: number;  // 0-42
  interpretation: 'well-controlled' | 'mild' | 'moderate' | 'severe';
}
```

#### Calculation Algorithm
```typescript
function calculateUas7(input: Uas7Input): Uas7Result {
  // Calculate daily totals
  const dailyScores = input.dailyScores.map(day => ({
    ...day,
    dailyTotal: day.wheals + day.itching
  }));

  // Sum all 7 days (0-42 range)
  const weeklyTotal = dailyScores.reduce((sum, day) => sum + day.dailyTotal, 0);

  // Interpretation (based on clinical thresholds)
  let interpretation: 'well-controlled' | 'mild' | 'moderate' | 'severe';
  if (weeklyTotal === 0) {
    interpretation = 'well-controlled';
  } else if (weeklyTotal <= 6) {
    interpretation = 'mild';
  } else if (weeklyTotal <= 15) {
    interpretation = 'moderate';
  } else {
    interpretation = 'severe';
  }

  return {
    dailyScores,
    weeklyTotal,
    interpretation
  };
}
```

#### Validation Rules
- Exactly 7 days of data required
- Wheals: 0-3 per day
- Itching: 0-3 per day
- Daily total: 0-6
- Weekly total range: 0-42

---

## Phase 2: Implementation Structure

### File Organization
```
website/
├── src/
│   ├── components/
│   │   ├── calculators/
│   │   │   ├── ScoradCalculator/
│   │   │   │   ├── ScoradCalculator.tsx        # Main component
│   │   │   │   ├── ScoradBodyDiagram.tsx       # Interactive body diagram
│   │   │   │   ├── ScoradIntensityForm.tsx     # Intensity scoring form
│   │   │   │   ├── ScoradSubjectiveForm.tsx    # Subjective symptoms form
│   │   │   │   ├── ScoradResults.tsx           # Results display
│   │   │   │   ├── scoradCalculations.ts       # Pure calculation logic
│   │   │   │   └── scoradCalculations.test.ts  # Unit tests
│   │   │   │
│   │   │   └── Uas7Calculator/
│   │   │       ├── Uas7Calculator.tsx          # Main component
│   │   │       ├── Uas7DailyForm.tsx           # Daily scoring form
│   │   │       ├── Uas7WeeklyChart.tsx         # Progress visualization
│   │   │       ├── Uas7Results.tsx             # Results display
│   │   │       ├── uas7Calculations.ts         # Pure calculation logic
│   │   │       └── uas7Calculations.test.ts    # Unit tests
│   │   │
│   │   └── shared/
│   │       ├── SliderInput.tsx                 # Reusable slider
│   │       ├── RadioGroup.tsx                  # Reusable radio buttons
│   │       └── ResultsCard.tsx                 # Reusable results display
│   │
│   └── css/
│       └── calculator.css                      # Calculator-specific styles
│
└── docs/
    └── calculators/
        ├── scorad.mdx                          # SCORAD calculator page
        └── uas7.mdx                            # UAS7 calculator page
```

---

## Phase 3: Testing Strategy

### Unit Tests (Jest + Testing Library)

**Test Cases for SCORAD:**
```typescript
describe('calculateScorad', () => {
  test('calculates zero score for no symptoms', () => {
    const input = createEmptyInput();
    const result = calculateScorad(input);
    expect(result.totalScore).toBe(0);
  });

  test('calculates maximum score correctly', () => {
    const input = createMaxInput();
    const result = calculateScorad(input);
    expect(result.totalScore).toBe(103);
  });

  test('validates BSA does not exceed 100%', () => {
    const input = createInvalidBsaInput();
    expect(() => calculateScorad(input)).toThrow();
  });

  test('interprets mild severity correctly (score < 25)', () => {
    const input = createMildInput();
    const result = calculateScorad(input);
    expect(result.interpretation).toBe('mild');
  });

  test('calculates known reference case correctly', () => {
    // Use published example from literature
    const input = { /* reference values */ };
    const result = calculateScorad(input);
    expect(result.totalScore).toBeCloseTo(42.5, 1);
  });
});
```

**Test Cases for UAS7:**
```typescript
describe('calculateUas7', () => {
  test('calculates zero score for no symptoms', () => {
    const input = createEmptyWeek();
    const result = calculateUas7(input);
    expect(result.weeklyTotal).toBe(0);
  });

  test('calculates maximum score correctly', () => {
    const input = createMaxWeek();
    const result = calculateUas7(input);
    expect(result.weeklyTotal).toBe(42);
  });

  test('requires exactly 7 days', () => {
    const input = createIncompleteWeek();
    expect(() => calculateUas7(input)).toThrow();
  });

  test('interprets well-controlled correctly (score = 0)', () => {
    const input = createEmptyWeek();
    const result = calculateUas7(input);
    expect(result.interpretation).toBe('well-controlled');
  });
});
```

### Integration Tests
- Test form input → calculation → results display flow
- Test state management across multi-step forms
- Test data persistence (localStorage)
- Test mobile touch interactions

### Manual Testing Checklist
- [ ] All inputs accept valid ranges
- [ ] Invalid inputs show error messages
- [ ] Calculations match reference cases
- [ ] Results display correctly
- [ ] Works on mobile (touch-friendly)
- [ ] Works on tablet
- [ ] Works on desktop
- [ ] Keyboard navigation works
- [ ] Screen reader accessible
- [ ] Works in light/dark mode

---

## Phase 4: UI/UX Design

### SCORAD Calculator UX Flow

**Step 1: Body Surface Area**
- Interactive body diagram (SVG)
- Click regions to select
- Slider to adjust percentage for each region
- Real-time BSA total display
- Warning if total exceeds 100%

**Step 2: Intensity Assessment**
- 6 items, each with radio buttons (0-3)
- Visual aids: photos/descriptions of severity levels
- Horizontal layout on desktop, vertical on mobile

**Step 3: Subjective Symptoms**
- Two sliders (0-10 range)
- Clear labels: "No itch" → "Worst imaginable"
- Visual scale indicator

**Step 4: Results**
- Prominent total SCORAD score
- Breakdown: A, I, S components
- Interpretation badge (mild/moderate/severe)
- Gauge or progress bar visualization
- Print/export option

### UAS7 Calculator UX Flow

**Layout: Table/Calendar View**
- 7 rows (one per day)
- 2 columns (wheals, itching)
- Radio buttons or dropdowns for each cell
- Daily total auto-calculated per row
- Weekly total prominently displayed at bottom

**Alternative: Wizard Flow**
- One day at a time (7 steps)
- Progress indicator (Day 1 of 7)
- Next/Previous navigation
- Summary view at end

**Results Display**
- Weekly total score (0-42)
- Bar chart showing daily scores
- Interpretation badge
- Comparison to previous weeks (if saved)

### Design Principles

**Color Coding:**
- Mild: Green (#059669)
- Moderate: Amber (#f59e0b)
- Severe: Red (#dc2626)
- Neutral: Slate

**Accessibility:**
- Minimum 44px touch targets (mobile)
- 4.5:1 contrast ratio
- ARIA labels on all inputs
- Keyboard navigation
- Focus indicators

**Responsive Design:**
- Desktop: Multi-column layout
- Tablet: 2-column layout
- Mobile: Single column, larger inputs

---

## Phase 5: Polish & Refinement

### Visual Polish
- [ ] Smooth transitions between steps
- [ ] Loading states for calculations
- [ ] Success animations on completion
- [ ] Tooltips for help text
- [ ] Icons for visual clarity
- [ ] Consistent spacing (design system)

### User Experience Enhancements
- [ ] Save progress (localStorage)
- [ ] Print-friendly results
- [ ] Export to PDF
- [ ] Share results (URL params)
- [ ] Reset/clear functionality
- [ ] Example/demo mode
- [ ] Help text/instructions

### Performance Optimization
- [ ] Code splitting (lazy load calculators)
- [ ] Optimize SVG body diagram
- [ ] Debounce slider inputs
- [ ] Memoize calculation results
- [ ] Lighthouse score ≥90

### Documentation
- [ ] Add clinical references
- [ ] Include interpretation guidelines
- [ ] Link to original publications
- [ ] Add "About this calculator" section
- [ ] Disclaimer text

---

## Implementation Timeline

### Week 1: Foundation
- Set up calculator file structure
- Implement pure calculation functions
- Write comprehensive unit tests
- Validate against reference cases

### Week 2: SCORAD UI
- Build ScoradCalculator component
- Create interactive body diagram
- Implement intensity/subjective forms
- Add results display

### Week 3: UAS7 UI
- Build Uas7Calculator component
- Create daily scoring interface
- Add weekly chart visualization
- Implement results display

### Week 4: Testing & Polish
- Integration testing
- Accessibility audit
- Mobile testing
- Performance optimization
- Documentation

---

## Success Criteria

### Functional Requirements
✅ Calculations match published reference cases
✅ All validation rules enforced
✅ Results accurate to 1 decimal place
✅ No errors in console
✅ All tests passing (100% coverage on calculation logic)

### Usability Requirements
✅ Can complete SCORAD in <5 minutes
✅ Can complete UAS7 in <3 minutes
✅ Mobile-friendly (touch targets ≥44px)
✅ Keyboard accessible
✅ Screen reader compatible

### Performance Requirements
✅ Lighthouse score ≥90 (all categories)
✅ First render <2 seconds
✅ Calculation instant (<100ms)
✅ Works offline (static)

### Design Requirements
✅ Matches AAI Wiki design system
✅ Works in light/dark mode
✅ Responsive on all screen sizes
✅ Professional medical appearance

---

## References

**SCORAD:**
- Sanofi Campus: https://www.campus.sanofi/qa/patient-support/Atopic-Dermatitis/2022/ar/scorad
- Original publication: Severity scoring of atopic dermatitis (European Task Force, 1993)

**UAS7:**
- MDCalc: https://www.mdcalc.com/calc/10226/urticaria-activity-score-uas
- Validation study: Hawro et al. (2017)

---

**Last Updated:** 2025-11-25
**Status:** Planning Phase
**Next Step:** Begin Phase 1 implementation
