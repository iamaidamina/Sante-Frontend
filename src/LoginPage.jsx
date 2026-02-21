import React, { useState } from 'react'; // 1. Added useState
import { useNavigate } from 'react-router-dom'; // 2. Added useNavigate
import Footer from './components/general-components/Footer';
import illustrationLeft from './assets/illustrationLeft.svg'
const LoginPage = () => {
  // 4. Create internal state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
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

  
      navigate('/medicamentos'); // 6. Use navigate instead of setIsLoggedIn
    
  };

  return (
    <div style={styles.pageWrapper} className="pageWrapper">
      <div style={styles.loginContainer} className="loginContainer">
         {/* Right Side - Login Form */}
        <div style={styles.rightSide} className="rightSide">
          <div style={styles.loginCard}>
            <div style={styles.loginHeader}>
            </div>

            {/* START: Gradient Border Frame */}
            <div style={styles.gradientFrame}>
              <form onSubmit={handleLogin} style={styles.loginForm}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Usuario</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digitar el usuario"
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digitar la contraseña"
                    style={styles.input}
                    required
                  />
                </div>


                {loginError && (
                  <div style={styles.errorMessage}>
                    {loginError}
                  </div>
                )}

                {/* UPDATED: Smaller Button Container */}
                <div style={styles.buttonWrapper}>
                  <button type="submit" style={styles.loginButton}>
                    Entrar
                  </button>
                </div>

                {/* NEW: Forgot Password Link */}
                <div style={styles.forgotPasswordContainer}>
                  <p href="#forgot" style={styles.forgotPasswordLink}>
                    ¿Olvidó la contraseña?
                  </p>
                </div>
                {/* NEW: Forgot Password Link */}
                <div style={styles.forgotPasswordContainer}>
                  <a href="/registro" style={styles.registrationLink}>
                    Registrarse
                  </a>
                </div>
              </form>
            </div>
            {/* END: Gradient Border Frame */}

          </div>
        </div>
        {/* Left Side - Branded Content */}
        <div style={styles.leftSide} className="leftSide">
          <div style={styles.decorativeCircle1}></div>
          <div style={styles.decorativeCircle2}></div>
          <div style={styles.decorativeCircle3}></div>

          <div style={styles.leftContent}>
        
            
            <div style={styles.iconBigContainer}>
              <div style={{
                ...styles.floatingBigIcon, animationDelay: '0s',
                left: '12px',
                top: '-200px'
              }}>
                <img src={illustrationLeft} alt="Teacher" style={styles.iconBigStyle} />
              </div>
        
            </div>


          </div>
        </div>

       
      </div>


      <Footer />
    </div>
  );
};

const styles = {
  // ... (previous styles remain the same)


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
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Ensures it covers the screen
    width: '100vw',
    overflowY: 'auto', 
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
  }
};

export default LoginPage;

