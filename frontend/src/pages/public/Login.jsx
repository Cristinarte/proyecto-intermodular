import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importación de useNavigate para redirección
import axios from 'axios'; // Importación de axios para realizar solicitudes HTTP
import '../../assets/css/modales.css'; // Importación de los estilos personalizados para el modal

/**
 * Componente Login
 * 
 * Este componente presenta un formulario de inicio de sesión donde el usuario puede ingresar
 * su correo electrónico y contraseña para acceder a la plataforma. Si la autenticación es exitosa,
 * se guarda un token de autenticación en el almacenamiento local y se redirige al usuario a la
 * página del panel. Si la autenticación falla, se muestra un mensaje de error.
 *
 * @param {function} closeModal - Función para cerrar el modal de inicio de sesión.
 * @param {function} setAuthToken - Función para actualizar el estado global de autenticación con el token.
 */
export const Login = ({ closeModal, setAuthToken }) => {
  const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico ingresado por el usuario
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña ingresada por el usuario
  const [error, setError] = useState(''); // Estado para almacenar los errores de autenticación
  const navigate = useNavigate(); // Hook de React Router para redirigir al usuario a otra página

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * 
   * Realiza una solicitud POST al servidor para autenticar al usuario con las credenciales
   * proporcionadas. Si la autenticación es exitosa, guarda el token de autenticación y redirige
   * al usuario al panel. Si hay un error, muestra un mensaje de error.
   * 
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la acción por defecto del formulario (recarga de la página)

    try {
      // Enviar solicitud POST al backend con las credenciales de inicio de sesión
      const response = await axios.post('http://localhost:8001/api/login', {
        email,
        password,
      });

      // Si la respuesta es exitosa, obtener el token de autenticación
      const token = response.data.token;
      localStorage.setItem('authToken', token); // Guardar el token en el almacenamiento local
      setAuthToken(token); // Actualizar el estado global de autenticación

      closeModal(); // Cerrar el modal de inicio de sesión

      navigate('/panel'); // Redirigir al usuario al panel después de un inicio de sesión exitoso
    } catch (error) {
      // Si ocurre un error, mostrar un mensaje de error
      setError('Correo o contraseña incorrectos'); // Actualizar el estado de error
    }
  };

  return (
    <div className="modal modal-nav" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Inicio de Sesión</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button> {/* Botón para cerrar el modal */}
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}> {/* Formulario de inicio de sesión */}
              <div className="mb-3">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control" // Estilo de Bootstrap para los campos de entrada
                  value={email} // Asignar el valor del estado 'email'
                  onChange={(e) => setEmail(e.target.value)} // Actualizar el estado cuando el valor cambie
                  required // El campo es obligatorio
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password} // Asignar el valor del estado 'password'
                  onChange={(e) => setPassword(e.target.value)} // Actualizar el estado cuando el valor cambie
                  required // El campo es obligatorio
                />
              </div>
              {/* Mostrar el mensaje de error si ocurre algún problema durante el inicio de sesión */}
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-primary">Iniciar sesión</button> {/* Botón para enviar el formulario */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
