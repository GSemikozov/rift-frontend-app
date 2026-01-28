import type { CharacterEditFields, SwapiPerson } from './types';

/** Extract numeric id from SWAPI person URL (e.g. https://swapi.py4e.com/api/people/1/ => "1") */
export const getCharacterIdFromUrl = (url: string): string | null => {
  const m = url.match(/\/people\/(\d+)\/?$/);
  return m ? m[1] : null;
};

const EDITABLE_KEYS: (keyof CharacterEditFields)[] = [
  'name',
  'height',
  'mass',
  'hair_color',
  'skin_color',
  'eye_color',
  'birth_year',
  'gender',
];

/** Merge SWAPI person with optional local overrides. */
export const mergeWithEdits = (base: SwapiPerson, edits?: CharacterEditFields): SwapiPerson => {
  if (!edits) return base;
  const out = { ...base };
  for (const k of EDITABLE_KEYS) {
    const v = edits[k];
    if (v !== undefined && v !== '') (out as unknown as Record<string, string>)[k] = v;
  }
  return out;
};
