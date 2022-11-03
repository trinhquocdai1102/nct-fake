import { HomeData } from '../models/home';
import client from './client';

export const getHome = async (): Promise<HomeData> => {
    const data = await client.get('/home');

    return data.data;
};
