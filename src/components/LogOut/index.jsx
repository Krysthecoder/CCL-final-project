import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutIcon } from '../../icons';

export default function LogoutBtn({ className }) {
  const removeFetchedToken = () => {
    localStorage.removeItem('fetchedToken');
    localStorage.removeItem('userId');
  };

  return (
    <Link to={'/'} className={className}>
      <button onClick={removeFetchedToken}>
        <LogoutIcon title="Logout" />
      </button>
    </Link>
  );
}
