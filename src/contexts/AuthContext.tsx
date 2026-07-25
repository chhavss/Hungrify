import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../data/users';
import { authApi } from '../services/api/auth';

interface AuthContextType {
  user: User | null;
  role: User['role'] | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, passwordHash: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemoRole: (role: User['role']) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<User['role'] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('hungrify-user');
    const savedRole = localStorage.getItem('hungrify-role');
    const savedToken = localStorage.getItem('hungrify-token');

    if (savedUser && savedRole && savedToken) {
      setUser(JSON.parse(savedUser));
      setRole(savedRole as User['role']);
      setToken(savedToken);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, passwordHash: string) => {
    setIsLoading(true);
    try {
      const res = await authApi.login(email, passwordHash);
      if (res.success && res.user && res.token) {
        setUser(res.user);
        setRole(res.user.role);
        setToken(res.token);
        localStorage.setItem('hungrify-user', JSON.stringify(res.user));
        localStorage.setItem('hungrify-role', res.user.role);
        localStorage.setItem('hungrify-token', res.token);
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, error: res.error || 'Authentication failed' };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const loginAsDemoRole = async (selectedRole: User['role']) => {
    setIsLoading(true);
    const demoAccounts = await authApi.getDemoAccounts();
    const demoAcc = demoAccounts.find(u => u.role === selectedRole);
    if (demoAcc) {
      const mockToken = `mock-token-${demoAcc.id}-${Date.now()}`;
      setUser(demoAcc);
      setRole(selectedRole);
      setToken(mockToken);
      localStorage.setItem('hungrify-user', JSON.stringify(demoAcc));
      localStorage.setItem('hungrify-role', selectedRole);
      localStorage.setItem('hungrify-token', mockToken);
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setToken(null);
    localStorage.removeItem('hungrify-user');
    localStorage.removeItem('hungrify-role');
    localStorage.removeItem('hungrify-token');
  };

  return (
    <AuthContext.Provider value={{ user, role, token, isLoading, login, loginAsDemoRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
