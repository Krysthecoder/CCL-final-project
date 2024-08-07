import React from 'react';
import { Link } from 'react-router-dom';

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
