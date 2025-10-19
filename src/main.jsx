import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
