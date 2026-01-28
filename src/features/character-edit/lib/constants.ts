/** Known values from SWAPI for select options. API does not provide enums. */
export const GENDER_OPTIONS = ['male', 'female', 'hermaphrodite', 'n/a', 'none'] as const;

export const HAIR_COLOR_OPTIONS = [
  'auburn',
  'black',
  'blond',
  'blonde',
  'brown',
  'grey',
  'white',
  'red',
  'bald',
  'n/a',
  'none',
  'unknown',
] as const;

export const SKIN_COLOR_OPTIONS = [
  'blue',
  'caucasian',
  'dark',
  'fair',
  'gold',
  'green',
  'grey',
  'light',
  'metal',
  'olive',
  'pale',
  'red',
  'unknown',
  'white',
  'yellow',
] as const;

export const EYE_COLOR_OPTIONS = [
  'black',
  'blue',
  'blue-gray',
  'brown',
  'gold',
  'green',
  'grey',
  'hazel',
  'orange',
  'red',
  'unknown',
  'yellow',
] as const;

export const UNSPECIFIED_VALUES = ['unknown', 'none', 'n/a', ''] as const;
