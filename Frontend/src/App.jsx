import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from './Auth/AuthContext.jsx';
import ProtectedRoute from './Auth/ProtectedRoute.jsx';

import CrudPage from './CrudPage.jsx';
import CRUDSuscUsers from './CRUDSuscUsers.jsx';
import Panel from './Panel.jsx';

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl space-y-6">
                <h2 className="text-3xl font-bold text-center text-indigo-700">Login</h2>

                <input type="text" placeholder="Usuario" value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />

                <input type="password" placeholder="Contraseña" value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />

                <button type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg">
                    Entrar
                </button>

                {error && (
                    <p className="text-red-600 text-sm text-center bg-red-100 p-2 rounded-lg border border-red-300">
                        {error}
                    </p>
                )}
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