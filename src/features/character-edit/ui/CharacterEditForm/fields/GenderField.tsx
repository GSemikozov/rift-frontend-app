import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import type { FormValues } from '../formSchema';
import { HELPER_UNSPECIFIED, fieldSx } from '../formUtils';

export interface GenderFieldProps {
  options: { value: string; label: string }[];
}

export const GenderField = ({ options }: GenderFieldProps) => {
  const {
    formState: { errors },
  } = useFormContext<FormValues>();
  const { field } = useController<FormValues, 'gender'>({ name: 'gender' });
  const v = field.value ?? '';
  return (
    <FormControl size="small" fullWidth sx={fieldSx(120)} error={!!errors.gender}>
      <InputLabel>Gender</InputLabel>
      <Select {...field} label="Gender" value={v}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {errors.gender?.message || (v === '' ? HELPER_UNSPECIFIED : undefined)}
      </FormHelperText>
    </FormControl>
  );
};
