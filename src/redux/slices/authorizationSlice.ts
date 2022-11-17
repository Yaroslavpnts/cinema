import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Api, userDataType } from '../../api/apiMethods';
import { AppDispatch, RootState } from '../store';
import { fetchStatus } from '../types';
import jwt_decode from 'jwt-decode';
import { deleteCookie } from '../../app/helpers/helperFunctions';

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
      document.cookie = `token=${data.token}; max-age=24 * 3600; path=/`;

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
        document.cookie = `token=${data.token}; max-age=24 * 3600; path=/`;
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

enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}

type TUserRole = {
  id: number;
  value: UserRoles;
  description: string;
};

type initialStateType = {
  isAuth: boolean;
  status: fetchStatus;
  roles: TUserRole[];
};

const initialState: initialStateType = {
  isAuth: false,
  status: fetchStatus.Idle,
  roles: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: state => {
      deleteCookie('token');
      state.isAuth = false;
      state.roles = [];
    },
    signIn: state => {
      state.isAuth = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logInAppAction.pending, state => {
        state.status = fetchStatus.Pending;
      })
      .addCase(logInAppAction.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.isAuth = true;
        if (action.payload) {
          state.roles = action.payload;
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
        state.isAuth = true;
      })
      .addCase(signUpAction.rejected, (state, { error }) => {
        state.status = fetchStatus.Error;
      });
  },
});

export const adminRoleSelector = (state: RootState) =>
  state.auth.roles.some(role => role.value === UserRoles.ADMIN);

export const { signOut, signIn } = authSlice.actions;

export const isAuthSelector = (state: RootState) => state.auth.isAuth;

export default authSlice.reducer;
