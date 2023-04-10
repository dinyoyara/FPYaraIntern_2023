import axios from 'axios';

import { API_BASE_URL } from '../constants';
import { getToken } from './storage.service';

function createAxiosClient({ options, getToken }) {
    const client = axios.create(options);

    client.interceptors.request.use(
        (config) => {
            if (config.authorization !== false) {
                const token = getToken();
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return client;
}

const axiosClient = createAxiosClient({
    options: {
        baseURL: API_BASE_URL,
        timeout: 300000,
        headers: {
            'Content-Type': 'application/json'
        }
    },
    getToken
});

export default axiosClient;
