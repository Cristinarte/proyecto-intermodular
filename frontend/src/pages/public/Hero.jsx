import "../../assets/css/hero.css";

export const Hero = () => {
  return (
    <>
    <section id="hero" className="hero section light-background">
    
      <div className="container position-relative">
        <div className="welcome position-relative" data-aos="fade-down" data-aos-delay="100">
          <h2>GESTIONA Y ACCEDE</h2>
          <p>Una plataforma pensada para organizar los registros médicos de tus hijos de forma segura.</p>
        </div>

        <div className="content row gy-4">
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="why-box" data-aos="zoom-out" data-aos-delay="200">
              <h3>¿Por qué elegir MoonDoctor?</h3>
              <p>
              Te ayudamos a organizar y almacenar los informes médicos de tus hijos, facilitando su acceso y asegurando su privacidad.
              </p>

            </div>
          </div>

          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="d-flex flex-column justify-content-center">
              <div className="row gy-4">
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box" data-aos="zoom-out" data-aos-delay="300">
                    <i className="bi bi-clipboard-data"></i>
                    <h4>Gestión de Informes Médicos</h4>
                    <p>Accede, organiza y consulta todos los informes médicos sin importar dónde estés, todo desde tu ordenador o dispositivo móvil.</p>
                  </div>
                </div>
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box" data-aos="zoom-out" data-aos-delay="400">
                    <i className="bi bi-gem"></i>
                    <h4>Almacenamiento Seguro</h4>
                    <p>Tu información médica estará protegida con las mejores medidas de seguridad para que siempre esté a salvo.</p>
                  </div>
                </div>
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box" data-aos="zoom-out" data-aos-delay="500">
                    <i className="bi bi-inboxes"></i>
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
  )
}
