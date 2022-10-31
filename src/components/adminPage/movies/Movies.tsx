import { Container } from '@mui/material';
import MovieForm from './movieForm/MovieForm';
import {
  CreateMovieBlock,
  MovieDataBlock,
  MoviesBlockStyled,
  StyledContainer,
} from './Movies.styled';
import DataTable from './table/DataTable';
import DataTab from './tabs/DataTab';

const Movies = () => {
  return (
    <MoviesBlockStyled>
      <StyledContainer>
        <CreateMovieBlock>
          <MovieForm />
        </CreateMovieBlock>
        <MovieDataBlock>
          <DataTab />
          {/* <DataTable /> */}
        </MovieDataBlock>
      </StyledContainer>
    </MoviesBlockStyled>
  );
};

export default Movies;
