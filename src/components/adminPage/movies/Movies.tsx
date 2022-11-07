import { Container } from '@mui/material';
import MovieForm from './movieForm/MovieForm';
import {
  CreateMovieBlock,
  MovieDataBlock,
  MoviesBlockStyled,
  StyledContainer,
} from './Movies.styled';
import DataTab from './tabs/DataTab';

const Movies = () => {
  return (
    <MoviesBlockStyled>
      <StyledContainer>
        <CreateMovieBlock>
          <MovieForm id={null} />
        </CreateMovieBlock>
        <MovieDataBlock>
          <DataTab />
        </MovieDataBlock>
      </StyledContainer>
    </MoviesBlockStyled>
  );
};

export default Movies;
