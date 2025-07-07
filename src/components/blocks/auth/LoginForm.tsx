import React, { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormLabel, FormSection } from '@/components/ui/form';
import { useAuth } from '@/hooks/auth/useAuth';
import { useAuthStore } from '@/store/use-auth-store';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { isLoading } = useAuthStore();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    try {
      await login.mutateAsync({ email, password });
    } catch (err) {
      console.error('Login form error:', err);
      // Error message is handled by the mutation's onError
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm bg-destructive/15 text-destructive rounded-md">
          {error}
        </div>
      )}
      
      <FormSection>
        <div className="space-y-2">
          <FormLabel htmlFor="email">Email address</FormLabel>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              placeholder="Enter your email"
              required
              disabled={isLoading || login.isPending}
            />
            <Mail 
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" 
              strokeWidth={1.5} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <FormLabel htmlFor="password">Password</FormLabel>
          <div className="relative">
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              placeholder="Enter your password"
              required
              disabled={isLoading || login.isPending}
            />
            <Lock 
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" 
              strokeWidth={1.5} 
            />
          </div>
        </div>
      </FormSection>

      <Button
        type="submit"
        disabled={isLoading || login.isPending}
        className="w-full h-11"
      >
        {isLoading || login.isPending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" strokeWidth={1.5} />
            <span>Signing in...</span>
          </>
        ) : (
          <span>Sign in</span>
        )}
      </Button>
    </Form>
  );
}; 