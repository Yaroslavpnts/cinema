import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Movies from '../components/admin/movies/Movies';
import Sessions from '../components/admin/sessions/Sessions';
import MainLayout from '../components/layout/MainLayout';
import ActorPage from '../pages/ActorPage/ActorPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import MoviePage from '../pages/MoviePage/MoviePage';
import DirectorPage from '../pages/DirectorPage/DirectorPage';
import Authorization from '../pages/AuthorizationPage/Authorization';
import MainPage from '../pages/MainPage/MainPage';
import MapPage from '../pages/MapPage/MapPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="auth/:type" element={<Authorization />} />
        <Route path="admin/" element={<AdminPage />}>
          <Route path="create-movies" element={<Movies />} />
          <Route path="create-sessions" element={<Sessions />} />
        </Route>
        <Route path="movies/:id" element={<MoviePage />} />
        <Route path="actors/:id" element={<ActorPage />} />
        <Route path="directors/:id" element={<DirectorPage />} />
        <Route path="map" element={<MapPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
