import { client } from './client';

export const getRanking = async () => {
    const res = await client.get('/bxh');
    return res.data;
};
