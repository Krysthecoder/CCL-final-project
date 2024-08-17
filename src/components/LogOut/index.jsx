import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutIcon } from '../../icons';

export default function LogoutBtn() {
  const removeFetchedToken = () => {
    localStorage.removeItem('fetchedToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  };

  return (
    <Link to={'/'} className="text-sm">
      <button onClick={removeFetchedToken} className="w-28 px-4">
        <LogoutIcon title="Logout" />
      </button>
    </Link>
  );
}
