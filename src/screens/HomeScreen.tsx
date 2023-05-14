import React from 'react';
import {
    Text,
    StatusBar,
    StyleSheet,
    Dimensions,
  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircularProgressBar from '../components/CircularProgressBar';
import { useContextSelector } from 'use-context-selector';
import { HealthContext } from '../context/HealthProvider';

const { height, fontScale } = Dimensions.get("window");
export default function HomeScreen() {
    const todayStepCount = useContextSelector(HealthContext, state => state!.todayStepCount);
    const todayWalkingDistance = useContextSelector(HealthContext, state => state!.todayWalkingDistance);

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#FBFCF6' barStyle={'dark-content'} />
          <Text style={styles.title}>Today Steps</Text>
        <CircularProgressBar
        distance={todayWalkingDistance !== null ? todayWalkingDistance : 0}
        progress={todayStepCount !== null ? todayStepCount : 0}
        size={350} 
        strokeWidth={30} 
        color="#57C5B6" 
      />
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
    }
});  
