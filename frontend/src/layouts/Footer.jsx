import React from 'react';
import '../assets/css/footer.css';

export const Footer = () => {
  return (
    <>
      <footer id="footer" className="footer light-background">
        <div className="container copyright text-center mt-4">
          <p>© <span>Copyright</span> <strong className="px-1 sitename">MomDoctor</strong> <span>All Rights Reserved</span></p>
          <div className="credits">
            Todos los derechos reservados
          </div>
        </div>
      </footer>
    </>
  );
};
