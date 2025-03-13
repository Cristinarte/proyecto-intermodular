import React, { useState } from 'react';
import { Login } from '../pages/public/Login'; 
import { Register } from '../pages/public/Register'; 
import { useLocation } from 'react-router-dom'; // 🔹 Importamos useLocation
import "../assets/css/header.css";

export const Header = ({ authToken, setAuthToken }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const location = useLocation(); // 🔹 Obtiene la ruta actual

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);
  const openRegisterModal = () => setShowRegisterModal(true);
  const closeRegisterModal = () => setShowRegisterModal(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  return (
    <>
      <header id="header" className="header sticky-top">
        <div className="branding d-flex align-items-center" id='menu'>
          <div className="container position-relative d-flex align-items-center justify-content-between">
            <a href="#" className="logo d-flex align-items-center me-auto">
              <h1 className="sitename">MomDoctor</h1>
            </a>

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
                  <li className="nav-item">
                    <a href={authToken ? "/home" : "/"} 
                       className={`nav-link ${(location.pathname === '/' || location.pathname === '/home') ? 'active' : ''}`}>
                      Inicio
                    </a>
                  </li>

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

      {showLoginModal && <Login closeModal={closeLoginModal} setAuthToken={setAuthToken} />}
      {showRegisterModal && <Register closeModal={closeRegisterModal} />}
    </>
  );
};
