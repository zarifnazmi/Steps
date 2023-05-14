// screens/FirstOnboardingScreen.tsx

import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AuthStack';
import OnboardingComponent from '../components/OnboardingComponent';
import walkingDuck from '../assets/walking-duck.json';

type FirstScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FirstOnboarding'>;

type NavigationProps = {
  navigation: FirstScreenNavigationProp;
};

export default function FirstOnboardingScreen({ navigation }: NavigationProps) {

  return (
    <OnboardingComponent source={walkingDuck} title="Welcome to Steps!" description="Enjoy your walking experience with us." buttonTitle="Next" onPress={() => navigation.navigate("SecondOnboarding")}/>
  );
}