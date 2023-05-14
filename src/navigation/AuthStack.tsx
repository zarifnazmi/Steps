// navigation/AuthStack.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstOnboardingScreen from '../screens/FirstOnboardingScreen';
import SecondOnboardingScreen from '../screens/SecondOnboardingScreen';
import ThirdOnboardingScreen from '../screens/ThirdOnboardingScreen';

export type RootStackParamList = {
  FirstOnboarding: undefined;
  SecondOnboarding: undefined;
  ThirdOnboarding: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthStack() {

  return (
      <Stack.Navigator initialRouteName="FirstOnboarding">
        <Stack.Group>
          <Stack.Screen
            name="FirstOnboarding"
            component={FirstOnboardingScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="SecondOnboarding"
            component={SecondOnboardingScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="ThirdOnboarding"
            component={ThirdOnboardingScreen}
            options={{ header: () => null }}
          />
        </Stack.Group>
      </Stack.Navigator>
  );
};