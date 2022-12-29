import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  Api,
  IPosition,
  IApiResponseActor,
  IApiResponseSession,
  IApiResponseSessionWithMovieAndCinemaHall,
} from '../../api/apiMethods';
import { TCreatePosition } from '../../components/admin/movies/movieForm/modalForm/PositionForm';
import { AppDispatch, RootState } from '../store';
import { fetchStatus } from '../types';

export const fetchSessionsAction = createAsyncThunk(
  'sessions/fetchSessions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.fetchAllSessions();

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

export const createSessionAction = createAsyncThunk<
  // Return type of the payload creator
  IApiResponseSessionWithMovieAndCinemaHall,
  // First argument to the payload creator
  IApiResponseSession,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>('sessions/createSession', async (session, { rejectWithValue }) => {
  try {
    const { data } = await Api.createSession(session);

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
  sessions: IApiResponseSessionWithMovieAndCinemaHall[];
};

const initialState: initialStateType = {
  status: fetchStatus.Idle,
  responseMessage: '',
  sessions: [],
};

const actorsSlice = createSlice({
  name: 'actors',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createSessionAction.pending, (state, action) => {
        state.status = fetchStatus.Pending;
        state.responseMessage = '';
      })
      .addCase(createSessionAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.sessions.push(action.payload);
        state.responseMessage = 'Актор створений';
      })
      .addCase(createSessionAction.rejected, (state, action) => {
        state.status = fetchStatus.Error;
        if (action.payload) {
          state.responseMessage = action.payload;
        } else if (action.error.message) {
          state.responseMessage = action.error.message;
        }
      })
      .addCase(fetchSessionsAction.pending, (state, action) => {
        state.status = fetchStatus.Pending;
      })
      .addCase(fetchSessionsAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.sessions = action.payload;
      })
      .addCase(fetchSessionsAction.rejected, (state, action) => {
        state.status = fetchStatus.Error;
      });
  },
});

export const actorsSelector = (state: RootState) => state.actors.actors;

export const actorsForTable = createSelector(actorsSelector, actors => {
  return actors.map(actor => ({
    id: actor.actor_id,
    name: actor.name,
    birthday: actor.birthday,
    city: actor.city,
    country: actor.country,
  }));
});

export const actorById = (id: number | undefined) => (state: RootState) => {
  if (!id) return null;

  let returnedActor = {} as TCreatePosition;

  state.actors.actors.forEach(actor => {
    if (actor.actor_id === id) {
      returnedActor = {
        ...actor,
        birthday: dayjs(actor.birthday).format('YYYY-MM-DD'),
      };
    }
  });

  return returnedActor;
};

export const actorsNamesSelector = createSelector(actorsSelector, actors => {
  return actors.map(actor => ({ id: actor.actor_id, name: actor.name }));
});

export const actorsStatusSelector = (state: RootState) => state.actors.status;
export const actorsErrorMessageSelector = (state: RootState) => state.actors.responseMessage;

export default actorsSlice.reducer;
