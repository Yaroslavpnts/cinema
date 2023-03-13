import { Container } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import MoviesList from '../../components/movies/MoviesList';
import MainPageSlider from '../../components/slider/MainPageSlider';
import {
  fetchMoviesByFilterAction,
  moviesSelector,
  moviesStatusSelector,
} from '../../redux/slices/moviesSlice';
import { MainPageWrapper, StyledHeading } from './MainPage.styled';
import { ReactComponent as Loader } from '../../assets/img/loader.svg';
import { fetchStatus } from '../../redux/types';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(moviesSelector);
  const status = useAppSelector(moviesStatusSelector);

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
      {status !== fetchStatus.Pending ? (
        <>
          <MainPageSlider movies={movies} />
          <StyledHeading variant="h2" sx={{ mb: 3 }}>
            Сьогодні у кіно
          </StyledHeading>
          <Container>
            <MoviesList movies={movies} status={status} />
          </Container>
        </>
      ) : (
        <Loader />
      )}
    </MainPageWrapper>
  );
};

export default MainPage;
