import { Container } from '@mui/material';
import React from 'react';
import Movie from '../../components/movies/movie/Movie';
import { StyledMoviePage } from './MoviePage.style';

const ActorPage: React.FC = () => {
  return (
    <StyledMoviePage>
      <Container>
        <Movie />
      </Container>
    </StyledMoviePage>
  );
};

export default ActorPage;
