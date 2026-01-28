import type { CharacterEditFields, SwapiPerson } from '@entities/character';
import {
  EYE_COLOR_OPTIONS,
  GENDER_OPTIONS,
  HAIR_COLOR_OPTIONS,
  SKIN_COLOR_OPTIONS,
  birthYearToDate,
  dateToInputValue,
} from '@features/character-edit/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Card, CardContent, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BirthDateField } from './fields/BirthDateField';
import { EyeColorField } from './fields/EyeColorField';
import { GenderField } from './fields/GenderField';
import { HairColorField } from './fields/HairColorField';
import { HeightField } from './fields/HeightField';
import { MassField } from './fields/MassField';
import { NameField } from './fields/NameField';
import { SkinColorField } from './fields/SkinColorField';
import { prepareSubmitPayload, schema } from './formSchema';
import type { FormValues } from './formSchema';
import { buildSelectOptions, toFormValue } from './formUtils';

export interface CharacterEditFormProps {
  character: SwapiPerson;
  onSave: (fields: CharacterEditFields) => void;
}

const rowSx = {
  display: 'flex',
  gap: 2,
  flexWrap: 'wrap' as const,
  flexDirection: { xs: 'column' as const, sm: 'row' as const },
};

export const CharacterEditForm = ({ character, onSave }: CharacterEditFormProps) => {
  const birthDate = birthYearToDate(character.birth_year);

  const initial: FormValues = {
    name: toFormValue(character.name),
    height: toFormValue(character.height),
    mass: toFormValue(character.mass),
    hair_color: toFormValue(character.hair_color),
    skin_color: toFormValue(character.skin_color),
    eye_color: toFormValue(character.eye_color),
    birth_year: dateToInputValue(birthDate),
    gender: toFormValue(character.gender),
  };

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initial,
    values: initial,
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const closeToast = () => setToast((t) => ({ ...t, open: false }));

  const onFormSubmit = (v: FormValues) => {
    try {
      const payload = prepareSubmitPayload(v);
      onSave(payload);
      reset(payload);
      setToast({ open: true, message: 'Saved successfully', severity: 'success' });
    } catch (e) {
      setToast({
        open: true,
        message: e instanceof Error ? e.message : 'Failed to save',
        severity: 'error',
      });
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Edit character
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onFormSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <NameField />
            <Box sx={rowSx}>
              <HeightField />
              <MassField />
              <BirthDateField />
              <GenderField options={buildSelectOptions(GENDER_OPTIONS, character.gender)} />
            </Box>
            <Box sx={rowSx}>
              <HairColorField
                options={buildSelectOptions(HAIR_COLOR_OPTIONS, character.hair_color)}
              />
              <SkinColorField
                options={buildSelectOptions(SKIN_COLOR_OPTIONS, character.skin_color)}
              />
              <EyeColorField options={buildSelectOptions(EYE_COLOR_OPTIONS, character.eye_color)} />
            </Box>
            <Button type="submit" variant="contained" disabled={!isDirty}>
              Save locally
            </Button>
          </Box>
        </FormProvider>
        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={closeToast}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={toast.severity} onClose={closeToast} variant="filled">
            {toast.message}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};
