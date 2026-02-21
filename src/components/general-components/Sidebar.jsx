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
    <div className='sidebar'  style={{ display: 'flex', height: '100%', overflow: 'scroll initial' }}>
      <CDBSidebar data-toggle="collapse" textColor="#fff" backgroundColor="#055882">
        <CDBSidebarHeader onClick={()=>setEstado(estado ? false : true)} prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/menuprincipal" className="text-decoration-none" style={{ color: 'inherit' }}>
            SANTÉ
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <Link to="/reportes">
              <CDBSidebarMenuItem icon='chart-line'> Reportes</CDBSidebarMenuItem>
            </Link>
            <Link to="/medicamentos">
              <CDBSidebarMenuItem icon="capsules">Medicamentos</CDBSidebarMenuItem>
            </Link>
            <Link to="/citas">
              <CDBSidebarMenuItem icon="user-nurse">Citas</CDBSidebarMenuItem>
            </Link>
            <Link to="/entregas">
              <CDBSidebarMenuItem icon="car-side">Entregas</CDBSidebarMenuItem>
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
    </div>
  );
};

export default Sidebar;


