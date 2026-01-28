import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { FormValues } from '../formSchema';
import { HELPER_UNSPECIFIED, fieldSx } from '../formUtils';

export const MassField = () => {
  const { register, watch } = useFormContext<FormValues>();
  const v = watch('mass');
  return (
    <TextField
      label="Mass"
      type="number"
      {...register('mass')}
      size="small"
      fullWidth
      sx={fieldSx(100)}
      inputProps={{ min: 0, step: 1 }}
      helperText={v === '' ? HELPER_UNSPECIFIED : undefined}
    />
  );
};
