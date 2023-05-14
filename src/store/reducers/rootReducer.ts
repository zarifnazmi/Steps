// store/reducers/rootReducers

import { combineReducers } from '@reduxjs/toolkit';

// Import your reducers here
// import yourReducer from './yourReducer';
import authReducer from './authSlice';
import goalReducer from './goalSlice';
import weatherReducer from './weatherSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  goal: goalReducer,
  weather: weatherReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;