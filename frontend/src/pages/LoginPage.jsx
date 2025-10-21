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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center text-gray-800">
          {isLogin ? 'Login to ProjectHub' : 'Register for ProjectHub'}
        </h3>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mt-4">
              <label className="block" htmlFor="name">Name</label>
              <Input type="text" name="name" onChange={onChange} value={formData.name} required />
            </div>
          )}
          <div className="mt-4">
            <label className="block" htmlFor="email">Email</label>
            <Input type="email" name="email" onChange={onChange} value={formData.email} required />
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="password">Password</label>
            <Input type="password" name="password" onChange={onChange} value={formData.password} required />
          </div>
          <div className="flex items-baseline justify-between">
            <Button type="submit" className="w-full mt-4">
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </div>
          { (loginMutation.isError || registerMutation.isError) && (
            <p className="mt-2 text-red-500 text-center">
              {loginMutation.error?.message || registerMutation.error?.message}
            </p>
          )}
        </form>
        <div className="mt-6 text-grey-dark">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register' : 'Login'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;