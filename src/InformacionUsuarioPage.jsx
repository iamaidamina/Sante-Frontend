import React, { useState, useEffect } from 'react';
import Sidebar from './components/general-components/Sidebar';
import BarraNavegacion from './components/general-components/BarraNavegacion';
import Footer from './components/general-components/Footer';
import TermsModal from './components/TermsModal';
import { fetchWithAuth } from './utils/fetchWithAuth';

const formatDate = (dateString) => {
  if (!dateString) return 'No disponible';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

const getUserDataFromToken = (token) => {
  try {
    const payload = token?.split('.')[1];
    if (!payload) return {};

    const decoded = JSON.parse(atob(payload));

    return {
      username: decoded?.username || decoded?.name || decoded?.nombres || 'No disponible',
      email: decoded?.email || 'No disponible',
      role: decoded?.role || decoded?.rol || 'Usuario',
    };
  } catch {
    return {};
  }
};

export default function InformacionUsuarioPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchWithAuth('/api/users/me');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Error fetching user data');
          setUserData(null);
        }
      } catch (error) {
        console.error('Error:', error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const accessToken = localStorage.getItem('access_token');
  const tokenData = getUserDataFromToken(accessToken);

  const userInfo = [
    {
      label: 'Nombres',
      value: userData?.nombres || 'No disponible',
      icon: '👤',
    },
    {
      label: 'Apellidos',
      value: userData?.apellidos || 'No disponible',
      icon: '👤',
    },
    {
      label: 'Nombre de usuario',
      value: userData?.username || localStorage.getItem('username') || tokenData.username || 'No disponible',
      icon: '✍️',
    },
    {
      label: 'Correo electronico',
      value: userData?.email || localStorage.getItem('email') || tokenData.email || 'No disponible',
      icon: '✉️',
    },
    {
      label: 'Teléfono',
      value: userData?.telefono_celular || 'No disponible',
      icon: '📱',
    },
    {
      label: 'Fecha de nacimiento',
      value: formatDate(userData?.fecha_nacimiento),
      icon: '🎂',
    },
    {
      label: 'Fecha de creación',
      value: formatDate(userData?.fecha_creacion),
      icon: '📅',
    },
    {
      label: 'Términos y condiciones',
      value: userData?.terms_accepted ? 'Aceptados ✓' : 'No aceptados',
      icon: '📋',
    },
    {
      label: 'Versión términos',
      value: userData?.terms_version || 'No disponible',
      icon: '📌',
    },
    {
      label: 'Fecha aceptación',
      value: formatDate(userData?.terms_accepted_at),
      icon: '✔️',
    },
  ];

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
                  <div style={styles.logoIconSmall}>👤</div>
                  <div>
                    <h1 style={styles.headerTitle}>Informacion del Usuario</h1>
                    <p style={styles.headerSubtitle}>Consulta la informacion basica disponible de tu sesion actual.</p>
                  </div>
                </div>
              </div>
            </header>

            <main style={styles.main}>
              <section style={styles.heroCard}>
                <div>
                  <p style={styles.heroEyebrow}>PERFIL</p>
                  <h2 style={styles.heroTitle}>{userData?.nombres || userData?.username || localStorage.getItem('username') || tokenData.username || 'Usuario'}</h2>
                  <p style={styles.heroText}>
                    Desde esta vista puedes revisar los datos completos que el sistema tiene disponibles para tu cuenta autenticada.
                  </p>
                </div>
                <div style={styles.heroAvatar}>🪪</div>
              </section>

              {loading && (
                <section style={styles.section}>
                  <div style={styles.loadingBox}>
                    <p style={styles.loadingText}>⏳ Cargando información del usuario...</p>
                  </div>
                </section>
              )}

              {!loading && (
                <section style={styles.section}>
                  <h2 style={styles.sectionTitle}>Datos de la cuenta</h2>
                  <div style={styles.cardGrid}>
                    {userInfo.map((item) => (
                      <article key={item.label} style={styles.card}>
                        <div style={styles.cardIcon}>{item.icon}</div>
                        <p style={styles.cardLabel}>{item.label}</p>
                        <h3 style={styles.cardValue}>{item.value}</h3>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {!loading && (
                <section style={styles.section}>
                  <button
                    type="button"
                    style={styles.termsButton}
                    onClick={() => setShowTermsModal(true)}
                  >
                    Leer términos y condiciones que aceptó previamente
                  </button>
                </section>
              )}

              <section style={styles.section}>
                <div style={styles.noticeBox}>
                  <p style={styles.noticeText}>Si alguno de estos datos no coincide con lo esperado, puede modificar su nombre, apellido, nombre de usario, fecha de cumpleanos y agregar telefono o modificar telefono.</p>
                </div>
              </section>
            </main>
          </div>
        </div>

        <Footer />

        {showTermsModal && (
          <TermsModal
            readOnly
            onAccept={() => setShowTermsModal(false)}
            onClose={() => setShowTermsModal(false)}
          />
        )}
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
  },
  rightContainer: {
    gridColumn: '2',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    height: '100vh',
    width: '100%',
    overflowY: 'auto',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    width: '100%',
    padding: '100px 200px 80px 200px',
    boxSizing: 'border-box',
  },
  dashboard: {
    width: '100%',
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: "'DM Sans', sans-serif",
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  logoIconSmall: {
    width: '52px',
    height: '52px',
    borderRadius: '16px',
    background: 'rgba(255,255,255,0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
  },
  headerTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '28px',
    fontWeight: '800',
    color: 'white',
    margin: '0 0 4px 0',
  },
  headerSubtitle: {
    margin: 0,
    color: 'rgba(255,255,255,0.85)',
    fontSize: '15px',
  },
  main: {
    width: '100%',
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
  },
  heroText: {
    margin: 0,
    fontSize: '16px',
    lineHeight: 1.7,
    color: '#475569',
    maxWidth: '760px',
  },
  heroAvatar: {
    fontSize: '70px',
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
    fontSize: '32px',
    marginBottom: '12px',
  },
  cardLabel: {
    margin: '0 0 8px 0',
    color: '#64748b',
    fontSize: '13px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  cardValue: {
    margin: 0,
    color: '#0f172a',
    fontSize: '22px',
    fontWeight: '800',
    wordBreak: 'break-word',
  },
  loadingBox: {
    background: 'linear-gradient(135deg, #eef9ff 0%, #ffffff 100%)',
    border: '1px solid #dbeafe',
    borderRadius: '24px',
    padding: '32px',
    textAlign: 'center',
    boxShadow: '0 6px 18px rgba(15, 23, 42, 0.05)',
  },
  loadingText: {
    margin: 0,
    color: '#0A4D68',
    fontSize: '16px',
    fontWeight: '600',
  },
  termsButton: {
    border: 'none',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #0A4D68 0%, #088395 100%)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    padding: '12px 18px',
    cursor: 'pointer',
    boxShadow: '0 8px 18px rgba(8, 131, 149, 0.18)',
  },
  noticeBox: {
    background: 'linear-gradient(135deg, #0A4D68 0%, #0f766e 100%)',
    borderRadius: '24px',
    padding: '24px 28px',
    boxShadow: '0 10px 22px rgba(8, 131, 149, 0.18)',
  },
  noticeText: {
    margin: 0,
    color: '#ffffff',
    fontSize: '15px',
    lineHeight: 1.7,
  },
};