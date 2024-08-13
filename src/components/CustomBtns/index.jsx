import React from 'react';
import { Link } from 'react-router-dom';
import { useFormikContext } from 'formik';

export const CustomBtn = ({ className, text }) => {
  return (
    <div className={className}>
      <span>{text}</span>
    </div>
  );
};

export const CustomLinkBtn = ({ path, className, text, icon }) => {
  return (
    <Link to={path} className={className}>
      <span>{text}</span>
      {icon}
    </Link>
  );
};

export const CustomBtnInnerContent = ({ text, icon }) => {
  return (
    <>
      <span>{text}</span>
      {icon}
    </>
  );
};

export const CustomSbtBtn = ({ icon, text, className, type }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    console.log('submitted');
    submitForm();
  };

  const configBtn = {
    type: 'submit',
    onClick: handleSubmit
  };

  return (
    <button {...configBtn}>
      <span className={`custom-btn-styles ${className}`}>
        <span>{text}</span>
        {icon}
      </span>
    </button>
  );
};
