import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { FormValues } from '../formSchema';
import { HELPER_UNSPECIFIED } from '../formUtils';

export const NameField = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<FormValues>();
  const v = watch('name');
  return (
    <TextField
      label="Name"
      {...register('name')}
      error={!!errors.name}
      helperText={errors.name?.message || (v === '' ? HELPER_UNSPECIFIED : undefined)}
      fullWidth
      size="small"
    />
  );
};
