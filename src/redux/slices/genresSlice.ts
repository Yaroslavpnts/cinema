import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Api, IApiResponseCategory, ICategory } from '../../api/apiMethods';
import { AppDispatch, RootState } from '../store';
import { fetchStatus } from '../types';

export const fetchGenresAction = createAsyncThunk(
  'genres/fetchGenres',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.fetchCategories();

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
  }
);

export const createGenreAction = createAsyncThunk<
  IApiResponseCategory,
  ICategory,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>('genres/createGenre', async (name, { rejectWithValue }) => {
  try {
    const { data } = await Api.createCategory(name);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }

    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('Інша помилка');
  }
});

type initialStateType = {
  responseMessage: string;
  genres: IApiResponseCategory[];
  status: fetchStatus;
};

const initialState: initialStateType = {
  responseMessage: '',
  genres: [],
  status: fetchStatus.Idle,
};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createGenreAction.rejected, (state, action) => {
        state.status = fetchStatus.Error;
        if (action.payload) {
          state.responseMessage = action.payload;
        } else if (action.error.message) {
          state.responseMessage = action.error.message;
        }
      })
      .addCase(createGenreAction.fulfilled, (state, action) => {
        state.genres.push(action.payload);
      })
      .addCase(fetchGenresAction.fulfilled, (state, action) => {
        state.genres = action.payload;
      });
  },
});

export const genresSelector = (state: RootState) => state.genres.genres;

export const genresErrorMessageSelector = (state: RootState) => state.genres.responseMessage;

export default genresSlice.reducer;
