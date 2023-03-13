import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';

import MoviesList from '../../components/movies/MoviesList';
import { fetchMoviesPaginationAction, moviesStateSelector } from '../../redux/slices/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { StyledHeading, StyledMoviePage, StyledPagination } from './MoviesPage.style';

const MoviesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(moviesStateSelector);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMoviesPaginationAction({ page: page - 1, size: 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <StyledMoviePage>
      <Container>
        <StyledHeading variant="h2" sx={{ mb: 3 }}>
          Архів фільмів
        </StyledHeading>
        <MoviesList movies={movies.movies} status={movies.status} />
        {movies.totalPages && (
          <Stack spacing={2}>
            <StyledPagination
              count={movies.totalPages || 0}
              page={page}
              onChange={(_, number) => setPage(number)}
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </Container>
    </StyledMoviePage>
  );
};

export default MoviesPage;
