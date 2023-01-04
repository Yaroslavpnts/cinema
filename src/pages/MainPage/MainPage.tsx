import { Container } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import MoviesList from '../../components/movies/MoviesList';
import MainPageSlider from '../../components/slider/MainPageSlider';
import { fetchMoviesByFilterAction, moviesStateSelector } from '../../redux/slices/moviesSlice';
import { MainPageWrapper } from './MainPage.styled';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(moviesStateSelector);

  useEffect(() => {
    const options = {
      dateStart: dayjs().format('YYYY-MM-DD'),
      dateEnd: dayjs().format('YYYY-MM-DD'),
    };

    dispatch(fetchMoviesByFilterAction(options));
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
