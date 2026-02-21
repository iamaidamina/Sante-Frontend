import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../../styles/general-components/navbarMenuPrincipal.css';
import Cookies from 'universal-cookie';
import user from '../../assets/react.svg';
import recurso1 from '../../assets/react.svg';

export default function BarraNavegacion() {

  const cookies = new Cookies();
  const cookies2 = new Cookies();

  //Se usa useEffect para permitir que la función se siga ejecutando, en este caso, la funcion que hace
  //que persista la ventana de menu principal en caso de que se mantenga la sesión
  /*
  useEffect(() => {
    const cookies = new Cookies();
    if(!cookies.get('token')){
      window.location.assign('./');
  }
  }, []);
  */

  //Elimina el token de las cookies para dejar de mantener el inicio de sesión
  const cerrarSesion = () => {
    cookies.remove('token', {path:'/'});
    window.location.assign('./');
  }

  const email = cookies2.get('email');

  console.log('cookie', email);

  return(
          <div className='navbar-tam'>
          <Navbar className='navbar' variant='dark'>
              <Navbar.Brand className='navbar-brand' href="./">
                <img className='imagen-logo' src={recurso1} alt='Logo' />
                </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse className='justify-content-end navbar-collapse' id="basic-navbar-nav">
                <Nav>
                <img src={user} className="avatar perfil" alt="Avatar" />
                {/* title={`${email}`} */}
                  <NavDropdown title={`Usuario`} id="basic-nav-dropdown" className='justify-content-end'>
                      <NavDropdown.Item className='dropdown-item navbar-dropdown'>
                        <Button  variant="light" type="submit" onClick={()=>cerrarSesion()}>
                          <FontAwesomeIcon icon={faSignOutAlt}/>
                          &nbsp; &nbsp;Cerrar Sesion
                        </Button>
                        
                      </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
          </Navbar>
        </div>
    
    );
}
