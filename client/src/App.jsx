import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import FarmerMascot from './components/FarmerMascot';
import InteractiveCanvas3D from './components/InteractiveCanvas3D';
import FrontPage from './pages/FrontPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import FarmerPortal from './pages/FarmerPortal';
import FarmerProfilePage from './pages/FarmerProfilePage';
import CropRegistrationPage from './pages/CropRegistrationPage';
import MyCropsPage from './pages/MyCropsPage';
import WarehousePortal from './pages/WarehousePortal';
import WarehouseVerificationPage from './pages/WarehouseVerificationPage';
import BuyerPortal from './pages/BuyerPortal';
import BuyerCropDetailPage from './pages/BuyerCropDetailPage';
import AdminPortal from './pages/AdminPortal';
import CropDetailPage from './pages/CropDetailPage';
import CropTrackingTimelinePage from './pages/CropTrackingTimelinePage';
import FarmistorPage from './pages/FarmistorPage';
import FarmistorResultsPage from './pages/FarmistorResultsPage';
import LedgerExplorerPage from './pages/LedgerExplorerPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';

function AppContent({ lang, setLang, theme, toggleTheme }) {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Standalone pages without sidebar: Landing FrontPage ('/'), Login ('/login'), Role Selector ('/role-select')
  const isStandalonePage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/role-select';

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
          {/* 1. Landing Page (Editorial Front Page) */}
          <Route path="/" element={<FrontPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
          
          {/* 2. Login / Signup Gateway */}
          <Route path="/login" element={<LoginPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* 3. Sovereign Role Selection Hub */}
          <Route path="/role-select" element={<RoleSelectionPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* System Overview */}
          <Route path="/overview" element={<LandingPage lang={lang} />} />

          {/* 4. Farmer Dashboard */}
          <Route path="/farmer" element={<FarmerPortal lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
          
          {/* 5. Farmer Profile */}
          <Route path="/farmer/profile" element={<FarmerProfilePage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* 6. Crop Registration */}
          <Route path="/farmer/register-crop" element={<CropRegistrationPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/crops/new" element={<CropRegistrationPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* 7. My Crops */}
          <Route path="/farmer/crops" element={<MyCropsPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/farmer/my-crops" element={<MyCropsPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* 8. Crop Details */}
          <Route path="/crop/:id" element={<CropDetailPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* 9. Crop Tracking Timeline */}
          <Route path="/crop/:id/trace" element={<CropTrackingTimelinePage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* 10. Digital Ledger Explorer */}
          <Route path="/ledger" element={<LedgerExplorerPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* 11. Warehouse Dashboard */}
          <Route path="/warehouse" element={<WarehousePortal lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* 12. Warehouse Crop Verification */}
          <Route path="/warehouse/verify" element={<WarehouseVerificationPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/warehouse/verify/:id" element={<WarehouseVerificationPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* 13. Buyer Marketplace */}
          <Route path="/marketplace" element={<BuyerPortal lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} initialView="market" />} />

          {/* 14. Buyer Dashboard */}
          <Route path="/buyer" element={<BuyerPortal lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} initialView="dashboard" />} />

          {/* 15. Buyer Crop Details */}
          <Route path="/buyer/crop/:id" element={<BuyerCropDetailPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/marketplace/crop/:id" element={<BuyerCropDetailPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* 16. Farmistor Crop Planner */}
          <Route path="/farmistor" element={<FarmistorPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* 17. Crop Recommendation Results */}
          <Route path="/farmistor/results" element={<FarmistorResultsPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* 18. Notifications */}
          <Route path="/notifications" element={<NotificationsPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* 19. Admin Dashboard */}
          <Route path="/admin" element={<AdminPortal lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* 20. Settings */}
          <Route path="/settings" element={<SettingsPage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />

          {/* Aliases & Fallbacks */}
          <Route path="/upload" element={<Navigate to="/farmer/register-crop" replace />} />
          <Route path="/register" element={<Navigate to="/login" replace />} />
          
          {/* Custom 404 Error Page */}
          <Route path="*" element={<NotFound lang={lang} />} />
        </Routes>
      </div>

      {/* Global AI Farmer Mascot ("Kisan Mitra") for contextual guidance */}
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
