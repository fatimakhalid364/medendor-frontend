import axios from 'axios';
import Cookies from 'js-cookie';
import { baseApi } from '@/constants/routes';

export const api = axios.create({
    baseURL: baseApi,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const csrfToken = Cookies.get('csrf-token');
    console.log("csrf token is", csrfToken);
    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
    }
    return config;
});


