import type { CharacterEditFields } from '@entities/character';
import { z } from 'zod';

export const schema = z.object({
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  birth_year: z.string(),
  gender: z.string(),
});

export type FormValues = z.infer<typeof schema>;

/** Trims name and returns payload for onSave. Exported for testing. */
export const prepareSubmitPayload = (v: FormValues): CharacterEditFields => ({
  ...v,
  name: v.name.trim(),
});
