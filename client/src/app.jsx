import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import { SocketProvider } from './context/socketcontext';
import ProtectedRoute from './components/common/protectedroute';

import LandingPage from './pages/landingpage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import OnboardingPage from './pages/onboardingpage';
import DashboardPage from './pages/dashboardpage';
import QuizPage from './pages/quizpage';
import ProgressPage from './pages/progresspage';
import RoadmapPage from './pages/roadmappage';
import PeersPage from './pages/peerspage';

const AppRoutes = () => {
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  })();

  return (
    <SocketProvider token={user?.token}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
          <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
          <Route path="/peers" element={<ProtectedRoute><PeersPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </SocketProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
