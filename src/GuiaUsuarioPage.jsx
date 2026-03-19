import React from 'react';
import Sidebar from './components/general-components/Sidebar';
import BarraNavegacion from './components/general-components/BarraNavegacion';
import Footer from './components/general-components/Footer';

const guideSteps = [
  {
    title: 'Actualiza tu informacion',
    description: 'Verifica que tu usuario, correo y datos personales esten correctos antes de usar las demas funciones.',
    badge: 'Paso 1',
    icon: '👤',
  },
  {
    title: 'Gestiona medicamentos',
    description: 'Consulta la adherencia, revisa recordatorios y mantente al dia con la toma de tus medicamentos.',
    badge: 'Paso 2',
    icon: '💊',
  },
  {
    title: 'Programa citas y examenes',
    description: 'Usa las secciones de Citas y Examenes para revisar pendientes y cumplir el seguimiento medico.',
    badge: 'Paso 3',
    icon: '🩺',
  },
  {
    title: 'Revisa reportes',
    description: 'Consulta el tablero de analisis para entender tu progreso semanal y mensual.',
    badge: 'Paso 4',
    icon: '📊',
  },
];

const quickAccess = [
  'Medicamentos: seguimiento de adherencia y control diario.',
  'Citas: organizacion de consultas pendientes y cumplidas.',
  'Examenes: control de examenes medicos programados.',
  'Entregas: seguimiento de entregas y domicilios relacionados.',
];

export default function GuiaUsuarioPage() {
  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div style={styles.pageWrapper}>
      <Sidebar />

      <div style={styles.rightContainer}>
        <BarraNavegacion />

        <div style={styles.mainContent}>
          <div style={styles.dashboard}>
            <header style={styles.header}>
              <div style={styles.headerContent}>
                <div style={styles.headerLeft}>
                  <div style={styles.logoIconSmall}>
                    <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                      <path d="M24 8L32 16L24 24L16 16L24 8Z" fill="#0A4D68" />
                      <path d="M24 24L32 32L24 40L16 32L24 24Z" fill="#05C3DD" />
                    </svg>
                  </div>
                  <div>
                    <h1 style={styles.headerTitle}>Guia de Usuario</h1>
                    <p style={styles.headerSubtitle}>Aprende a usar cada modulo de SANTE de forma rapida y ordenada.</p>
                  </div>
                </div>
              </div>
            </header>

            <main style={styles.main}>
              <section style={styles.heroCard}>
                <div>
                  <p style={styles.heroEyebrow}>RECORRIDO GENERAL</p>
                  <h2 style={styles.heroTitle}>Empieza por lo esencial y navega por el sistema con claridad</h2>
                  <p style={styles.heroText}>
                    Esta guia resume el uso de las secciones principales para que cualquier usuario pueda entender el flujo de trabajo dentro de la plataforma.
                  </p>
                </div>
                <div style={styles.heroIcon}>📘</div>
              </section>

              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Pasos recomendados</h2>
                <div style={styles.cardGrid}>
                  {guideSteps.map((step) => (
                    <article key={step.title} style={styles.card}>
                      <div style={styles.cardIcon}>{step.icon}</div>
                      <span style={styles.badge}>{step.badge}</span>
                      <h3 style={styles.cardTitle}>{step.title}</h3>
                      <p style={styles.cardText}>{step.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Accesos del menu</h2>
                <div style={styles.infoPanel}>
                  {quickAccess.map((item) => (
                    <div key={item} style={styles.infoRow}>
                      <span style={styles.infoDot}></span>
                      <p style={styles.infoText}>{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Recomendaciones</h2>
                <div style={styles.recommendationBox}>
                  <p style={styles.recommendationText}>Confirma tu correo despues del registro para activar la cuenta.</p>
                  <p style={styles.recommendationText}>Mantente atento a notificaciones del sistema para no perder citas, examenes o entregas.</p>
                  <p style={styles.recommendationText}>Cierra sesion al terminar si estas usando un equipo compartido.</p>
                </div>
              </section>
            </main>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: 'grid',
    gridTemplateColumns: '0px 1fr',
    minHeight: '100vh',
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: '#f1f5f9',
    overflowX: 'hidden',
  },
  rightContainer: {
    gridColumn: '2',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    minWidth: 0,
    overflowY: 'auto',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    padding: '100px 200px 80px 200px',
    boxSizing: 'border-box',
    width: '100%',
    minWidth: 0,
  },
  dashboard: {
    width: '100%',
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: "'DM Sans', sans-serif",
    minWidth: 0,
  },
  header: {
    background: 'linear-gradient(135deg, #0A4D68 0%, #088395 100%)',
    padding: '24px 0',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 32px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  logoIconSmall: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    background: 'rgba(255,255,255,0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: '46px',
    fontWeight: '800',
    margin: 0,
    lineHeight: 1.05,
  },
  headerSubtitle: {
    margin: '10px 0 0 0',
    color: 'rgba(255,255,255,0.88)',
    fontSize: '16px',
  },
  main: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px',
    boxSizing: 'border-box',
  },
  heroCard: {
    background: 'linear-gradient(135deg, #eef9ff 0%, #ffffff 100%)',
    border: '1px solid #dbeafe',
    borderRadius: '24px',
    padding: '32px 36px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '24px',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
    flexWrap: 'wrap',
  },
  heroEyebrow: {
    margin: 0,
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '0.06em',
    color: '#64748b',
  },
  heroTitle: {
    margin: '12px 0',
    fontSize: '34px',
    color: '#0f172a',
    fontWeight: '800',
    maxWidth: '760px',
  },
  heroText: {
    margin: 0,
    fontSize: '16px',
    lineHeight: 1.7,
    color: '#475569',
    maxWidth: '760px',
  },
  heroIcon: {
    fontSize: '72px',
  },
  section: {
    marginTop: '30px',
  },
  sectionTitle: {
    margin: '0 0 18px 0',
    color: '#0f172a',
    fontSize: '24px',
    fontWeight: '800',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 6px 18px rgba(15, 23, 42, 0.05)',
  },
  cardIcon: {
    fontSize: '34px',
    marginBottom: '10px',
  },
  badge: {
    display: 'inline-block',
    background: '#e0f2fe',
    color: '#0369a1',
    borderRadius: '999px',
    padding: '6px 10px',
    fontSize: '12px',
    fontWeight: '700',
    marginBottom: '12px',
  },
  cardTitle: {
    margin: '0 0 10px 0',
    color: '#0f172a',
    fontSize: '20px',
    fontWeight: '800',
  },
  cardText: {
    margin: 0,
    color: '#475569',
    fontSize: '15px',
    lineHeight: 1.65,
  },
  infoPanel: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '22px 24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 6px 18px rgba(15, 23, 42, 0.05)',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  infoDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#06b6d4',
    marginTop: '7px',
    flexShrink: 0,
  },
  infoText: {
    margin: 0,
    color: '#334155',
    fontSize: '15px',
    lineHeight: 1.6,
  },
  recommendationBox: {
    background: 'linear-gradient(135deg, #0A4D68 0%, #0f766e 100%)',
    borderRadius: '24px',
    padding: '26px 28px',
    boxShadow: '0 10px 22px rgba(8, 131, 149, 0.18)',
  },
  recommendationText: {
    margin: '0 0 12px 0',
    color: '#ffffff',
    fontSize: '15px',
    lineHeight: 1.7,
  },
};