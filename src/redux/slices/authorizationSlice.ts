import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Api, userDataType } from '../../api/apiMethods';
import { RootState } from '../store';
import { fetchStatus } from '../types';
import jwt_decode from 'jwt-decode';

type SignUpPayloadType = {
  userData: userDataType;
  setStatus: (status: string) => void;
};

export const logInAppAction = createAsyncThunk(
  'auth/login',
  async ({ userData, setStatus }: SignUpPayloadType, { rejectWithValue }) => {
    try {
      const { data } = await Api.auth(userData);
      if (data.token) {
        document.cookie = `token=${data.token}; max-age=3600`;

        const decoded = jwt_decode(data.token);

        console.log(decoded);
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

export const signUpAction = createAsyncThunk(
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
      .addCase(logInAppAction.pending, state => {
        state.status = fetchStatus.Pending;
      })
      .addCase(logInAppAction.fulfilled, state => {
        state.status = fetchStatus.Success;
        state.isAuth = true;
      })
      .addCase(logInAppAction.rejected, state => {
        state.status = fetchStatus.Error;
      })
      .addCase(signUpAction.pending, state => {
        state.status = fetchStatus.Pending;
      })
      .addCase(signUpAction.fulfilled, state => {
        state.status = fetchStatus.Success;
        state.isAuth = true;
      })
      .addCase(signUpAction.rejected, (state, { error }) => {
        state.status = fetchStatus.Error;
      });
  },
});

export const { logOut } = authSlice.actions;

export const isAuthSelector = (state: RootState) => state.auth.isAuth;

export default authSlice.reducer;
