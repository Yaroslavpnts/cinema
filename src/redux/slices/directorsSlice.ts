import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Api, IPosition, IApiResponseDirector } from '../../api/apiMethods';
import { AppDispatch, RootState } from '../store';
import { fetchStatus } from '../types';

export const fetchDirectorsAction = createAsyncThunk(
  'actors/fetchDirectors',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.fetchDirectors();
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
  }
);

export const createDirectorAction = createAsyncThunk<
  // Return type of the payload creator
  IApiResponseDirector,
  // First argument to the payload creator
  IPosition,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>('actors/createActor', async (actor, { rejectWithValue }) => {
  try {
    const { data } = await Api.createDirector(actor);

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
  status: fetchStatus;
  responseMessage: string;
  directors: IApiResponseDirector[];
};

const initialState: initialStateType = {
  status: fetchStatus.Idle,
  responseMessage: '',
  directors: [],
};

const directorsSlice = createSlice({
  name: 'directors',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createDirectorAction.pending, (state, action) => {
        state.status = fetchStatus.Pending;
        state.responseMessage = '';
      })
      .addCase(createDirectorAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.directors.push(action.payload);
        state.responseMessage = 'Актор створений';
      })
      .addCase(createDirectorAction.rejected, (state, action) => {
        state.status = fetchStatus.Error;
        if (action.payload) {
          state.responseMessage = action.payload;
        } else if (action.error.message) {
          state.responseMessage = action.error.message;
        }
      })
      .addCase(fetchDirectorsAction.pending, (state, action) => {
        state.status = fetchStatus.Pending;
      })
      .addCase(fetchDirectorsAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.directors = action.payload;
      })
      .addCase(fetchDirectorsAction.rejected, (state, action) => {
        state.status = fetchStatus.Error;
      });
  },
});

export default directorsSlice.reducer;

export const directorsSelector = (state: RootState) => state.directors.directors;

export const directorsNamesSelector = createSelector(directorsSelector, directors => {
  return directors.map(director => ({ id: director.id, name: director.name }));
});

export const directorsStatusSelector = (state: RootState) => state.directors.status;
export const directorsErrorMessageSelector = (state: RootState) => state.directors.responseMessage;
