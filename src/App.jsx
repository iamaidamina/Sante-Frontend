import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import MedicamentosPage from './MedicamentosPage';
import EntregasPage from './EntregasPage';
import CitasPage from './CitasPage';

// Sample student data 
const studentsData = [
  { id: 1,medicamento: "Losartán 50 mg",domiciliario:"Valentina Rojas",compra:"Drogueria San Jorge",fecha: 'Martes, 14 de Marzo del 2026',profesional: 'Andrés Vargas',especialidad: 'Cardiología',lugar: 'Clinica Imbanaco',name: 'Ana Rodríguez', gender: 'Activo',estado: 'Pendiente', frecuencia: '2:00',almacenamiento: 'Cajón Habitación',problemSolving: 85, criticalThinking: 92, creativity: 78, overall: 85 },
  { id: 2, medicamento: "Atorvastatina 40 mg",domiciliario:"Thiago Martínez",compra:"D1",fecha: 'Martes, 15 de Abril del 2026',profesional: 'Ana Rodríguez',especialidad: 'Dermatología',lugar: 'Clinica Nuestra',name: 'Carlos Méndez', gender: 'Inactivo', estado: 'Entregado',frecuencia: '00:00',almacenamiento: 'Nevera',problemSolving: 78, criticalThinking: 85, creativity: 88, overall: 84 },
  { id: 3, medicamento: "Ibuprofeno 400 mg",domiciliario:"Damián Vega",compra:"Drogueria Clinica Imbanaco",fecha: 'Martes, 13 de Junio del 2026',profesional: 'Mateo Silva',especialidad: 'Urología',lugar: 'Clinica Amiga',name: 'María García', gender: 'Activo', estado: 'Pendiente',frecuencia: '3:00',almacenamiento: 'Cajón Botiquín',problemSolving: 92, criticalThinking: 88, creativity: 85, overall: 88 },
  { id: 4, medicamento: "Amoxicilina 500 mg",domiciliario:"Valentina Rojas",compra:"Drogas la Rebaja",fecha: 'Martes, 14 de Marzo del 2026',profesional: 'Ana Rodríguez',especialidad: 'Pediatría',lugar: 'Clinica Valle del Lili',name: 'Diego López', gender: 'Inactivo', estado: 'Entregado',frecuencia: '5:00',almacenamiento: 'Cajón Habitación',problemSolving: 88, criticalThinking: 78, creativity: 92, overall: 86 },
  { id: 5, medicamento: "Furosemida 40 mg",domiciliario:"Thiago Martínez",compra:"D1",fecha: 'Martes, 14 de Marzo del 2026',profesional: 'Mateo Silva',especialidad: 'Cardiología',lugar: 'Confenalco Cambulos',name: 'Isabella Torres', gender: 'Activo', estado: 'Pendiente',frecuencia: '00:00',almacenamiento: 'Cajón Habitación',problemSolving: 95, criticalThinking: 90, creativity: 87, overall: 91 },
  { id: 6, medicamento: "Losartán 50 mg",domiciliario:"Valentina Rojas",compra:"Farmacias la fortuna",fecha: 'Martes, 14 de Marzo del 2026',profesional: 'Isabella Torres',especialidad: 'Cardiología',lugar: 'Clinica Nueva EPS',name: 'Santiago Ruiz', gender: 'Inactivo', estado: 'Entregado',frecuencia: '00:00',almacenamiento: 'Cajón Habitación',problemSolving: 82, criticalThinking: 87, creativity: 85, overall: 85 },
  { id: 7, medicamento: "Amlodipino 10 mg",domiciliario:"Damián Vega",compra:"Almacenes Exito",fecha: 'Martes, 14 de Marzo del 2026',profesional: 'Ana Rodríguez',especialidad: 'Cardiología',lugar: 'Clinica Sura',name: 'Valentina Cruz', gender: 'Activo', estado: 'Pendiente',frecuencia: '00:00',almacenamiento: 'Cajón Habitación',problemSolving: 90, criticalThinking: 85, creativity: 92, overall: 89 },
  { id: 8, medicamento: "Atorvastatina 40 mg",domiciliario:"Zoe Morales",compra:"Carulla",fecha: 'Martes, 14 de Marzo del 2026',profesional: 'Isabella Torres',especialidad: 'Cardiología',lugar: 'Clinica Imbanaco',name: 'Mateo Silva', gender: 'Inactivo', estado: 'Entregado',frecuencia: '00:00',almacenamiento: 'Cajón Habitación',problemSolving: 75, criticalThinking: 82, creativity: 78, overall: 78 },
  { id: 9, medicamento: "Enalapril 20 mg",domiciliario:"Abril Mendoza",compra:"D1",fecha: 'Martes, 14 de Marzo del 2026',profesional: 'Isabella Torres',especialidad: 'Cardiología',lugar: 'Clinica Imbanaco',name: 'Sofía Morales', gender: 'Activo', estado: 'Pendiente',frecuencia: '00:00',almacenamiento: 'Cajón Habitación',problemSolving: 88, criticalThinking: 94, creativity: 90, overall: 91 },
  { id: 10, medicamento: "Atorvastatina 40 mg",domiciliario:"Julieta Paredes",compra:"D1",fecha: 'Martes, 14 de Marzo del 2026',profesional: 'Ana Rodríguez',especialidad: 'Cardiología',lugar: 'Clinica Imbanaco',name: 'Andrés Vargas', gender: 'Inactivo',  estado: 'Entregado',frecuencia: '00:00',almacenamiento: 'Cajón Habitación',problemSolving: 91, criticalThinking: 88, creativity: 83, overall: 87 },
];

export function App() {
  // Global styles application
  React.useEffect(() => {
    const style = document.documentElement.style;
    const bodyStyle = document.body.style;
    
    style.margin = style.padding = '0';
    style.height = style.width = '100%';
    bodyStyle.margin = bodyStyle.padding = '0';
    bodyStyle.height = bodyStyle.width = '100%';
    bodyStyle.overflowX = 'hidden';
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route exact path="/" element={<LoginPage />} />

    
         <Route exact path="/registro" element={<RegistrationPage />} />

       
        <Route 
          exact 
          path="/medicamentos" 
          element={<MedicamentosPage studentsData={studentsData} />} 
        />
        <Route 
          exact 
          path="/entregas" 
          element={<EntregasPage studentsData={studentsData} />} 
        />
        <Route 
          exact 
          path="/citas" 
          element={<CitasPage studentsData={studentsData} />} 
        />
        {/* Catch-all: Redirect unknown routes back to Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;