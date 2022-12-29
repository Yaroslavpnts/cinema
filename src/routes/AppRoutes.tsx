import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getCookie } from '../app/helpers/helperFunctions';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { signIn, TUserRole, UserRoles, userSelector } from '../redux/slices/authorizationSlice';
import PrivateRoutes from './PrivateRoutes';
import jwt_decode from 'jwt-decode';
import { ReactComponent as Loader } from '../assets/img/loader.svg';

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
  NotFoundPage,
} from './routes';
import SessionPage from '../pages/SessionsPage/SessionsPage';

const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  useEffect(() => {
    const token = getCookie('token');

    if (token) {
      const decoded = jwt_decode<{ roles: TUserRole[] }>(token);
      dispatch(signIn(decoded.roles));
    } else {
      dispatch(signIn(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user.isAuth === null) {
    return <Loader />;
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
        <Route path="sessions" element={<SessionPage />} />

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

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
