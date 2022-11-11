import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import menuReducer from './menuSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        menu: menuReducer,
    },
});

export default store;
