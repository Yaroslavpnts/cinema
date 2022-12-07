import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { AppWrapper } from './MainLayout.styled';

const MainLayout: React.FC = () => {
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
