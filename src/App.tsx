import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import LoadingScreen from '@/components/ui/loading-screen';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageTransition from "@/components/ui/page-transition";

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const StudentDetails = React.lazy(() => import('./pages/StudentDetails'));
const AddStudent = React.lazy(() => import('./pages/AddStudent'));
const AllStudents = React.lazy(() => import('./pages/AllStudents'));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const EditStudent = React.lazy(() => import('./pages/EditStudent'));

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Public Route component (redirects to home if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <AllStudents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/:id"
        element={
          <ProtectedRoute>
            <StudentDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/:id/edit"
        element={
          <ProtectedRoute>
            <EditStudent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-student"
        element={
          <ProtectedRoute>
            <AddStudent />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Navbar className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm" />
              <main className="flex-1">
                <Suspense fallback={<LoadingScreen />}>
                  <AnimatePresence mode="wait">
                    <AppRoutes />
                  </AnimatePresence>
                </Suspense>
              </main>
              <footer className="py-4 border-t bg-white/80 backdrop-blur-md">
                <div className="container mx-auto text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} StudentDash. All rights reserved.
                  <div className="mt-2 flex justify-center space-x-4">
                    <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Twitter</a>
                    <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">LinkedIn</a>
                    <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">GitHub</a>
                  </div>
                </div>
              </footer>
            </div>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
