import jwt from 'jwt-decode';

export const getCustomerFromJWT = (getToken) => {
    const token = getToken();
    if (!token) return null;
    const { id, email, name } = jwt(token);
    return { id, email, name };
};
