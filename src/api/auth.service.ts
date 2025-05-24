import type { LoginRequest, RegisterRequest } from '@/types';
import api from './config';
import axios from 'axios';
const API_BASE_URL = 'https://djikstra-backend-72c0da10bb72.herokuapp.com';
const AuthService = {
    login: async (data: LoginRequest)=> {
        const response = await api.post('/auth/login', data);
        return response;
    },
    register: async (data: RegisterRequest) => {
        console.log("Registering user:", data);
        const response = await api.post('/auth/register', data);
        return response;
    },
    logout: () => {
        localStorage.removeItem('token');
    },
    verifyToken: async (token: string)=> { 
        const response = await axios.post(`${API_BASE_URL}/auth/verify`, { token }, {
            headers: {Authorization: `Bearer ${token}`,},
         });
        return response;
    }
};

export default AuthService; 