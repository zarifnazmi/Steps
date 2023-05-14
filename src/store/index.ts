import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { MMKVLoader} from 'react-native-mmkv-storage';
import rootReducer, { RootState } from './reducers/rootReducer';

const MMKV = new MMKVLoader().withInstanceID('root').initialize();

const persistConfig = {
  key: 'root',
  storage: MMKV,
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

const persistor = persistStore(store);

export { store, persistor };
