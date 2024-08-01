import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  let isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
