import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import { Api, IApiResponseSessionWithMovieAndCinemaHall, ISession } from '../../api/apiMethods';
import { TCreatePosition } from '../../components/admin/movies/movieForm/modalForm/PositionForm';
import { initialStateCreateSessionsForm } from '../../components/admin/sessions/sessionCreateBlock/accordionCreateSessions/AccordionCreteSessions';
import { AppDispatch, RootState } from '../store';
import { fetchStatus } from '../types';

interface createSessionPayloadCreator {
  dayStart: dayjs.Dayjs;
  dayEnd: dayjs.Dayjs;
  sessions: {
    [index: string]: { sessionStart: dayjs.Dayjs; sessionEnd: dayjs.Dayjs };
  };
  cinema_hall_id: number;
  movie_id: number;
}

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

export const createSessionsAction = createAsyncThunk<
  // Return type of the payload creator
  IApiResponseSessionWithMovieAndCinemaHall[],
  // First argument to the payload creator
  createSessionPayloadCreator,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>('sessions/createSession', async (data, { rejectWithValue }) => {
  const days = data.dayEnd.diff(data.dayStart, 'd');
  const sessions = [] as ISession[];

  for (let i = 0; i <= days; i += 1) {
    const newDate = data.dayStart.add(i, 'day');

    Object.keys(data.sessions).map(key => {
      const session = {} as ISession;

      session.date = newDate.format('YYYY-MM-DD');
      session.movie_id = data.movie_id;
      session.cinema_hall_id = data.cinema_hall_id;
      session.session_start = data.sessions[key].sessionStart.format('HH:mm');
      session.session_end = data.sessions[key].sessionEnd.format('HH:mm');

      sessions.push(session);
    });
  }

  try {
    const { data } = await Api.createSessions(sessions);

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
      .addCase(createSessionsAction.pending, (state, action) => {
        state.status = fetchStatus.Pending;
        state.responseMessage = '';
      })
      .addCase(createSessionsAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        const a = action.payload;
        action.payload.map(session => state.sessions.push(session));
        // state.sessions.push(action.payload);
        state.responseMessage = 'Актор створений';
      })
      .addCase(createSessionsAction.rejected, (state, action) => {
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
