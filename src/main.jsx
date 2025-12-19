import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home2026 from './pages/2026/Home2026.jsx'
import Dashboard2025 from './pages/Dashboard2025.jsx'
import Dashboard2026 from './pages/Dashboard2026.jsx'
import Home2025 from './pages/2025/Home2025.jsx'
import './index.css'
import { CountdownProvider } from './context/CountdownContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CountdownProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home2026 />} />
          <Route path="/live" element={<Dashboard2025 />} />
          <Route path="/live-2026" element={<Dashboard2026 />} />
          <Route path="/past-years" element={<Home2025 />} />
        </Routes>
      </BrowserRouter>
    </CountdownProvider>
  </React.StrictMode>,
)
