import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import actorsReducer from './slices/actorsSlice';
import authReducer from './slices/authorizationSlice';
import moviesReducer from './slices/moviesSlice';
import genresReducer from './slices/genresSlice';
import directorsReducer from './slices/directorsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    actors: actorsReducer,
    genres: genresReducer,
    directors: directorsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
