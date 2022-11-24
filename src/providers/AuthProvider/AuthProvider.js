import { useState } from 'react';
import { getToken, getUser, isAuthenticated, removeAuthData, setAuthData } from '../../utils/authentication';
import AuthContext from './contexts/AuthContext';

const INITIAL_STATE = {
    user: getUser(),
    token: getToken(),
    isLogged: isAuthenticated(),
}

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(INITIAL_STATE)

    const login = ({ user, token }) => {
        const newState = {
            isLogged: true,
            user,
            token
        }

        setAuthState(newState)
        setAuthData(newState)
    }

    const logout = () => {
        removeAuthData()
        setAuthState({isLogged: false, user: null, token: null})
    }

    const value = {
        logout,
        login,
        authState
    }

    return (<AuthContext.Provider value={value}> {children} </AuthContext.Provider>)
}

export default AuthProvider
