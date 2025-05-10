import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { itemApi } from './slices/itemSlice';
import { customerApi } from './slices/customerSlice';  // Import the customerApi
import { saleApiSlice } from './slices/saleslice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
     [saleApiSlice.reducerPath]: saleApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      itemApi.middleware,
      customerApi.middleware,
      saleApiSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
