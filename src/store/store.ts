import { configureStore } from '@reduxjs/toolkit';
import barracaReducer from './barracaSlice';

export const store = configureStore({
  reducer: {
    barraca: barracaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 