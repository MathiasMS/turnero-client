import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export const useAuthDispatcher = () => {
    const { login, logout } = useContext(AuthContext);

    return {
        login,
        logout
    };
};
