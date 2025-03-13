import React, { useState } from 'react';
import { Login } from '../pages/public/Login'; 
import { Register } from '../pages/public/Register'; 
import { useLocation } from 'react-router-dom'; // Importamos useLocation para obtener la ruta actual
import "../assets/css/header.css"; // Importamos los estilos del header

export const Header = ({ authToken, setAuthToken }) => {
  // Creamos estados para controlar la visibilidad de los modales de login y registro
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Usamos useLocation para obtener la ruta actual y manejar la clase "active" en los enlaces
  const location = useLocation();

  // Funciones para abrir y cerrar el modal de login
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  // Funciones para abrir y cerrar el modal de registro
  const openRegisterModal = () => setShowRegisterModal(true);
  const closeRegisterModal = () => setShowRegisterModal(false);

  // Función para manejar el logout: elimina el token y actualiza el estado del authToken
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Eliminamos el token del almacenamiento local
    setAuthToken(null); // Actualizamos el estado del authToken
  };

  return (
    <>
      {/* Header con la barra de navegación principal */}
      <header id="header" className="header sticky-top">
        <div className="branding d-flex align-items-center" id='menu'>
          <div className="container position-relative d-flex align-items-center justify-content-between">
            {/* Logo y nombre de la aplicación */}
            <a href="#" className="logo d-flex align-items-center me-auto">
              <h1 className="sitename">MomDoctor</h1>
            </a>

            {/* Barra de navegación con enlaces */}
            <nav className="navbar navbar-expand-lg navbar-light w-100">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  {/* Enlace a la página de inicio o home */}
                  <li className="nav-item">
                    <a href={authToken ? "/home" : "/"} 
                       className={`nav-link ${(location.pathname === '/' || location.pathname === '/home') ? 'active' : ''}`}>
                      Inicio
                    </a>
                  </li>

                  {/* Si el usuario está logueado, mostrar opciones de panel y logout */}
                  {authToken ? (
                    <>
                      <li className="nav-item">
                        <a href="/panel" className={`nav-link ${location.pathname === '/panel' ? 'active' : ''}`}>Panel de control</a>
                      </li>
                      <li className="nav-item">
                        <a onClick={handleLogout} href="/" className="nav-link">Cerrar sesión</a>
                      </li>
                    </>
                  ) : (
                    // Si el usuario no está logueado, mostrar opciones de login y registro
                    <>
                      <li className="nav-item">
                        <a href="#about" className="nav-link">Guía rápida</a>
                      </li>
                      <li className="nav-item">
                        <a onClick={openLoginModal} href="#login" className="nav-link">Iniciar Sesión</a>
                      </li>
                      <li className="nav-item">
                        <a onClick={openRegisterModal} href="#register" className="nav-link">Crear cuenta</a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Modales de login y registro */}
      {showLoginModal && <Login closeModal={closeLoginModal} setAuthToken={setAuthToken} />}
      {showRegisterModal && <Register closeModal={closeRegisterModal} />}
    </>
  );
};
