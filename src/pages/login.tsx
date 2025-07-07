import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/use-auth-store';
import { LoginForm, AuthLayout, BrandLogo, AuthCard } from '@/components/blocks/auth';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthLayout>
      <BrandLogo 
        title="Agentos UI" 
        subtitle="Welcome back! Sign in to continue" 
      />
      
      <AuthCard
        title="Sign in"
        description="Enter your email and password to access your account"
      >
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage; 