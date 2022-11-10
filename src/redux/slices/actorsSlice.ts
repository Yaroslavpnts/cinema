import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import { Api, IPosition, IApiResponseActor } from '../../api/apiMethods';
import { TCreatePosition } from '../../components/admin/movies/movieForm/modalForm/PositionForm';
import { AppDispatch, RootState } from '../store';
import { fetchStatus } from '../types';

export const fetchActorsAction = createAsyncThunk(
  'actors/fetchActors',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.fetchActors();

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

export const createActorAction = createAsyncThunk<
  // Return type of the payload creator
  IApiResponseActor,
  // First argument to the payload creator
  IPosition,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>('actors/createActor', async (actor, { rejectWithValue }) => {
  try {
    const { data } = await Api.createActor(actor);

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

export const updateActorAction = createAsyncThunk<
  // Return type of the payload creator
  IApiResponseActor,
  // First argument to the payload creator
  IPosition,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>('actors/updateActor', async (actor, { rejectWithValue }) => {
  try {
    const { data } = await Api.updateActor(actor);
    console.log(data);
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

export const deleteActorAction = createAsyncThunk<
  number,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>('actors/deleteActor', async (name, { getState, rejectWithValue }) => {
  const actors = getState().actors.actors;

  const actorForDelete = actors.find(actor => actor.name === name);
  try {
    await Api.deleteActor(actorForDelete!.actor_id);

    return actorForDelete!.actor_id;
  } catch (error) {
    return rejectWithValue('Помилка видалення актора');
  }
});

type initialStateType = {
  status: fetchStatus;
  responseMessage: string;
  actors: IApiResponseActor[];
};

const initialState: initialStateType = {
  status: fetchStatus.Idle,
  responseMessage: '',
  actors: [],
};

const actorsSlice = createSlice({
  name: 'actors',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createActorAction.pending, (state, action) => {
        state.status = fetchStatus.Pending;
        state.responseMessage = '';
      })
      .addCase(createActorAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.actors.push(action.payload);
        state.responseMessage = 'Актор створений';
      })
      .addCase(createActorAction.rejected, (state, action) => {
        state.status = fetchStatus.Error;
        if (action.payload) {
          state.responseMessage = action.payload;
        } else if (action.error.message) {
          state.responseMessage = action.error.message;
        }
      })
      .addCase(fetchActorsAction.pending, (state, action) => {
        state.status = fetchStatus.Pending;
      })
      .addCase(fetchActorsAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.actors = action.payload;
      })
      .addCase(fetchActorsAction.rejected, (state, action) => {
        state.status = fetchStatus.Error;
      })
      .addCase(deleteActorAction.pending, (state, action) => {
        state.status = fetchStatus.Pending;
      })
      .addCase(deleteActorAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.actors = state.actors.filter(actor => actor.actor_id !== action.payload);
      })
      .addCase(deleteActorAction.rejected, (state, action) => {
        state.status = fetchStatus.Error;
      });
  },
});

export default actorsSlice.reducer;

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
