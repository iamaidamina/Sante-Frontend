import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandSparkles,
  faBars,
  faUserEdit,
  faCapsules,
  faCalendarCheck,
  faChartLine,
  faUniversalAccess,
} from '@fortawesome/free-solid-svg-icons';

const PASOS = [
  {
    icono: faHandSparkles,
    titulo: 'Bienvenido a SANTE',
    descripcion:
      'SANTE es tu companero de salud digital. Aqui podras gestionar tus medicamentos, citas medicas, examenes y mas. Te guiaremos paso a paso para que conozcas todas las funciones disponibles.',
    color: '#0A4D68',
  },
  {
    icono: faBars,
    titulo: 'Navega por las secciones',
    descripcion:
      'En el menu lateral izquierdo encontraras todas las secciones: Reportes, Medicamentos, Citas, Examenes, Entregas y esta Guia de usuario. Haz clic en cualquiera para navegar.',
    color: '#088395',
  },
  {
    icono: faUserEdit,
    titulo: 'Completa tu informacion',
    descripcion:
      'Es importante que actualices tu perfil con tu nombre, telefono y fecha de nacimiento. Esto permite que recibas notificaciones y recordatorios por WhatsApp. Ve a la seccion "Informacion del Usuario" desde el menu superior.',
    color: '#0A4D68',
  },
  {
    icono: faCapsules,
    titulo: 'Gestiona tus medicamentos',
    descripcion:
      'En esta seccion puedes agregar tus medicamentos, indicar la frecuencia de toma y llevar un control de tu adherencia. Usa el boton "Agregar Medicamento" para comenzar.',
    color: '#088395',
  },
  {
    icono: faCalendarCheck,
    titulo: 'Programa tus citas y examenes',
    descripcion:
      'Registra tus citas medicas y examenes pendientes. SANTE te enviara recordatorios por WhatsApp 24 horas y 1 hora antes de cada cita para que no olvides ninguna.',
    color: '#0A4D68',
  },
  {
    icono: faChartLine,
    titulo: 'Revisa tu progreso',
    descripcion:
      'En la seccion de Reportes encontraras un tablero con graficos que muestran tu adherencia semanal y mensual. Asi puedes ver como vas con tu tratamiento.',
    color: '#088395',
  },
  {
    icono: faUniversalAccess,
    titulo: 'Personaliza tu experiencia',
    descripcion:
      'Si necesitas texto mas grande, alto contraste o modo para daltonismo, usa el boton redondo en la esquina inferior derecha. Puedes ajustar la app a tus necesidades visuales.',
    color: '#0A4D68',
  },
];

export default function TourGuia({ onFinish }) {
  const [pasoActual, setPasoActual] = useState(0);

  const paso = PASOS[pasoActual];
  const esUltimo = pasoActual === PASOS.length - 1;
  const esPrimero = pasoActual === 0;

  const siguiente = () => {
    if (esUltimo) {
      onFinish();
    } else {
      setPasoActual((prev) => prev + 1);
    }
  };

  const anterior = () => {
    if (!esPrimero) {
      setPasoActual((prev) => prev - 1);
    }
  };

  const saltar = () => {
    onFinish();
  };

  return (
    <div style={styles.overlay} role="dialog" aria-modal="true" aria-label="Tour guiado de SANTE">
      <div style={styles.tarjeta}>
        {/* Indicador de paso */}
        <div style={styles.indicadorContainer}>
          <span style={styles.indicadorTexto}>
            Paso {pasoActual + 1} de {PASOS.length}
          </span>
          <button
            onClick={saltar}
            style={styles.botonSaltar}
            aria-label="Saltar el tour"
          >
            Saltar tour
          </button>
        </div>

        {/* Icono */}
        <div style={{ ...styles.iconoContainer, backgroundColor: paso.color }}>
          <FontAwesomeIcon icon={paso.icono} style={styles.icono} />
        </div>

        {/* Contenido */}
        <h2 style={styles.titulo}>{paso.titulo}</h2>
        <p style={styles.descripcion}>{paso.descripcion}</p>

        {/* Puntos de progreso */}
        <div style={styles.puntosContainer} role="progressbar" aria-valuenow={pasoActual + 1} aria-valuemin={1} aria-valuemax={PASOS.length} aria-label="Progreso del tour">
          {PASOS.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.punto,
                backgroundColor: index === pasoActual ? '#0A4D68' : '#cbd5e1',
                width: index === pasoActual ? '24px' : '10px',
              }}
            />
          ))}
        </div>

        {/* Botones de navegacion */}
        <div style={styles.botonesContainer}>
          {!esPrimero && (
            <button
              onClick={anterior}
              style={styles.botonAnterior}
              aria-label="Paso anterior"
            >
              Anterior
            </button>
          )}
          <button
            onClick={siguiente}
            style={{
              ...styles.botonSiguiente,
              marginLeft: esPrimero ? 'auto' : '0',
            }}
            aria-label={esUltimo ? 'Finalizar tour' : 'Siguiente paso'}
          >
            {esUltimo ? 'Comenzar a usar SANTE' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 8000,
    padding: '20px',
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '36px',
    maxWidth: '480px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    animation: 'fadeIn 0.3s ease-out',
  },
  indicadorContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  indicadorTexto: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  botonSaltar: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '6px',
  },
  iconoContainer: {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px auto',
  },
  icono: {
    fontSize: '36px',
    color: '#ffffff',
  },
  titulo: {
    margin: '0 0 12px 0',
    fontSize: '24px',
    fontWeight: '800',
    color: '#0f172a',
    fontFamily: "'Syne', 'DM Sans', sans-serif",
  },
  descripcion: {
    margin: '0 0 24px 0',
    fontSize: '15px',
    lineHeight: 1.7,
    color: '#475569',
  },
  puntosContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '6px',
    marginBottom: '24px',
  },
  punto: {
    height: '10px',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
  },
  botonesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
  },
  botonAnterior: {
    flex: 1,
    padding: '12px 20px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    background: '#ffffff',
    color: '#475569',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  botonSiguiente: {
    flex: 1,
    padding: '12px 20px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #0A4D68 0%, #088395 100%)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(8, 131, 149, 0.3)',
  },
};
