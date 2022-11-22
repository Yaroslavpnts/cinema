import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getCookie } from '../app/helpers/helperFunctions';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  isAuthSelector,
  signIn,
  TUserRole,
  UserRoles,
  userSelector,
} from '../redux/slices/authorizationSlice';
import PrivateRoutes from './PrivateRoutes';
import jwt_decode from 'jwt-decode';

import {
  Movies,
  Sessions,
  MainLayout,
  ActorPage,
  AdminPage,
  MoviePage,
  DirectorPage,
  Authorization,
  MainPage,
  MapPage,
} from './routes';

const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  console.log(user);

  useEffect(() => {
    const token = getCookie('token');

    if (token) {
      const decoded = jwt_decode<{ roles: TUserRole[] }>(token);
      dispatch(signIn(decoded.roles));
    } else {
      dispatch(signIn(null));
    }
  }, []);

  if (user.isAuth === null) {
    return <div>Initializing app...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />

        <Route path="auth/:type" element={<Authorization />} />
        <Route path="movies/:id" element={<MoviePage />} />
        <Route path="actors/:id" element={<ActorPage />} />
        <Route path="directors/:id" element={<DirectorPage />} />
        <Route path="map" element={<MapPage />} />

        <Route
          element={
            <PrivateRoutes
              isAllowed={user.isAuth && user.roles.some(role => role.value === UserRoles.ADMIN)}
            />
          }
        >
          <Route path="admin/" element={<AdminPage />}>
            <Route path="create-movies" element={<Movies />} />
            <Route path="create-sessions" element={<Sessions />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
