import React, { useEffect, useState } from "react";
import { useAuth } from './Auth/AuthContext.jsx';
import { useNavigate } from "react-router-dom";

const CrudPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [suscripciones, setSuscripciones] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        nombre: "",
        tipo: "",
        precio: "",
        duracionMeses: "",
        estado: "Activo",
    });

    useEffect(() => {
        fetchSuscripciones();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchSuscripciones = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("userToken");
            const res = await fetch("http://localhost:8080/api/suscripciones", {
                headers: { Authorization: `Bearer ${token}` },
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

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("userToken");

            const body = {
                nombre: formData.nombre,
                tipo: formData.tipo,
                duracionMeses: parseInt(formData.duracionMeses),
                precio: formData.precio,
            };

            const res = await fetch("http://localhost:8080/api/suscripciones", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error("Error al crear");

            const nueva = await res.json();
            setSuscripciones((prev) => [...prev, nueva]);

            setFormData({
                nombre: "",
                tipo: "",
                precio: "",
                duracionMeses: "",
                estado: "Activo",
            });
        } catch (error) {
            console.error(error);
            alert("Error al crear la suscripción");
        }
    };

    const handleUpdate = async (suscripcion) => {
        const nombre = window.prompt("Nombre:", suscripcion.nombre);
        if (nombre === null) return;

        const tipo = window.prompt("Tipo:", suscripcion.tipo);
        if (tipo === null) return;

        const precio = window.prompt("Precio:", suscripcion.precio);
        if (precio === null) return;

        const duracionMeses = window.prompt("Duración (meses):", suscripcion.duracionMeses);
        if (duracionMeses === null) return;

        const actualizado = {
            nombre,
            tipo,
            precio,
            duracionMeses: parseInt(duracionMeses, 10),
        };

        try {
            const token = localStorage.getItem("userToken");

            const res = await fetch(`http://localhost:8080/api/suscripciones/${suscripcion.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(actualizado),
            });

            if (!res.ok) throw new Error("Error al actualizar");

            setSuscripciones((prev) => prev.map(s => s.id === suscripcion.id ? { ...s, ...actualizado } : s));
        } catch (error) {
            console.error(error);
            alert("Error al actualizar la suscripción");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar esta suscripción?")) return;

        try {
            const token = localStorage.getItem("userToken");

            const res = await fetch(`http://localhost:8080/api/suscripciones/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Error al eliminar");

            setSuscripciones((prev) => prev.filter(s => s.id !== id));
        } catch (error) {
            console.error(error);
            alert("Error al eliminar la suscripción");
        }
    };

    if (loading) return <div style={{ padding: 20 }}>Cargando suscripciones...</div>;

    // estilos usados en el return (constantes para no repetir)
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
                CRUD de Servicios
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
                    <label>Nombre</label>
                    <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label>Tipo</label>
                    <input
                        type="text"
                        required
                        value={formData.tipo}
                        onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                        style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label>Precio</label>
                    <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.precio}
                        onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                        style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label>Duración (meses)</label>
                    <input
                        type="number"
                        required
                        value={formData.duracionMeses}
                        onChange={(e) => setFormData({ ...formData, duracionMeses: e.target.value })}
                        style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
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


            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    {["ID", "Nombre", "Tipo", "Precio", "Duración", "Acciones"].map((t) => (
                        <th key={t} style={headerCell}>
                            {t}
                        </th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {suscripciones.map((s) => (
                    <tr key={s.id}>
                        <td style={cell}>{s.id}</td>
                        <td style={cell}>{s.nombre}</td>
                        <td style={cell}>{s.tipo}</td>
                        <td style={cell}>${s.precio}</td>
                        <td style={cell}>{s.duracionMeses}</td>
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

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CrudPage;
