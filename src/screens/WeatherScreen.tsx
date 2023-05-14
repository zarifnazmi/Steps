import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    Dimensions,
    Text,
    View
  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers/rootReducer';
import useWeather from '../store/actions/useWeather';
import Geolocation from 'react-native-geolocation-service';
import LottieAnimation from '../components/LottieAnimation';
import Clear from '../assets/Clear.json';
import Cloud from '../assets/Cloud.json';
import Drizzle from '../assets/Drizzle.json';
import Rain from '../assets/Rain.json';
import Thunderstorm from '../assets/Thunderstorm.json';
import Config from "react-native-config";

const { height, fontScale } = Dimensions.get("window");
export default function WeatherScreen() {
  const { fetchWeatherData } = useWeather();
  const apiKey = Config.API_KEY;
  const weather = useSelector((state: RootState) => state.weather);

    useEffect(() =>{
      Geolocation.requestAuthorization("whenInUse")
      .then(response => {
        if(response === 'granted') {
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              fetchWeatherData(latitude, longitude, apiKey)
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        }
      })
    }, [])


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#FBFCF6' barStyle={'dark-content'} />
        <Text style={styles.title}>{weather.weatherData?.city}</Text>
        {weather.weatherData?.type === 'Clouds' ? <LottieAnimation source={Cloud} /> : null}
        {weather.weatherData?.type === 'Clear' ? <LottieAnimation source={Clear} /> : null}
        {weather.weatherData?.type === 'Drizzle' ? <LottieAnimation source={Drizzle} /> : null}
        {weather.weatherData?.type === 'Rain' ? <LottieAnimation source={Rain} /> : null}
        {weather.weatherData?.type === 'Thunderstorm' ? <LottieAnimation source={Thunderstorm} /> : null}
        <View style={styles.weatherInfo}>
          <Text style={styles.typeText}>{weather.weatherData?.type}</Text>
          <Text style={styles.tempText}>{weather.weatherData?.temperature}°C</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#FBFCF6'
    },
    title: {
      fontSize: 24 * fontScale,
      fontWeight: 'bold',
      color: '#4A4B4D'
    },
    weatherInfo: {
      flexDirection: 'column',
      position: 'absolute',
      bottom: 50,
      left: 0,
      right: 0,
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center'
    },
    typeText: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#3A1078'
    },
    tempText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
      color: '#2F58CD'
    },
});  
