import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  uuid: string;
  profileImage?: string;
  role: 'admin' | 'student';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const mockUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@uni360.com',
  uuid: 'AD2025-000001',
  role: 'admin',
};

const initialState: AuthState = {
  isAuthenticated: true,
  user: mockUser,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.user = mockUser;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = true;
      state.user = mockUser;
      state.loading = false;
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
