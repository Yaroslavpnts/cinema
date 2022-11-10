import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { fetchMoviesAction } from '../../../redux/slices/moviesSlice';
import MovieForm from './movieForm/MovieForm';
import {
  CreateMovieBlock,
  MovieDataBlock,
  MoviesBlockStyled,
  StyledContainer,
} from './Movies.styled';
import DataTab from './tabs/DataTab';

const Movies = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMoviesAction());
  }, []);

  return (
    <MoviesBlockStyled>
      <StyledContainer>
        <CreateMovieBlock>
          <MovieForm title="Створення нового фільму" />
        </CreateMovieBlock>
        <MovieDataBlock>
          <DataTab />
        </MovieDataBlock>
      </StyledContainer>
    </MoviesBlockStyled>
  );
};

export default Movies;
