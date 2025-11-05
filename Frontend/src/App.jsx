import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from './Auth/AuthContext.jsx';
import ProtectedRoute from './Auth/ProtectedRoute.jsx';

import CrudPage from './CrudPage.jsx';
import CRUDSuscUsers from './CRUDSuscUsers.jsx';
import Panel from './Panel.jsx';

import './App.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated, login } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            const role = localStorage.getItem('userRole');
            if (role === 'ADMIN') navigate('/panel', { replace: true });
            else navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                login(data.token, data.role ? data.role.toUpperCase() : "ADMIN");
            } else {
                setError(data.error || 'Credenciales inválidas');
            }
        } catch {
            setError('Error de conexión con el servidor.');
        }
    };

    if (isAuthenticated) return <div className="text-center p-8">Redirigiendo...</div>;

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-box">
                <h2 className="login-title">Login</h2>

                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                    required
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required
                />

                <button type="submit" className="login-btn">
                    Entrar
                </button>

                {error && <p className="login-error">{error}</p>}
            </form>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />} />

                    <Route
                        path="/panel"
                        element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <Panel />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/crud"
                        element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <CrudPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/crudusuariossusc"
                        element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <CRUDSuscUsers />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}