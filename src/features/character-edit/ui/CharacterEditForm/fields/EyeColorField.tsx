import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import type { FormValues } from '../formSchema';
import { HELPER_UNSPECIFIED, fieldSx } from '../formUtils';

export interface EyeColorFieldProps {
  options: { value: string; label: string }[];
}

export const EyeColorField = ({ options }: EyeColorFieldProps) => {
  const {
    formState: { errors },
  } = useFormContext<FormValues>();
  const { field } = useController<FormValues, 'eye_color'>({ name: 'eye_color' });
  const v = field.value ?? '';
  return (
    <FormControl size="small" fullWidth sx={fieldSx(120)} error={!!errors.eye_color}>
      <InputLabel>Eye color</InputLabel>
      <Select {...field} label="Eye color" value={v}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {errors.eye_color?.message || (v === '' ? HELPER_UNSPECIFIED : undefined)}
      </FormHelperText>
    </FormControl>
  );
};
