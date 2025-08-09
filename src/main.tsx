import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import GamesPage from './components/GamesPage.tsx' // Your component location
import PongPage from './games/PongPage.tsx' // Your component location
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/components" element={<GamesPage />} /> {/* Clean route */}
        {/* Individual game pages */}
        <Route path="/games/pong" element={<PongPage />} />
        
        {/* Catch-all route */}
      </Routes>
    </Router>
  </StrictMode>,
)