const TOKEN_NAME = "turnero-translate:auth";

export const setAuthData = (authState) => {
    localStorage.setItem(TOKEN_NAME, JSON.stringify(authState));
}

export const removeAuthData = () => {
    return localStorage.removeItem(TOKEN_NAME)
};

const getAuthData = () => {
    const authData = JSON.parse(localStorage.getItem(TOKEN_NAME))

        if(authData) {
            const state = {
            user: {
            _id: authData.user.id,
            username: authData.user.username,
        },
            isLogged: authData.isLogged,
            token: authData.token
        }

            return state
        }
        return null
}

export const getToken = () => {
    const authData = getAuthData()

    if(authData && authData.token) {
    return authData.token
}

    return ""
};

export const getUser = () => {
    const authData = getAuthData()

    if(authData && authData.user) {
    return authData.user
}
    return null
};

export const isAuthenticated = () => {
    return !!getAuthData()
}
