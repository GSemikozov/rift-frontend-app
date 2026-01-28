import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { FormValues } from '../formSchema';
import { HELPER_UNSPECIFIED, fieldSx } from '../formUtils';

export const HeightField = () => {
  const { register, watch } = useFormContext<FormValues>();
  const v = watch('height');
  return (
    <TextField
      label="Height"
      type="number"
      {...register('height')}
      size="small"
      fullWidth
      sx={fieldSx(100)}
      inputProps={{ min: 0, step: 1 }}
      helperText={v === '' ? HELPER_UNSPECIFIED : undefined}
    />
  );
};
