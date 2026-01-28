import { type CharacterEditFields, mergeWithEdits, useCharacter } from '@entities/character';
import { useMemo } from 'react';
import { useCharacterEditsStore } from '../store/characterEdits';

export const useCharacterWithEdits = (id: string | undefined) => {
  const { data, isLoading, error } = useCharacter(id);
  const getEdit = useCharacterEditsStore((s) => s.getEdit);
  const setEdit = useCharacterEditsStore((s) => s.setEdit);

  const edit = id ? getEdit(id) : undefined;
  const character = useMemo(() => (data ? mergeWithEdits(data, edit) : null), [data, edit]);

  const saveEdits = (fields: CharacterEditFields) => {
    if (id) setEdit(id, fields);
  };

  return { character, isLoading, error, saveEdits };
};
