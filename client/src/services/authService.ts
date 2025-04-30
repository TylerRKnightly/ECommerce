import axios from 'axios';
import { LoginCreds } from '../store/authSlice';

const API_URL = '/api/auth';

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers || {}
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

const login = async ({ email, password }: LoginCreds) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });

    if (res.data.token) {
        localStorage.setItem('token', res.data.token);
    }

    return res.data;
};

const getProfile = async () => {
    const res = await axios.get(`${API_URL}/profile`);
    return res.data;
};

const logout = () => {
    localStorage.removeItem('token');
};

export default { login, getProfile, logout };