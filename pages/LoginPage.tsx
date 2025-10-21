import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    }
  };
  
  const inputStyles = "mt-1 block w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500";

  return (
    <div className="flex justify-center items-center py-10">
      <div className="bg-slate-800/50 backdrop-blur-md rounded-lg shadow-xl w-full max-w-md p-8 border border-slate-700/50">
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-100">Administrator Login</h2>
        <div className="text-sm bg-yellow-900/50 border border-sky-700/50 text-yellow-200 p-3 rounded-md mb-6">
            <p>This login is for administrators only.</p>
            <p><strong>Hint:</strong> username: admin / password: password</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-300">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputStyles}
              required
            />
          </div>
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-slate-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputStyles}
              required
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-600"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;