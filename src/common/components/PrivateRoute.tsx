import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const auth = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!auth) return <Navigate to="/login" />
  
  return <Outlet/>;
};

export { PrivateRoute };