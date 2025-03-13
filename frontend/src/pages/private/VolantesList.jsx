import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditVolante } from "./EditVolante"; // Componente para editar un volante
import "../../assets/css/private/volanteList.css"; // Estilos CSS para la lista de volantes

export const VolantesList = ({ userId }) => {
  const [volantes, setVolantes] = useState([]); // Estado para manejar los volantes
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(""); // Estado para manejar los errores
  const [editingVolante, setEditingVolante] = useState(null); // Estado para manejar el volante que se está editando

  useEffect(() => {
    // Función asíncrona para obtener los volantes
    const fetchVolantes = async () => {
      setLoading(true); // Empezamos la carga
      setError(""); // Limpiamos cualquier error anterior

      const token = localStorage.getItem("authToken"); // Obtenemos el token de autenticación del localStorage
      if (!token) {
        setError("No se encontró el token de autenticación."); // Si no hay token, mostramos error
        setLoading(false); // Terminamos la carga
        return;
      }

      try {
        // Hacemos la petición para obtener los volantes
        const response = await axios.get("http://localhost:8001/api/medical", {
          headers: { Authorization: `Bearer ${token}` }, // Enviamos el token en el encabezado
          params: { user_id: userId }, // Mandamos el ID de usuario como parámetro
        });

        setVolantes(response.data); // Al obtener los datos, los guardamos en el estado
      } catch (error) {
        console.error("Error obteniendo volantes:", error); // Mostramos cualquier error en la consola
        setError("No se pudieron cargar los volantes."); // Mostramos un mensaje de error
      } finally {
        setLoading(false); // Terminamos la carga
      }
    };

    fetchVolantes(); // Llamamos a la función que obtiene los volantes
  }, [userId]); // El efecto se ejecuta cada vez que cambia el `userId`

  // Función para manejar el clic en el botón de editar
  const handleEditClick = (volante) => {
    setEditingVolante(volante); // Establecemos el volante que se va a editar
  };

  // Función para manejar el clic en el botón de eliminar
  const handleDeleteClick = async (id) => {
    const token = localStorage.getItem("authToken"); // Obtenemos el token de autenticación
    if (!token) {
      setError("No se encontró el token de autenticación."); // Si no hay token, mostramos error
      return;
    }

    try {
      // Hacemos una solicitud DELETE para eliminar el volante
      await axios.delete(`http://localhost:8001/api/medical/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Enviamos el token en el encabezado
      });
      setVolantes(volantes.filter((volante) => volante.id !== id)); // Actualizamos la lista de volantes después de eliminarlo
    } catch (error) {
      console.error("Error eliminando volante:", error); // Mostramos el error en la consola
      setError("No se pudo eliminar el volante."); // Mostramos un mensaje de error
    }
  };

  // Función para manejar la actualización de un volante
  const handleVolanteUpdated = (updatedVolante) => {
    setVolantes((prevVolantes) =>
      prevVolantes.map((v) => (v.id === updatedVolante.id ? updatedVolante : v)) // Reemplazamos el volante actualizado en la lista
    );
  };

  // Si estamos cargando, mostramos un mensaje de carga
  if (loading) return <p>Cargando volantes...</p>;
  // Si hubo un error, mostramos el mensaje de error
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      {/* Si hay un volante en edición, mostramos el formulario de edición */}
      {editingVolante && (
        <div className="mb-5">
          <EditVolante
            volante={editingVolante} // Pasamos el volante que estamos editando
            setEditingVolante={setEditingVolante} // Función para salir del modo de edición
            onVolanteUpdated={handleVolanteUpdated} // Función para actualizar el volante en la lista
          />
        </div>
      )}

      {/* Título de la lista */}
      <h3>Lista de Volantes</h3>

      {/* Tabla de volantes (para pantallas grandes) */}
      <div className="table-responsive d-none d-md-block">
        <table className="table">
          <thead>
            <tr>
              {/* Encabezados de la tabla */}
              <th scope="col" style={{ backgroundColor: '#1977cc', color: 'white' }}>Nombre del Paciente</th>
              <th scope="col" style={{ backgroundColor: '#1977cc', color: 'white' }}>Especialista</th>
              <th scope="col" style={{ backgroundColor: '#1977cc', color: 'white' }}>Lugar</th>
              <th scope="col" style={{ backgroundColor: '#1977cc', color: 'white' }}>Fecha</th>
              <th scope="col" style={{ backgroundColor: '#1977cc', color: 'white' }}>Volante</th>
              <th scope="col" style={{ backgroundColor: '#1977cc', color: 'white' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapeamos los volantes para mostrarlos en la tabla */}
            {volantes.map((volante) => (
              <tr key={volante.id}>
                <td>{volante.name_children}</td>
                <td>{volante.specialist_name}</td>
                <td>{volante.visit_place}</td>
                <td>{volante.visit_date}</td>
                <td>
                  {/* Si el volante tiene archivo, mostramos un enlace para verlo */}
                  {volante.file_path ? (
                    <a href={`http://localhost:8001/storage/${volante.file_path}`} target="_blank" rel="noopener noreferrer">
                      Ver archivo
                    </a>
                  ) : (
                    "No disponible" // Si no hay archivo, mostramos "No disponible"
                  )}
                </td>
                <td>
                  {/* Botones de editar y eliminar */}
                  <button className="btn btn-primary me-2" onClick={() => handleEditClick(volante)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteClick(volante.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de los volantes para pantallas pequeñas (en forma de tarjetas) */}
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
