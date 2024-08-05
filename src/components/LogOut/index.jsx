import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutIcon } from '../../icons';

export default function LogoutBtn({ className }) {
  // function removeTkn() {
  //   window.localStorage.removeItem('fetchedToken');
  // }

  return (
    <Link to={'/'} className={className}>
      <button>
        {/*  onClick={removeTkn()} */}
        <LogoutIcon title="Logout" />
      </button>
    </Link>
  );
}
