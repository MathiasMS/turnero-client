import React from 'react';

import { Controller } from 'react-hook-form';

import { TextField } from '@mui/material';

const NumberFormField = ({
  name,
  label,
  control,
  errors,
  icon,
  position = 'start',
  margin = 'normal',
  required,
}) => {
  let inputProps = {};

  if (icon) {
    if (position === 'start') {
      inputProps = {
        startAdornment: icon,
        pattern: '[0-9]{1,15}',
      };
    }

    if (position === 'end') {
      inputProps = {
        endAdornment: icon,
        pattern: '[0-9]{1,15}',
      };
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          required={required}
          type="number"
          variant="outlined"
          label={label}
          fullWidth
          margin={margin}
          error={Boolean(errors)}
          helperText={
            errors ? <span color="error">{errors.message}</span> : ' '
          }
          InputProps={inputProps}
        />
      )}
    />
  );
};

export default NumberFormField;
