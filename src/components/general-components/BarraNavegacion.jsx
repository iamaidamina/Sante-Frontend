import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ FIXED: Import useNavigate
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../../styles/general-components/navbarMenuPrincipal.css';
import Cookies from 'universal-cookie';
import user from '../../assets/user-icon.png';
import recurso1 from '../../assets/Logo-sante-sinfondo.svg';
import socket from '../../socket';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

const getUsernameFromToken = (token) => {
  try {
    const payload = token?.split('.')[1];
    if (!payload) return null;
    const decoded = JSON.parse(atob(payload));
    return decoded?.username || decoded?.name || decoded?.nombres || decoded?.email?.split('@')[0] || null;
  } catch {
    return null;
  }
};

export default function BarraNavegacion() {
  const cookies = new Cookies();
  const navigate = useNavigate(); // ✅ FIXED: Now works with import
  const token = localStorage.getItem('access_token'); // ✅ Use localStorage like login
  const username =
    cookies.get('username') ||
    localStorage.getItem('username') ||
    getUsernameFromToken(token) ||
    'Usuario';

  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [navigate, token]); // ✅ Added token dependency

const cerrarSesion = async () => {
  try {
    if (token) {
      await fetchWithAuth('/api/users/logout', {
        method: 'POST'
      });
    }

  } catch (error) {
    console.error("Error cerrando sesión", error);
  }

  socket.disconnect();

  // limpiar almacenamiento
  cookies.remove('token', { path: '/' });
  cookies.remove('username', { path: '/' });
  localStorage.removeItem('access_token');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('user_id');

  navigate('/', { replace: true });
};

  // ✅ Show loading/protected state
  if (!token) return null;

  return (
    <div className='navbar-tam'>
      <Navbar className='navbar' variant='dark' expand="lg">
        <Navbar.Brand className='navbar-brand' href="/">
          <img
            className='imagen-logo'
            src={recurso1}
            alt='Logo SANTE - Plataforma de salud'
            style={{
              maxWidth: '30%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Abrir menu de navegacion" />
        <Navbar.Collapse className='justify-content-end navbar-collapse' id="basic-navbar-nav">
          <Nav>
            <img src={user} className="avatar perfil" alt="Foto de perfil del usuario" />
            <NavDropdown
              title={username}
              id="basic-nav-dropdown"
              className='justify-content-end'
            >
              <NavDropdown.Item
                className='dropdown-item navbar-dropdown'
                onClick={() => navigate('/informacion-usuario')}
              >
                <FontAwesomeIcon icon={faCircleUser} />
                &nbsp;&nbsp;Ver informacion del usuario
              </NavDropdown.Item>
              <NavDropdown.Item className='dropdown-item navbar-dropdown'>
                <Button
                  variant="light"
                  type="button"
                  onClick={cerrarSesion}
                  aria-label="Cerrar sesion"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
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
