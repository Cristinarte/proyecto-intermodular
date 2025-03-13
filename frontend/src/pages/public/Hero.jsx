import "../../assets/css/hero.css"; // Importación de los estilos específicos para esta sección

/**
 * Componente Hero
 * 
 * Este componente representa la sección principal "Hero" de la página, que proporciona 
 * una introducción clara y atractiva a la plataforma MoonDoctor. La sección está 
 * diseñada para captar la atención del usuario y resaltar las funcionalidades clave 
 * de la plataforma, como la gestión de informes médicos, el almacenamiento seguro y 
 * el acceso fácil a los documentos.
 * 
 * @returns {JSX.Element} Componente renderizado con la sección Hero.
 */
export const Hero = () => {
  return (
    <>
      {/* Sección Hero con fondo claro */}
      <section id="hero" className="hero section light-background">
        {/* Contenedor principal de la sección Hero */}
        <div className="container position-relative">
          {/* Título de bienvenida con animación de entrada */}
          <div className="welcome position-relative" data-aos="fade-down" data-aos-delay="100">
            <h2>GESTIONA Y ACCEDE</h2>
            <p>Una plataforma pensada para organizar los registros médicos de tus hijos de forma segura.</p>
          </div>

          {/* Contenido de la sección Hero, con una fila de tres columnas */}
          <div className="content row gy-4">
            {/* Columna 1: Razón para elegir MoonDoctor */}
            <div className="col-lg-4 d-flex align-items-stretch">
              <div className="why-box" data-aos="zoom-out" data-aos-delay="200">
                <h3>¿Por qué elegir MoonDoctor?</h3>
                <p>
                  Te ayudamos a organizar y almacenar los informes médicos de tus hijos, facilitando su acceso y asegurando su privacidad.
                </p>
              </div>
            </div>

            {/* Columna 2: Características de MoonDoctor */}
            <div className="col-lg-8 d-flex align-items-stretch">
              <div className="d-flex flex-column justify-content-center">
                <div className="row gy-4">
                  {/* Columna 2.1: Gestión de informes médicos */}
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box" data-aos="zoom-out" data-aos-delay="300">
                      <i className="bi bi-clipboard-data"></i> {/* Icono representando la gestión de datos */}
                      <h4>Gestión de Informes Médicos</h4>
                      <p>Accede, organiza y consulta todos los informes médicos sin importar dónde estés, todo desde tu ordenador o dispositivo móvil.</p>
                    </div>
                  </div>

                  {/* Columna 2.2: Almacenamiento seguro */}
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box" data-aos="zoom-out" data-aos-delay="400">
                      <i className="bi bi-gem"></i> {/* Icono representando la seguridad y calidad */}
                      <h4>Almacenamiento Seguro</h4>
                      <p>Tu información médica estará protegida con las mejores medidas de seguridad para que siempre esté a salvo.</p>
                    </div>
                  </div>

                  {/* Columna 2.3: Acceso fácil y rápido */}
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box" data-aos="zoom-out" data-aos-delay="500">
                      <i className="bi bi-inboxes"></i> {/* Icono representando el acceso rápido */}
                      <h4>Acceso Fácil y Rápido</h4>
                      <p>Recupera tus documentos médicos en cualquier momento y desde cualquier lugar, solo con un clic.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
