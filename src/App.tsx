import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CallsPage from './pages/CallsPage';
import QueuePage from './pages/QueuePage';
import AgentsPage from './pages/AgentsPage';
import SettingsPage from './pages/SettingsPage';
import CallInterface from './components/CallInterface';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

// New pages
import AboutUs from './pages/AboutUs';
import InvestorRelations from './pages/InvestorRelations';
import Careers from './pages/Careers';
import SupportCenter from './pages/SupportCenter';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import GDPRCompliance from './pages/GDPRCompliance';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoginPage />
      </Box>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/calls" element={<CallsPage />} />
        <Route path="/queue" element={<QueuePage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* Corporate Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/investors" element={<InvestorRelations />} />
        <Route path="/careers" element={<Careers />} />
        
        {/* Support & Legal Pages */}
        <Route path="/support" element={<SupportCenter />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/gdpr" element={<GDPRCompliance />} />
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <CallInterface />
    </Layout>
  );
}

export default App;

