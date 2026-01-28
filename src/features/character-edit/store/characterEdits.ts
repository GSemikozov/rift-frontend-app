import type { CharacterEditFields } from '@entities/character';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CharacterEditsState = {
  /** Map of character id (from SWAPI URL) -> partial override fields */
  edits: Record<string, CharacterEditFields>;
  setEdit: (id: string, fields: CharacterEditFields) => void;
  getEdit: (id: string) => CharacterEditFields | undefined;
  clearEdit: (id: string) => void;
};

export const useCharacterEditsStore = create<CharacterEditsState>()(
  persist(
    (set, get) => ({
      edits: {},
      setEdit: (id, fields) =>
        set((s) => ({
          edits: {
            ...s.edits,
            [id]: { ...s.edits[id], ...fields },
          },
        })),
      getEdit: (id) => get().edits[id],
      clearEdit: (id) =>
        set((s) => {
          const { [id]: _, ...rest } = s.edits;
          return { edits: rest };
        }),
    }),
    { name: 'sw-character-edits' }
  )
);
