import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  register: (data: RegisterData) => Promise<boolean>;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  abhaId?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: User[] = [
  { id: 'U001', name: 'Ramesh Kumar', email: 'patient@qbharat.ai', phone: '9876543210', role: 'patient', abhaId: 'ABHA-1234-5678' },
  { id: 'U002', name: 'Staff User', email: 'staff@qbharat.ai', phone: '9876543211', role: 'reception' },
  { id: 'U003', name: 'Dr. Sharma', email: 'doctor@qbharat.ai', phone: '9876543212', role: 'doctor', department: 'General Medicine' },
  { id: 'U004', name: 'Pharma User', email: 'pharma@qbharat.ai', phone: '9876543213', role: 'pharmacist' },
  { id: 'U005', name: 'District Admin', email: 'admin@qbharat.ai', phone: '9876543214', role: 'district_admin' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = useCallback(async (email: string, _password: string, role?: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));

    await new Promise(resolve => setTimeout(resolve, 800));

    const user = MOCK_USERS.find(u => u.email === email) ||
      (email.includes('@') ? {
        id: `U${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '9999999999',
        role: (role as User['role']) || 'patient',
      } : null);

    if (user) {
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    }

    setState(prev => ({ ...prev, isLoading: false }));
    return false;
  }, []);

  const logout = useCallback(() => {
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: `U${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'patient',
      abhaId: data.abhaId,
    };

    setState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
    return true;
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
