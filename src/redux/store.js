// Magasin avec tous les reducers
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './/authReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});