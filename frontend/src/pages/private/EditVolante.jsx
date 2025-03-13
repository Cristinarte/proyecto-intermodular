import React, { useState, useEffect } from "react";
import axios from "axios";

export const EditVolante = ({ volante, setEditingVolante, onVolanteUpdated }) => {
  // Estados para manejar los campos del formulario, los errores y el estado del modal
  const [nombrePaciente, setNombrePaciente] = useState(volante.name_children || ""); // Nombre del paciente
  const [especialista, setEspecialista] = useState(volante.specialist_name || ""); // Especialista
  const [lugar, setLugar] = useState(volante.visit_place || ""); // Lugar de la consulta
  const [fecha, setFecha] = useState(volante.visit_date || ""); // Fecha de la consulta
  const [volanteFile, setVolanteFile] = useState(null); // Archivo del volante (imagen)
  const [error, setError] = useState(""); // Estado para los errores
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para el modal de éxito

  // Maneja el cambio de los campos de texto en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombrePaciente") setNombrePaciente(value);
    if (name === "especialista") setEspecialista(value);
    if (name === "lugar") setLugar(value);
    if (name === "fecha") setFecha(value);
  };

  // Maneja el cambio del archivo de volante (imagen)
  const handleFileChange = (e) => {
    setVolanteFile(e.target.files[0]); // Almacena el archivo seleccionado
  };

  // Función para enviar los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

    // Obtenemos el token de autenticación del almacenamiento local
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No se ha encontrado el token de autenticación");
      return;
    }

    // Preparamos los datos para enviarlos al backend
    const formData = new FormData();
    formData.append("name_children", nombrePaciente);
    formData.append("specialist_name", especialista);
    formData.append("visit_place", lugar);
    formData.append("visit_date", fecha);
    if (volanteFile) {
      formData.append("file_path", volanteFile); // Solo si hay un nuevo archivo, lo agregamos
    }
    formData.append("_method", "PUT"); // Indicamos que es una actualización (PUT)

    // Mostramos los datos antes de enviarlos (solo para depuración)
    console.log("Datos enviados:", {
      name_children: nombrePaciente,
      specialist_name: especialista,
      visit_place: lugar,
      visit_date: fecha,
      file_path: volanteFile,
    });

    try {
      // Enviamos la solicitud PUT al backend para actualizar el volante
      const response = await axios.post(
        `http://localhost:8001/api/medical/${volante.id}`, // Utilizamos el ID del volante para la URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Indicamos que enviamos un formulario con archivos
            Authorization: `Bearer ${token}`, // Añadimos el token de autenticación en la cabecera
          },
        }
      );

      console.log("Respuesta del servidor:", response.data);

      // Mostramos el modal de éxito
      setShowSuccessModal(true);

      // Si se pasa la función `onVolanteUpdated`, la ejecutamos con los datos actualizados
      if (onVolanteUpdated) {
        onVolanteUpdated(response.data.volante);
      }
    } catch (error) {
      // En caso de error, mostramos un mensaje de error
      console.error("Error al actualizar el volante:", error.response?.data || error.message);
      setError("Error al actualizar el volante. Intenta nuevamente.");
    }
  };

  // Función para cerrar el modal de éxito y volver al estado inicial
  const handleCloseModal = () => {
    setShowSuccessModal(false); // Cerramos el modal
    setEditingVolante(null); // Terminamos la edición del volante
  };

  return (
    <div>
      {/* Título del formulario */}
      <h3>Editar Volante</h3>

      {/* Formulario para editar el volante */}
      <form onSubmit={handleSubmit} className="formulario">
        <div className="mb-3">
          <label htmlFor="nombrePaciente" className="form-label">
            Nombre del Paciente
          </label>
          <input
            type="text"
            className="form-control"
            id="nombrePaciente"
            name="nombrePaciente"
            value={nombrePaciente}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="especialista" className="form-label">
            Especialista
          </label>
          <input
            type="text"
            className="form-control"
            id="especialista"
            name="especialista"
            value={especialista}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lugar" className="form-label">
            Centro médico
          </label>
          <input
            type="text"
            className="form-control"
            id="lugar"
            name="lugar"
            value={lugar}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">
            Fecha
          </label>
          <input
            type="date"
            className="form-control"
            id="fecha"
            name="fecha"
            value={fecha}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="volante" className="form-label">
            Volante (Imagen)
          </label>
          <input
            type="file"
            className="form-control"
            id="volante"
            name="volante"
            onChange={handleFileChange} // Cambia el archivo de volante
          />
        </div>

        {/* Si hay un error, se muestra en rojo */}
        {error && <p className="text-danger">{error}</p>}

        {/* Botones de guardar y cancelar */}
        <div className="d-flex justify-content-end gap-2">
          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setEditingVolante(null)} // Cancela la edición
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Modal de éxito al guardar los cambios */}
      {showSuccessModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "#1977cc", color: "white" }}>
                <h5 className="modal-title">Actualización completada</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p>Volante actualizado con éxito.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={handleCloseModal}>
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
