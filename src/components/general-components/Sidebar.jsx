import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Link } from 'react-router-dom';
import '../../styles/general-components/sidebar.css';

const Sidebar = () => {

  const [estado, setEstado] = useState(true);

  return (
    <nav className='sidebar' aria-label="Menu de navegacion principal" style={{ display: 'flex', height: '100%', overflow: 'scroll initial' }}>
      <CDBSidebar data-toggle="collapse" textColor="#fff" backgroundColor="#0A4D68">
        <CDBSidebarHeader onClick={()=>setEstado(estado ? false : true)} prefix={<i className="fa fa-bars fa-large" aria-hidden="true"></i>}>
          <a href="/medicamentos" className="text-decoration-none" style={{ color: 'inherit' }} aria-label="Ir al inicio de SANTE">
            SANTÉ
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <Link to="/reportes" aria-label="Ir a Reportes">
              <CDBSidebarMenuItem icon='chart-line'> Reportes</CDBSidebarMenuItem>
            </Link>
            <Link to="/medicamentos" aria-label="Ir a Medicamentos">
              <CDBSidebarMenuItem icon="capsules">Medicamentos</CDBSidebarMenuItem>
            </Link>
            <Link to="/citas" aria-label="Ir a Citas medicas">
              <CDBSidebarMenuItem icon="user-nurse">Citas</CDBSidebarMenuItem>
            </Link>
            <Link to="/examenes" aria-label="Ir a Examenes medicos">
              <CDBSidebarMenuItem icon="stethoscope">Exámenes</CDBSidebarMenuItem>
            </Link>
            <Link to="/entregas" aria-label="Ir a Entregas">
              <CDBSidebarMenuItem icon="car">Entregas</CDBSidebarMenuItem>
            </Link>
            <Link to="/guia-usuario" aria-label="Ir a Guia de usuario">
              <CDBSidebarMenuItem icon="book">Guía de usuario</CDBSidebarMenuItem>
            </Link>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/*<CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
          </CDBSidebarFooter>*/}
      </CDBSidebar>
    </nav>
  );
};

export default Sidebar;


