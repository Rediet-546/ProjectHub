import { useState } from 'react';
import { useLogin, useRegister } from '../features/auth/authApi.js';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate({ email: formData.email, password: formData.password });
    } else {
      registerMutation.mutate(formData);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;
  const error = loginMutation.error?.response?.data?.message || registerMutation.error?.response?.data?.message;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <Input
                name="name"
                type="text"
                label="Full Name"
                required
                onChange={onChange}
                value={formData.name}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            )}
            <Input
              name="email"
              type="email"
              label="Email address"
              required
              onChange={onChange}
              value={formData.email}
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <Input
              name="password"
              type="password"
              label="Password"
              required
              onChange={onChange}
              value={formData.password}
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <Button type="submit" disabled={isLoading} className="group relative w-full">
              {isLoading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </Button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="font-medium text-blue-600 hover:text-blue-500"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;