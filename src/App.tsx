import './App.css';
import Authorization from './pages/AuthorizationPage/Authorization';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import MainPage from './pages/MainPage/MainPage';
import AdminPage from './pages/AdminPage/AdminPage';
import MainLayout from './components/layout/MainLayout';
import Movies from './components/adminPage/movies/Movies';
import Sessions from './components/adminPage/sessions/Sessions';
import ActorPage from './pages/ActorPage/ActorPage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="auth/:type" element={<Authorization />} />
          <Route path="admin/" element={<AdminPage />}>
            <Route path="movies" element={<Movies />} />
            <Route path="sessions" element={<Sessions />} />
          </Route>
          <Route path="actors/:id" element={<ActorPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
