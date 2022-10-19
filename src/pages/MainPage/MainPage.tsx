import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import MoviesList from '../../components/movies/MoviesList';
import Slider from '../../components/slider/Slider';
import { getMovies, moviesSelector } from '../../redux/slices/moviesSlice';
import { MainPageWrapper } from './MainPage.styled';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(moviesSelector);

  useEffect(() => {
    dispatch(getMovies());
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
