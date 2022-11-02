import { Container } from '@mui/material';
import { useEffect } from 'react';
import { getCookie } from '../../app/helpers/helperFunctions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import MoviesList from '../../components/movies/MoviesList';
import Slider from '../../components/slider/Slider';
import { signIn } from '../../redux/slices/authorizationSlice';
import { fetchMoviesAction, moviesSelector } from '../../redux/slices/moviesSlice';
import { MainPageWrapper } from './MainPage.styled';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(moviesSelector);

  useEffect(() => {
    if (getCookie('token')) {
      dispatch(signIn());
    }

    dispatch(fetchMoviesAction());
  }, []);

  return (
    <MainPageWrapper>
      <Slider movies={movies} />
      <Container>
        <MoviesList movies={movies} />
      </Container>
    </MainPageWrapper>
  );
};

export default MainPage;
