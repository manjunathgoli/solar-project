import { describe, expect, it } from 'vitest';
import { calculateSavings } from './calculator.js';

describe('calculateSavings', () => {
  it('calculates a recommendation and bounded values', () => {
    const result = calculateSavings({ monthlyBill: 6000, tariff: 8, roofArea: 100, sunlightHours: 5 });
    expect(result.systemKw).toBeGreaterThan(0);
    expect(result.systemKw).toBeLessThanOrEqual(1);
    expect(result.savings25Years).toBeGreaterThan(result.yearlySavings);
  });
  it('rejects invalid values', () => {
    expect(() => calculateSavings({ monthlyBill: 0, tariff: 8, roofArea: 100, sunlightHours: 5 })).toThrow();
  });
});
