import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { Outlet } from 'react-router-dom';
import { getCookie } from '../../app/helpers/helperFunctions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { isAuthSelector, signIn } from '../../redux/slices/authorizationSlice';
import Footer from './Footer';
import Header from './Header';
import { AppWrapper } from './MainLayout.styled';
import { TUserRole } from '../../redux/slices/authorizationSlice';

const MainLayout: React.FC = () => {
  // const dispatch = useAppDispatch();
  // const isAuth = useAppSelector(isAuthSelector);

  // useEffect(() => {
  //   const token = getCookie('token');

  //   if (token) {
  //     const decoded = jwt_decode<{ roles: TUserRole[] }>(token);
  //     dispatch(signIn(decoded.roles));
  //   } else {
  //     dispatch(signIn(null));
  //   }
  // }, []);

  // if (isAuth === null) {
  //   return <div>Initializing app...</div>;
  // }

  return (
    <AppWrapper>
      {/* <CssBaseline /> */}
      <Header />
      <Outlet />
      <Footer />
    </AppWrapper>
  );
};

export default MainLayout;
