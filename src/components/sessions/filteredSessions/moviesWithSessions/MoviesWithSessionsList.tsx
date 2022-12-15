import React from 'react';
import { IApiResponseMovie } from '../../../../api/apiMethods';
import { ICinemaHallsChecked } from '../../../../redux/slices/cinemaHallsSlice';
import MovieSessions from './Movie/MovieWithSessionsItem';
import { StyledMoviesWithSessionsList } from './MoviesWithSessionsList.styled';

interface IMoviesWithSessionsProps {
  movies: IApiResponseMovie[];
  cinemaHalls: ICinemaHallsChecked[];
}

export const MoviesWithSessionsList: React.FC<IMoviesWithSessionsProps> = ({
  movies,
  cinemaHalls,
}) => {
  return (
    <StyledMoviesWithSessionsList>
      {movies.map(movie => (
        <MovieSessions key={movie.id} movie={movie} cinemaHalls={cinemaHalls} />
      ))}
    </StyledMoviesWithSessionsList>
  );
};
