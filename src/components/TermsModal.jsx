import React, { useState } from "react";
import "../styles/termsModal.css";

const TermsModal = ({ onAccept, onClose }) => {

  const [termsRead, setTermsRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScrollTerms = (e) => {

    const { scrollTop, scrollHeight, clientHeight } = e.target;

    const progress = Math.min(
      (scrollTop / (scrollHeight - clientHeight)) * 100,
      100
    );

    setScrollProgress(progress);

    if (progress >= 100) {
      setTermsRead(true);
    }

  };

  return (
    <div className="terms-modal-overlay">

      <div className="terms-modal-content">

        <h2 className="terms-modal-title">Terminos y Condiciones</h2>

        <div className="terms-modal-progress-container">
          <div
            style={{
              width: `${scrollProgress}%`
            }}
            className="terms-modal-progress-bar"
          />
        </div>

        <div
          className="terms-modal-terms-box"
          onScroll={handleScrollTerms}
        >

          <p>Bienvenido a SANTE.</p>

          <p>1. La información registrada debe ser verídica.</p>

          <p>2. La plataforma no reemplaza atención médica profesional.</p>

          <p>3. Los datos médicos serán tratados conforme a la política de privacidad.</p>

          <p>4. El usuario es responsable del uso de su cuenta.</p>

          <p>5. La plataforma puede enviar notificaciones relacionadas con medicamentos.</p>

          <p>6. El usuario acepta recibir correos de verificación.</p>

          <p>7. El uso indebido puede resultar en suspensión.</p>

          <p>8. Estos términos pueden actualizarse sin previo aviso.</p>

        </div>

        {termsRead && (
          <p className="terms-modal-read-success">
            ✔ Has leído todos los términos
          </p>
        )}

        <div className="terms-modal-actions">

          <button
            disabled={!termsRead}
            onClick={onAccept}
            style={{
              opacity: termsRead ? 1 : 0.5
            }}
            className="terms-modal-button"
          >
            Aceptar
          </button>

          <button
            onClick={onClose}
            className="terms-modal-cancel-button"
          >
            Cancelar
          </button>

        </div>

      </div>

    </div>
  );

};

export default TermsModal;