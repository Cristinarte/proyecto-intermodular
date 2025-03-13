import React, { useRef, useState } from 'react'; // Importación de React, useRef y useState
import "../../assets/css/about.css"; // Importación de los estilos CSS para la sección About

/**
 * Componente About
 * 
 * Este componente presenta una sección sobre cómo usar la plataforma MomDoctor.
 * Incluye un video explicativo que se reproduce al hacer clic en el mismo o en un 
 * botón de play. Al lado del video, se ofrece información descriptiva sobre 
 * las funcionalidades clave de la plataforma.
 * 
 * @returns {JSX.Element} Componente renderizado con el contenido sobre la plataforma.
 */
export const About = () => {
  // Referencia al video para poder controlar su reproducción desde el código
  const videoRef = useRef(null); 

  // Estado que maneja si el video está en reproducción
  const [playing, setPlaying] = useState(false);

  /**
   * Función que maneja la reproducción del video
   * Al hacer clic en el video o en el botón de play, el video se reproduce.
   * 
   * @returns {void}
   */
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play(); // Reproduce el video
      setPlaying(true); // Actualiza el estado de reproducción a verdadero
    }
  };

  return (
    <>
      {/* Sección principal "About" */}
      <section id="about" className="about section">
        <div className="container">
          <div className="row gy-4 gx-5">
            {/* Contenedor del video explicativo */}
            <div className="col-lg-6 position-relative align-self-start video-wrapper" data-aos="fade-up" data-aos-delay="200">
              <video 
                ref={videoRef} 
                className="video-fluid" 
                src="/assets/video.mp4"  // Ruta al archivo de video 
                poster="/assets/portadaVideo.png"  // Imagen de portada que aparece antes de que el video inicie
                controls={playing}  // Si el video está en reproducción, se muestran los controles
                preload="auto"  // Pre-carga el video antes de que el usuario lo vea
                onClick={handlePlay}  // Al hacer clic sobre el video, comienza la reproducción
              ></video>

              {/* Botón de play, solo visible cuando el video no se está reproduciendo */}
              {!playing && (
                <button className="glightbox pulsating-play-btn" onClick={handlePlay}></button> // Botón de play para iniciar la reproducción
              )}
            </div>

            {/* Contenido descriptivo al lado del video */}
            <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="100">
              <h3>Cómo usar MomDoctor</h3>
              <p>
                Moondoctor es una plataforma fácil de usar que te permite gestionar los informes médicos de tus hijos de manera segura. 
                Con esta guía, aprenderás a organizar y acceder a todos tus registros médicos desde un solo lugar.
              </p>
              <ul>
                {/* Primer ítem de la lista: Registrar informes médicos */}
                <li>
                  <i className="fa-solid fa-vial-circle-check"></i> {/* Icono que representa un informe médico */}
                  <div>
                    <h5>Registra tus informes médicos</h5>
                    <p>Comienza subiendo los informes médicos de tus hijos a la plataforma.</p>
                  </div>
                </li>
                {/* Segundo ítem de la lista: Acceder a los informes */}
                <li>
                  <i className="fa-solid fa-pump-medical"></i> {/* Icono relacionado con equipos médicos */}
                  <div>
                    <h5>Accede a tus informes en cualquier momento</h5>
                    <p>Consulta los informes médicos en cualquier dispositivo de forma rápida y segura.</p>
                  </div>
                </li>
                {/* Tercer ítem de la lista: Consultar y organizar en el móvil */}
                <li>
                  <i className="fa-solid fa-heart-circle-xmark"></i> {/* Icono de un corazón */}
                  <div>
                    <h5>Consulta y organiza en tu dispositivo móvil</h5>
                    <p>Si necesitas consultar un informe durante una cita médica, lo tendrás siempre a mano en tu móvil.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
