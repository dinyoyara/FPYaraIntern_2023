import jwt from 'jwt-decode';

import { getToken } from '../../services/storage.service';

export const getCustomerFromJWT = () => {
    const token = getToken();
    if (!token) return null;
    const { id, email, name } = jwt(token);
    return { id, email, name };
};
