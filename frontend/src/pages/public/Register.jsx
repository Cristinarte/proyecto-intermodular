import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8001/api/register';


export const Register = ({ closeModal }) => {
  // Estado para los campos del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Para manejar los errores
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Asegúrate de quitar espacios en las contraseñas
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Verifica que las contraseñas coincidan antes de enviarlas
    if (trimmedPassword !== trimmedConfirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
    }

    try {
        // Envia los datos al backend
        await axios.post(endpoint, {
            name,
            email,
            password: trimmedPassword,
            password_confirmation: trimmedConfirmPassword, // Asegúrate de usar este campo con el nombre correcto
        });
        closeModal();
        navigate('/');
    } catch (error) {
        console.log('Error:', error.response?.data || error);
        setError(error.response?.data?.message || 'Error al registrar el usuario');
    }
};


  return (
    <>
      {/* Modal de Registro */}
      <div className="modal modal-nav" tabIndex="-1" style={{ display: 'block' }} aria-labelledby="registerModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">Crear Cuenta</h5>
              <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Ingrese su nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingrese su correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirme su contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Registrarse</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


