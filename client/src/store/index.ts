import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import basketReducer from './slices/basketSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
