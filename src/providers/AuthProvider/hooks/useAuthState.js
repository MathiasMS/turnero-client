import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export const useAuthState = () => {
    const { authState } = useContext(AuthContext);

    return {
        authState,
    };
};
