import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';

// Default user credentials
const DEFAULT_EMAIL = "admin@example.com";
const DEFAULT_PASSWORD = "password123";

// Simple mock user type
interface User {
  email: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  mockLogin: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// Default user credentials - exported so they can be used in login form
export const MOCK_EMAIL = DEFAULT_EMAIL;
export const MOCK_PASSWORD = DEFAULT_PASSWORD;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      // If user is logged in and on auth pages, redirect to home
      if (user && (window.location.pathname === '/login' || window.location.pathname === '/signup')) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Mock login function
  const mockLogin = () => {
    login(DEFAULT_EMAIL, DEFAULT_PASSWORD)
      .then(() => {
        toast({
          title: "Mock login successful",
          description: "You have been logged in with the test account.",
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Mock login failed",
          description: error.message,
        });
      });
  };

  const signup = async (email: string, password: string) => {
    try {
      // Simple validation
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // Check if user already exists in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.some((user: any) => user.email === email)) {
        throw new Error("User already exists");
      }

      // Create new user
      const newUser = { email, id: Date.now().toString() };
      localStorage.setItem("users", JSON.stringify([...users, { email, password, id: newUser.id }]));
      
      // Don't auto-login on signup
      
      toast({
        title: "Account created",
        description: "You have successfully signed up!",
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message,
      });
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Simple validation
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // Check if credentials match default user
      if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
        const user = { email, id: "admin-id" };
        setUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        toast({
          title: "Login successful",
          description: "You are now logged in!",
        });
        return;
      }

      // Check stored users
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const loggedInUser = { email: user.email, id: user.id };
      setUser(loggedInUser);
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
      
      toast({
        title: "Login successful",
        description: "You are now logged in!",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    mockLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
