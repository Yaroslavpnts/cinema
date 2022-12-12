import React from 'react';
import { IApiResponseMovie, IApiResponseSession } from '../../../../../api/apiMethods';
import { ICinemaHallsChecked } from '../../../../../redux/slices/cinemaHallsSlice';
import CinemaHallWithSessions from './cinemaHallWithSessions/CinemaHallWithSessions';
import {
  StyledCinemaHallsWithSessionsBlock,
  StyledMovieImageBlock,
  StyledMovieWithSessionsItem,
} from './MovieWithSessionsItem.styled';

interface IMovieProps {
  movie: IApiResponseMovie;
  cinemaHalls: ICinemaHallsChecked[];
  dateStart: string;
}

const parseJSX = (date: string) => {
  return `${new Intl.DateTimeFormat('uk-UA', {
    month: 'long',
    day: '2-digit',
  }).format(new Date(date))}, ${new Intl.DateTimeFormat('uk-UA', {
    weekday: 'long',
  }).format(new Date(date))}`;
};

const MovieWithSessionsItem: React.FC<IMovieProps> = ({ movie, cinemaHalls, dateStart }) => {
  const groupedSessions = movie?.sessions?.reduce((acc, cur) => {
    acc[cur.date as keyof typeof cur] = acc[cur.date as string] || [];

    acc[cur.date as string].push(cur);

    return acc;
  }, {} as { [index: string]: IApiResponseSession[] });

  return (
    <StyledMovieWithSessionsItem>
      <StyledMovieImageBlock>
        <img src={movie.poster_src} alt="movie_poster" />
        <div>{movie.rating}</div>
      </StyledMovieImageBlock>
      <StyledCinemaHallsWithSessionsBlock>
        <h2>{movie.name}</h2>
        <>
          {groupedSessions
            ? Object.keys(groupedSessions).map(date => (
                <div key={date}>
                  <h3>{parseJSX(date)}</h3>
                  {cinemaHalls?.map(cinemaHall => {
                    if (
                      cinemaHall.checked &&
                      cinemaHall.sessions!.length > 0 &&
                      cinemaHall.sessions?.some(session => session.movie_id === movie.id) &&
                      cinemaHall.sessions.some(session => session.date === date)
                    ) {
                      return (
                        <CinemaHallWithSessions
                          key={cinemaHall.cinemas_hall_id}
                          cinemaHall={cinemaHall}
                          sessions={groupedSessions[date]}
                          date={date}
                        />
                      );
                    }
                  })}
                </div>
              ))
            : null}
        </>
      </StyledCinemaHallsWithSessionsBlock>
    </StyledMovieWithSessionsItem>
  );
};

export default MovieWithSessionsItem;
