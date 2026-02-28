import React, { useState } from 'react'; // 1. Added useState
import { useNavigate } from 'react-router-dom'; // 2. Added useNavigate
import Footer from './components/general-components/Footer';
import Sidebar from './components/general-components/Sidebar';
import BarraNavegacion from './components/general-components/BarraNavegacion';
import { faPhoneVolume, faEnvelope, faEdit, faCancel, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer }from 'recharts';
import Select from 'react-select';
const ReportesPage = ({ studentsData }) => {
  // 4. Create internal state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({ value: 'individual', label: 'Individual' });
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
   if (!studentsData || studentsData.length === 0) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>No data available.</div>;
  }
  const competencyAverages = [
    {
      gameName: 'Medicamentos',
      competency: 'Porcentaje de adherencia en la toma de medicamentos',
      score: Math.round(studentsData.reduce((acc, s) => acc + s.problemSolving, 0) / studentsData.length)
    },
    {
      gameName: 'Citas',
      competency: 'Porcentaje de adherencia en el cumplimiento de citas',
      score: Math.round(studentsData.reduce((acc, s) => acc + s.criticalThinking, 0) / studentsData.length)
    },
    {
      gameName: 'Examenes',
      competency: 'Porcentaje de adherencia en la toma de examenes',
      score: Math.round(studentsData.reduce((acc, s) => acc + s.creativity, 0) / studentsData.length)
    }
  ];

  // Calculate gender-based averages
  const maleStudents = studentsData.filter(s => s.gender === 'Activo');
  const femaleStudents = studentsData.filter(s => s.gender === 'Inactivo');

  const genderData = [
    {
      competency: 'Primera Semana',
      Medicamentos: Math.round(maleStudents.reduce((acc, s) => acc + s.problemSolving, 0) / maleStudents.length),
      Citas: Math.round(femaleStudents.reduce((acc, s) => acc + s.problemSolving, 0) / femaleStudents.length)
    },
    {
      competency: 'Segunda Semana',
      Medicamentos: Math.round(maleStudents.reduce((acc, s) => acc + s.criticalThinking, 0) / maleStudents.length),
      Citas: Math.round(femaleStudents.reduce((acc, s) => acc + s.criticalThinking, 0) / femaleStudents.length)
    },
    {
      competency: 'Tercera Semana',
      Medicamentos: Math.round(maleStudents.reduce((acc, s) => acc + s.creativity, 0) / maleStudents.length),
      Citas: Math.round(femaleStudents.reduce((acc, s) => acc + s.creativity, 0) / femaleStudents.length)
    },
    {
      competency: 'Cuarta Semana',
      Medicamentos: Math.round(maleStudents.reduce((acc, s) => acc + s.creativity, 0) / maleStudents.length),
      Citas:  Math.round(maleStudents.reduce((acc, s) => acc + s.creativity, 0) / maleStudents.length),
    }
  ];


  const averageScore = studentsData.length > 0
    ? studentsData.reduce((acc, curr) => acc + curr.score, 0) / studentsData.length
    : 0;

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


          
    <div style={styles.dashboard}>
          {/* Header */}
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
                  <h1 style={styles.headerTitle}>Tablero de Análisis</h1>
                </div>
              </div>
             
            </div>
          </header>
    
          {/* Main Content */}
          <main style={styles.main}>
            {/* Summary Cards */}
            <div style={styles.summarySection}>
              <h2 style={styles.sectionTitle}>Desempeño semanal</h2>
              {/* NEW Top Row */}
              <div style={styles.topCardsRow}>
                {/* Large Card (Left + Middle) */}
                <div style={{ ...styles.card, ...styles.featuredLarge }}>
                  <div style={styles.largeCardContent}>
                    <div>
                      <h3 style={styles.cardTitle}>ADHERENCIA</h3>
                      <h2 style={styles.largeDisplay}>General</h2>
    
                      <div style={styles.scoreContainer}>
                        {/* Use averageScore instead of item.score */}
                        <span style={styles.scoreNumber}>{86}</span>
                        <span style={styles.scoreMax}>/100 (Promedio)</span>
                      </div>
    
                      <div style={styles.progressBar}>
                        <div style={{ ...styles.progressFill, width: `${averageScore}%` }}></div>
                      </div>
                    </div>
                    <div style={styles.largeIcon}>🚀</div>
                  </div>
    
                </div>
    
               
              </div>
              <div style={styles.cardsGrid}>
                {competencyAverages.map((item, index) => (
                  <div key={index} style={{ ...styles.card, ...styles[`card${index}`] }}>
                    <div style={styles.cardIcon}>
                      {index === 0 && '🩹'}
                      {index === 1 && '🩺'}
                      {index === 2 && '🧪'}
                    </div>
                    <h3 style={styles.cardTitle}>{item.gameName}</h3>
                    <p style={styles.statLabel}>{item.competency}</p>
                    <div style={styles.scoreContainer}>
                      <span style={styles.scoreNumber}>{item.score}</span>
                      <span style={styles.scoreMax}>/100</span>
                    </div>
                    <div style={styles.progressBar}>
                      <div style={{ ...styles.progressFill, width: `${item.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
    
            {/* Gender Comparison Chart */}
            <div style={styles.chartSection}>
              <h2 style={styles.sectionTitle}>Desempeño mes de marzo</h2>
              <div style={styles.chartCard}>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={genderData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis
                      dataKey="competency"
                      style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fill: '#64748b' }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fill: '#64748b' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        fontFamily: 'DM Sans, sans-serif'
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    />
                    
                    <Bar dataKey="Citas" fill="#05C3DD" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Medicamentos" fill="#0A4D68" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
    
            {/* Student Results Table */}
            <div style={styles.tableSection}>
              <h2 style={styles.sectionTitle}>Alertas</h2>
              <div style={styles.tableCard}>
                {/* This wrapper enables the scrollbar */}
                <div style={styles.scrollWrapper}>
                  <table style={styles.table}>
                    <thead style={styles.stickyHeader}>
                      <tr onClick={() => setSelectedStudent(student)}
                        style={{ ...styles.tableHeaderRow, cursor: 'pointer' }}>
                        <th style={styles.tableHeader}>Concepto</th>
                        <th style={styles.tableHeader}>Estado</th>
                        <th style={styles.tableHeader}>Detalles</th>
                        <th style={styles.tableHeader}>Riesgo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsData.map((student, index) => (
                        <tr key={student.id} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
                          onClick={() => {
                            console.log("Selected Student:", student.name); // Check your console!
                            setSelectedStudent(student);
                          }}>
                          <td style={styles.tableCell}>
                            <div style={styles.studentName}>
                              <div style={styles.avatar}>
                                {student.concepto.charAt(0)}
                              </div>
                              <span>{student.concepto}</span>
                            </div>
                          </td>
                          <td style={styles.tableCell}>
                            <span style={student.gender === 'Medicamentos' ? styles.badgeMale : styles.badgeFemale}>
                              {student.gender}
                            </span>
                          </td>
                          <td style={styles.tableCell}>
                            <div style={styles.scoreCell}>
                              <span style={styles.scoreText}>{student.problemSolving}</span>
                              <div style={styles.miniBar}>
                                <div style={{ ...styles.miniBarFill, width: `${student.problemSolving}%`, background: '#c06824' }}></div>
                              </div>
                               <div style={styles.miniBar}>
                                <div style={{ ...styles.miniBarFill, width: `${student.criticalThinking}%`, background: '#05C3DD' }}></div>
                              </div>
                               <div style={styles.miniBar}>
                                <div style={{ ...styles.miniBarFill, width: `${student.creativity}%`, background: '#0d710a' }}></div>
                              </div>
                            </div>
                          </td>

                          <td style={styles.tableCell}>
                            {student.overall >= 90 ? (
                              <span style={styles.performanceExcellent}>Bajo</span>
                            ) : student.overall >= 80 ? (
                              <span style={styles.performanceGood}>Medio</span>
                            ) : (
                              <span style={styles.performanceAverage}>Alto</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        
        </div>
            


        </div>
        <Footer />
      </div>
  
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
    padding: '100px 200px 200px 200px',
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
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '180px',           // Espacio entre el botón y el título
    marginBottom: '24px',  // Espacio respecto a la tabla
  },
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
  dashboard: {
    width: '100%',
  height: '100%',
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
  },
  logoIconSmall: {
    marginRight: '16px',
  },
  headerTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '28px',
    fontWeight: '800',
    color: 'white',
    margin: '0 0 4px 0',
    letterSpacing: '-0.5px',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: '14px',
    margin: 0,
    fontWeight: '500',
  },
  main: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 32px',
  },
  summarySection: {
    marginBottom: '48px',
  },
  sectionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '24px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '24px',
    letterSpacing: '-0.3px',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
  },
  card0: {
    borderTop: '4px solid #c06824',
  },
  card1: {
    borderTop: '4px solid #05C3DD',
  },
  card2: {
    borderTop: '4px solid #0d710a',
  },
  cardIcon: {
    fontSize: '36px',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#64748b',
    margin: '0 0 16px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  scoreContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
    marginBottom: '12px',
  },
  scoreNumber: {
    fontSize: '48px',
    fontWeight: '800',
    color: '#0f172a',
    fontFamily: "'Syne', sans-serif",
  },
  scoreMax: {
    fontSize: '20px',
    color: '#94a3b8',
    fontWeight: '600',
  },
  progressBar: {
    height: '8px',
    background: '#f1f5f9',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #0A4D68 0%, #05C3DD 100%)',
    borderRadius: '4px',
    transition: 'width 1s ease',
  },
  chartSection: {
    marginBottom: '48px',
  },
  chartCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
  },
  tableSection: {
    marginBottom: '48px',
  },
  tableCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderRow: {
    background: '#f8fafc',
    borderBottom: '2px solid #e2e8f0',
  },
  tableHeader: {
    padding: '20px 24px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
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
    maxHeight: '500px', // Adjust this height to your preference
    overflowY: 'auto',
    overflowX: 'auto', // Horizontal scroll for small screens
  },

  // NEW: Keeps the header visible while scrolling
  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: '#f8fafc',
  },
  // NEW: Footer Styles (Shared from Login Page)

  // Container for the top two cards
  topCardsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // Matches the 3-column grid below
    gap: '24px',
    marginBottom: '24px', // Space between the top row and bottom row
  },

  featuredLarge: {
    gridColumn: 'span 3', // Takes up 2 of the 3 columns
    background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
    borderLeft: '4px solid #05C3DD',
    display: 'flex',
    alignItems: 'center',
    padding: '32px',
  },

  featuredSmall: {
    gridColumn: 'span 1', // Takes up the remaining 1 column (on the right)
    borderLeft: '4px solid #0A4D68',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },

  largeCardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  largeDisplay: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '24px',
    fontWeight: '800',
    color: '#0A4D68',
    margin: '8px 0',
  },

  largeIcon: {
    fontSize: '48px',
  },
  statLabel: {
  // ... tus otros estilos (color, fontSize, etc.)
  overflowWrap: 'break-word',  // Permite que la palabra se rompa
  wordBreak: 'break-word',      // Refuerzo para navegadores antiguos
  whiteSpace: 'normal',         // Asegura que no intente quedarse en una sola línea
}
};

export default ReportesPage;

