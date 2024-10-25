import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, showLoginModal }) => {
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();

  if (!user) {
    showLoginModal();
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;