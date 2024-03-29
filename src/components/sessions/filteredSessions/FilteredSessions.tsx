import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Api, IApiResponseMovie } from '../../../api/apiMethods';
import { useAppSelector } from '../../../redux/store';
import { ICinemaHallsChecked } from '../../../redux/slices/cinemaHallsSlice';
import { cinemasByCityNameSelector } from '../../../redux/slices/citiesSlice';
import { StyledFilteredSessions } from './FilteredSessions.styled';
import { FiltersSessions } from './filters/FiltersSessions';
import { MoviesWithSessionsList } from './moviesWithSessions/MoviesWithSessionsList';

interface IFilteredSessionsProps {
  cityName: string;
}

export const FilteredSessions: React.FC<IFilteredSessionsProps> = ({ cityName }) => {
  const cinema = useAppSelector(cinemasByCityNameSelector(cityName));

  const [dateStart, setDateStart] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [dateEnd, setDateEnd] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [movies, setMovies] = useState<IApiResponseMovie[]>([]);

  const [technologiesChecked, setTechnologiesChecked] = useState<ICinemaHallsChecked[]>([]);

  useEffect(() => {
    const fetchMovies = async (cinemaHalls: string) => {
      const halls = cinemaHalls
        ? `&cinemaHalls=${cinemaHalls}`
        : `&cinemaHalls=${cinema?.cinema_halls?.map(c => c.cinemas_hall_id).join(',')}`;
      const { data: movies } = await Api.fetchMoviesByFilters(dateStart, dateEnd, halls);

      setMovies(movies);
    };

    if (cinema?.cinema_halls) {
      fetchMovies(
        technologiesChecked
          .filter(t => t.checked)
          .map(t => t.cinemas_hall_id)
          .join(',')
      );
    }
  }, [dateStart, dateEnd, cinema, technologiesChecked]);

  useEffect(() => {
    if (cinema?.cinema_halls) {
      setTechnologiesChecked([...cinema?.cinema_halls.map(c => ({ ...c, checked: true }))]);
    }
  }, [cinema]);

  return (
    <StyledFilteredSessions>
      <FiltersSessions
        setDateStart={setDateStart}
        setDateEnd={setDateEnd}
        dateStart={dateStart}
        dateEnd={dateEnd}
        technologiesChecked={technologiesChecked}
        setTechnologiesChecked={setTechnologiesChecked}
      />
      <MoviesWithSessionsList movies={movies} cinemaHalls={technologiesChecked} />
    </StyledFilteredSessions>
  );
};
