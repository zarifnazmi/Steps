// store/reducers/goalSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GoalItem {
  step: number;
}

interface GoalState {
  stepCount: number;
}

const initialState: GoalState = {
    stepCount: 10000,
};

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    saveGoal: (state, action: PayloadAction<GoalItem>) => {
      state.stepCount = action.payload.step;
    },
  },
});

export const { saveGoal } = goalSlice.actions;
export default goalSlice.reducer;
