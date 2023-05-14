import React from 'react';
import Providers from './src/navigation';
import { Text } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { Provider } from 'react-redux';

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
      <Providers />
    </PersistGate>
    </Provider>
  );
}

export default App;
