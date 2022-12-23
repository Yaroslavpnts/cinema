import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Api, IApiResponseMovie } from '../../../api/apiMethods';
import {
  MovieAboutBlock,
  MovieStatsBlock,
  StyledHeading,
  StyledMovie,
  StyledPosterBlock,
} from './Movie.styled';

const Movie: React.FC = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState<IApiResponseMovie>();

  useEffect(() => {
    const getActor = async (id: number) => {
      try {
        const { data } = await Api.fetchMovie(id);
        console.log(data);
        setMovie(data);
      } catch (error) {}
    };

    if (id) getActor(+id);
  }, [id]);

  return (
    <StyledMovie>
      <StyledPosterBlock>
        <img src={movie?.wide_poster_src} alt="movie-poster" />
      </StyledPosterBlock>
      <MovieStatsBlock>
        <li>
          <span>Рейтинг: </span>
          {movie?.rating}
        </li>
        <li>
          <span>Рейтинг IMDB: </span>
          {movie?.imdb_rating}
        </li>
        <li>
          <span>Рік: </span>
          {movie?.production_year}
        </li>
      </MovieStatsBlock>
      <StyledHeading>{movie?.name}</StyledHeading>
      <MovieAboutBlock>
        <div>
          <h3>Про фільм</h3>
          <p>{movie?.description}</p>
        </div>
        <div>
          <h3>Жанри</h3>
          <p>
            {movie?.genres.map(
              (genre, i) => `${genre.name}${i === movie.genres.length - 1 ? '' : ', '}`
            )}
          </p>
        </div>
        <div>
          <h3>Актори</h3>
          <p>
            {movie?.actors.map(
              (actor, i) => `${actor.name}${i === movie.actors.length - 1 ? '' : ', '}`
            )}
          </p>
        </div>
        <div>
          <h3>Режисери</h3>
          <p>
            {movie?.directors.map(
              (director, i) => `${director.name}${i === movie.directors.length - 1 ? '' : ', '}`
            )}
          </p>
        </div>
      </MovieAboutBlock>
    </StyledMovie>
  );
};

export default Movie;
