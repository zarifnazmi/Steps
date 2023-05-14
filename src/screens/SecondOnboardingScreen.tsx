// screens/SecondOnboardingScreen.tsx

import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AuthStack';
import OnboardingComponent from '../components/OnboardingComponent';
import goalSetting from '../assets/step-up.json';

type SecondScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SecondOnboarding'>;

type NavigationProps = {
  navigation: SecondScreenNavigationProp;
};

export default function SecondOnboardingScreen({ navigation }: NavigationProps) {

  return (
    <OnboardingComponent source={goalSetting} title="Set your Goals!" description="Set your daily walking goals." buttonTitle="Next" onPress={() => navigation.navigate("ThirdOnboarding")}/>
  );
}