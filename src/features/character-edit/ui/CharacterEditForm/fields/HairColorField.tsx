import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import type { FormValues } from '../formSchema';
import { HELPER_UNSPECIFIED, fieldSx } from '../formUtils';

export interface HairColorFieldProps {
  options: { value: string; label: string }[];
}

export const HairColorField = ({ options }: HairColorFieldProps) => {
  const {
    formState: { errors },
  } = useFormContext<FormValues>();
  const { field } = useController<FormValues, 'hair_color'>({ name: 'hair_color' });
  const v = field.value ?? '';
  return (
    <FormControl size="small" fullWidth sx={fieldSx(120)} error={!!errors.hair_color}>
      <InputLabel>Hair color</InputLabel>
      <Select {...field} label="Hair color" value={v}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {errors.hair_color?.message || (v === '' ? HELPER_UNSPECIFIED : undefined)}
      </FormHelperText>
    </FormControl>
  );
};
