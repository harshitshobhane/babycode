import React from 'react';
import { motion } from 'framer-motion';
import AuthForm from '@/components/ui/auth-form';

const Login = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/95"
    >
      <div className="w-full max-w-md p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </motion.div>
        
        <AuthForm mode="login" />
      </div>
    </motion.div>
  );
};

export default Login;
