import { useEffect, useState } from 'react';

/* Adds or removes a token from local storage when a user registers or signs in.  Deletes the token when a user logs out or is deleted */

const useLocalStorage = () => {
    const INITIAL_STATE = localStorage.getItem("auth_token");
    const [token, setToken] = useState(INITIAL_STATE);
    const tokenKey = "auth_token";

    useEffect(() => {
        updateLocalStorage(token);
    }, [token]);

    function updateLocalStorage(token) {
        if (token) {
            localStorage.setItem(tokenKey, token)
        } else {
            localStorage.removeItem(tokenKey)
        };
    };

    function updateToken(newToken) {
        setToken(newToken);
        updateLocalStorage(newToken);
    };

    return [token, updateToken];
};

export default useLocalStorage;