import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'
import { LandingRedesign } from './screens/LandingRedesign.tsx'
import { MarcasRedesign } from './screens/MarcasRedesign.tsx'
import { AppPrototype } from './screens/AppPrototype.tsx'

const path = window.location.pathname;

let Root: React.ComponentType;
if (path.startsWith('/original')) {
  Root = App;
} else if (path.startsWith('/marcas')) {
  Root = MarcasRedesign;
} else if (path.startsWith('/app')) {
  Root = AppPrototype;
} else {
  Root = LandingRedesign;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
