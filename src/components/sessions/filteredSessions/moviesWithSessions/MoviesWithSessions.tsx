import React from 'react';
import { IApiResponseCinemaHall, IApiResponseMovie } from '../../../../api/apiMethods';
import MovieSessions from './Movie/MovieSessions';

interface IMoviesWithSessionsProps {
  movies: IApiResponseMovie[];
  cinemaHalls: IApiResponseCinemaHall[] | undefined;
}

export const MoviesWithSessions: React.FC<IMoviesWithSessionsProps> = ({ movies, cinemaHalls }) => {
  return (
    <div>
      {movies.map(movie => (
        <MovieSessions key={movie.id} movie={movie} cinemaHalls={cinemaHalls} />
      ))}
    </div>
  );
};
