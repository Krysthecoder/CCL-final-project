import React from 'react';

function ButtonWithIcon({ btnClassName, IconComp, onClickFn, btnCaption }) {
  return (
    <>
      <button className={btnClassName} onClick={onClickFn}>
        <div className="flex flex-row gap-1 items-center">
          <div className="col">{btnCaption && <span>{btnCaption}</span>}</div>
          <div className="col">{IconComp}</div>
        </div>
      </button>
    </>
  );
}

export default ButtonWithIcon;
