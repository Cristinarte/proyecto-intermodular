import axios from 'axios'; // Importación de axios para realizar solicitudes HTTP
import React, { useState } from 'react'; // Importación de React y useState para gestionar el estado
import { useNavigate } from 'react-router-dom'; // Importación de useNavigate para la navegación

// Endpoint de la API para el registro de usuarios
const endpoint = 'http://localhost:8001/api/register';

/**
 * Componente Register
 * 
 * Este componente presenta un formulario para crear una cuenta de usuario. El usuario
 * debe ingresar su nombre, correo electrónico, y una contraseña. El formulario también
 * incluye un campo para confirmar la contraseña. Si las contraseñas no coinciden, se muestra
 * un mensaje de error. Si el registro es exitoso, el usuario es redirigido a la página principal.
 *
 * @param {function} closeModal - Función para cerrar el modal de registro.
 */
export const Register = ({ closeModal }) => {
  // Definición de los estados locales para los campos del formulario
  const [name, setName] = useState(''); // Almacena el nombre ingresado
  const [email, setEmail] = useState(''); // Almacena el correo electrónico ingresado
  const [password, setPassword] = useState(''); // Almacena la contraseña ingresada
  const [confirmPassword, setConfirmPassword] = useState(''); // Almacena la confirmación de la contraseña
  const [error, setError] = useState(''); // Almacena los mensajes de error
  const navigate = useNavigate(); // Hook de React Router para redirigir al usuario

  /**
   * Maneja el envío del formulario de registro.
   * 
   * Valida las contraseñas ingresadas y realiza una solicitud POST al servidor para registrar
   * al usuario. Si el registro es exitoso, redirige al usuario a la página principal. Si hay un error,
   * muestra un mensaje adecuado en la interfaz.
   * 
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la acción por defecto del formulario (recarga de la página)

    // Quitar espacios en blanco de las contraseñas
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Verificar si las contraseñas coinciden
    if (trimmedPassword !== trimmedConfirmPassword) {
      setError('Las contraseñas no coinciden'); // Establecer el error si las contraseñas no coinciden
      return; // Detener la ejecución si las contraseñas no coinciden
    }

    try {
      // Enviar los datos de registro al servidor mediante una solicitud POST
      await axios.post(endpoint, {
        name,
        email,
        password: trimmedPassword,
        password_confirmation: trimmedConfirmPassword, // Asegúrate de usar este campo correctamente en el backend
      });

      // Cerrar el modal de registro
      closeModal();

      // Redirigir al usuario a la página principal después de un registro exitoso
      navigate('/');
    } catch (error) {
      // Manejo de errores en la solicitud
      console.log('Error:', error.response?.data || error); // Mostrar el error en la consola
      setError(error.response?.data?.message || 'Error al registrar el usuario'); // Mostrar mensaje de error en la interfaz
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
              <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button> {/* Botón para cerrar el modal */}
            </div>
            <div className="modal-body">
              {/* Mostrar el mensaje de error si existe */}
              {error && <div className="alert alert-danger">{error}</div>}
              <form>
                {/* Campo de nombre */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Ingrese su nombre"
                    value={name} // Asignar el valor del estado 'name'
                    onChange={(e) => setName(e.target.value)} // Actualizar el estado cuando el valor cambie
                  />
                </div>
                {/* Campo de correo electrónico */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingrese su correo electrónico"
                    value={email} // Asignar el valor del estado 'email'
                    onChange={(e) => setEmail(e.target.value)} // Actualizar el estado cuando el valor cambie
                  />
                </div>
                {/* Campo de contraseña */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingrese su contraseña"
                    value={password} // Asignar el valor del estado 'password'
                    onChange={(e) => setPassword(e.target.value)} // Actualizar el estado cuando el valor cambie
                  />
                </div>
                {/* Campo de confirmación de contraseña */}
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirme su contraseña"
                    value={confirmPassword} // Asignar el valor del estado 'confirmPassword'
                    onChange={(e) => setConfirmPassword(e.target.value)} // Actualizar el estado cuando el valor cambie
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              {/* Botón para cerrar el modal */}
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
              {/* Botón para enviar el formulario */}
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Registrarse</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
