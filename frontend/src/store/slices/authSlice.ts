import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const tokenFromStorage = localStorage.getItem('InventoryToken');

const initialState: AuthState = {
  isAuthenticated: !!tokenFromStorage,
  token: tokenFromStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('InventoryToken'); 
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
