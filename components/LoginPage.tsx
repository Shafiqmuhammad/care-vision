
import React, { useState } from 'react';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { LogoIcon } from './icons/LogoIcon';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('your.username');
  const [password, setPassword] = useState('..........');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center items-center mb-6">
          <LogoIcon className="h-10 w-10 text-[#00A79D]" />
          <span className="text-3xl font-bold text-slate-800 ml-3 bg-[#00A79D] text-white px-3 py-1 rounded-md">Care Vision</span>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-slate-800 text-center">Welcome back</h2>
          <p className="text-slate-500 text-center mt-2 mb-8">Please sign in to your account</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block text-slate-600 text-sm font-medium mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:outline-none transition"
                placeholder="your.username"
              />
            </div>
            <div className="mb-6">
              <label className="block text-slate-600 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:outline-none transition"
                placeholder="••••••••"
              />
              <div className="text-right mt-2">
                <a href="#" className="text-sm text-[#00A79D] hover:underline">Forgot your password?</a>
              </div>
            </div>
            <p className="text-center text-slate-500 mb-4 text-sm">For demo purposes, select a role to log in:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                 <button onClick={() => login(UserRole.ADMIN)} className="w-full bg-[#00A79D] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#00897b] transition duration-300">
                    Admin
                </button>
                 <button onClick={() => login(UserRole.MANAGEMENT)} className="w-full bg-[#00A79D] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#00897b] transition duration-300">
                    Management
                </button>
                 <button onClick={() => login(UserRole.DOCTOR)} className="w-full bg-[#00A79D] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#00897b] transition duration-300">
                    Doctor
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
