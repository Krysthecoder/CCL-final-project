import React from 'react';
import { useField } from 'formik';

import TextField from '@mui/material/TextField';
import { FormHelperText } from '@mui/material';

export const CustomInput = ({ name, label, multiline, rows, ...props }) => {
  // console.log(props, 'este es un texto');
  // console.log(props.value, 'este es un valor');

  const [field, meta] = useField(name);

  // const configTextfield = {
  //   id: 'outlined-basic',
  //   ...field,
  //   ...props,
  //   sx: {
  //     '&  .MuiOutlinedInput-root': {
  //       width: '500px'
  //     }
  //   },
  //   variant: 'outlined'
  // };

  // if (meta && meta.touched && meta.error) {
  //   configTextfield.error = true;
  //   configTextfield.helperText = meta.error;
  // }

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      multiline={multiline}
      rows={multiline ? rows : 1}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      fullWidth
    />
  );
};
