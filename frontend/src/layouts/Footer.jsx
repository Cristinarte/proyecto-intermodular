import React from 'react';
import '../assets/css/footer.css'; // Importamos los estilos del footer

export const Footer = () => {
  return (
    <>
      {/* Footer con la sección de copyright y créditos */}
      <footer id="footer" className="footer light-background">
        <div className="container copyright text-center mt-4">
          {/* Mensaje de copyright y derechos reservados */}
          <p>© <span>Copyright</span> <strong className="px-1 sitename">MomDoctor</strong> <span>All Rights Reserved</span></p>
          <div className="credits">
            {/* Créditos de derechos reservados */}
            Todos los derechos reservados
          </div>
        </div>
      </footer>
    </>
  );
};
