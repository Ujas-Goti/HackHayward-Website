/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { CountdownProvider } from './context/CountdownContext.jsx'
import Home2026 from './pages/2026/Home2026.jsx'

const SponsorUs2026 = lazy(() => import('./pages/2026/SponsorUs2026.jsx'))
const Dashboard2025 = lazy(() => import('./pages/Dashboard2025.jsx'))
const Dashboard2026 = lazy(() => import('./pages/Dashboard2026.jsx'))
const Home2025 = lazy(() => import('./pages/2025/Home2025.jsx'))

const PageLoader = () => (
  <div className="min-h-screen bg-[#1A2773] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-[#B794D4] border-t-transparent rounded-full animate-spin"></div>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CountdownProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home2026 />} />
            <Route path="/sponsor-us" element={<SponsorUs2026 />} />
            <Route path="/live" element={<Dashboard2025 />} />
            <Route path="/live-2026" element={<Dashboard2026 />} />
            <Route path="/past-years" element={<Home2025 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CountdownProvider>
  </React.StrictMode>,
)
