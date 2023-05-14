import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherItem {
  temperature: number;
  city: string;
  type: string;
}

interface WeatherState {
  weatherData: WeatherItem | null;
}

const initialState: WeatherState = {
  weatherData: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<WeatherItem>) => {
      state.weatherData = action.payload;
    },
  },
});

export const { setWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
