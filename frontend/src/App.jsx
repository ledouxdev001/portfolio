import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import PortfolioPage from './pages/PortfolioPage';
import LoginPage from './pages/LoginPage';
import './styles/global.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#f0ede6',
              border: '1px solid #2a2a2a',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              letterSpacing: '0.5px',
            },
            success: { iconTheme: { primary: '#e8ff47', secondary: '#000' } },
            error:   { iconTheme: { primary: '#ff6b35', secondary: '#fff' } },
          }}
        />
        <Routes>
          <Route path="/"      element={<PortfolioPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
