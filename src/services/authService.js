import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'http://127.0.0.1:8000/o';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const authClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const login = async (username, password) => {
    try {
        let requestBody = new URLSearchParams();
        requestBody.append('client_id', CLIENT_ID);
        requestBody.append('client_secret', CLIENT_SECRET);
        requestBody.append('grant_type', 'password');
        requestBody.append('username', username);
        requestBody.append('password', password);
        const response = await authClient.post('/token/', requestBody);

        localStorage.setItem(
            'access_token',
            response.data.access_token
        );

        return response.data;

    } catch (error) {
        throw new Error('Error al iniciar sesión: ' + error.message);
    }
};

export const isLoggedIn = () => {
    return localStorage.getItem('access_token') !== null;
};

export const logout = async () => {
    if (!isLoggedIn()) {
        return;
    }

    const token = localStorage.getItem("access_token");

    try {
        const requestBody = new URLSearchParams();
        requestBody.append('token', token);
        requestBody.append('client_id', CLIENT_ID);
        requestBody.append('client_secret', CLIENT_SECRET);
        await authClient.post("/revoke_token/", requestBody);
    } catch (error) {
        console.error("Error al cerrar sesión: " + error.message);
    }

    localStorage.removeItem("access_token");
};
