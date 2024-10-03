import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ButtonWithIcon = ({
  linkType = false,
  linkRoute,
  linkClassName,
  linkState,
  btnClassName,
  IconComp,
  onClickFn,
  btnCaption
}) => {
  return (
    <>
      {linkType ? (
        <Link to={linkRoute} className={linkClassName} state={linkState}>
          <span>{btnCaption}</span>
          {IconComp}
        </Link>
      ) : (
        <button className={btnClassName} onClick={onClickFn}>
          <div className="flex flex-row justify-around items-center gap-2">
            {btnCaption && <span>{btnCaption}</span>}
            {IconComp}
          </div>
        </button>
      )}
    </>
  );
};

ButtonWithIcon.propTypes = {
  linkType: PropTypes.bool,
  linkRoute: PropTypes.string,
  linkClassName: PropTypes.string,
  linkState: PropTypes.object,
  btnClassName: PropTypes.string,
  IconComp: PropTypes.object,
  onClickFn: PropTypes.func,
  btnCaption: PropTypes.string
};

export default ButtonWithIcon;
