import { createSlice } from '@reduxjs/toolkit';

const state: any = [];
export const userSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        addUser: (state, action) => {
            const exitEmail = state.find(
                (item: any) => item.email === action.payload.email
            );

            if (action.payload.email !== undefined && !exitEmail) {
                state.push(action.payload);
            }
        },
    },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
