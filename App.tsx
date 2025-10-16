
import React, { useState, createContext, useContext, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from './types';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import ManagementDashboard from './components/ManagementDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import Layout from './components/Layout';

interface AuthContextType {
  userRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.NONE);

  const authContextValue = useMemo(() => ({
    userRole,
    login: (role: UserRole) => setUserRole(role),
    logout: () => setUserRole(UserRole.NONE),
  }), [userRole]);

  return (
    <AuthContext.Provider value={authContextValue}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={userRole === UserRole.NONE ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/" element={userRole !== UserRole.NONE ? <MainDashboard /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

const MainDashboard: React.FC = () => {
  const { userRole } = useAuth();

  const renderDashboard = () => {
    switch (userRole) {
      case UserRole.ADMIN:
        return <AdminDashboard />;
      case UserRole.MANAGEMENT:
        return <ManagementDashboard />;
      case UserRole.DOCTOR:
        return <DoctorDashboard />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return <Layout>{renderDashboard()}</Layout>;
};

export default App;
