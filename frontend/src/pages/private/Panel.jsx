import React, { useState, useEffect } from "react";
import "../../assets/css/private/panel.css";
import { Footer } from "../../layouts/Footer";
import { VolantesList } from "./VolantesList";
import { AddVolante } from "./AddVolante";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export const Panel = () => {
  const [activeTab, setActiveTab] = useState("ver-volantes");
  const [userData, setUserData] = useState(null);  // Estado para manejar los datos del usuario
  const navigate = useNavigate();  // Usaremos navigate para redirigir si no hay token

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");  // Recupera el token del localStorage

    if (token) {
      // Hacer la solicitud a la ruta protegida /user para obtener los datos del usuario
      axios
        .get("http://localhost:8001/api/user", {  // Cambié la ruta a /user, que es válida
          headers: {
            Authorization: `Bearer ${token}`,  // Añades el token en la cabecera
          },
        })
        .then((response) => {
          console.log("Datos obtenidos:", response.data); // Depuración: muestra los datos
          setUserData(response.data);  // Guardas la respuesta en el estado
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
      console.log("No se encontró el token en localStorage");  // Depuración: sin token
      // Si no hay token, redirige al login
      navigate("/login");
    }
    
  }, [navigate]);



  if (!userData) {
    return <div>Cargando...</div>;  // Mientras se obtienen los datos o si el token es inválido
  }

  return (
    <div className="d-flex flex-column min-vh-100 caja">
      <div className="container mt-4 flex-grow-1 content">
        {/* Menú superior */}
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

        {/* Contenedor para el contenido de cada pestaña */}
        <div className="mt-4">
          {activeTab === "ver-volantes" && <VolantesList userId={userData?.id}/>}
          {activeTab === "anadir-volante" && <AddVolante userId={userData?.id} />} {/* Renderiza AddVolante */}
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
};
