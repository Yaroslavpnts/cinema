import React from 'react';
import { IApiResponseMovie } from '../../api/apiMethods';
import { MoviesContainer, StyledHeading } from './MoviesList.styled';
import MoviesListItem from './MoviesListItem';
import Skeleton from '@mui/material/Skeleton';
import { fetchStatus } from '../../redux/types';
import { SkeletonCard } from './MoviesListItem.styled';

interface SliderProps {
  movies: Array<IApiResponseMovie>;
  status: fetchStatus;
}

const MoviesList: React.FC<SliderProps> = ({ movies, status }) => {
  const skeletons = [...new Array(5)].map((_, i) => (
    <SkeletonCard key={i}>
      <Skeleton variant="rectangular" width={220} height={300} sx={{ marginBottom: '10px' }} />
      <Skeleton variant="text" sx={{ fontSize: '18px', width: '220px' }} />
    </SkeletonCard>
  ));

  const moviesList = movies.map(movie => <MoviesListItem key={movie.id} movie={movie} />);

  return (
    <div>
      <StyledHeading variant="h2" sx={{ mb: 3 }}>
        Cьогодні у кіно
      </StyledHeading>
      <MoviesContainer>{status === fetchStatus.Pending ? skeletons : moviesList}</MoviesContainer>
    </div>
  );
};

export default MoviesList;
