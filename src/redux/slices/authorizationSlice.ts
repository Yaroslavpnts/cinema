import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Api, userDataType } from '../../api/apiMethods';
import { RootState } from '../store';
import { fetchStatus } from '../types';

type SignUpPayloadType = {
  userData: userDataType;
  setStatus: (status: string) => void;
};

export const logInApp = createAsyncThunk(
  'auth/login',
  async ({ userData, setStatus }: SignUpPayloadType, { rejectWithValue }) => {
    try {
      const { data } = await Api.auth(userData);
      console.log(data);
      if (data.token) {
        document.cookie = `token=${data.token}; max-age=3600`;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setStatus(error.response?.data.message);
        return rejectWithValue(error.response?.data.message);
      }

      const typedError = error as Error;

      return rejectWithValue(typedError);
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ userData, setStatus }: SignUpPayloadType, { rejectWithValue }) => {
    try {
      const { data } = await Api.signUp(userData);

      if (data.token) {
        document.cookie = `token=${data.token}; max-age=3600`;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setStatus(error.response?.data.message);
        return rejectWithValue(error.response?.data.message);
      }

      const typedError = error as Error;

      return rejectWithValue(typedError);
    }
  }
);

type initialStateType = {
  isAuth: boolean;
  status: fetchStatus;
};

const initialState: initialStateType = {
  isAuth: false,
  status: fetchStatus.Idle,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: state => {
      state.isAuth = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logInApp.pending, state => {
        state.status = fetchStatus.Pending;
      })
      .addCase(logInApp.fulfilled, state => {
        state.status = fetchStatus.Idle;
        state.isAuth = true;
      })
      .addCase(logInApp.rejected, state => {
        state.status = fetchStatus.Error;
      })
      .addCase(signUp.pending, state => {
        state.status = fetchStatus.Pending;
      })
      .addCase(signUp.fulfilled, state => {
        state.status = fetchStatus.Idle;
        state.isAuth = true;
      })
      .addCase(signUp.rejected, (state, { error }) => {
        state.status = fetchStatus.Error;
      });
  },
});

export const { logOut } = authSlice.actions;

export const isAuthSelector = (state: RootState) => state.auth.isAuth;

export default authSlice.reducer;
