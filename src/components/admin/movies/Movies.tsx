import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAllMoviesAction, moviesStateStatusSelector } from '../../../redux/slices/moviesSlice';
import { fetchStatus } from '../../../redux/types';
import MovieForm from './movieForm/MovieForm';
import {
  CreateMovieBlock,
  MovieDataBlock,
  MoviesBlockStyled,
  StyledContainer,
} from './Movies.styled';
import DataTab from './tabs/DataTab';
import { ReactComponent as Loader } from '../../../assets/img/loader.svg';
import { fetchGenresAction } from '../../../redux/slices/genresSlice';
import { fetchActorsAction } from '../../../redux/slices/actorsSlice';
import { fetchDirectorsAction } from '../../../redux/slices/directorsSlice';

const Movies: React.FC = () => {
  const moviesStatus = useAppSelector(moviesStateStatusSelector);
  const dispatch = useAppDispatch();

  // Написать отдельный метод, который будет получать ВСЕ фильмы за 1 раз при монтировании, а не через пагинацию.
  //   Возможно не делать для него action, а просто через useEffect(() => { fetch(url) })
  // В таком случае запрашивать фильмы нужно не там же где и актеров и режисеров, а прям в таблице фильмов.
  //   Получаем фильмы, потом их мепим в тот формат фильмов, который был раньше у нас(оставляем только необходимые данные) и
  // сохраняем в локальный стейт таблицы фмльмов.

  useEffect(() => {
    dispatch(fetchAllMoviesAction());
    dispatch(fetchGenresAction());
    dispatch(fetchActorsAction());
    dispatch(fetchDirectorsAction());
  }, []);

  return (
    <MoviesBlockStyled>
      <StyledContainer>
        {moviesStatus === fetchStatus.Pending ? (
          <Loader />
        ) : (
          <>
            <CreateMovieBlock>
              <MovieForm title="Створення нового фільму" />
            </CreateMovieBlock>
            <MovieDataBlock>
              <DataTab />
            </MovieDataBlock>
          </>
        )}
      </StyledContainer>
    </MoviesBlockStyled>
  );
};

export default Movies;
