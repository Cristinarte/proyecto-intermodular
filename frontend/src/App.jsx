// Importa React y los hooks necesarios
import React, { useState, useEffect } from 'react'; 
// Importa componentes de react-router-dom para gestionar las rutas
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
// Importa los componentes y páginas que serán utilizados en las rutas
import { Header } from './components/Header';
import { Hero } from './pages/public/Hero';
import { About } from './pages/public/About';
import { Footer } from './layouts/Footer';
import { Register } from './pages/public/Register';
import { Login } from './pages/public/Login';
import { Panel } from './pages/private/Panel'; // El Panel solo se mostrará a usuarios logeados

// Importa Bootstrap para aplicar estilos y funcionalidades
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Definimos el componente principal de la aplicación
const App = () => {
  // Usamos useState para manejar el estado de la autenticación (authToken)
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken')); // Inicializamos con el token almacenado en localStorage

  // Este useEffect se ejecuta cada vez que cambia el authToken
  useEffect(() => {
    if (authToken) {
      // Si hay un authToken, lo guardamos en localStorage
      localStorage.setItem('authToken', authToken); 
      console.log('authToken actualizado:', authToken); // Imprime el nuevo authToken para verificar que se actualiza correctamente
    }
  }, [authToken]); // El useEffect depende de authToken, se ejecuta cada vez que cambia

  // El componente devuelve el enrutador de la aplicación
  return (
    <Router>
      <Routes>
        {/* Ruta pública (página principal) */}
        <Route path="/" element={
          <>
            {/* Componente Header que recibe authToken y setAuthToken como props */}
            <Header authToken={authToken} setAuthToken={setAuthToken} />
            {/* Solo mostramos Hero y About si no hay authToken */}
            {!authToken && <Hero />}
            {!authToken && <About />}
            {/* Siempre mostramos el Footer */}
            <Footer />
          </>
        } />

        {/* Ruta de registro de usuario */}
        <Route path="/register" element={<Register />} />
        
        {/* Ruta de inicio de sesión */}
        <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />


        {/* Ruta privada (solo se muestra si el usuario está logeado) */}
        <Route path="/panel" element={
          // Si el usuario está logeado (hay un authToken), mostramos el Panel
          authToken ? (
            <>
              {/* Componente Header */}
              <Header authToken={authToken} setAuthToken={setAuthToken} />
              {/* Componente Panel solo visible si el usuario está logeado */}
              <Panel />
            </>
          ) : (
            // Si no hay authToken (usuario no está logeado), redirige a la página principal
            <Navigate to="/" />
          )
        } />

        {/* Ruta pública adicional (/home) */}
        <Route path="/home" element={
          <>
            {/* Componente Header */}
            <Header authToken={authToken} setAuthToken={setAuthToken} />
            {/* Siempre mostramos Hero y About */}
            <Hero />
            <About />
            {/* Siempre mostramos el Footer */}
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
};

// Exportamos el componente App para usarlo en otros archivos
export default App;
