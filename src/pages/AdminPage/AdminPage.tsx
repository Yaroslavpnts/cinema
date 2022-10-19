import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/adminPage/navbar/NavbarAdmin';
import { AdminPageWrapper } from './AdminPage.styled';

const AdminPage: React.FC = () => {
  return (
    <AdminPageWrapper>
      <Navbar></Navbar>

      <Outlet />
    </AdminPageWrapper>
  );
};

export default AdminPage;
