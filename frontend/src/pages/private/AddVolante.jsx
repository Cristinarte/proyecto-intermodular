import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { VolantesList } from "./VolantesList"; // Importamos VolantesList

export const AddVolante = ({ userId }) => {
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [especialista, setEspecialista] = useState("");
  const [lugar, setLugar] = useState("");
  const [fecha, setFecha] = useState("");
  const [volante, setVolante] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showVolantesList, setShowVolantesList] = useState(false); // Estado para mostrar VolantesList

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombrePaciente") setNombrePaciente(value);
    if (name === "especialista") setEspecialista(value);
    if (name === "lugar") setLugar(value);
    if (name === "fecha") setFecha(value);
  };

  const handleFileChange = (e) => {
    setVolante(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No se ha encontrado el token de autenticación");
      return;
    }

    const formData = new FormData();
    formData.append("name_children", nombrePaciente);
    formData.append("specialist_name", especialista);
    formData.append("file_path", volante);
    formData.append("visit_place", lugar);
    formData.append("visit_date", fecha);
    formData.append("user_id", userId);

    try {
      await axios.post("http://localhost:8001/api/medical", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setError("");
      setShowModal(true);
    } catch (error) {
      console.error("Error al agregar el volante", error.response || error);
      setError("Error al agregar el volante. Intenta nuevamente.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowVolantesList(true); // Mostrar VolantesList
  };

  return (
    <div>
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
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      ) : (
        <VolantesList /> // Si el estado es true, renderiza VolantesList
      )}

      {/* MODAL DE BOOTSTRAP */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registro completado</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p>Volante agregado con éxito.</p>
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
