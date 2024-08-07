import React from 'react';
import { useField } from 'formik';

export const CustomSelect = ({ className, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="flex justify-between">
        <label>{label}</label>
        <div className="flex flex-col w-4/6">
          <select
            {...field}
            {...props}
            className={
              meta.touched && meta.error
                ? 'text-sm  pl-2 border-2 w-full  border-red-600 rounded-lg py-1'
                : 'text-sm  pl-2 border-2 w-full  border-sky-600 rounded-lg py-1'
            }
          />
          {meta.touched && meta.error && (
            <p className="flex justify-end text-sm mr-2 text-red-700 ">
              {meta.error}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
