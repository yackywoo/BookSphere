// booksphere/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signinUser, signupUser, verifyUserToken } from '../lib/api-auth';

type User = {
  _id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; token?: string; user?: User }>;
  register: (payload: { email: string; password: string; firstName: string; lastName: string }) => Promise<any>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const res = await verifyUserToken(token);
          if (res?.success && res.user) {
            setUser(res.user);
          } else {
            await AsyncStorage.removeItem('token');
            setUser(null);
          }
        }
      } catch (err) {
        console.warn('Auth init err', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

<<<<<<< HEAD
  const checkAuthState = async () => {
    try {
      setIsLoading(true);
      const token = await SecureStore.getItemAsync('authToken');
      
      if (token) {
        // Verify token with backend
        const response = await fetch(`http://localhost:5000/api/auth/verify`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        } else {
          // Token is invalid, clear it
          await SecureStore.deleteItemAsync('authToken');
        }
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      await SecureStore.deleteItemAsync('authToken');
    } finally {
      setIsLoading(false);
=======
  const login = async (email: string, password: string) => {
    const res = await signinUser(email, password);
    if (res?.success && res.token) {
      await AsyncStorage.setItem('token', res.token);
      setUser(res.user ?? null);
>>>>>>> 1eb93055114a9bc0f4f289f68542009ea1ebe754
    }
    return res;
  };

<<<<<<< HEAD
  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await fetch(`http://localhost:5000/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        await SecureStore.setItemAsync('authToken', data.token);
        setUser(data.user);
        return { success: true, message: data.message };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please check your connection.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await fetch(`http://localhost:5000/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        await SecureStore.setItemAsync('authToken', data.token);
        setUser(data.user);
        return { success: true, message: data.message };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please check your connection.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
=======
  const register = async (payload: { email: string; password: string; firstName: string; lastName: string }) => {
    const res = await signupUser(payload);
    if (res?.success && res.token) {
      await AsyncStorage.setItem('token', res.token);
      setUser(res.user ?? null);
>>>>>>> 1eb93055114a9bc0f4f289f68542009ea1ebe754
    }
    return res;
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, register, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
