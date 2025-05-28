import axios from 'axios';

const API_BASE_URL = 'https://djikstra-backend-72c0da10bb72.herokuapp.com';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log('API Request Interceptor: Token present:', !!token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('API Request Interceptor: Added Authorization header');
        }
        console.log('API Request Interceptor: Request config:', {
            url: config.url,
            method: config.method,
            headers: config.headers,
        });
        return config;
    },
    (error) => {
        console.error('API Request Interceptor: Error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log('API Response Interceptor: Response received:', {
            url: response.config.url,
            status: response.status,
        });
        return response;
    },
    (error) => {
        console.error('API Response Interceptor: Error:', {
            url: error.config?.url,
            status: error.response?.status,
            message: error.message,
            response: error.response?.data,
        });
        return Promise.reject(error);
    }
);

export default api; 