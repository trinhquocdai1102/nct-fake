import { local } from './client';

export const getFavorite = async () => {
    const data = await local.get('/favorite');
    return data;
};
