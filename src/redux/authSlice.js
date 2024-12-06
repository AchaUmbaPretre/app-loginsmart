import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logout(state) {
      state.accessToken = null;
      state.user = null;
    },
    refreshAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export const { login, logout, refreshAccessToken } = authSlice.actions;
export default authSlice.reducer;
