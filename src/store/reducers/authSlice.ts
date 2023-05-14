// store/reducers/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthItem {
  switch: number;
}

interface AuthState {
  switchNumber: number;
}

const initialState: AuthState = {
    switchNumber: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    switchAuth: (state, action: PayloadAction<AuthItem>) => {
      state.switchNumber = action.payload.switch;
    },
  },
});

export const { switchAuth } = authSlice.actions;
export default authSlice.reducer;
