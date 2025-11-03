import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userToken'));
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);


    const login = (token, role) => {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userRole', role); // Guarda el rol
        setIsAuthenticated(true);
        setUserRole(role);
    };

    const logout = () => {
        // Asegúrate de limpiar todas las claves
        localStorage.removeItem("userToken");
        localStorage.removeItem("userRole");
        setIsAuthenticated(false);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);