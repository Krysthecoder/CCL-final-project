import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const token = null;

  return token ? <Outlet /> : <Navigate to="./" />;
};

export default ProtectedRoutes;
