// navigation/index.tsx

import React from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers/rootReducer';
import { HealthProvider } from '../context/HealthProvider'

function Providers(): JSX.Element {
    const auth = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
        <HealthProvider>
            {auth.switchNumber > 0 ? <AppStack /> : <AuthStack />}
        </HealthProvider>
    </NavigationContainer>
  );
}

export default Providers;
