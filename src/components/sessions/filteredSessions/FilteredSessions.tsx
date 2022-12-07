import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Api, IApiResponseMovie } from '../../../api/apiMethods';
import { useAppSelector } from '../../../app/hooks';
import { cinemasByCityNameSelector } from '../../../redux/slices/citiesSlice';
import { StyledFilteredSessions } from './FilteredSessions.styled';
import { FiltersSessions } from './filters/Fitters';
import { MoviesWithSessions } from './moviesWithSessions/MoviesWithSessions';

interface IFilteredSessionsProps {
  cityName: string;
}

export const FilteredSessions: React.FC<IFilteredSessionsProps> = ({ cityName }) => {
  const cinema = useAppSelector(cinemasByCityNameSelector(cityName));

  const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [movies, setMovies] = useState<IApiResponseMovie[]>([]);

  useEffect(() => {
    const fetchMovies = async (cinemaHalls: string) => {
      const { data: movies } = await Api.fetchMoviesWithSessionsByDateAndByCinemaHalls(
        date,
        cinemaHalls
      );

      setMovies(movies);
    };

    if (cinema?.cinema_halls) {
      fetchMovies(cinema.cinema_halls.map(c => c.cinemas_hall_id).join(','));
    }
  }, []);

  return (
    <StyledFilteredSessions>
      <FiltersSessions setDate={setDate} />
      <MoviesWithSessions movies={movies} cinemaHalls={cinema?.cinema_halls} />
    </StyledFilteredSessions>
  );
};
