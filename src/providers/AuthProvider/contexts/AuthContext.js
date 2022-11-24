import { createContext } from 'react';

export default createContext({
    authState: {},
    login: () => {},
    logout: () => {},
});
