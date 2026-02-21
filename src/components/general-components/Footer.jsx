import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Esta es para icono estaticos fa
import {faPhoneVolume, faEnvelope} from '@fortawesome/free-solid-svg-icons'
//Esta es para iconos de marcas fab
import {faFacebook, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons'
import '../../styles/general-components/footer.css';
import { Link } from "react-router-dom";

export default function Footer () {

    return (
      <footer className="contenedor">
      <div className="content">
          <div className="left box">
              <div className="upper">
                      <div className="topic">SANTÉ</div>
              </div>
              <div className="lower">
             
                      
                      <div className="email" style={{ marginTop: "60px" }}>
                              <div className="icono-footer contacto">
                                  <FontAwesomeIcon icon={faEnvelope}/>
                                  &nbsp; sante@email.com
                              </div>
                      </div>
              </div>
          </div>

          <div className="right box text-decoration-none link-mapa">
              <h4 className="titulo-mapa">Mapa del sitio</h4>
              <div><Link to='/' className="link-mapa">Inicio</Link></div>
              <div><Link to='/registro' className="link-mapa">Registro</Link></div>
              <div className="media-icons">
                      <a href="/">
                          <div className="icono-footer">
                              <FontAwesomeIcon icon={faFacebook}/>
                          </div>
                      </a>
                      <a href="/">
                          <div className="icono-footer">
                              <FontAwesomeIcon icon={faYoutube}/>
                          </div>
                      </a>
                      <p>SISE© 2026. Todos los derechos reservados</p>
              </div>
          </div>
      </div>
  </footer>

    )
}
