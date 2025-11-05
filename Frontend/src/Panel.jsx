import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext.jsx";


export default function Panel() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">


            <h1 className="text-3xl font-bold mb-8 text-gray-800"> Panel de Administración </h1>

            <div className="space-y-8 w-full max-w-sm">

                <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>

                    <button onClick={() => navigate("/crud")}>
                        Servicios y Suscripciones
                    </button>

                    <button onClick={() => navigate("/crudusuariossusc")}>
                        Suscripciones de los Usuarios
                    </button>

                    <button
                        onClick={logout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </div>
    );
}
