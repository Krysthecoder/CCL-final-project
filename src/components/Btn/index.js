import React from 'react';
import { Link } from 'react-router-dom';

const CustomButton = ({ title, address, icon }) => {
  return (
    <>
      <Link to={address}>
        <button
          className="flex justify-around items-center gap-2 py-2 px-10 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-900  text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-light="true"
        >
          <span className="m-6">{title}</span>
          <span className="">{icon}</span>
        </button>
      </Link>
    </>
  );
};

export default CustomButton;
