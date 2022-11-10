import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Api, IApiResponseMovie, IMovie } from '../../api/apiMethods';
import { TCreateMovie } from '../../components/admin/movies/movieForm/MovieForm';
import { AppDispatch, RootState } from '../store';
import { fetchStatus } from '../types';

type initialStateType = {
  status: fetchStatus;
  responseMessage: string;
  movies: Array<IApiResponseMovie>;
};

const initialState: initialStateType = {
  status: fetchStatus.Idle,
  responseMessage: '',
  movies: [],
};

export const fetchMoviesAction = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.fetchMovies();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createMovieAction = createAsyncThunk<
  IApiResponseMovie,
  TCreateMovie,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>(`movies/createMovie`, async (movie, { rejectWithValue, getState }) => {
  const newMovie = {
    ...movie,
    genres: movie.genres.map(genre => genre.id),
    actors: movie.actors.map(actor => actor.id),
    directors: movie.directors.map(director => director.id),
    imdb_rating: movie.imdb_rating.toString(),
  };

  try {
    const { data } = await Api.createMovie(newMovie);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }

    if (error instanceof Error) {
      console.log(error);
      return rejectWithValue(error.message);
    }

    return rejectWithValue('Інша помилка');
  }
});

export const updateMovieAction = createAsyncThunk<
  IApiResponseMovie,
  TCreateMovie,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>(`movies/updateMovie`, async (movie, { rejectWithValue, getState }) => {
  const newMovie = {
    ...movie,
    genres: movie.genres.map(genre => genre.id),
    actors: movie.actors.map(actor => actor.id),
    directors: movie.directors.map(director => director.id),
    imdb_rating: movie.imdb_rating.toString(),
  };

  try {
    const { data } = await Api.updateMovie(newMovie);
    console.log(data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }

    if (error instanceof Error) {
      console.log(error);
      return rejectWithValue(error.message);
    }

    return rejectWithValue('Інша помилка');
  }
});

export const deleteMovieAction = createAsyncThunk<
  number,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>('actors/deleteMovie', async (name, { getState, rejectWithValue }) => {
  const movies = getState().movies.movies;

  const movieForDelete = movies.find(movie => movie.name === name);
  try {
    await Api.deleteMovie(movieForDelete!.id);

    return movieForDelete!.id;
  } catch (error) {
    return rejectWithValue('Помилка видалення фільму');
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: buider => {
    buider
      .addCase(fetchMoviesAction.pending, (state, action) => {
        state.status = fetchStatus.Pending;
      })
      .addCase(fetchMoviesAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.movies = action.payload;
      })
      .addCase(fetchMoviesAction.rejected, (state, action) => {
        state.status = fetchStatus.Error;
      })
      .addCase(createMovieAction.pending, (state, action) => {
        state.status = fetchStatus.Pending;
      })
      .addCase(createMovieAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.movies.push(action.payload);
        state.responseMessage = 'Фільм створений';
      })
      .addCase(createMovieAction.rejected, (state, action) => {
        state.status = fetchStatus.Error;
      })
      .addCase(deleteMovieAction.pending, (state, action) => {
        state.status = fetchStatus.Pending;
      })
      .addCase(deleteMovieAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.movies = state.movies.filter(movie => movie.id !== action.payload);
      })
      .addCase(deleteMovieAction.rejected, (state, action) => {
        state.status = fetchStatus.Error;
      });
  },
});

export const moviesSelector = (state: RootState) => state.movies.movies;

export const moviesForTable = createSelector(moviesSelector, movies => {
  return movies.map(movie => ({
    id: movie.id,
    name: movie.name,
    imdb_rating: Number(movie.imdb_rating),
    production_year: Number(movie.production_year),
  }));
});

export const movieById = (id: number | undefined) => (state: RootState) => {
  if (!id) return null;

  let returnedMovie = {} as TCreateMovie;

  state.movies.movies.forEach(movie => {
    if (movie.id === id) {
      returnedMovie = {
        ...movie,
        genres: [...movie.genres.map(genre => ({ id: genre.id, name: genre.name }))],
        actors: [...movie.actors.map(actor => ({ id: actor.actor_id, name: actor.name }))],
        directors: [...movie.directors.map(director => ({ id: director.id, name: director.name }))],
      };
    }
  });

  return returnedMovie;
};

export const moviesStatusSelector = (state: RootState) => state.movies.status;
export const moviesErrorMessageSelector = (state: RootState) => state.movies.responseMessage;

export default moviesSlice.reducer;
