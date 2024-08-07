import React from 'react';
import { useField } from 'formik';

export const CustomSelect = ({ className, label, ...props }) => {
  const [field, meta] = useField(props);
  console.log('field', field);
  console.log('meta', meta);
  return (
    <>
      <div className="flex justify-between">
        <label>{label}</label>
        <select
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? 'text-sm  pl-2 border-2 w-4/6 border-red-600 rounded-lg py-1'
              : 'text-sm  pl-2 border-2 w-4/6 border-sky-600 rounded-lg py-1'
          }
        />
      </div>
      {meta.touched && meta.error && (
        <p className="flex justify-center text-sm  text-red-700">
          {meta.error}
        </p>
      )}
    </>
  );
};
