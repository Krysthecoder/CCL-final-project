import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutIcon } from '../../icons/index';

const NavBar = () => {
  return (
    <div>
      <nav className="w-full flex justify-between h-20 bg-gradient-to-tr from-sky-600 to-sky-900 px-16 items-center">
        <div>
          <h1 className="text-5xl text-stone-300 font-semibold">Dentora</h1>
          <p className="text-xs font-semibold text-stone-800 pl-1">
            Fixing the chimuelo.
          </p>
        </div>
        <ul>
          <li>
            <Link to="/" className=" text-stone-300">
              <LogoutIcon title="Logout" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
