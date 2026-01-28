import { describe, expect, it } from 'vitest';
import { birthYearToDate, dateToInputValue, isUnspecified } from './format';

describe('isUnspecified', () => {
  it('returns true for undefined and empty string', () => {
    expect(isUnspecified(undefined)).toBe(true);
    expect(isUnspecified('')).toBe(true);
  });

  it('returns true for unknown, none, n/a (case insensitive)', () => {
    expect(isUnspecified('unknown')).toBe(true);
    expect(isUnspecified('Unknown')).toBe(true);
    expect(isUnspecified('none')).toBe(true);
    expect(isUnspecified('N/A')).toBe(true);
    expect(isUnspecified('n/a')).toBe(true);
  });

  it('returns false for normal values', () => {
    expect(isUnspecified('Luke')).toBe(false);
    expect(isUnspecified('172')).toBe(false);
  });
});

describe('birthYearToDate', () => {
  it('returns null for empty, undefined and unspecified', () => {
    expect(birthYearToDate(undefined)).toBeNull();
    expect(birthYearToDate('')).toBeNull();
    expect(birthYearToDate('unknown')).toBeNull();
    expect(birthYearToDate('none')).toBeNull();
  });

  it('converts BBY to Date (0 BBY = 1977)', () => {
    const d = birthYearToDate('19BBY');
    expect(d).not.toBeNull();
    expect(d!.getFullYear()).toBe(1958);
    expect(d!.getMonth()).toBe(0);
    expect(d!.getDate()).toBe(1);
  });

  it('converts ABY to Date', () => {
    const d = birthYearToDate('5ABY');
    expect(d).not.toBeNull();
    expect(d!.getFullYear()).toBe(1982);
  });

  it('handles decimal and spaces', () => {
    const d = birthYearToDate('41.9 BBY');
    expect(d).not.toBeNull();
    expect(d!.getFullYear()).toBe(1935);
  });

  it('returns null for unparseable strings', () => {
    expect(birthYearToDate('sometime ago')).toBeNull();
    expect(birthYearToDate('2000')).toBeNull();
  });
});

describe('dateToInputValue', () => {
  it('returns empty string for null', () => {
    expect(dateToInputValue(null)).toBe('');
  });

  it('formats Date to yyyy-MM-dd', () => {
    expect(dateToInputValue(new Date(1958, 0, 1))).toBe('1958-01-01');
    expect(dateToInputValue(new Date(1982, 11, 31))).toBe('1982-12-31');
  });
});
