import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationIcon } from '../../icons';

export const CustomBtn = ({
  className = 'custom-btn-styles',
  text = 'This need a caption'
}) => {
  return (
    <div className={className}>
      <span>{text}</span>
    </div>
  );
};

export const CustomLinkBtn = ({
  path = '/',
  className = 'custom-btn-styles',
  text = 'This need a caption',
  icon = ExclamationIcon
}) => {
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
