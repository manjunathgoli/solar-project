import { describe, expect, it } from 'vitest';
import { BRAND, money } from './config.js';

describe('site configuration', () => {
  it('formats store amounts in configured INR currency', () => {
    expect(BRAND.currency).toBe('INR');
    expect(money(12500)).toContain('12,500');
    expect(money(0)).toContain('0');
  });
});
