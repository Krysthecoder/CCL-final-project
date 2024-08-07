import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutIcon } from '../../icons';

function removeTkn() {
  window.localStorage.removeItem('fetchedToken');
}

export default function LogoutBtn({ className }) {
  return (
    <Link to={'/'} className={className}>
      <button
        onClick={() => {
          removeTkn();
        }}
      >
        <LogoutIcon title="Logout" />
      </button>
    </Link>
  );
}
