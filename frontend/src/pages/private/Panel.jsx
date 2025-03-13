import React, { useState, useEffect } from "react";
import "../../assets/css/private/panel.css"; // Importamos los estilos CSS
import { Footer } from "../../layouts/Footer"; // Importamos el Footer
import { VolantesList } from "./VolantesList"; // Importamos el componente VolantesList
import { AddVolante } from "./AddVolante"; // Importamos el componente AddVolante
import { useNavigate } from "react-router-dom"; // Usamos useNavigate para redirigir
import axios from "axios"; // Importamos axios para hacer peticiones HTTP

export const Panel = () => {
  const [activeTab, setActiveTab] = useState("ver-volantes"); // Estado que maneja la pestaña activa (Ver Volantes o Añadir Volante)
  const [userData, setUserData] = useState(null); // Estado para manejar los datos del usuario (como el id)
  const navigate = useNavigate(); // Usamos navigate para redirigir a otras rutas

  // Función para manejar el clic en las pestañas
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Establece la pestaña activa cuando se hace clic
  };

  // useEffect que se ejecuta al cargar el componente
  useEffect(() => {
    // Recuperamos el token de autenticación desde el localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      // Si el token existe, hacemos una petición a la ruta protegida /user para obtener los datos del usuario
      axios
        .get("http://localhost:8001/api/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Añadimos el token en el encabezado de la solicitud
          },
        })
        .then((response) => {
          console.log("Datos obtenidos:", response.data); // Depuración: muestra los datos obtenidos
          setUserData(response.data); // Guardamos los datos del usuario en el estado
        })
        .catch((error) => {
          console.error("Error en la solicitud protegida", error);
          if (error.response) {
            console.error("Código de error:", error.response.status); // Depuración: código de error
            if (error.response.status === 401) {
              // Si el token no es válido, redirige al login
              navigate("/login");
            }
          }
        });
    } else {
      console.log("No se encontró el token en localStorage"); // Depuración: sin token
      // Si no hay token, redirige al login
      navigate("/login");
    }
  }, [navigate]); // La dependencia es `navigate`, por lo que se ejecuta cada vez que esta cambie

  // Si no hemos obtenido los datos del usuario, mostramos un mensaje de carga
  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100 caja">
      <div className="container mt-4 flex-grow-1 content">
        {/* Menú de pestañas */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "ver-volantes" ? "active" : ""}`}
              href="#"
              onClick={() => handleTabClick("ver-volantes")}
            >
              Ver Volantes
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "anadir-volante" ? "active" : ""}`}
              href="#"
              onClick={() => handleTabClick("anadir-volante")}
            >
              Añadir Volante
            </a>
          </li>
        </ul>

        {/* Contenedor del contenido de cada pestaña */}
        <div className="mt-4">
          {/* Renderiza el componente VolantesList si la pestaña activa es "ver-volantes" */}
          {activeTab === "ver-volantes" && <VolantesList userId={userData?.id} />}
          {/* Renderiza el componente AddVolante si la pestaña activa es "anadir-volante" */}
          {activeTab === "anadir-volante" && <AddVolante userId={userData?.id} />}
        </div>
      </div>
      {/* Componente Footer */}
      <Footer className="footer" />
    </div>
  );
};
