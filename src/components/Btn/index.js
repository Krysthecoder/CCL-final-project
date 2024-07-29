import React from 'react';
import { Link } from 'react-router-dom';

const Botton = ({ title, address }) => {
  return (
    <>
      <Link to={address}>
        <button
          class="items-center rounded-lg bg-gradient-to-tr w-36 from-sky-600 to-sky-900 py-2 px-10 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-light="true"
        >
          {title}
        </button>
      </Link>
    </>
  );
};

export default Botton;
