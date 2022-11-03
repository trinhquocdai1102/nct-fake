import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import playerReducer from './playerSlice';

const store = configureStore({
    reducer: {
        menu: menuReducer,
        players: playerReducer,
    },
});

export default store;
