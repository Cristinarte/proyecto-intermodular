import React, { useState, useEffect } from "react";
import axios from "axios";

export const EditVolante = ({ volante, setEditingVolante, onVolanteUpdated }) => {
  const [nombrePaciente, setNombrePaciente] = useState(volante.name_children || "");
  const [especialista, setEspecialista] = useState(volante.specialist_name || "");
  const [lugar, setLugar] = useState(volante.visit_place || "");
  const [fecha, setFecha] = useState(volante.visit_date || "");
  const [volanteFile, setVolanteFile] = useState(null);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para el modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombrePaciente") setNombrePaciente(value);
    if (name === "especialista") setEspecialista(value);
    if (name === "lugar") setLugar(value);
    if (name === "fecha") setFecha(value);
  };

  const handleFileChange = (e) => {
    setVolanteFile(e.target.files[0]);
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
    formData.append("visit_place", lugar);
    formData.append("visit_date", fecha);
    if (volanteFile) {
      formData.append("file_path", volanteFile);
    }
    formData.append("_method", "PUT");

    console.log("Datos enviados:", {
      name_children: nombrePaciente,
      specialist_name: especialista,
      visit_place: lugar,
      visit_date: fecha,
      file_path: volanteFile,
    });

    try {
      const response = await axios.post(
        `http://localhost:8001/api/medical/${volante.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Respuesta del servidor:", response.data);

      // Mostrar el modal en lugar de un alert
      setShowSuccessModal(true);

      if (onVolanteUpdated) {
        onVolanteUpdated(response.data.volante);
      }
    } catch (error) {
      console.error("Error al actualizar el volante:", error.response?.data || error.message);
      setError("Error al actualizar el volante. Intenta nuevamente.");
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setEditingVolante(null); // Cierra el formulario después de cerrar el modal
  };

  return (
    <div>
      <h3>Editar Volante</h3>
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
            onChange={handleFileChange}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <div className="d-flex justify-content-end gap-2">
          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setEditingVolante(null)}
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Modal de éxito */}
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