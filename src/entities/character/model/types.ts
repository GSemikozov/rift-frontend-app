/** SWAPI person resource */
export interface SwapiPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiPeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SwapiPerson[];
}

/** Editable fields for local override (saved in localStorage) */
export interface CharacterEditFields {
  name?: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender?: string;
}

/** Person with optional local overrides applied */
export type Character = SwapiPerson;
