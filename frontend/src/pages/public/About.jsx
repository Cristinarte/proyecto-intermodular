import React, { useRef, useState } from 'react';
import "../../assets/css/about.css";

export const About = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <section id="about" className="about section">
        <div className="container">
          <div className="row gy-4 gx-5">
            {/* Contenedor del video */}
            <div className="col-lg-6 position-relative align-self-start video-wrapper" data-aos="fade-up" data-aos-delay="200">
            <video 
              ref={videoRef} 
              className="video-fluid"
              src="/assets/video.mp4" 
              poster="/assets/portadaVideo.png"  // Asegura que esta imagen existe en la carpeta pública
              controls={playing} 
              preload="auto" 
              onClick={handlePlay}
            ></video>


              {/* Botón de play solo si el video no está reproduciéndose */}
              {!playing && (
                <button className="glightbox pulsating-play-btn" onClick={handlePlay}></button>
              )}
            </div>

            <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="100">
              <h3>Cómo usar MomDoctor</h3>
              <p>
                Moondoctor es una plataforma fácil de usar que te permite gestionar los informes médicos de tus hijos de manera segura. 
                Con esta guía, aprenderás a organizar y acceder a todos tus registros médicos desde un solo lugar.
              </p>
              <ul>
                <li>
                  <i className="fa-solid fa-vial-circle-check"></i>
                  <div>
                    <h5>Registra tus informes médicos</h5>
                    <p>Comienza subiendo los informes médicos de tus hijos a la plataforma.</p>
                  </div>
                </li>
                <li>
                  <i className="fa-solid fa-pump-medical"></i>
                  <div>
                    <h5>Accede a tus informes en cualquier momento</h5>
                    <p>Consulta los informes médicos en cualquier dispositivo de forma rápida y segura.</p>
                  </div>
                </li>
                <li>
                  <i className="fa-solid fa-heart-circle-xmark"></i>
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
