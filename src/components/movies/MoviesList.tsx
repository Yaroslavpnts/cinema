import { Typography } from '@mui/material';
import React from 'react';
import { IApiResponseMovie } from '../../api/apiMethods';
import { MoviesContainer } from './MoviesList.styled';
import MoviesListItem from './MoviesListItem';

interface SliderProps {
  movies: Array<IApiResponseMovie>;
}

const MoviesList: React.FC<SliderProps> = ({ movies }) => {
  return (
    <div>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Планета Кіно в Києві: сьогодні у кіно
      </Typography>
      <MoviesContainer>
        {movies.map(movie => (
          <MoviesListItem key={movie.id} movie={movie} />
        ))}
      </MoviesContainer>
    </div>
  );
};

export default MoviesList;
