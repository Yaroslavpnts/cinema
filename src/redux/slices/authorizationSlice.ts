import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Api, userDataType } from '../../api/apiMethods';
import { AppDispatch, RootState } from '../store';
import { fetchStatus } from '../types';
import jwt_decode from 'jwt-decode';
import { setCookie } from '../../app/helpers/helperFunctions';

type SignUpPayloadType = {
  userData: userDataType;
  setStatus: (status: string) => void;
};

export const logInAppAction = createAsyncThunk<
  TUserRole[] | undefined,
  SignUpPayloadType,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>('auth/login', async ({ userData, setStatus }, { rejectWithValue }) => {
  try {
    const { data } = await Api.auth(userData);
    if (data.token) {
      setCookie('token', data.token, { secure: true, 'Max-Age': 3600 });

      const decoded = jwt_decode<{ roles: TUserRole[] }>(data.token);

      return decoded.roles;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setStatus(error.response?.data.message);
      return rejectWithValue(error.response?.data.message);
    }

    const typedError = error as Error;

    return rejectWithValue(typedError.message);
  }
});

export const signUpAction = createAsyncThunk(
  'auth/signUp',
  async ({ userData, setStatus }: SignUpPayloadType, { rejectWithValue }) => {
    try {
      const { data } = await Api.signUp(userData);

      if (data.token) {
        setCookie('token', data.token, { secure: true, 'Max-Age': 3600 });
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

export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}

export type TUserRole = {
  id: number;
  value: UserRoles;
  description: string;
};

export type TUser = {
  isAuth: boolean | null;
  roles: TUserRole[];
};

type initialStateType = {
  status: fetchStatus;
  user: TUser;
};

const initialState: initialStateType = {
  status: fetchStatus.Idle,
  user: { isAuth: null, roles: [] },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: state => {
      state.user.isAuth = false;
      state.user.roles = [];
    },
    signIn: (state, action: PayloadAction<TUserRole[] | null>) => {
      if (action.payload) {
        state.user.roles = action.payload;
        state.user.isAuth = true;
      } else {
        state.user.isAuth = false;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logInAppAction.pending, state => {
        state.status = fetchStatus.Pending;
      })
      .addCase(logInAppAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.user.isAuth = true;
        if (action.payload) {
          state.user.roles = action.payload;
        }
      })
      .addCase(logInAppAction.rejected, state => {
        state.status = fetchStatus.Error;
      })
      .addCase(signUpAction.pending, state => {
        state.status = fetchStatus.Pending;
      })
      .addCase(signUpAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.user.isAuth = true;
      })
      .addCase(signUpAction.rejected, (state, { error }) => {
        state.status = fetchStatus.Error;
      });
  },
});

export const adminRoleSelector = (state: RootState) =>
  state.auth.user.roles.some(role => role.value === UserRoles.ADMIN);

export const { signOut, signIn } = authSlice.actions;

export const isAuthSelector = (state: RootState) => state.auth.user.isAuth;
export const userSelector = (state: RootState) => state.auth.user;

export default authSlice.reducer;
