import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuthState } from '../providers/AuthProvider/hooks/useAuthState';

// Protected Routes if the user is not logged, redirect they to Login page
const ProtectedRoute = ({ children }) => {
    const { authState: { isLogged } } = useAuthState()

    if (!isLogged) return <Navigate to="/login" />;

    return children
}

export default ProtectedRoute
