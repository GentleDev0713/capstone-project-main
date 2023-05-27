import React, { useState } from 'react';
const AuthContext = React.createContext();

/* Configures context and context provider.*/

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>);
};

export default AuthContext;