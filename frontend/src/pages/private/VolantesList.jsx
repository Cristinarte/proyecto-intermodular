import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditVolante } from "./EditVolante";
import "../../assets/css/private/volanteList.css";

export const VolantesList = ({ userId }) => {
  const [volantes, setVolantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingVolante, setEditingVolante] = useState(null);

  useEffect(() => {
    const fetchVolantes = async () => {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No se encontró el token de autenticación.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8001/api/medical", {
          headers: { Authorization: `Bearer ${token}` },
          params: { user_id: userId },
        });

        setVolantes(response.data);
      } catch (error) {
        console.error("Error obteniendo volantes:", error);
        setError("No se pudieron cargar los volantes.");
      } finally {
        setLoading(false);
      }
    };

    fetchVolantes();
  }, [userId]);

  const handleEditClick = (volante) => {
    setEditingVolante(volante);
  };

  const handleDeleteClick = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No se encontró el token de autenticación.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8001/api/medical/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVolantes(volantes.filter((volante) => volante.id !== id));
    } catch (error) {
      console.error("Error eliminando volante:", error);
      setError("No se pudo eliminar el volante.");
    }
  };

  const handleVolanteUpdated = (updatedVolante) => {
    setVolantes((prevVolantes) =>
      prevVolantes.map((v) => (v.id === updatedVolante.id ? updatedVolante : v))
    );
  };

  if (loading) return <p>Cargando volantes...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      {editingVolante && (
        <div className="mb-5">
          <EditVolante
            volante={editingVolante}
            setEditingVolante={setEditingVolante}
            onVolanteUpdated={handleVolanteUpdated}
          />
        </div>
      )}

      <h3>Lista de Volantes</h3>

      <div className="table-responsive d-none d-md-block">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" style={{ backgroundColor: '#1977cc', color: 'white' }}>Nombre del Paciente</th>
              <th scope="col" style={{ backgroundColor: '#1977cc', color: 'white' }}>Especialista</th>
              <th scope="col" style={{ backgroundColor: '#1977cc', color: 'white' }}>Lugar</th>
              <th scope="col" style={{ backgroundColor: '#1977cc', color: 'white' }}>Fecha</th>
              <th scope="col" style={{ backgroundColor: '#1977cc', color: 'white' }}>Volante</th>
              <th scope="col" style={{ backgroundColor: '#1977cc', color: 'white' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {volantes.map((volante) => (
              <tr key={volante.id}>
                <td>{volante.name_children}</td>
                <td>{volante.specialist_name}</td>
                <td>{volante.visit_place}</td>
                <td>{volante.visit_date}</td>
                <td>
                  {volante.file_path ? (
                    <a href={`http://localhost:8001/storage/${volante.file_path}`} target="_blank" rel="noopener noreferrer">
                      Ver archivo
                    </a>
                  ) : (
                    "No disponible"
                  )}
                </td>
                <td>
                  <button className="btn btn-primary me-2" onClick={() => handleEditClick(volante)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteClick(volante.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-md-none">
        {volantes.map((volante) => (
          <div key={volante.id} className="card mb-3 p-3">
            <h5 className="card-title">{volante.name_children}</h5>
            <p className="card-text"><strong>Especialista:</strong> {volante.specialist_name}</p>
            <p className="card-text"><strong>Lugar:</strong> {volante.visit_place}</p>
            <p className="card-text"><strong>Fecha:</strong> {volante.visit_date}</p>
            <p className="card-text">
              <strong>Volante:</strong>{" "}
              {volante.file_path ? (
                <a href={`http://localhost:8001/storage/${volante.file_path}`} target="_blank" rel="noopener noreferrer">
                  Ver archivo
                </a>
              ) : (
                "No disponible"
              )}
            </p>
            <div className="d-flex flex-column">
              <button className="btn btn-primary mb-2" onClick={() => handleEditClick(volante)}>Editar</button>
              <button className="btn btn-danger" onClick={() => handleDeleteClick(volante.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};