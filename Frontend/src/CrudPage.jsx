import React, { useEffect, useState } from "react";
import { useAuth } from './Auth/AuthContext.jsx';
import {useNavigate} from "react-router-dom";

const CrudPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [suscripciones, setSuscripciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSuscripciones();
    }, []);

    const fetchSuscripciones = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("userToken");
            const res = await fetch("http://localhost:8080/api/suscripciones", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Error al cargar las suscripciones");
            const data = await res.json();
            setSuscripciones(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Actualizar suscripción
    const handleUpdate = async (suscripcion) => {
        // Pedimos todos los campos
        const nombre = window.prompt("Nombre:", suscripcion.nombre);
        if (nombre === null) return;

        const tipo = window.prompt("Tipo:", suscripcion.tipo);
        if (tipo === null) return;

        const precio = window.prompt("Precio:", suscripcion.precio);
        if (precio === null) return;

        const duracionMeses = window.prompt("Duración (meses):", suscripcion.duracionMeses);
        if (duracionMeses === null) return;

        const estado = window.prompt("Estado:", suscripcion.estado);
        if (estado === null) return;

        const actualizado = { ...suscripcion, nombre, tipo, precio, duracionMeses, estado };

        try {
            const token = localStorage.getItem("userToken");
            const res = await fetch(`http://localhost:8080/api/suscripciones/${suscripcion.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(actualizado)
            });

            if (!res.ok) throw new Error("Error al actualizar");

            // Refrescar lista
            setSuscripciones(suscripciones.map(s => s.id === suscripcion.id ? actualizado : s));
        } catch (error) {
            console.error(error);
            alert("Error al actualizar la suscripción");
        }
    };

    if (loading) return <div className="p-8">Cargando suscripciones...</div>;

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">CRUD de Suscripciones</h2>

            <div className="flex gap-3 mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                    ← Regresar
                </button>

                <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            <table className="table-auto w-full border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Nombre</th>
                    <th className="border px-4 py-2">Tipo</th>
                    <th className="border px-4 py-2">Precio</th>
                    <th className="border px-4 py-2">Duración (meses)</th>
                    <th className="border px-4 py-2">Estado</th>
                    <th className="border px-4 py-2">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {suscripciones.map(s => (
                    <tr key={s.id}>
                        <td className="border px-4 py-2">{s.id}</td>
                        <td className="border px-4 py-2">{s.nombre}</td>
                        <td className="border px-4 py-2">{s.tipo}</td>
                        <td className="border px-4 py-2">{s.precio}</td>
                        <td className="border px-4 py-2">{s.duracionMeses} meses</td>
                        <td className="border px-4 py-2">{s.estado}</td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={() => handleUpdate(s)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                            >
                                Editar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CrudPage;