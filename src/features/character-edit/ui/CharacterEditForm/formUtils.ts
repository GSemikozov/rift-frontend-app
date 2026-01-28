import { isUnspecified } from '@features/character-edit/lib';

export const HELPER_UNSPECIFIED = 'This field is not specified';

export const toFormValue = (v: string | undefined): string => (isUnspecified(v) ? '' : (v ?? ''));

export const buildSelectOptions = (
  known: readonly string[],
  current: string | undefined
): { value: string; label: string }[] => {
  const set = new Set(known);
  if (current && !isUnspecified(current) && !set.has(current)) set.add(current);
  return [
    { value: '', label: 'Not specified' },
    ...Array.from(set)
      .filter((x) => x)
      .sort((a, b) => a.localeCompare(b))
      .map((v) => ({ value: v, label: v })),
  ];
};

export const fieldSx = (minSm: number) => ({
  flex: { xs: 'none' as const, sm: 1 },
  minWidth: { xs: 0, sm: minSm },
});
