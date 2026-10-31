import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import FarmerMascot from './components/FarmerMascot';
import InteractiveCanvas3D from './components/InteractiveCanvas3D';
import FrontPage from './pages/FrontPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import FarmerPortal from './pages/FarmerPortal';
import WarehousePortal from './pages/WarehousePortal';
import BuyerPortal from './pages/BuyerPortal';
import AdminPortal from './pages/AdminPortal';
import ComputerVisionScanner from './components/ComputerVisionScanner';
import NotFound from './pages/NotFound';

function AppContent({ lang, setLang, theme, toggleTheme }) {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Standalone pages: Landing FrontPage ('/'), LoginGateway ('/login'), and Computer Vision ('/vision')
  const isStandalonePage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/vision';

  return (
    <div className={`app-root ${isStandalonePage ? 'app-standalone' : 'app-layout-sidebar'} ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar is rendered only on internal portals / overview */}
      {!isStandalonePage && (
        <Sidebar 
          lang={lang} 
          setLang={setLang} 
          theme={theme} 
          toggleTheme={toggleTheme}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      )}

      {/* Main Viewport */}
      <div className={`app-main-viewport ${isStandalonePage ? 'app-viewport-full' : (isSidebarCollapsed ? 'sidebar-collapsed-viewport' : '')}`}>
        <Routes>
          {/* Step 1: Front Nature Web Page & Informational Story */}
          <Route path="/" element={<FrontPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
          
          {/* Step 2: Role-Based Authentication & Gateway */}
          <Route path="/login" element={<LoginPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
          
          {/* Dedicated AI Computer Vision Crop Quality Scanner */}
          <Route path="/vision" element={<ComputerVisionScanner lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/scanner" element={<Navigate to="/vision" replace />} />

          {/* System Overview & Interactive 3D Ecosystem */}
          <Route path="/overview" element={<LandingPage lang={lang} />} />

          {/* 4 Dedicated Portals */}
          <Route path="/farmer" element={<FarmerPortal lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/warehouse" element={<WarehousePortal lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/buyer" element={<BuyerPortal lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/admin" element={<AdminPortal lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* Fallback Aliases */}
          <Route path="/upload" element={<Navigate to="/farmer" replace />} />
          <Route path="/marketplace" element={<Navigate to="/buyer" replace />} />
          <Route path="/ledger" element={<Navigate to="/admin" replace />} />
          <Route path="/register" element={<Navigate to="/login" replace />} />
          
          {/* Custom 404 Error Page */}
          <Route path="*" element={<NotFound lang={lang} />} />
        </Routes>
      </div>

      {/* Global AI Farmer Mascot ("Kisan Mitra") for contextual voice guidance */}
      {!isStandalonePage && <FarmerMascot lang={lang} />}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState('hi'); // 'hi' or 'en'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('miligrams_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('miligrams_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Interactive 3D Star & Node Constellation Canvas */}
        <InteractiveCanvas3D />

        <AppContent 
          lang={lang} 
          setLang={setLang} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

