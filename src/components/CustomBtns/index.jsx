import React from 'react';
import { ExclamationIcon } from '../../icons';

export const CustomBtnInnerContent = ({
  text = 'This need a caption',
  icon = ExclamationIcon
}) => {
  return (
    <>
      <span>{text}</span>
      {icon}
    </>
  );
};
