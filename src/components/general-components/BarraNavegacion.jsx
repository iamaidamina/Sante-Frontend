import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ FIXED: Import useNavigate
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../../styles/general-components/navbarMenuPrincipal.css';
import Cookies from 'universal-cookie';
import user from '../../assets/react.svg';
import recurso1 from '../../assets/react.svg';

export default function BarraNavegacion() {
  const cookies = new Cookies();
  const navigate = useNavigate(); // ✅ FIXED: Now works with import
  const token = localStorage.getItem('token'); // ✅ Use localStorage like login
  const username = cookies.get('username') || localStorage.getItem('email') || 'Usuario';

  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [navigate, token]); // ✅ Added token dependency

  const cerrarSesion = () => {
    // ✅ Clean BOTH storage methods for consistency
    cookies.remove('token', { path: '/' });
    cookies.remove('username', { path: '/' });
    localStorage.removeItem('token');
    localStorage.removeItem('email'); // If you store email here too
    navigate('/', { replace: true });
  };

  // ✅ Show loading/protected state
  if (!token) return null;

  return (
    <div className='navbar-tam'>
      <Navbar className='navbar' variant='dark' expand="lg" fluid>
        <Navbar.Brand className='navbar-brand' href="/">
          <img className='imagen-logo' src={recurso1} alt='Logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='justify-content-end navbar-collapse' id="basic-navbar-nav">
          <Nav>
            <img src={user} className="avatar perfil" alt="Avatar" />
            <NavDropdown 
              title={username}
              id="basic-nav-dropdown" 
              className='justify-content-end'
            >
              <NavDropdown.Item className='dropdown-item navbar-dropdown'>
                <Button 
                  variant="light" 
                  type="button"
                  onClick={cerrarSesion}
                >
                  <FontAwesomeIcon icon={faSignOutAlt}/>
                  &nbsp;&nbsp;Cerrar Sesión
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
