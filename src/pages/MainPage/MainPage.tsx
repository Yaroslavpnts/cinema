import { Container } from '@mui/material';
import { useEffect } from 'react';
// import { getCookie } from '../../app/helpers/helperFunctions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import MoviesList from '../../components/movies/MoviesList';
import MainPageSlider from '../../components/slider/MainPageSlider';
// import { signIn } from '../../redux/slices/authorizationSlice';
import { fetchMoviesAction, moviesStateSelector } from '../../redux/slices/moviesSlice';
import { MainPageWrapper } from './MainPage.styled';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(moviesStateSelector);

  useEffect(() => {
    dispatch(fetchMoviesAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainPageWrapper>
      <MainPageSlider movies={movies.movies} />
      <Container>
        <MoviesList movies={movies.movies} status={movies.status} />
      </Container>
    </MainPageWrapper>
  );
};

export default MainPage;
