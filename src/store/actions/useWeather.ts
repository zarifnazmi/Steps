// store/actions/useWeather.ts

import { useDispatch } from 'react-redux';
import { setWeatherData } from '../reducers/weatherSlice';

interface WeatherItem {
  temperature: number;
  city: string;
  type: string;
}

const useWeather = () => {
  const dispatch = useDispatch();

  const fetchWeatherData = async (latitude: number, longitude: number, apiKey?: string) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
  
      if (response.ok) {
        console.log(data);
        const weatherItem: WeatherItem = {
          temperature: data.main.temp,
          city: data.name,
          type: data.weather[0].main
        };
        dispatch(setWeatherData(weatherItem));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  

  return {
    fetchWeatherData,
  };
};

export default useWeather;
