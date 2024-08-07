import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const userLogonStatus = window.localStorage.getItem('fetchedToken');

  return userLogonStatus;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
