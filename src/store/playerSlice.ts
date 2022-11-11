import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const state: any = [];
export const playerSlice = createSlice({
    name: 'players',
    initialState: state,
    reducers: {
        addFavorite: (state, action) => {
            if (action.payload.key !== undefined) {
                state.push(action.payload);
                toast.success('Đã thêm vào danh sách yêu thích');
            } else if (action.payload.user.email === undefined) {
                toast.error('Đã xảy ra lỗi');
            } else {
                toast.error('Bài hát không tồn tại');
            }
        },
    },
});

export const { addFavorite } = playerSlice.actions;
export default playerSlice.reducer;
