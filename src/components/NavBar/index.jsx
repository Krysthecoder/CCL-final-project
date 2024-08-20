import React from 'react';
import ProfileMenu from '../ProfileMenu';

const NavBar = () => {
  return (
    <div>
      <nav className="flex flex-col md:flex-row gap-2 justify-between w-full h-auto  bg-gradient-to-tr from-sky-600 to-sky-900 px-24 py-4 items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-5xl text-stone-300 font-semibold">
            Dentora
          </h1>
          <p className="text-xs font-semibold text-stone-800 md:pl-1">
            Building Smiles Every Day!
          </p>
        </div>

        <ProfileMenu />
      </nav>
    </div>
  );
};

export default NavBar;
