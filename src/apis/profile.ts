import { local } from './client';

export const getProfile = async () => {
    const data = await local.get('/profile');
    return data;
};
