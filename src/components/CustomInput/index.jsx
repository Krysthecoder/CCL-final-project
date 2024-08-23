import React from 'react';
import { useField } from 'formik';

import TextField from '@mui/material/TextField';

export const CustomInput = ({ name, label, multiline, rows, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      multiline={multiline}
      rows={multiline ? rows : 1}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      className={multiline ? 'w-screen' : 'w-full'}
    />
  );
};
