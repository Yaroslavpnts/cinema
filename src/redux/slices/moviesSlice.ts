import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Api, IApiResponseMovie, IMovie } from '../../api/apiMethods';
import { TCreateMovie } from '../../components/adminPage/movies/movieForm/MovieForm';
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
  const genres = [] as number[];
  const actors = [] as number[];
  const directors = [] as number[];

  getState().genres.genres.forEach(genre => {
    if (movie.genres.includes(genre.name)) {
      genres.push(genre.id);
    }
  });

  getState().actors.actors.forEach(actor => {
    if (movie.actors.includes(actor.name)) {
      actors.push(actor.actor_id);
    }
  });

  getState().directors.directors.forEach(director => {
    if (movie.directors.includes(director.name)) {
      directors.push(director.id);
    }
  });

  const newMovie = {
    ...movie,
    genres,
    actors,
    directors,
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
        state.responseMessage = 'Фільм створений';
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
    name: movie.name,
    imdb_rating: Number(movie.imdb_rating),
  }));
});

export const moviesStatusSelector = (state: RootState) => state.movies.status;
export const moviesErrorMessageSelector = (state: RootState) => state.movies.responseMessage;

export default moviesSlice.reducer;
