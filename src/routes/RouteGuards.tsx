import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface GuardProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<GuardProps> = ({ children }) => {
  const { token, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!token) {
    // Redirect to home and trigger login modal open using query params
    return <Navigate to="/?login=true" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const GuestRoute: React.FC<GuardProps> = ({ children }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

interface RoleRouteProps extends GuardProps {
  allowedRoles: string[];
}

export const RoleRoute: React.FC<RoleRouteProps> = ({ children, allowedRoles }) => {
  const { user, role, token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!token || !user || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
