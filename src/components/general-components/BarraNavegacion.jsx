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
const API_URL = "https://sante-backend-l81v.onrender.com";

export default function BarraNavegacion() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');
  const username =
    cookies.get('username') ||
    localStorage.getItem('username') ||
    'Usuario';

  useEffect(() => {
    if (!userId) {
      navigate('/', { replace: true });
    }
  }, [navigate, userId]);

const cerrarSesion = async () => {
  try {
    if (userId) {
      await fetch(`${API_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    }

  } catch (error) {
    console.error("Error cerrando sesión", error);
  }

  socket.disconnect();

  cookies.remove('token', { path: '/' });
  cookies.remove('username', { path: '/' });
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('user_id');

  navigate('/', { replace: true });
};

  if (!userId) return null;

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
