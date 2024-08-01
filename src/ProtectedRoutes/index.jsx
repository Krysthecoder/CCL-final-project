import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  let isAuth = true;
  const token = window.localStorage.getItem('token');

  console.log(token);

  return isAuth ? <Outlet /> : <Navigate to="./" />;
};

export default ProtectedRoutes;
