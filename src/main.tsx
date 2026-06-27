import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'
import { LandingRedesign } from './screens/LandingRedesign.tsx'

const path = window.location.pathname;
const Root = path.startsWith('/original') ? App : LandingRedesign;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
