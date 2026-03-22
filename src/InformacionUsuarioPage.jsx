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

const normalizeDateInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
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
  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    username: '',
    fecha_nacimiento: '',
    telefono_celular: '',
  });
  const [whatsappData, setWhatsappData] = useState({
    whatsapp_enabled: false,
  });
  const [savingWhatsapp, setSavingWhatsapp] = useState(false);
  const [whatsappStatus, setWhatsappStatus] = useState({ type: '', message: '' });
  const todayIso = new Date().toISOString().split('T')[0];

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
          setFormData({
            nombres: data?.nombres || '',
            apellidos: data?.apellidos || '',
            username: data?.username || localStorage.getItem('username') || '',
            fecha_nacimiento: normalizeDateInput(data?.fecha_nacimiento),
            telefono_celular: data?.telefono_celular || '',
          });
          setWhatsappData({
            whatsapp_enabled: Boolean(data?.whatsapp_enabled),
          });
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateProfileForm = () => {
    const errors = {};
    const phoneValue = formData.telefono_celular.trim();
    const digitsOnly = phoneValue.replace(/\D/g, '');

    if (!formData.nombres.trim()) errors.nombres = 'El nombre es obligatorio.';
    if (!formData.apellidos.trim()) errors.apellidos = 'El apellido es obligatorio.';
    if (!formData.username.trim()) errors.username = 'El nombre de usuario es obligatorio.';
    if (!formData.fecha_nacimiento.trim()) errors.fecha_nacimiento = 'La fecha de nacimiento es obligatoria.';
    if (!formData.telefono_celular.trim()) {
      errors.telefono_celular = 'El telefono es obligatorio.';
    } else if (!/^\+?[0-9\s-]+$/.test(phoneValue) || digitsOnly.length < 7 || digitsOnly.length > 15) {
      errors.telefono_celular = 'Ingresa un telefono valido (7 a 15 digitos, opcional +).';
    }

    if (formData.fecha_nacimiento && formData.fecha_nacimiento > todayIso) {
      errors.fecha_nacimiento = 'La fecha de nacimiento no puede ser futura.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    if (!validateProfileForm()) {
      setSaveStatus({ type: 'error', message: 'Completa todos los campos obligatorios antes de guardar.' });
      return;
    }

    const payload = {
      nombres: formData.nombres.trim(),
      apellidos: formData.apellidos.trim(),
      username: formData.username.trim(),
      fecha_nacimiento: formData.fecha_nacimiento,
      telefono_celular: formData.telefono_celular.trim(),
    };

    setSaving(true);
    setSaveStatus({ type: '', message: '' });

    try {
      let response = await fetchWithAuth('/api/users/me', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      if (response && (response.status === 404 || response.status === 405)) {
        response = await fetchWithAuth('/api/users/me', {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
      }

      if (!response) {
        setSaveStatus({ type: 'error', message: 'No fue posible guardar. Intenta iniciar sesion de nuevo.' });
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setSaveStatus({ type: 'error', message: errorData?.message || 'No se pudieron guardar los cambios.' });
        return;
      }

      const updatedFromApi = await response.json().catch(() => null);
      const updatedUser = {
        ...(userData || {}),
        ...payload,
        ...(updatedFromApi || {}),
      };

      setUserData(updatedUser);
      localStorage.setItem('username', updatedUser.username || payload.username);
      setSaveStatus({ type: 'success', message: 'Datos actualizados correctamente.' });
    } catch {
      setSaveStatus({ type: 'error', message: 'Ocurrio un error al actualizar tus datos.' });
    } finally {
      setSaving(false);
    }
  };

  const handleWhatsappChange = (event) => {
    const { name, value, type, checked } = event.target;
    setWhatsappData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleWhatsappSubmit = async (event) => {
    event.preventDefault();
    setSavingWhatsapp(true);
    setWhatsappStatus({ type: '', message: '' });

    try {
      const payload = {
        whatsapp_enabled: whatsappData.whatsapp_enabled,
      };

      const response = await fetchWithAuth('/api/users/me', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      if (!response || !response.ok) {
        const errorData = response ? await response.json().catch(() => ({})) : {};
        setWhatsappStatus({ type: 'error', message: errorData?.message || 'No se pudo guardar la configuracion de WhatsApp.' });
        return;
      }

      const result = await response.json().catch(() => null);
      if (result?.user) {
        setUserData((prev) => ({ ...prev, ...result.user }));
      }
      setWhatsappStatus({ type: 'success', message: 'Configuracion de WhatsApp guardada correctamente.' });
    } catch {
      setWhatsappStatus({ type: 'error', message: 'Error al guardar configuracion de WhatsApp.' });
    } finally {
      setSavingWhatsapp(false);
    }
  };

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
      label: 'Notificaciones WhatsApp',
      value: userData?.whatsapp_enabled ? 'Activadas' : 'Desactivadas',
      icon: '📲',
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
                  <h2 style={styles.sectionTitle}>Editar datos del perfil</h2>

                  <form style={styles.editForm} onSubmit={handleProfileSubmit} noValidate>
                    <div style={styles.inputGrid}>
                      <div style={styles.inputGroup}>
                        <label style={styles.inputLabel} htmlFor="nombres">Nombres *</label>
                        <input
                          id="nombres"
                          name="nombres"
                          type="text"
                          value={formData.nombres}
                          onChange={handleInputChange}
                          style={styles.inputField}
                        />
                        {formErrors.nombres && <p style={styles.inputError}>{formErrors.nombres}</p>}
                      </div>

                      <div style={styles.inputGroup}>
                        <label style={styles.inputLabel} htmlFor="apellidos">Apellidos *</label>
                        <input
                          id="apellidos"
                          name="apellidos"
                          type="text"
                          value={formData.apellidos}
                          onChange={handleInputChange}
                          style={styles.inputField}
                        />
                        {formErrors.apellidos && <p style={styles.inputError}>{formErrors.apellidos}</p>}
                      </div>

                      <div style={styles.inputGroup}>
                        <label style={styles.inputLabel} htmlFor="username">Nombre de usuario *</label>
                        <input
                          id="username"
                          name="username"
                          type="text"
                          value={formData.username}
                          onChange={handleInputChange}
                          style={styles.inputField}
                        />
                        {formErrors.username && <p style={styles.inputError}>{formErrors.username}</p>}
                      </div>

                      <div style={styles.inputGroup}>
                        <label style={styles.inputLabel} htmlFor="fecha_nacimiento">Fecha de nacimiento *</label>
                        <input
                          id="fecha_nacimiento"
                          name="fecha_nacimiento"
                          type="date"
                          value={formData.fecha_nacimiento}
                          max={todayIso}
                          onChange={handleInputChange}
                          style={styles.inputField}
                        />
                        {formErrors.fecha_nacimiento && <p style={styles.inputError}>{formErrors.fecha_nacimiento}</p>}
                      </div>

                      <div style={styles.inputGroup}>
                        <label style={styles.inputLabel} htmlFor="telefono_celular">Telefono *</label>
                        <input
                          id="telefono_celular"
                          name="telefono_celular"
                          type="text"
                          inputMode="tel"
                          placeholder="Ej: +573001234567"
                          pattern="^\+?[0-9\s\-]+$"
                          value={formData.telefono_celular}
                          onChange={handleInputChange}
                          style={styles.inputField}
                        />
                        {formErrors.telefono_celular && <p style={styles.inputError}>{formErrors.telefono_celular}</p>}
                      </div>
                    </div>

                    <button type="submit" style={styles.saveButton} disabled={saving}>
                      {saving ? 'Guardando cambios...' : 'Guardar cambios'}
                    </button>

                    {saveStatus.message && (
                      <p style={saveStatus.type === 'success' ? styles.saveSuccess : styles.saveError}>{saveStatus.message}</p>
                    )}
                  </form>
                </section>
              )}

              {!loading && (
                <section style={styles.section}>
                  <h2 style={styles.sectionTitle}>Configuracion de WhatsApp</h2>
                  <form style={styles.editForm} onSubmit={handleWhatsappSubmit} noValidate>
                    <div style={styles.whatsappInfo}>
                      <p style={styles.whatsappInfoText}>
                        Recibe recordatorios de medicamentos y citas medicas directamente en tu WhatsApp.
                        Los mensajes se enviaran al numero de telefono registrado en tu perfil.
                      </p>
                    </div>

                    <div style={styles.inputGrid}>
                      <div style={styles.inputGroup}>
                        <label style={styles.whatsappToggleLabel}>
                          <input
                            name="whatsapp_enabled"
                            type="checkbox"
                            checked={whatsappData.whatsapp_enabled}
                            onChange={handleWhatsappChange}
                            style={styles.whatsappCheckbox}
                          />
                          <span style={styles.whatsappToggleText}>
                            Activar notificaciones por WhatsApp
                          </span>
                        </label>
                        <p style={styles.whatsappNote}>
                          Se usara el telefono de tu perfil ({formData.telefono_celular || 'no configurado'}).
                          Asegurate de que tu numero incluya el codigo de pais (ej: +573001234567).
                        </p>
                      </div>
                    </div>

                    <button type="submit" style={styles.saveButton} disabled={savingWhatsapp}>
                      {savingWhatsapp ? 'Guardando...' : 'Guardar configuracion WhatsApp'}
                    </button>

                    {whatsappStatus.message && (
                      <p style={whatsappStatus.type === 'success' ? styles.saveSuccess : styles.saveError}>
                        {whatsappStatus.message}
                      </p>
                    )}
                  </form>
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
    overflowX: 'hidden',
  },
  rightContainer: {
    gridColumn: '2',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    height: '100vh',
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    width: '100%',
    padding: '100px 200px 80px 200px',
    boxSizing: 'border-box',
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
  editForm: {
    background: '#ffffff',
    borderRadius: '20px',
    border: '1px solid #e2e8f0',
    padding: '22px',
    boxShadow: '0 6px 18px rgba(15, 23, 42, 0.05)',
  },
  inputGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  inputLabel: {
    fontSize: '14px',
    color: '#334155',
    fontWeight: '700',
  },
  inputField: {
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '15px',
    color: '#0f172a',
    outline: 'none',
  },
  inputError: {
    margin: 0,
    color: '#b91c1c',
    fontSize: '13px',
    fontWeight: '600',
  },
  saveButton: {
    marginTop: '18px',
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #0A4D68 0%, #088395 100%)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    padding: '11px 16px',
    cursor: 'pointer',
  },
  saveSuccess: {
    margin: '12px 0 0 0',
    color: '#065f46',
    background: '#d1fae5',
    border: '1px solid #a7f3d0',
    borderRadius: '10px',
    padding: '10px 12px',
    fontSize: '14px',
    fontWeight: '600',
  },
  saveError: {
    margin: '12px 0 0 0',
    color: '#991b1b',
    background: '#fee2e2',
    border: '1px solid #fecaca',
    borderRadius: '10px',
    padding: '10px 12px',
    fontSize: '14px',
    fontWeight: '600',
  },
  whatsappInfo: {
    marginBottom: '18px',
  },
  whatsappInfoText: {
    margin: '0 0 10px 0',
    fontSize: '15px',
    color: '#334155',
    lineHeight: 1.6,
  },
  whatsappToggleLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    padding: '12px 0',
  },
  whatsappCheckbox: {
    width: '20px',
    height: '20px',
    accentColor: '#088395',
    cursor: 'pointer',
  },
  whatsappToggleText: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#0f172a',
  },
  whatsappNote: {
    margin: 0,
    fontSize: '13px',
    color: '#64748b',
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