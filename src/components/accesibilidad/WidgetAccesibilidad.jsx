import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversalAccess, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAccessibility } from '../../context/ContextoAccesibilidad';

const OPCIONES_DALTONISMO = [
  { value: 'none', label: 'Normal' },
  { value: 'deuteranopia', label: 'Deuteranopia (rojo-verde)' },
  { value: 'protanopia', label: 'Protanopia (rojo-verde)' },
  { value: 'tritanopia', label: 'Tritanopia (azul-amarillo)' },
];

export default function WidgetAccesibilidad() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    fontStep,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    highContrast,
    toggleHighContrast,
    colorblindMode,
    setColorblindMode,
    resetAll,
  } = useAccessibility();

  const handleReset = () => {
    resetAll();
    setIsOpen(false);
  };

  return (
    <div className="a11y-widget" style={styles.container}>
      {/* Panel de configuracion */}
      {isOpen && (
        <div style={styles.panel}>
          {/* Encabezado */}
          <div style={styles.panelHeader}>
            <h3 style={styles.panelTitle}>Accesibilidad</h3>
            <button
              onClick={() => setIsOpen(false)}
              style={styles.closeButton}
              aria-label="Cerrar panel de accesibilidad"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Seccion tamano de texto */}
          <div style={styles.section}>
            <p style={styles.sectionLabel}>Tamano de texto</p>
            <div style={styles.fontControls}>
              <button
                onClick={decreaseFontSize}
                disabled={fontStep <= -1}
                style={{
                  ...styles.fontButton,
                  opacity: fontStep <= -1 ? 0.4 : 1,
                }}
                aria-label="Reducir tamano de texto"
              >
                A-
              </button>
              <span style={styles.fontLevel}>
                {fontStep === 0 ? 'Normal' : `Nivel ${fontStep > 0 ? '+' : ''}${fontStep}`}
              </span>
              <button
                onClick={increaseFontSize}
                disabled={fontStep >= 3}
                style={{
                  ...styles.fontButton,
                  fontSize: '18px',
                  opacity: fontStep >= 3 ? 0.4 : 1,
                }}
                aria-label="Aumentar tamano de texto"
              >
                A+
              </button>
              <button
                onClick={resetFontSize}
                style={styles.resetSmall}
                aria-label="Restablecer tamano de texto"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Seccion alto contraste */}
          <div style={styles.section}>
            <p style={styles.sectionLabel}>Alto Contraste</p>
            <button
              onClick={toggleHighContrast}
              style={{
                ...styles.toggleButton,
                background: highContrast ? '#FFD700' : '#e2e8f0',
                color: highContrast ? '#000000' : '#334155',
              }}
              aria-pressed={highContrast}
              aria-label="Activar o desactivar alto contraste"
            >
              {highContrast ? 'Activado' : 'Desactivado'}
            </button>
          </div>

          {/* Seccion daltonismo */}
          <div style={styles.section}>
            <p style={styles.sectionLabel}>Modo daltonismo</p>
            <div style={styles.colorblindOptions}>
              {OPCIONES_DALTONISMO.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setColorblindMode(option.value)}
                  style={{
                    ...styles.colorblindButton,
                    background: colorblindMode === option.value ? '#0A4D68' : '#f1f5f9',
                    color: colorblindMode === option.value ? '#ffffff' : '#334155',
                    borderColor: colorblindMode === option.value ? '#0A4D68' : '#cbd5e1',
                  }}
                  aria-pressed={colorblindMode === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Restaurar todo */}
          <button
            onClick={handleReset}
            style={styles.resetAllButton}
            aria-label="Restaurar toda la configuracion de accesibilidad"
          >
            Restaurar todo
          </button>
        </div>
      )}

      {/* Boton flotante */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          ...styles.fab,
          background: isOpen ? '#065f46' : '#0A4D68',
        }}
        aria-label="Opciones de accesibilidad"
        aria-expanded={isOpen}
      >
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faUniversalAccess}
          style={{ fontSize: '26px' }}
        />
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 9999,
    fontFamily: "'DM Sans', sans-serif",
  },
  fab: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s, transform 0.2s',
  },
  panel: {
    position: 'absolute',
    bottom: '76px',
    right: '0',
    width: '320px',
    background: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
    border: '1px solid #e2e8f0',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '2px solid #e2e8f0',
  },
  panelTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '800',
    color: '#0A4D68',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#64748b',
    padding: '4px',
  },
  section: {
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f1f5f9',
  },
  sectionLabel: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    fontWeight: '700',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  fontControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  fontButton: {
    width: '42px',
    height: '42px',
    borderRadius: '10px',
    border: '2px solid #0A4D68',
    background: '#ffffff',
    color: '#0A4D68',
    fontSize: '15px',
    fontWeight: '800',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontLevel: {
    flex: 1,
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: '600',
    color: '#475569',
  },
  resetSmall: {
    background: 'none',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '6px 10px',
    fontSize: '12px',
    color: '#64748b',
    cursor: 'pointer',
    fontWeight: '600',
  },
  toggleButton: {
    width: '100%',
    padding: '10px 16px',
    borderRadius: '10px',
    border: '2px solid #cbd5e1',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  colorblindOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  colorblindButton: {
    padding: '8px 14px',
    borderRadius: '8px',
    border: '2px solid #cbd5e1',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
  },
  resetAllButton: {
    width: '100%',
    padding: '10px 16px',
    borderRadius: '10px',
    border: '2px solid #ef4444',
    background: '#ffffff',
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '4px',
  },
};
