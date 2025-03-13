import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Importa useNavigate
import axios from 'axios';
import '../../assets/css/modales.css';



export const Login = ({ closeModal, setAuthToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 👈 Definir useNavigate aquí

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8001/api/login', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('authToken', token);
      setAuthToken(token);

      closeModal(); // 👈 Cierra el modal

      navigate('/panel'); // 👈 Redirige al usuario al panel
    } catch (error) {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="modal modal-nav" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Inicio de Sesión</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3"> 
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
