import { describe, expect, it } from 'vitest';
import { getCharacterIdFromUrl, mergeWithEdits } from './helpers';
import type { SwapiPerson } from './types';

describe('getCharacterIdFromUrl', () => {
  it('extracts id from SWAPI people URL with trailing slash', () => {
    expect(getCharacterIdFromUrl('https://swapi.py4e.com/api/people/1/')).toBe('1');
  });

  it('extracts id from URL without trailing slash', () => {
    expect(getCharacterIdFromUrl('https://swapi.py4e.com/api/people/42')).toBe('42');
  });

  it('returns null for non-matching URL', () => {
    expect(getCharacterIdFromUrl('https://swapi.py4e.com/api/planets/1/')).toBeNull();
    expect(getCharacterIdFromUrl('/people/')).toBeNull();
    expect(getCharacterIdFromUrl('')).toBeNull();
  });
});

describe('mergeWithEdits', () => {
  const base: SwapiPerson = {
    name: 'Luke',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.py4e.com/api/planets/1/',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '',
    edited: '',
    url: 'https://swapi.py4e.com/api/people/1/',
  };

  it('returns base when edits is undefined', () => {
    expect(mergeWithEdits(base, undefined)).toEqual(base);
  });

  it('overrides with provided edit fields', () => {
    const result = mergeWithEdits(base, { name: 'Luke Skywalker', mass: '80' });
    expect(result.name).toBe('Luke Skywalker');
    expect(result.mass).toBe('80');
    expect(result.height).toBe('172');
  });

  it('ignores empty string overrides', () => {
    const result = mergeWithEdits(base, { name: '' });
    expect(result.name).toBe('Luke');
  });
});
