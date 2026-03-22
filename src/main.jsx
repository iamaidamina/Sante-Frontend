import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/accessibility.css'
import App from './App.jsx'
import { AccessibilityProvider } from './context/AccessibilityContext'
import AccessibilityWidget from './components/accessibility/AccessibilityWidget'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccessibilityProvider>
      <App />
      <AccessibilityWidget />
    </AccessibilityProvider>
  </StrictMode>,
)
