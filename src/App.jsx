import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';

// Sample student data 
const studentsData = [
  { id: 1, name: 'Ana Rodríguez', gender: 'Femenino', problemSolving: 85, criticalThinking: 92, creativity: 78, overall: 85 },
  { id: 2, name: 'Carlos Méndez', gender: 'Masculino', problemSolving: 78, criticalThinking: 85, creativity: 88, overall: 84 },
  { id: 3, name: 'María García', gender: 'Femenino', problemSolving: 92, criticalThinking: 88, creativity: 85, overall: 88 },
  { id: 4, name: 'Diego López', gender: 'Masculino', problemSolving: 88, criticalThinking: 78, creativity: 92, overall: 86 },
  { id: 5, name: 'Isabella Torres', gender: 'Femenino', problemSolving: 95, criticalThinking: 90, creativity: 87, overall: 91 },
  { id: 6, name: 'Santiago Ruiz', gender: 'Masculino', problemSolving: 82, criticalThinking: 87, creativity: 85, overall: 85 },
  { id: 7, name: 'Valentina Cruz', gender: 'Femenino', problemSolving: 90, criticalThinking: 85, creativity: 92, overall: 89 },
  { id: 8, name: 'Mateo Silva', gender: 'Masculino', problemSolving: 75, criticalThinking: 82, creativity: 78, overall: 78 },
  { id: 9, name: 'Sofía Morales', gender: 'Femenino', problemSolving: 88, criticalThinking: 94, creativity: 90, overall: 91 },
  { id: 10, name: 'Andrés Vargas', gender: 'Masculino', problemSolving: 91, criticalThinking: 88, creativity: 83, overall: 87 },
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

        {/* Dashboard Route - Passing the data as a prop */}
         <Route exact path="/registro" element={<RegistrationPage />} />

        {/* Catch-all: Redirect unknown routes back to Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;