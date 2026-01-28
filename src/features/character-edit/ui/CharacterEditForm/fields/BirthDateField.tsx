import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { FormValues } from '../formSchema';
import { HELPER_UNSPECIFIED, fieldSx } from '../formUtils';

export const BirthDateField = () => {
  const { register, watch } = useFormContext<FormValues>();
  const v = watch('birth_year');
  return (
    <TextField
      label="Birth date"
      type="date"
      {...register('birth_year')}
      size="small"
      fullWidth
      sx={fieldSx(140)}
      InputLabelProps={{ shrink: true }}
      helperText={v === '' ? HELPER_UNSPECIFIED : undefined}
    />
  );
};
