import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function ProtectedRoute({ children, allowedRoles }) {
    const { isAuthenticated, userRole, logout } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        logout();
        return <Navigate to="/" replace />;
    }

    return children;
}