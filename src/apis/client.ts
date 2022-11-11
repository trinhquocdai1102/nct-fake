import axios from 'axios';

export const client = axios.create({
    baseURL: process.env.REACT_APP_URL,
});

export const local = axios.create({
    baseURL: process.env.REACT_APP_URL_LOCAL,
});
