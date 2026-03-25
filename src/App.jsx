import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { Compare } from './pages/Compare';
import { AtRisk } from './pages/AtRisk';
import { Leaderboard } from './pages/Leaderboard';
import { Login } from './pages/Login';
import { StudentProfile } from './pages/StudentProfile';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
<<<<<<< HEAD
=======
import { NotificationProvider } from './context/NotificationContext';
import { UploadData } from './pages/UploadData';
>>>>>>> master
import './styles/global.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="student/:id" element={<StudentProfile />} />
        <Route path="compare" element={<Compare />} />
        <Route path="at-risk" element={<AtRisk />} />
        <Route path="leaderboard" element={<Leaderboard />} />
<<<<<<< HEAD
=======
        <Route path="upload" element={<UploadData />} />
>>>>>>> master
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
<<<<<<< HEAD
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
=======
        <NotificationProvider>
          <AuthProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AuthProvider>
        </NotificationProvider>
>>>>>>> master
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;



