import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { VolantesList } from "./VolantesList"; // Importamos VolantesList para mostrar la lista de volantes

export const AddVolante = ({ userId }) => {
  // Estados para los campos del formulario y mensajes de error
  const [nombrePaciente, setNombrePaciente] = useState(""); // Nombre del paciente
  const [especialista, setEspecialista] = useState(""); // Nombre del especialista
  const [lugar, setLugar] = useState(""); // Lugar de la consulta médica
  const [fecha, setFecha] = useState(""); // Fecha de la consulta
  const [volante, setVolante] = useState(null); // Archivo del volante (imagen)
  const [error, setError] = useState(""); // Estado para mostrar errores
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const [showVolantesList, setShowVolantesList] = useState(false); // Controla la visibilidad de la lista de volantes

  // Función para manejar el cambio de valor de los campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombrePaciente") setNombrePaciente(value);
    if (name === "especialista") setEspecialista(value);
    if (name === "lugar") setLugar(value);
    if (name === "fecha") setFecha(value);
  };

  // Función para manejar el cambio de archivo
  const handleFileChange = (e) => {
    setVolante(e.target.files[0]); // Almacena el archivo del volante seleccionado
  };

  // Función para enviar los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

    const token = localStorage.getItem("authToken"); // Obtenemos el token de autenticación
    if (!token) {
      setError("No se ha encontrado el token de autenticación");
      return;
    }

    // Preparamos los datos del formulario para enviarlos
    const formData = new FormData();
    formData.append("name_children", nombrePaciente);
    formData.append("specialist_name", especialista);
    formData.append("file_path", volante); // Archivo de la imagen del volante
    formData.append("visit_place", lugar);
    formData.append("visit_date", fecha);
    formData.append("user_id", userId); // ID del usuario

    try {
      // Realizamos la solicitud POST al backend
      await axios.post("http://localhost:8001/api/medical", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Indicamos que estamos enviando un formulario con archivos
          Authorization: `Bearer ${token}`, // Añadimos el token de autorización
        },
      });

      setError(""); // Reseteamos cualquier error previo
      setShowModal(true); // Mostramos el modal de éxito
    } catch (error) {
      // En caso de error, mostramos el mensaje correspondiente
      console.error("Error al agregar el volante", error.response || error);
      setError("Error al agregar el volante. Intenta nuevamente.");
    }
  };

  // Función para cerrar el modal y mostrar la lista de volantes
  const handleCloseModal = () => {
    setShowModal(false); // Cerramos el modal
    setShowVolantesList(true); // Mostramos la lista de volantes
  };

  return (
    <div>
      {/* Si no estamos mostrando la lista de volantes, mostramos el formulario */}
      {!showVolantesList ? (
        <form onSubmit={handleSubmit} className="formulario">
          <div className="mb-3">
            <label htmlFor="nombrePaciente" className="form-label">Nombre del Paciente</label>
            <input
              type="text"
              className="form-control"
              id="nombrePaciente"
              name="nombrePaciente"
              placeholder="Inserta nombre"
              value={nombrePaciente}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="especialista" className="form-label">Especialista</label>
            <input
              type="text"
              className="form-control"
              id="especialista"
              name="especialista"
              placeholder="Inserta especialidad médica"
              value={especialista}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lugar" className="form-label">Centro médico</label>
            <input
              type="text"
              className="form-control"
              id="lugar"
              name="lugar"
              placeholder="Inserta lugar de la clínica"
              value={lugar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fecha" className="form-label">Fecha</label>
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
            <label htmlFor="volante" className="form-label">Volante (Imagen)</label>
            <input
              type="file"
              className="form-control"
              id="volante"
              name="volante"
              onChange={handleFileChange}
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>} {/* Si hay error, lo mostramos */}
          <button type="submit" className="btn btn-primary">Enviar</button> {/* Botón para enviar el formulario */}
        </form>
      ) : (
        <VolantesList /> // Si el estado showVolantesList es true, mostramos la lista de volantes
      )}

      {/* Modal de Bootstrap para confirmar la acción */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registro completado</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p>Volante agregado con éxito.</p> {/* Mensaje de confirmación */}
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
