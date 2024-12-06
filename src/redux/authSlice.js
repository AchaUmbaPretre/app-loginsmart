import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    refreshAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    updateRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
  },
});

export const { login, logout, refreshAccessToken, updateRefreshToken } = authSlice.actions;

export default authSlice.reducer;
