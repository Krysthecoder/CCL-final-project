import React from 'react';
import LogoutBtn from '../LogOut';

const NavBar = () => {
  return (
    <div>
      <nav className="w-full flex justify-between h-20 bg-gradient-to-tr from-sky-600 to-sky-900 px-16 items-center">
        <div>
          <h1 className="text-5xl text-stone-300 font-semibold">Dentora</h1>
          <p className="text-xs font-semibold text-stone-800 pl-1">
            Building Smiles Every Day!
          </p>
        </div>
        <ul>
          <li key="links to home page">
            <LogoutBtn className={' text-stone-300'} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
