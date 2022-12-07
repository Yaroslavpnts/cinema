import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type PrivateRoutesProps = {
  isAllowed: boolean;
};

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ isAllowed }) => {
  // const isAuth = useAppSelector(isAuthSelector);

  const location = useLocation();

  return isAllowed ? <Outlet /> : <Navigate to="/auth/enter" state={{ from: location }} replace />;
};

export default PrivateRoutes;
