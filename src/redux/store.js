// Magasin avec tous les reducers
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './/authReducer';
import editReducer from './/editReducer'

export const store = configureStore({
  reducer: {
    user: authReducer,
    profile: editReducer
  },
});