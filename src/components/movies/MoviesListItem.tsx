import { Typography } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImdbImg from '../../assets/img/imdb.png';
import { IApiResponseMovie } from '../../api/apiMethods';
import {
  BackSide,
  Card,
  CardImg,
  FrontSide,
  IconStyled,
  MovieDirectors,
  MovieGenres,
  MovieImdb,
  MovieImgWrapper,
  MovieTitle,
  RotatingPart,
} from './MoviesListItem.styled';
import { theme } from '../../theme/theme';

type MoviesListItemProps = {
  movie: IApiResponseMovie;
};

const MoviesListItem: React.FC<MoviesListItemProps> = ({ movie }) => {
  return (
    <Card>
      <RotatingPart>
        <FrontSide>
          <MovieImgWrapper url={movie.poster_src}>
            <CardImg src={movie.poster_src} alt={movie.name} />
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
              if (!(i === movie.genres.length - 1)) {
                return genre.name + ', ';
              }
              return genre.name;
            })}
          </MovieGenres>
          <MovieDirectors>
            <div>Режисер</div>
            {movie.directors.map(director => director.name)}
          </MovieDirectors>
        </BackSide>
      </RotatingPart>
      <Typography variant="h4" sx={{ fontSize: '18px', textTransform: 'uppercase' }}>
        Кінозал
      </Typography>
    </Card>
  );
};

export default MoviesListItem;
