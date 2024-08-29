import React from 'react';
import { useField } from 'formik';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';

export const CustomSelect = ({ name, label, ...props }) => {
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    id: 'outlined-basic',
    ...field,
    ...props
  };
  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }
  const getCurrentTime = () => dayjs().format('YYYY-MM-DDTHH:mm');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem label={label}>
        <TimePicker
          className="text-sm  pl-2 border-2 w-full  border-sky-600 rounded-lg py-1"
          sx={{
            '& .MuiFormControl-root': {
              border: '0px solid transparent'
            },
            '& .MuiInputBase-root': {
              width: '500px',
              color: '#717171'
            }
          }}
          defaultValue={dayjs(getCurrentTime())}
        />
      </DemoItem>
    </LocalizationProvider>
  );
};
