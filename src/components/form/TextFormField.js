import React from 'react';

import { Controller } from 'react-hook-form';

import { TextField } from '@mui/material';

const TextFormField = ({
  name,
  label,
  control,
  errors,
  icon,
  position = 'start',
  margin = 'normal',
  multiline = false,
  rows = 1,
  disabled = false,
  required,
}) => {
  let inputProps = {};

  if (icon) {
    if (position === 'start') {
      inputProps = {
        startAdornment: icon,
      };
    }

    if (position === 'end') {
      inputProps = {
        endAdornment: icon,
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
          variant="outlined"
          label={label}
          fullWidth
          margin={margin}
          multiline={multiline}
          rows={rows}
          error={Boolean(errors)}
          helperText={
            errors ? <span color="error">{errors.message}</span> : ' '
          }
          InputProps={inputProps}
          disabled={disabled}
        />
      )}
    />
  );
};

export default TextFormField;
