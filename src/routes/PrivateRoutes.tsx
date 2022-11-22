import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { isAuthSelector } from '../redux/slices/authorizationSlice';

type PrivateRoutes = {
  isAllowed: boolean;
};

const PrivateRoutes: React.FC<PrivateRoutes> = ({ isAllowed }) => {
  // const isAuth = useAppSelector(isAuthSelector);

  const location = useLocation();

  return isAllowed ? <Outlet /> : <Navigate to="/auth/enter" state={{ from: location }} replace />;
};

export default PrivateRoutes;
