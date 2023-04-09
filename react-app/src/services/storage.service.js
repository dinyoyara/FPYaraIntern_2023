import { JWT_TOKEN } from '../constants';

const getToken = () => {
    return localStorage.getItem(JWT_TOKEN);
};

const removeToken = () => {
    localStorage.removeItem(JWT_TOKEN);
};

const setToken = (token) => {
    localStorage.setItem(JWT_TOKEN, token);
};

export { getToken, removeToken, setToken };
