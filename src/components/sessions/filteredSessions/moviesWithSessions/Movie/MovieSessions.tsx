import React from 'react';
import { IApiResponseCinemaHall, IApiResponseMovie } from '../../../../../api/apiMethods';
import CinemaHallWithSessions from './cinemaHallWithSessions/CinemaHallWithSessions';

interface IMovieProps {
  movie: IApiResponseMovie;
  cinemaHalls: IApiResponseCinemaHall[] | undefined;
}

const MovieSessions: React.FC<IMovieProps> = ({ movie, cinemaHalls }) => {
  console.log(movie);
  console.log(cinemaHalls);
  return (
    <div>
      <h2>{movie.name}</h2>
      {cinemaHalls?.map(cinemaHall => (
        <CinemaHallWithSessions
          key={cinemaHall.cinemas_hall_id}
          cinemaHall={cinemaHall}
          sessions={movie.sessions}
        />
      ))}
    </div>
  );
};

export default MovieSessions;
