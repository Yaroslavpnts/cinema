import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api, ApiResponseMovie } from '../../api/apiMethods';
import { RootState } from '../store';
import { fetchStatus } from '../types';

type initialStateType = {
  status: fetchStatus;
  movies: Array<ApiResponseMovie>;
};

const initialState: initialStateType = {
  status: fetchStatus.Idle,
  movies: [],
};

export const getMovies = createAsyncThunk('movies/getMovies', async (_, { rejectWithValue }) => {
  try {
    const { data } = await Api.getMovies();
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: buider => {
    buider
      .addCase(getMovies.pending, (state, action) => {
        state.status = fetchStatus.Pending;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = fetchStatus.Idle;
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = fetchStatus.Error;
      });
  },
});

export const moviesSelector = (state: RootState) => state.movies.movies;

export default moviesSlice.reducer;
