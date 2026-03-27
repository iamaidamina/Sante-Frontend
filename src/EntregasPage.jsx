import React, { useState, useEffect, useRef } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import Footer from './components/general-components/Footer';
import Sidebar from './components/general-components/Sidebar';
import BarraNavegacion from './components/general-components/BarraNavegacion';
import { faPhoneVolume, faEnvelope, faEdit, faCancel, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import Select from 'react-select';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { fetchWithAuth } from './utils/fetchWithAuth';
import "leaflet/dist/leaflet.css";

function DraggableMap({ onLocationSelected }) {
  const [position, setPosition] = useState([3.4216, -76.5205]); // Cali

  function DraggableMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelected(e.latlng.lat, e.latlng.lng);
      },
    });
    return <Marker position={position} />;
  }

}


const EntregasPage = ({ studentsData }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDelivery, setNewDelivery] = useState({
    lugar_compra: '',
    id_domiciliario: null,
    nombre_producto: '',
    comentario: '',
    lugar_entrega: '',
    fecha_llegada: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState(null);
  const [domiciliarios, setDomiciliarios] = useState([]);
  const navigate = useNavigate();

  //Carga Entregas
  useEffect(() => {
    fetchDeliveries();
  }, []);

  //Carga Domiciliarios
  useEffect(() => {
    fetchDomiciliarios();
  }, []);

  const fetchDomiciliarios = async () => {
    try {
      const response = await fetchWithAuth('/api/catalog/domiciliarios');
      if (!response.ok) {
        throw new Error('Error al cargar domiciliarios');
      }
      const data = await response.json();
      setDomiciliarios(data);
    } catch (err) {
      console.error(err);
    }

  }

  const fetchDeliveries = async () => {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setError('No token found. Please login again.');
        setIsLoading(false);
        return;
      }

      const response = await fetchWithAuth('/api/deliveries');

      if (!response.ok) {
        throw new Error('Error al cargar entregas');
      }

      const data = await response.json();
      setDeliveries(data);
    } catch (error) {
      setError('No se pudieron cargar las entregas');
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🛠️ Creating:', newDelivery);
    try {
      const response = await fetchWithAuth('/api/deliveries', {
        method: 'POST',
        body: JSON.stringify(newDelivery)
      });

      if (response.ok) {
        setNewDelivery({
          lugar_compra: '',
          id_domiciliario: null,
          nombre_producto: '',
          comentario: '',
          lugar_entrega: '',
          fecha_llegada: '',
        });
        setIsModalOpen(false);
        fetchDeliveries(); // Refresh list
      } else {
        alert('Error al crear entrega');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta entrega?')) return;

    try {
      await fetchWithAuth(`/api/deliveries/${id}`, {
        method: 'DELETE'
      });

      fetchDeliveries(); // Refresh list
    } catch (error) {
      alert('Error al eliminar');
    }
  };

  const handleEdit = (id, delivery) => {
    
    const cleanDelivery = {
      id_entrega: id,
      lugar_compra: delivery.lugar_compra || '',
      id_domiciliario: delivery.id_domiciliario ? parseInt(delivery.id_domiciliario, 10) : 1,
      nombre_producto: delivery.nombre_producto || '',
      comentario: delivery.comentario || '',
      lugar_entrega: delivery.lugar_entrega || '',
      fecha_llegada: delivery.fecha_llegada
        ? new Date(delivery.fecha_llegada).toISOString().slice(0, 10)  
        : ''
    };

    setEditingDelivery(cleanDelivery);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingDelivery) {
      alert('No delivery selected for editing');
      return;
    }

    try {
      const response = await fetchWithAuth(
        `/api/deliveries/${editingDelivery.id_entrega}`,
        {
          method: 'PUT',
          body: JSON.stringify(editingDelivery)
        }
      );

      if (response.ok) {
        setIsEditMode(false);
        setEditingDelivery(null);
        setIsModalOpen(false);
        fetchDeliveries(); 
      } else {
        alert('Error al actualizar');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  const getDomiciliarioName = (id) => {
    if (!id || !domiciliarios.length) return 'N/A';

    const domiciliario = domiciliarios.find(esp =>
      esp.id === Number(id) ||
      esp.id_domiciliario === Number(id)
    );

    return domiciliario?.nombre_domiciliario ||
      'N/A';
  };
  
  if (isLoading) {
    return (
      <div style={styles.pageWrapper}>
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
          Cargando entregas...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.pageWrapper}>
        <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
          {error}
        </div>
      </div>
    );
  }
  return (
    <div style={styles.pageWrapper} className="pageWrapper">


      {}
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
                SOLICITAR NUEVA ENTREGA <FontAwesomeIcon icon={faPlus} />
              </button>

              <h2 style={styles.sectionTitle}>Listado de Entregas</h2>
            </div>

            <div style={styles.tableCard}>
              <div style={styles.scrollWrapper}>
                <table style={styles.table}>
                  <thead style={styles.stickyHeader}>
                    <tr style={styles.tableHeaderRow}>
                      <th style={styles.tableHeader}>Nombre producto</th>
                      <th style={styles.tableHeader}>Lugar de Compra</th>
                      <th style={styles.tableHeader}>Nombre domiciliario</th>
                      <th style={styles.tableHeader}>Fecha llegada</th>
                      <th style={styles.tableHeader}>Estado</th>
                      <th style={styles.tableHeader}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                          No hay entregas registradas
                        </td>
                      </tr>
                    ) : (deliveries.map((delivery, index) => (
                      <tr key={delivery.id_entrega} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                        <td style={styles.tableCell}>
                          <div style={styles.studentName}>
                            <div style={styles.avatar}>{delivery.nombre_producto.charAt(0)}</div>
                            <span>{delivery.nombre_producto}</span>

                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.studentName}>
                            <span>{delivery.lugar_compra}</span>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.studentName}>
                            <span>{getDomiciliarioName(delivery.id_domiciliario)}</span>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.studentName}>
                            <span>
                              {delivery.fecha_llegada
                                ? new Date(delivery.fecha_llegada).toISOString().slice(0, 10)
                                : 'N/A'
                              }
                            </span>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.studentName}>
                            <span style={delivery.estado === 'pendiente' ? styles.badgeFemale : styles.badgeMale}>
                              {delivery.estado}
                            </span>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.actionGroup}>
                            <button style={styles.editEmoji} title="Editar" aria-label="Editar cita" onClick={() => handleEdit(delivery.id_entrega, delivery)}>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button style={styles.deleteEmoji} title="Eliminar" aria-label="Eliminar cita" onClick={() => handleDelete(delivery.id_entrega)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                    )}
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
              <h3>{isEditMode ? 'Editar Entrega' : 'Solicitar Nueva Entrega'}</h3>
              <button
                onClick={() => {
                  fetchDomiciliarios();
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setEditingDelivery(null);
                }}
                style={styles.closeButton}>✕
              </button>
            </div>

            <form style={styles.modalForm} onSubmit={isEditMode ? handleUpdate : handleSubmit}>

              {/* Fila 1: Inputs Normales */}
              <div style={styles.formRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.fieldLabel}>Nombre producto</label>
                  <input style={styles.modalInput}
                    type="text"
                    placeholder="producto"
                    value={isEditMode ? editingDelivery.nombre_producto : newDelivery.nombre_producto}
                    onChange={(e) => {
                      if (isEditMode) {
                        setEditingDelivery({ ...editingDelivery, nombre_producto: e.target.value });
                      } else {
                        setNewDelivery({ ...newDelivery, nombre_producto: e.target.value });
                      }
                    }} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.fieldLabel}>Lugar de compra</label>
                  <input style={styles.modalInput}
                    type="text"
                    placeholder="lugar"
                    value={isEditMode ? editingDelivery.lugar_compra : newDelivery.lugar_compra}
                    onChange={(e) => {
                      if (isEditMode) {
                        setEditingDelivery({ ...editingDelivery, lugar_compra: e.target.value });
                      } else {
                        setNewDelivery({ ...newDelivery, lugar_compra: e.target.value });
                      }
                    }} />
                </div>
              </div>

              {/* Fila 2: Selectores de Imagen / Drag & Drop */}
              <div style={styles.formRow}>
                {/* Input 1: Traditional Button Style */}
                <div style={styles.inputGroup}>
                  <label style={styles.fieldLabel}>Fecha llegada</label>
                  <input
                    style={styles.modalInput}
                    type="date"
                    value={
                      // Formato YYYY-MM-DD o vacío
                      (isEditMode ? editingDelivery.fecha_llegada : newDelivery.fecha_llegada) || ''
                    }
                    onChange={(e) => {

                      console.log("Fecha: " + e.target.value);
                      if (isEditMode) {
                        setEditingDelivery({ ...editingDelivery, fecha_llegada: e.target.value });
                      } else {
                        setNewDelivery({ ...newDelivery, fecha_llegada: e.target.value });
                      }
                    }}
                  />
                </div>


                {}
                <div style={styles.inputGroup}>
                  <label style={styles.fieldLabel}>Nombre domiciliario</label>
                  <select
                    style={styles.modalInput}
                    value={isEditMode ? editingDelivery?.id_domiciliario || '' : newDelivery.id_domiciliario || ''}
                    onChange={(e) => {
                      const numberValue = parseInt(e.target.value) || null;
                      if (isEditMode) {
                        setEditingDelivery({ ...editingDelivery, id_domiciliario: numberValue });
                      } else {
                        setNewDelivery({ ...newDelivery, id_domiciliario: numberValue });
                      }
                    }}
                  >
                    <option value="">Seleccionar domiciliario</option>

                    {domiciliarios.map((esp) => (
                      <option
                        key={esp.id_domiciliario}
                        value={esp.id_domiciliario}
                      >
                        {esp.nombre_domiciliario}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fila 3: Datepicker e Input Normal */}
              <div style={styles.formRow}>
                {/* Input 1: Traditional Button Style */}
                <div style={styles.inputGroup}>
                  <label style={styles.fieldLabel}>Lugar entrega</label>
                  <input style={styles.modalInput}
                    type="text"
                    placeholder="lugar"
                    value={isEditMode ? editingDelivery.lugar_entrega : newDelivery.lugar_entrega}
                    onChange={(e) => {
                      if (isEditMode) {
                        setEditingDelivery({ ...editingDelivery, lugar_entrega: e.target.value });
                      } else {
                        setNewDelivery({ ...newDelivery, lugar_entrega: e.target.value });
                      }
                    }} />

                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.fieldLabel}>Comentario</label>
                  <input style={styles.modalInput}
                    type="text"
                    placeholder="comentario"
                    value={isEditMode ? editingDelivery.comentario : newDelivery.comentario}
                    onChange={(e) => {
                      if (isEditMode) {
                        setEditingDelivery({ ...editingDelivery, comentario: e.target.value });
                      } else {
                        setNewDelivery({ ...newDelivery, comentario: e.target.value });
                      }
                    }} />
                </div>
              </div>
              {/* Agregar después de "Comentario" - Nueva Fila 4 */}
              <div style={styles.formRow}>
                {/* Pregunta: Es medicamento? */}
                <div style={styles.inputGroup}>
                  <label style={styles.fieldLabel}>¿Es medicamento?</label>
                  <select
                    style={styles.modalInput}
                    value={isEditMode ? editingDelivery.es_medicamento || 'no' : newDelivery.es_medicamento || 'no'}
                    onChange={(e) => {
                      const esMedicamento = e.target.value;

                      if (isEditMode) {
                        setEditingDelivery({
                          ...editingDelivery,
                          es_medicamento: esMedicamento,
                          orden_medica: esMedicamento === 'si' ? editingDelivery.orden_medica || '' : null  // Reset si no es medicamento
                        });
                      } else {
                        setNewDelivery({
                          ...newDelivery,
                          es_medicamento: esMedicamento,
                          orden_medica: esMedicamento === 'si' ? newDelivery.orden_medica || '' : null
                        });
                      }
                    }}
                  >
                    <option value="no">No</option>
                    <option value="si">Sí</option>
                  </select>
                </div>

                <div
                  style={{
                    ...styles.inputGroup,
                    opacity: (isEditMode ? editingDelivery.es_medicamento === 'si' : newDelivery.es_medicamento === 'si') ? 1 : 0.5,
                    pointerEvents: (isEditMode ? editingDelivery.es_medicamento === 'si' : newDelivery.es_medicamento === 'si') ? 'auto' : 'none'
                  }}>
                  <label style={styles.fieldLabel}>Orden médica</label>
                   <div style={styles.fileButtonContainer}>
                    <input
                      type="file"
                      id="fileLateral"
                      accept="image/*,application/pdf"
                      style={{
                        width: '100%',
                        height: '40px',
                        padding: '8px 12px',
                        border: '2px dashed #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'all 0.2s ease',
                      }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          console.log('Archivo:', file.name, file.size);
                        }
                      }}
                      onClick={(e) => {
                        e.target.value = ''; 
                      }}
                    />
                  </div>
                </div>
              </div>


              <button type="submit" style={styles.submitButton}>{isEditMode ? 'Actualizar Solicitud Entrega' : 'Registrar Solicitud Entrega'}</button>
            </form>
          </div>
        </div>
      )}
    </div>

  );
};

const styles = {
 
  rightContainer: {
    gridColumn: '2',        
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,             
    height: '100vh',
    width: '100%',
    overflowY: 'auto',       
  },
  mainContent: {
    flex: 1,                  
    display: 'flex',
    width: '100%',
    padding: '40px',
    boxSizing: 'border-box',
  },
  leftSide: { flex: '1', minWidth: '25%', background: '#055882', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' },
  rightSide: { flex: '0 0 65%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', overflowY: 'auto' },
  loginCard: { width: '100%', maxWidth: '420px', padding: '0 20px' },
  loginHeader: { textAlign: 'center', marginBottom: '32px' },

  gradientFrame: {
    padding: '3px',
    background: 'linear-gradient(135deg, #0A4D68 0%, #05C3DD 100%)',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(10, 77, 104, 0.1)',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px', 
    background: '#ffffff',
    padding: '30px 24px',
    borderRadius: '17px',
  },

  forgotPasswordContainer: {
    textAlign: 'center',
    marginTop: '-8px', 
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
    justifyContent: 'center', 
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
    padding: '12px 24px', 
    borderRadius: '10px',
    fontSize: '15px', 
    fontWeight: '700',
    fontFamily: "'Syne', sans-serif",
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(10, 77, 104, 0.2)',
    width: 'auto', 
    minWidth: '160px', 
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
    gridTemplateColumns: '0px 1fr',
    minHeight: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    backgroundColor: '#f1f5f9',
  },
 
  loginContainer: {
    flex: '1',
    display: 'flex',
  },

  iconBigContainer: {
    position: 'relative', 
    width: '300px',      
    height: '200px',     
    margin: '0 auto',    
  },
  floatingBigIcon: {
    position: 'absolute', 
    transition: 'all 0.3s ease',
  },
  iconBigStyle: {
    marginTop: '100px',
    width: '250px',       
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
    width: '100%',            
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
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
  
  scrollWrapper: {
    width: '100%',
    overflowX: 'auto',       
    maxHeight: '60vh',       
  },

 
  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 10, 
    backgroundColor: '#f8fafc', 
  },
  tableHeader: {
    position: 'sticky', 
    top: 0,
    padding: '20px 24px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    backgroundColor: '#f8fafc', 
    borderBottom: '2px solid #e2e8f0',
  },
  /*
  navbarWrapper: {
    width: '100%',  // Force the navbar to stretch
    zIndex: 100,    // Ensure it stays on top
  },
  */
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
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '180px',           
    marginBottom: '24px',  
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
    marginLeft: 'auto', 
  },
   editEmoji: {
    cursor: 'pointer',
    fontSize: '18px',
    filter: 'drop-shadow(0px 0px 2px rgba(0,0,255,0.3))', 
    transition: 'transform 0.2s',
  },
  deleteEmoji: {
    cursor: 'pointer',
    fontSize: '18px',
    filter: 'sepia(1) saturate(10000%) hue-rotate(345deg)', 
    transition: 'transform 0.2s',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000, 
  },
  modalContent: {
    background: 'white',
    padding: '30px',
    borderRadius: '20px',
    width: '600px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    animation: 'emerge 0.3s ease-out', 
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
    gridTemplateColumns: '1fr 1fr', 
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

export default EntregasPage;

