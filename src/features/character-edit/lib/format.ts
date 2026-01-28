import { format } from 'date-fns';

const UNSPECIFIED = ['unknown', 'none', 'n/a', ''];

export const isUnspecified = (value: string | undefined): boolean => {
  if (value == null || value === '') return true;
  return UNSPECIFIED.includes(value.toLowerCase());
};

/**
 * Convert SWAPI birth_year (e.g. "19BBY", "33BBY", "5ABY") to Date for input[type=date].
 * Convention: 0 BBY = 1977 (Battle of Yavin). Returns null if not parseable.
 */
export const birthYearToDate = (birthYear: string | undefined): Date | null => {
  if (!birthYear || isUnspecified(birthYear)) return null;
  const s = birthYear.trim();
  const bbyMatch = s.match(/^(\d+(?:\.\d+)?)\s*BBY$/i);
  const abyMatch = s.match(/^(\d+(?:\.\d+)?)\s*ABY$/i);
  const num = bbyMatch
    ? -Number.parseFloat(bbyMatch[1])
    : abyMatch
      ? Number.parseFloat(abyMatch[1])
      : Number.NaN;
  if (Number.isNaN(num)) return null;
  // 0 BBY = 1977
  const year = Math.round(1977 + num);
  if (year < 1 || year > 9999) return null;
  try {
    return new Date(year, 0, 1);
  } catch {
    return null;
  }
};

export const dateToInputValue = (date: Date | null): string => {
  if (!date) return '';
  return format(date, 'yyyy-MM-dd');
};
