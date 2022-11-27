import axios from 'axios';
import { useAuthState } from '../providers/AuthProvider/hooks/useAuthState';
import { TURNER_API_URL } from '../config';
import { getToken } from './authentication';

const createAxiosInstance = (baseUrl) => {
    const instance = axios.create({
        baseURL: baseUrl,
    });

    instance.interceptors.request.use(
        (config) => {
            const token = getToken()

            config.headers.authorization = `Bearer ${token}`;

            return config;
        },
        (error) => {
            console.error('Request error: ', error);
        }
    );

    return instance;
};

export const httpClient = createAxiosInstance(TURNER_API_URL);

export const apiBase = '/api';

export const apiUrls = {
    authentication: {
        signUp: `${apiBase}/authentication/signup`,
        login: `${apiBase}/authentication/login`
    },
    categories: {
        getAllPaginated: `${apiBase}/categories/paginated`,
        getAll: `${apiBase}/categories`,
        getAllPublic: `${apiBase}/categories/public`,
        getOne: id => `${apiBase}/categories/${id}`,
        create: `${apiBase}/categories`,
        edit: id => `${apiBase}/categories/${id}`,
        remove: id  => `${apiBase}/categories/${id}`
    },
    procedures: {
        getAllPaginated: `${apiBase}/procedures/paginated`,
        getAll: `${apiBase}/procedures`,
        getAllPublic: `${apiBase}/procedures/public`,
        getAllProceduresAvailability: id => `${apiBase}/procedures/${id}/procedures-availability`,
        getOne: id => `${apiBase}/procedures/${id}`,
        create: `${apiBase}/procedures`,
        edit: id => `${apiBase}/procedures/${id}`,
        remove: id  => `${apiBase}/procedures/${id}`
    },
    proceduresAvailability: {
        confirm: `${apiBase}/procedures-availability/confirm`,
        cancel: `${apiBase}/procedures-availability/cancel`
    },
}
