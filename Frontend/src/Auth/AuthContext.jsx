import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userToken'));
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);

    const logout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userRole");
        setIsAuthenticated(false);
        setUserRole(null);
        console.log("Usuario deslogueado");
    };

    // Mostrar token en consola al hacer login
    useEffect(() => {
        if (isAuthenticated) {
            const token = localStorage.getItem("userToken");
            console.log("Token actual:", token);
        }
    }, [isAuthenticated]);

    // Logout por inactividad de 15 min
    useEffect(() => {
        if (!isAuthenticated) return;

        let timeout;

        const resetTimer = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => logout(), 15 * 60 * 1000); // 15 min
        };

        //Resete de timer con actividad
        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);

        resetTimer();

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keydown", resetTimer);
        };
    }, [isAuthenticated]);

    const login = (token, role) => {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userRole', role);
        setIsAuthenticated(true);
        setUserRole(role);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
