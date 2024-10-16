// Magasin avec tous les reducers
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './/authReducer';
import profileReducer from './/editReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer
  },
});