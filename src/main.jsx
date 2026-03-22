import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/accesibilidad.css'
import App from './App.jsx'
import { AccessibilityProvider } from './context/ContextoAccesibilidad'
import WidgetAccesibilidad from './components/accesibilidad/WidgetAccesibilidad'
import ChatBotAsistente from './components/chatbot/ChatBotAsistente'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccessibilityProvider>
      <App />
      <WidgetAccesibilidad />
      <ChatBotAsistente />
    </AccessibilityProvider>
  </StrictMode>,
)
