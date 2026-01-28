import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import type { FormValues } from '../formSchema';
import { HELPER_UNSPECIFIED, fieldSx } from '../formUtils';

export interface SkinColorFieldProps {
  options: { value: string; label: string }[];
}

export const SkinColorField = ({ options }: SkinColorFieldProps) => {
  const {
    formState: { errors },
  } = useFormContext<FormValues>();
  const { field } = useController<FormValues, 'skin_color'>({ name: 'skin_color' });
  const v = field.value ?? '';
  return (
    <FormControl size="small" fullWidth sx={fieldSx(120)} error={!!errors.skin_color}>
      <InputLabel>Skin color</InputLabel>
      <Select {...field} label="Skin color" value={v}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {errors.skin_color?.message || (v === '' ? HELPER_UNSPECIFIED : undefined)}
      </FormHelperText>
    </FormControl>
  );
};
