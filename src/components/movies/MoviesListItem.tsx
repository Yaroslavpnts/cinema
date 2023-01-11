import { Typography } from '@mui/material';
import React from 'react';
import ImdbImg from '../../assets/img/imdb.png';
import { IApiResponseMovie } from '../../api/apiMethods';
import {
  BackSide,
  Card,
  CardImg,
  FrontSide,
  IconStyled,
  ListItemName,
  MovieDirectors,
  MovieGenres,
  MovieImdb,
  MovieImgWrapper,
  MovieTitle,
  RotatingPart,
} from './MoviesListItem.styled';
import { theme } from '../../theme/theme';
import { Link, useLocation } from 'react-router-dom';

type MoviesListItemProps = {
  movie: IApiResponseMovie;
};

const MoviesListItem: React.FC<MoviesListItemProps> = ({ movie }) => {
  let { pathname } = useLocation();
  console.log(pathname);

  return (
    <Card>
      <Link to={pathname !== '/movies' ? `movies/${movie.id}` : `${movie.id}`}>
        <RotatingPart>
          <FrontSide>
            <MovieImgWrapper url={movie.poster_src}>
              <CardImg src={movie.wide_poster_src} alt={movie.name} />
            </MovieImgWrapper>
          </FrontSide>
          <BackSide>
            <MovieTitle>{movie.name}</MovieTitle>
            <MovieImdb>
              <img src={ImdbImg} alt="" />
              <div>
                <span>{movie.imdb_rating}</span>
                <span>/10</span>
              </div>
              <IconStyled sx={{ color: theme.palette.customColor.main }} />
            </MovieImdb>
            <MovieGenres>
              <div>Жанр</div>
              {movie.genres.map((genre, i) => {
                return (
                  <ListItemName key={genre.id}>
                    {!(i === movie.genres.length - 1) ? genre.name + ', ' : genre.name}
                  </ListItemName>
                );
              })}
            </MovieGenres>
            <MovieDirectors>
              <div>Режисер</div>
              {movie.directors.map(director => (
                <ListItemName key={director.id}>{director.name}</ListItemName>
              ))}
            </MovieDirectors>
          </BackSide>
        </RotatingPart>
        <Typography variant="h4" sx={{ fontSize: '18px', textTransform: 'uppercase' }}></Typography>
      </Link>
    </Card>
  );
};

export default MoviesListItem;
