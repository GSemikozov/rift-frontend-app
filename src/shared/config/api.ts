import { SWAPI_BASE } from './constants';

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_SWAPI_BASE_URL || SWAPI_BASE,
  TIMEOUT: 15_000,
} as const;

export const API_ENDPOINTS = {
  people: '/people/',
  person: (id: string) => `/people/${id}/`,
} as const;

export const QUERY_KEYS = {
  characters: {
    list: (page?: number, search?: string) => ['characters', 'list', page, search] as const,
    detail: (id?: string) => ['characters', 'detail', id] as const,
  },
} as const;
