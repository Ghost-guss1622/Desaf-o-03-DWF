import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const CrudSuscUsers = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [suscripciones, setSuscripciones] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        idUsuario: "",
        idSuscripcion: "",
        fechaInicio: "",
        fechaFin: "",
        estado: "Activo",
    });

    useEffect(() => {
        fetchSuscripciones();
    }, []);

    const fetchSuscripciones = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("userToken");

            const res = await fetch("http://localhost:8080/api/suscripciones_de_usuarios", {
                headers: { Authorization: `Bearer ${token}` },
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

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("userToken");

            const res = await fetch("http://localhost:8080/api/suscripciones_de_usuarios", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Error al crear");

            const nuevo = await res.json();
            setSuscripciones([...suscripciones, nuevo]);

            setFormData({
                idUsuario: "",
                idSuscripcion: "",
                fechaInicio: "",
                fechaFin: "",
                estado: "Activo",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar este registro?")) return;

        try {
            const token = localStorage.getItem("userToken");

            const res = await fetch(`http://localhost:8080/api/suscripciones_de_usuarios/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Error al eliminar");

            setSuscripciones(suscripciones.filter((s) => s.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

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
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(actualizado),
            });

            if (!res.ok) throw new Error("Error al actualizar");

            setSuscripciones(
                suscripciones.map((item) =>
                    item.id === s.id ? { ...item, ...actualizado } : item
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div style={{ padding: 20 }}>Cargando suscripciones...</div>;

    const headerCell = {
        borderBottom: "2px solid #ccc",
        padding: "10px",
        textAlign: "left",
    };

    const cell = {
        padding: "8px",
        borderBottom: "1px solid #e2e2e2",
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
                Suscripciones por Usuario
            </h2>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: "#6c757d",
                        color: "white",
                        padding: "8px 15px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    ← Regresar
                </button>

                <button
                    onClick={logout}
                    style={{
                        background: "#dc3545",
                        color: "white",
                        padding: "8px 15px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Logout
                </button>
            </div>

            <form
                onSubmit={handleCreate}
                style={{
                    width: "80%",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label>ID Usuario</label>
                    <input
                        type="number"
                        required
                        value={formData.idUsuario}
                        onChange={(e) =>
                            setFormData({ ...formData, idUsuario: e.target.value })
                        }
                        style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label>ID Suscripción</label>
                    <input
                        type="number"
                        required
                        value={formData.idSuscripcion}
                        onChange={(e) =>
                            setFormData({ ...formData, idSuscripcion: e.target.value })
                        }
                        style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label>Fecha Inicio</label>
                    <input
                        type="date"
                        required
                        value={formData.fechaInicio}
                        onChange={(e) =>
                            setFormData({ ...formData, fechaInicio: e.target.value })
                        }
                        style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label>Fecha Fin</label>
                    <input
                        type="date"
                        required
                        value={formData.fechaFin}
                        onChange={(e) =>
                            setFormData({ ...formData, fechaFin: e.target.value })
                        }
                        style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label>Estado</label>
                    <select
                        value={formData.estado}
                        onChange={(e) =>
                            setFormData({ ...formData, estado: e.target.value })
                        }
                        style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>

                <button
                    style={{
                        padding: "10px",
                        background: "#0d6efd",
                        border: "none",
                        color: "white",
                        borderRadius: "4px",
                        marginTop: "5px",
                        cursor: "pointer",
                    }}
                >
                    Crear
                </button>
            </form>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                <tr>
                    {["ID", "Usuario", "Suscripción", "Fecha Inicio", "Fecha Fin", "Estado", "Acciones"].map(
                        (t) => (
                            <th key={t} style={headerCell}>
                                {t}
                            </th>
                        )
                    )}
                </tr>
                </thead>
                <tbody>
                {suscripciones.map((s) => (
                    <tr key={s.id}>
                        <td style={cell}>{s.id}</td>
                        <td style={cell}>{s.idUsuario}</td>
                        <td style={cell}>{s.idSuscripcion}</td>
                        <td style={cell}>{s.fechaInicio}</td>
                        <td style={cell}>{s.fechaFin}</td>
                        <td style={cell}>{s.estado}</td>
                        <td style={{ ...cell, textAlign: "center" }}>
                            <button
                                onClick={() => handleUpdate(s)}
                                style={{
                                    background: "#f0ad4e",
                                    border: "none",
                                    padding: "6px 10px",
                                    borderRadius: "5px",
                                    color: "white",
                                    cursor: "pointer",
                                    marginRight: "6px",
                                }}
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => handleDelete(s.id)}
                                style={{
                                    background: "#dc3545",
                                    border: "none",
                                    padding: "6px 10px",
                                    borderRadius: "5px",
                                    color: "white",
                                    cursor: "pointer",
                                }}
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
