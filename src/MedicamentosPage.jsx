import React, { useState } from 'react'; // 1. Added useState
import { useNavigate } from 'react-router-dom'; // 2. Added useNavigate
import Footer from './components/general-components/Footer';
import Sidebar from './components/general-components/Sidebar';
import BarraNavegacion from './components/general-components/BarraNavegacion';
import {faPhoneVolume, faEnvelope, faEdit, faCancel, faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

const MedicamentosPage = ({ studentsData }) => {
  // 4. Create internal state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    //document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // 5. Create internal handleLogin
  const handleLogin = (e) => {
    e.preventDefault(); // This stops the "?" refresh

    if (email === 'teacher@school.com' && password === 'demo123') {
      setLoginError('');
      navigate('/reportes'); // 6. Use navigate instead of setIsLoggedIn
    } else {
      setLoginError('Invalid credentials. Try teacher@school.com / demo123');
    }
  };

  return (
    <div style={styles.pageWrapper} className="pageWrapper">


      {/* Student Result  s Table */}
      
      <Sidebar />
      
      
      {/* 2. mainContent llena el resto de la pantalla a la derecha */}
      {/* Contenedor de todo lo que va a la derecha del Sidebar */}
       
      <div style={styles.rightContainer}>
        <div style={styles.navbarWrapper}>
         <BarraNavegacion />
        </div>
        <div style={styles.mainContent}>


          <main style={styles.tableSection}>

            <div style={styles.titleContainer}>
              {/* Botón a la izquierda */}
              <button
                style={styles.actionButton}
                onClick={() => setIsModalOpen(true)}
              >
                AGREGAR NUEVO MEDICAMENTO <FontAwesomeIcon icon={faPlus}/>
              </button>

              <h2 style={styles.sectionTitle}>
                Listado de Medicamentos
              </h2>
            </div>


            <div style={styles.tableCard}>
              <div style={styles.scrollWrapper}>
                <table style={styles.table}>
                  <thead style={styles.stickyHeader}>
                    <tr style={styles.tableHeaderRow}>
                      <th style={styles.tableHeader}>Nombre</th>
                      <th style={styles.tableHeader}>Estado</th>
                      <th style={styles.tableHeader}>Frecuencia</th>
                      <th style={styles.tableHeader}>Almacenamiento</th>
                      <th style={styles.tableHeader}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsData.map((student, index) => (
                      <tr
                        key={student.id}
                        style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
                      >
                        <td style={styles.tableCell}>
                          <div style={styles.studentName}>
                            <div style={styles.avatar}>{student.medicamento.charAt(0)}</div>
                            <span>{student.medicamento}</span>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <span style={student.gender === 'Inactivo' ? styles.badgeMale : styles.badgeFemale}>
                            {student.gender}
                          </span>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.studentName}>
                            <span>{student.frecuencia}</span>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.studentName}>
                            <span>{student.almacenamiento}</span>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.actionGroup}>
                            <span
                              title="Editar"
                              style={styles.editEmoji}
                              onClick={() => console.log('Edit', student.id)}
                            >
                               <FontAwesomeIcon icon={faEdit}/>
                             
                            </span>
                            <span
                              title="Eliminar"
                              style={styles.deleteEmoji}
                              onClick={() => console.log('Delete', student.id)}
                            >
                              <FontAwesomeIcon icon={faTrash}/>
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>

        </div>
        <Footer />
      </div>
      {/* POSICIÓN CORRECTA: Justo antes de cerrar el pageWrapper */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3>Nuevo Medicamento</h3>
              <button onClick={() => setIsModalOpen(false)} style={styles.closeButton}>✕</button>
            </div>

            <form style={styles.modalForm} onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>

              {/* Fila 1: Inputs Normales */}
              <div style={styles.formRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.fieldLabel}>Subir foto Medicamento</label>
                  <input style={styles.modalInput} type="text" placeholder="Ej: Paracetamol" />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.fieldLabel}>Descripción</label>
                  <input style={styles.modalInput} type="text" placeholder="Ej: 500mg" />
                </div>
              </div>

              {/* Fila 2: Selectores de Imagen / Drag & Drop */}
              <div style={styles.formRow}>
                {/* Input 1: Traditional Button Style */}
                <div style={styles.inputGroup}>
                  <label style={styles.fieldLabel}>Subir foto formula medica</label>
                  <div style={styles.fileButtonContainer}>
                    <input
                      type="file"
                      id="fileFrontal"
                      style={{ display: 'none' }}
                      accept="image/*,application/pdf"
                    />
                    <label htmlFor="fileFrontal" style={styles.traditionalFileButton}>
                      📎 Seleccionar Archivo
                    </label>
                  </div>
                </div>

                {/* Input 2: Traditional Button Style */}
                <div style={styles.inputGroup}>
                  <label style={styles.fieldLabel}>Documento Lateral</label>
                  <div style={styles.fileButtonContainer}>
                    <input
                      type="file"
                      id="fileLateral"
                      style={{ display: 'none' }}
                      accept="image/*,application/pdf"
                    />
                    <label htmlFor="fileLateral" style={styles.traditionalFileButton}>
                      📎 Seleccionar Archivo
                    </label>
                  </div>
                </div>
              </div>

              {/* Fila 3: Datepicker e Input Normal */}
              <div style={styles.formRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.fieldLabel}>Configuración frecuencia</label>
                  <input style={styles.modalInput} type="datetime-local" />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.fieldLabel}>Almacenamiento</label>
                  <input style={styles.modalInput} type="text" placeholder="Ej: L-4562" />
                </div>
              </div>

              <button type="submit" style={styles.submitButton}>Registrar Medicamento</button>
            </form>
          </div>
        </div>
      )}
    </div>

  );
};

const styles = {
  // ... (previous styles remain the same)
  rightContainer: {
    gridColumn: '2',         // Forces this to stay in the second column
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,             // Crucial to stop table from expanding the grid
    height: '100vh',
    width: '100%',
    overflowY: 'auto',       // Only the right side scrolls
  },
  mainContent: {
    flex: 1,                  // Empuja el footer hacia abajo si hay poco contenido
    display: 'flex',
    //flexDirection: 'column',
    width: '100%',
    padding: '40px',
    boxSizing: 'border-box',
  },
  leftSide: { flex: '1', minWidth: '25%', background: '#055882', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' },
  rightSide: { flex: '0 0 65%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', overflowY: 'auto' },
  loginCard: { width: '100%', maxWidth: '420px', padding: '0 20px' },
  loginHeader: { textAlign: 'center', marginBottom: '32px' },
  // NEW: Gradient Frame Style
  gradientFrame: {
    padding: '3px',
    background: 'linear-gradient(135deg, #0A4D68 0%, #05C3DD 100%)',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(10, 77, 104, 0.1)',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px', // Reduced gap for a tighter feel
    background: '#ffffff',
    padding: '30px 24px',
    borderRadius: '17px',
  },

  // NEW: Forgot Password Styles
  forgotPasswordContainer: {
    textAlign: 'center',
    marginTop: '-8px', // Pulls it closer to the password input
  },
  forgotPasswordLink: {
    fontSize: '13px',
    color: '#42494a',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'color 0.2s ease',
  },
  registrationLink: {
    fontSize: '13px',
    color: '#088395',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'color 0.2s ease',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center', // Centers the smaller button
    marginTop: '8px',
  },
  logoIcon: { display: 'inline-block', marginBottom: '24px' },
  loginTitle: { fontFamily: "'Syne', sans-serif", fontSize: '32px', fontWeight: '800', color: '#0A4D68', margin: '0 0 8px 0' },
  loginSubtitle: { color: '#64748b', fontSize: '15px', margin: 0 },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#334155' },
  input: { padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '15px', width: '90%', outline: 'none' },
  loginButton: {
    background: 'linear-gradient(135deg, #0A4D68 0%, #088395 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px', // Reduced padding from 16px/32px
    borderRadius: '10px',
    fontSize: '15px', // Slightly smaller font
    fontWeight: '700',
    fontFamily: "'Syne', sans-serif",
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(10, 77, 104, 0.2)',
    width: 'auto', // Button no longer takes full width
    minWidth: '160px', // Ensures it doesn't get TOO small
  },
  buttonArrow: { fontSize: '20px' },
  errorMessage: { background: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', textAlign: 'center' },
  demoInfo: { marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' },
  demoText: { margin: '0 0 4px 0', fontSize: '13px', color: '#64748b' },
  demoCredentials: { margin: 0, fontSize: '14px', color: '#0A4D68', fontWeight: '600', fontFamily: 'monospace' },
  decorativeCircle1: { position: 'absolute', top: '-15%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', borderRadius: '50%' },
  decorativeCircle2: { position: 'absolute', bottom: '-20%', left: '-15%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)', borderRadius: '50%' },
  decorativeCircle3: { position: 'absolute', top: '50%', right: '20%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)', borderRadius: '50%' },
  leftContent: { position: 'relative', zIndex: 1, color: 'white', maxWidth: '500px' },
  iconContainer: { display: 'flex', justifyContent: 'space-around', marginBottom: '10px' },
  floatingIcon: { textAlign: 'center', animation: 'float 3s ease-in-out infinite' },
  emoji: { fontSize: '64px', display: 'block', marginBottom: '12px' },
  iconLabel: { fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.9)' },
  leftTitle: { fontFamily: "'Syne', sans-serif", fontSize: '48px', fontWeight: '800', marginBottom: '24px' },
  leftDescription: { fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)', marginBottom: '48px' },
  statsContainer: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  statBox: { textAlign: 'center', padding: '20px', background: 'rgba(255,255,255,0.15)', borderRadius: '16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' },
  statNumber: { fontFamily: "'Syne', sans-serif", fontSize: '36px', fontWeight: '800' },
  statLabel: { fontSize: '13px', color: 'rgba(255,255,255,0.85)' },
  pageWrapper: {
    display: 'grid',
    // Column 1: Sidebar width | Column 2: The rest of the screen
    gridTemplateColumns: '0px 1fr',
    minHeight: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    backgroundColor: '#f1f5f9',
  },
  // Ensure the middle content grows to push the footer down
  loginContainer: {
    flex: '1',
    display: 'flex',
    // ... rest of your styles
  },

  iconBigContainer: {
    position: 'relative', // This is the "anchor" for the icons
    width: '300px',      // Adjust based on your design
    height: '200px',     // Give it enough height to show both
    margin: '0 auto',    // Centers the container itself
  },
  floatingBigIcon: {
    position: 'absolute', // Allows them to overlap or move freely
    transition: 'all 0.3s ease',
  },
  iconBigStyle: {
    marginTop: '100px',
    width: '250px',       // Ensure they have a consistent size
    height: 'auto',
  },
  tableSection: {
    padding: '100px 100px 70px 190px',
    width: '100%',
    boxSizing: 'border-box',
  },
  tableCard: {
    background: 'white',
    borderRadius: '20px',
    width: '100%',            // IMPORTANTE: La tarjeta debe ocupar el 100%
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
  },
  table: {
    width: '100%',           // Table fills its container exactly
    borderCollapse: 'collapse',
  },
  tableHeaderRow: {
    background: '#f8fafc',
    borderBottom: '2px solid #e2e8f0',
  },
  tableRow: {
    borderBottom: '1px solid #f1f5f9',
    transition: 'background 0.2s ease',
  },
  tableRowAlt: {
    background: '#fafbfc',
    borderBottom: '1px solid #f1f5f9',
    transition: 'background 0.2s ease',
  },
  tableCell: {
    padding: '20px 24px',
    fontSize: '14px',
    color: '#334155',
  },
  studentName: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0A4D68 0%, #05C3DD 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '14px',
    fontFamily: "'Syne', sans-serif",
  },
  badgeMale: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    background: '#dbeafe',
    color: '#1e40af',
  },
  badgeFemale: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    background: '#fce7f3',
    color: '#be185d',
  },
  scoreCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  scoreText: {
    fontWeight: '700',
    fontSize: '15px',
    minWidth: '30px',
    fontFamily: "'Syne', sans-serif",
  },
  miniBar: {
    flex: 1,
    height: '6px',
    background: '#f1f5f9',
    borderRadius: '3px',
    overflow: 'hidden',
    maxWidth: '80px',
  },
  miniBarFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.5s ease',
  },
  overallScore: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#0f172a',
    fontFamily: "'Syne', sans-serif",
  },
  performanceExcellent: {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    background: '#dcfce7',
    color: '#166534',
  },
  performanceGood: {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    background: '#dbeafe',
    color: '#1e40af',
  },
  performanceAverage: {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    background: '#fef3c7',
    color: '#92400e',
  },
  // NEW: The container that actually scrolls
  scrollWrapper: {
    width: '100%',
    overflowX: 'auto',       // If table is too wide, it scrolls INTERNALLY
    maxHeight: '60vh',       // Optional: makes table height scrollable too
  },

  // NEW: Keeps the header visible while scrolling
  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 10, // Asegura que esté por encima de las filas
    backgroundColor: '#f8fafc', // Obligatorio para que no se transparente
  },
  tableHeader: {
    position: 'sticky', // Añadido aquí también
    top: 0,
    padding: '20px 24px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    backgroundColor: '#f8fafc', // Fondo sólido para que no se vea el texto de abajo
    borderBottom: '2px solid #e2e8f0',
  },
  /*
  navbarWrapper: {
    width: '100%',  // Force the navbar to stretch
    zIndex: 100,    // Ensure it stays on top
  },
  */
  scoreCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
  },
  actionGroup: {
    display: 'flex',
    gap: '8px',
    marginLeft: 'auto', // Pushes icons to the right side of the cell
  },
  editEmoji: {
    cursor: 'pointer',
    fontSize: '18px',
    filter: 'drop-shadow(0px 0px 2px rgba(0,0,255,0.3))', // Subtle blue glow
    transition: 'transform 0.2s',
  },
  deleteEmoji: {
    cursor: 'pointer',
    fontSize: '18px',
    filter: 'sepia(1) saturate(10000%) hue-rotate(345deg)', // This forces the emoji to look Red
    transition: 'transform 0.2s',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '180px',           // Espacio entre el botón y el título
    marginBottom: '24px',  // Espacio respecto a la tabla
  },

  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',           // Espacio entre avatar y texto
    margin: 0,             // Quitamos el margen para que el container mande
    fontFamily: "'Syne', sans-serif",
    fontSize: '28px',
    color: '#0A4D68',
  },

  actionButton: {
    padding: '10px 20px',
    backgroundColor: '#0A4D68',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontFamily: "'Syne', sans-serif",
    transition: 'background 0.3s ease',
    boxShadow: '0 4px 6px rgba(5, 195, 221, 0.2)',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dims the background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000, // Stays above everything (Sidebar/Navbar)
  },
  modalContent: {
    background: 'white',
    padding: '30px',
    borderRadius: '20px',
    width: '600px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    animation: 'emerge 0.3s ease-out', // You can add this @keyframes in your CSS
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  modalInput: {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '15px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#64748b',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '10px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Crea las 2 columnas iguales
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  fieldLabel: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#64748b',
    marginLeft: '5px',
  },
  modalInput: {
    padding: '12px',
    borderRadius: '10px',
    border: '2px solid #e2e8f0',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  // Estilo para el área de Drag & Drop
  dropZone: {
    border: '2px dashed #cbd5e1',
    borderRadius: '12px',
    padding: '15px',
    textAlign: 'center',
    backgroundColor: '#f8fafc',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  dropLabel: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
  },
  dropText: {
    fontSize: '11px',
    color: '#94a3b8',
    margin: 0,
  },
  submitButton: {
    padding: '14px',
    background: 'linear-gradient(135deg, #0A4D68 0%, #088395 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 4px 12px rgba(10, 77, 104, 0.2)',
  },
};

export default MedicamentosPage;

