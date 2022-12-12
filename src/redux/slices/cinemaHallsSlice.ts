import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  Api,
  IApiResponseCinemaHall,
  IApiResponseCity,
  ICinemaHall,
  ICity,
} from '../../api/apiMethods';
import { AppDispatch, RootState } from '../store';
import { fetchStatus } from '../types';

export const fetchCinemaHallsAction = createAsyncThunk(
  'cinemaHalls/fetchCinemaHalls',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.fetchCinemaHalls();
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

export const createCinemaHallAction = createAsyncThunk<
  // Return type of the payload creator
  IApiResponseCinemaHall,
  // First argument to the payload creator
  ICinemaHall,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>('cinemaHalls/createCinemaHall', async (cinemaHall, { rejectWithValue }) => {
  try {
    const { data } = await Api.createCinemaHall(cinemaHall);

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
  cinemaHalls: IApiResponseCinemaHall[];
};

const initialState: initialStateType = {
  status: fetchStatus.Idle,
  responseMessage: '',
  cinemaHalls: [],
};

const cinemaHallsSlice = createSlice({
  name: 'cinemaHalls',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createCinemaHallAction.pending, state => {
        state.status = fetchStatus.Pending;
        state.responseMessage = '';
      })
      .addCase(createCinemaHallAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.cinemaHalls.push(action.payload);
        state.responseMessage = 'Кінозал створений';
      })
      .addCase(createCinemaHallAction.rejected, (state, action) => {
        state.status = fetchStatus.Error;
        if (action.payload) {
          state.responseMessage = action.payload;
        } else if (action.error.message) {
          state.responseMessage = action.error.message;
        }
      })
      .addCase(fetchCinemaHallsAction.pending, state => {
        state.status = fetchStatus.Pending;
      })
      .addCase(fetchCinemaHallsAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.cinemaHalls = action.payload;
      })
      .addCase(fetchCinemaHallsAction.rejected, state => {
        state.status = fetchStatus.Error;
      });
  },
});

export default cinemaHallsSlice.reducer;

export const cinemaHallsSelector = (state: RootState) => state.cinemaHalls.cinemaHalls;

export interface ICinemaHallsChecked extends IApiResponseCinemaHall {
  checked: boolean;
}

export const cinemaHallsCheckedSelector = createSelector(cinemaHallsSelector, cinemaHalls => {
  const halls = [...cinemaHalls] as ICinemaHallsChecked[];

  return halls.map(h => ({
    ...h,
    checked: true,
  }));
});
