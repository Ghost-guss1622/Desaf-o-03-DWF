import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext.jsx";

export default function Panel() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">

            <div className="absolute top-4 right-4">
                <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
                >
                    Logout
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-8 text-gray-800">
                Panel de Administración
            </h1>

            <div className="space-y-5 w-full max-w-sm">

                <button
                    onClick={() => navigate("/crud")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg shadow-lg"
                >
                    Servicios y Suscripciones
                </button>

                <button
                    onClick={() => navigate("/crudusuariossusc")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg shadow-lg"
                >
                    Suscripciones de los Usuarios
                </button>
            </div>
        </div>
    );
}
