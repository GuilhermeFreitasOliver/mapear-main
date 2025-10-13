import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { UIProvider } from './contexts/UIContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <UIProvider>
        <App />
      </UIProvider>
    </AuthProvider>
  </StrictMode>,
)
