import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Api, IApiResponseMovie, IMovie } from '../../api/apiMethods';
import { ICreateMovie } from '../../components/adminPage/movies/movieForm/MovieForm';
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

export const createMovieAction = createAsyncThunk<
  IApiResponseMovie,
  ICreateMovie,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>(`movies/createMovie`, async (movie, { rejectWithValue, getState }) => {
  const genres = getState().genres.genres.map(genre => {
    if (movie.genres.includes(genre.name)) {
      return genre.id;
    }
  }) as number[];

  const actors = getState().actors.actors.map(actor => {
    if (movie.actors.includes(actor.name)) {
      return actor.actor_id;
    }
  }) as number[];

  const newMovie = { ...movie, genres, actors, directors: [1] };

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
      });
  },
});

export const moviesSelector = (state: RootState) => state.movies.movies;

export default moviesSlice.reducer;

export const moviesStatusSelector = (state: RootState) => state.movies.status;
export const moviesErrorMessageSelector = (state: RootState) => state.movies.responseMessage;
