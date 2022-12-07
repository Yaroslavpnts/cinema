import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Api, IApiResponseCity, ICity } from '../../api/apiMethods';
import { AppDispatch, RootState } from '../store';
import { fetchStatus } from '../types';

export const fetchCitiesAction = createAsyncThunk(
  'cities/fetchCities',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.fetchCities();
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

export const createCityAction = createAsyncThunk<
  // Return type of the payload creator
  IApiResponseCity,
  // First argument to the payload creator
  ICity,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>('actors/createCity', async (city, { rejectWithValue }) => {
  try {
    const { data } = await Api.createCity(city);

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
  cities: IApiResponseCity[];
};

const initialState: initialStateType = {
  status: fetchStatus.Idle,
  responseMessage: '',
  cities: [],
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createCityAction.pending, state => {
        state.status = fetchStatus.Pending;
        state.responseMessage = '';
      })
      .addCase(createCityAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.cities.push(action.payload);
        state.responseMessage = 'Місто створене';
      })
      .addCase(createCityAction.rejected, (state, action) => {
        state.status = fetchStatus.Error;
        if (action.payload) {
          state.responseMessage = action.payload;
        } else if (action.error.message) {
          state.responseMessage = action.error.message;
        }
      })
      .addCase(fetchCitiesAction.pending, state => {
        state.status = fetchStatus.Pending;
      })
      .addCase(fetchCitiesAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.cities = action.payload;
      })
      .addCase(fetchCitiesAction.rejected, state => {
        state.status = fetchStatus.Error;
      });
  },
});

export default citiesSlice.reducer;

export const citiesSelector = (state: RootState) => state.cities.cities;

export const cinemasByCityNameSelector = (cityName: string) => (state: RootState) => {
  const city = state.cities.cities.find(city => city.name === cityName);
  return city?.cinemas?.[0];
};
