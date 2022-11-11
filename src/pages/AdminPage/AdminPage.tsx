import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/admin/navbar/NavbarAdmin';
import { AdminPageWrapper } from './AdminPage.styled';
import { Container } from '@mui/material';

const AdminPage: React.FC = () => {
  return (
    <AdminPageWrapper>
      <Navbar></Navbar>

      <Outlet />
    </AdminPageWrapper>
  );
};

export default AdminPage;
