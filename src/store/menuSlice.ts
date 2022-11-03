import { createSlice } from '@reduxjs/toolkit';

const state: any = [];
export const menuSlice = createSlice({
    name: 'menu',
    initialState: state,
    reducers: {
        addHistorySearch: (state, action) => {
            state.push(action.payload);
        },
        deleteHistorySearch: (state, action) => {
            const newArr = state.filter(
                (item: any) => item.id !== action.payload.id
            );
            return [...newArr];
        },
    },
});

export const { addHistorySearch, deleteHistorySearch } = menuSlice.actions;
export default menuSlice.reducer;
