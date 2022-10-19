import { CssBaseline } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const MainLayout: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
