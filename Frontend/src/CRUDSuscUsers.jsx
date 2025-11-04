import React, { useEffect, useState } from "react";
import { useAuth } from './Auth/AuthContext.jsx';
import { useNavigate } from "react-router-dom";

const CrudSuscUsers = () => {
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

            // ✅ ENDPOINT CORRECTO
            const res = await fetch("http://localhost:8080/api/suscripciones_de_usuarios", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Error al cargar");
            const data = await res.json();
            setSuscripciones(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ ELIMINAR REGISTRO
    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar este registro?")) return;

        try {
            const token = localStorage.getItem("userToken");

            const res = await fetch(`http://localhost:8080/api/suscripciones_de_usuarios/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Error al eliminar");

            setSuscripciones(suscripciones.filter(s => s.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    // ✅ EDITAR REGISTRO
    const handleUpdate = async (s) => {

        const idUsuario = window.prompt("ID Usuario:", s.idUsuario);
        if (idUsuario === null) return;

        const idSuscripcion = window.prompt("ID Suscripción:", s.idSuscripcion);
        if (idSuscripcion === null) return;

        const fechaInicio = window.prompt("Fecha Inicio (YYYY-MM-DD):", s.fechaInicio);
        if (fechaInicio === null) return;

        const fechaFin = window.prompt("Fecha Fin (YYYY-MM-DD):", s.fechaFin);
        if (fechaFin === null) return;

        const estado = window.prompt("Estado:", s.estado);
        if (estado === null) return;

        const actualizado = { idUsuario, idSuscripcion, fechaInicio, fechaFin, estado };

        try {
            const token = localStorage.getItem("userToken");

            const res = await fetch(`http://localhost:8080/api/suscripciones_de_usuarios/${s.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(actualizado)
            });

            if (!res.ok) throw new Error("Error al actualizar");

            setSuscripciones(suscripciones.map(item =>
                item.id === s.id ? { ...item, ...actualizado } : item
            ));

        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="p-8">Cargando...</div>;

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Suscripciones por Usuario</h2>

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
                    <th className="border px-4 py-2">Usuario</th>
                    <th className="border px-4 py-2">Suscripción</th>
                    <th className="border px-4 py-2">Fecha Inicio</th>
                    <th className="border px-4 py-2">Fecha Fin</th>
                    <th className="border px-4 py-2">Estado</th>
                    <th className="border px-4 py-2">Acciones</th>
                </tr>
                </thead>

                <tbody>
                {suscripciones.map(s => (
                    <tr key={s.id}>
                        <td className="border px-4 py-2">{s.id}</td>
                        <td className="border px-4 py-2">{s.idUsuario}</td>
                        <td className="border px-4 py-2">{s.idSuscripcion}</td>
                        <td className="border px-4 py-2">{s.fechaInicio}</td>
                        <td className="border px-4 py-2">{s.fechaFin}</td>
                        <td className="border px-4 py-2">{s.estado}</td>

                        <td className="border px-4 py-2 space-x-2">
                            <button
                                onClick={() => handleUpdate(s)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => handleDelete(s.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CrudSuscUsers;
