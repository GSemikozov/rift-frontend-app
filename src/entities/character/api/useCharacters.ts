import { apiClient } from '@shared/api';
import { API_ENDPOINTS, QUERY_KEYS } from '@shared/config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { SwapiPeopleResponse } from '../model/types';

export interface UseCharactersParams {
  page?: number;
  search?: string;
}

export const useCharacters = ({ page = 1, search = '' }: UseCharactersParams = {}) =>
  useQuery({
    queryKey: QUERY_KEYS.characters.list(page, search || undefined),
    queryFn: async () => {
      const res = await apiClient.get<SwapiPeopleResponse>(API_ENDPOINTS.people, {
        params: { page: String(page), ...(search ? { search } : {}) },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
