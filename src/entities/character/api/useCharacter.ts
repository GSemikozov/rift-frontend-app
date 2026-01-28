import { apiClient } from '@shared/api';
import { API_ENDPOINTS, QUERY_KEYS } from '@shared/config';
import { useQuery } from '@tanstack/react-query';
import type { SwapiPerson } from '../model/types';

export const useCharacter = (id: string | undefined) =>
  useQuery({
    queryKey: QUERY_KEYS.characters.detail(id),
    queryFn: async () => {
      if (!id) return null;
      const res = await apiClient.get<SwapiPerson>(API_ENDPOINTS.person(id));
      return res.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
