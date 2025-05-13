
import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

// Create a default user account on initialization
const DEFAULT_EMAIL = "admin@example.com";
const DEFAULT_PASSWORD = "password123";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  mockLogin: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Default user credentials - exported so they can be used in login form
export const MOCK_EMAIL = DEFAULT_EMAIL;
export const MOCK_PASSWORD = DEFAULT_PASSWORD;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Create default user on first load if it doesn't exist
  useEffect(() => {
    const createDefaultUser = async () => {
      try {
        // Try to sign in first to check if the account exists
        await signInWithEmailAndPassword(auth, DEFAULT_EMAIL, DEFAULT_PASSWORD);
        console.log("Default user exists, skipping creation");
      } catch (error: any) {
        // If error code is user not found, create the user
        if (error.code === "auth/user-not-found") {
          try {
            await createUserWithEmailAndPassword(auth, DEFAULT_EMAIL, DEFAULT_PASSWORD);
            console.log("Default user created successfully");
          } catch (createError) {
            console.error("Error creating default user:", createError);
          }
        } else {
          console.error("Error checking for default user:", error);
        }
      } finally {
        // Sign out after checking/creating
        await signOut(auth);
      }
    };

    createDefaultUser();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Mock login function
  const mockLogin = () => {
    login(DEFAULT_EMAIL, DEFAULT_PASSWORD)
      .catch((error) => {
        console.error("Mock login failed:", error);
        toast({
          variant: "destructive",
          title: "Mock login failed",
          description: "The test account login failed. Please try again.",
        });
      });
  };

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
      await signInWithEmailAndPassword(auth, email, password);
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
        title: "Logout successful",
        description: "You have been logged out.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: error.message,
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    mockLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
