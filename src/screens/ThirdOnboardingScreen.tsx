// screens/ThirdOnboardingScreen.tsx

import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AuthStack';
import OnboardingComponent from '../components/OnboardingComponent';
import weather from '../assets/weather-day-shower-rains.json';
import useAuth from '../store/actions/useAuth';
import { useContextSelector } from 'use-context-selector';
import { HealthContext } from '../context/HealthProvider';

interface AuthItem {
  switch: number;
}

type ThirdScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ThirdOnboarding'>;

type NavigationProps = {
  navigation: ThirdScreenNavigationProp;
};

export default function ThirdOnboardingScreen({ navigation }: NavigationProps) {
  const { switchOffOnboard } = useAuth();
  const init = useContextSelector(HealthContext, state => state!.init);

  const handleAddItem = (num: number) => {
    const item: AuthItem = { switch: num };
    init();
    switchOffOnboard(item);
  };

  return (
    <OnboardingComponent source={weather} title="Weather Today!" description="You can plan your walking schedule according to weather today." buttonTitle="Get Started" onPress={() => handleAddItem(1)}/>
  );
}