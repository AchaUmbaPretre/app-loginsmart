import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utilisation de localStorage
import authReducer from './authSlice'; // Le reducer de l'authentification

const persistConfig = {
  key: 'root',
  storage, // Utilisation de localStorage (ou sessionStorage si besoin)
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer, // Ajouter le reducer persisté
  },
});

const persistor = persistStore(store);

export { store, persistor };
