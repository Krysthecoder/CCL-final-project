import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutIcon } from '../../icons';

export default function LogoutBtn() {
  const navigate = useNavigate();

  const removeFetchedToken = useCallback(() => {
    localStorage.removeItem('fetchedToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/');
  }, [navigate]);

  return (
    <button onClick={removeFetchedToken} className="w-28 px-4">
      <LogoutIcon title="Logout" />
      <span className="sr-only">Logout</span>
    </button>
  );
}
