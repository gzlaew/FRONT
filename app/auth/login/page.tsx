"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  AtSymbolIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

const setTokenCookie = (token: string) => {
    const expirationTime = 365 * 10; // 10 years
    Cookies.set('token', token, { expires: expirationTime });
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const emailQuery = queryParams.get('email');
      const passwordQuery = queryParams.get('password');

      if (emailQuery) {
          setEmail(emailQuery);
      }
      if (passwordQuery) {
          setPassword(passwordQuery);
      }
  }, []);

  const handleLogin = async () => {
      try {
          const { data } = await axios.post('http://localhost:8000/api/login', {
              email,
              password,
          });

          if (data.token) {
              setTokenCookie(data.token);
              router.push('/dashboard');
          } else {
              setError('Invalid login credentials');
          }
      } catch (error) {
          setError('Failed to login. Please try again.');
          console.error('Login error:', error);
      }
  };

  const handleRegisterRedirect = () => {
      router.push('/register');
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                      <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
                      <div className="w-full">
                          <div>
                              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
                                  Email
                              </label>
                              <div className="relative">
                                  <input
                                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                      id="email"
                                      type="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      name="email"
                                      placeholder="Enter your email address"
                                      required
                                  />
                              </div>
                          </div>
                          <div className="mt-4">
                              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
                                  Password
                              </label>
                              <div className="relative">
                                  <input
                                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                      id="password"
                                      type="password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                      name="password"
                                      placeholder="Enter password"
                                      required
                                      minLength={6}
                                  />
                              </div>
                          </div>
                      </div>
                      {error && <div className="text-red-500 mt-2">{error}</div>}
                      <button
                          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex justify-center items-center"
                          onClick={handleLogin}
                      >
                          Log in
                      </button>
                      <button
                          className="mt-2 w-full text-blue-500 py-2 rounded-md hover:underline flex justify-center items-center"
                          onClick={handleRegisterRedirect}
                      >
                          Register
                      </button>
                  </div>
              </form>
          </div>
      </div>
  );
};

export default Login;
