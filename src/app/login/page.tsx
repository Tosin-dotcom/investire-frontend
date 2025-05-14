"use client"

import Head from "next/head";
import Image from 'next/image';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {useLogin} from "@/hooks/auth/useLogin";

export default function Home() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { mutate: login, isPending, } = useLogin()
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(formData, {
      onSuccess: () => {
        toast.success('Login successful!');
        setTimeout(() => router.push("/"), 2000);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.body || 'Login failed');
      }
    });
  }

  return (
      <>
        <Head>
          <title>Login | Investire</title>
          <meta name="description" content="Log in to your Investire account to access your financial dashboard"/>
        </Head>

        <div className="h-screen flex flex-col md:flex-row bg-gray-800">
          {/* Left side with image - covers full height */}
          <div className="hidden md:block md:w-1/2 relative overflow-hidden text-color">
            <div className="absolute inset-0">
              <Image
                  src="/images/auth/login.jpg"
                  alt="Investire platform"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
              />
            </div>

            {/* App name overlay */}
            <div className="absolute top-10 left-10 z-10">
          <span className="font-sans text-3xl font-bold pointer">
            <Link href="/">
              Investire
            </Link>
          </span>
            </div>

            {/* Minimal text overlay */}
            <div className="absolute bottom-10 left-10 right-10 z-10">
              <h2 className="text-3xl font-bold mb-3 font-[DM Sans]">Welcome Back</h2>
              <p className="text-xl opacity-90 font-[DM Sans]">Access your portfolio and continue your financial journey.</p>
            </div>
          </div>

          {/* Right side with form */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-10 bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Login to Your Account</h1>
                <p className="text-gray-600 mt-2">Access your Investire dashboard</p>
              </div>

              <div className="mb-6">
                {/* Social Login Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {/* Google */}
                  <button
                      type="button"
                      className="w-full cursor-pointer flex items-center justify-center gap-2 py-2 px-3 md:px-4 bg-gray-900 border border-gray-700 rounded-md text-xs md:text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="truncate">Google</span>
                  </button>

                  {/* Facebook */}
                  <button
                      type="button"
                      className="w-full flex cursor-pointer items-center justify-center gap-2 py-2 px-3 md:px-4 bg-gray-900 border border-gray-700 rounded-md text-xs md:text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                            fill="#1877F2"/>
                    </svg>
                    <span className="truncate">Facebook</span>
                  </button>

                  {/* Microsoft */}
                  <button
                      type="button"
                      className="w-full cursor-pointer flex items-center justify-center gap-2 py-2 px-3 md:px-4 bg-gray-900 border border-gray-700 rounded-md text-xs md:text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#f25022" d="M1 1h10v10H1z"/>
                      <path fill="#00a4ef" d="M1 12h10v10H1z"/>
                      <path fill="#7fba00" d="M12 1h10v10H12z"/>
                      <path fill="#ffb900" d="M12 12h10v10H12z"/>
                    </svg>
                    <span className="truncate">Microsoft</span>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign in with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="john.doe@example.com"
                      required={true}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      Forgot password?
                    </Link>
                  </div>
                  <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="••••••••"
                      required={true}
                  />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 cursor-pointer"
                >
                  {isPending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                  strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In...
                      </>
                  ) : (
                      'Sign In'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don&#39;t have an account?{' '}
                  <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" autoClose={3000} />
      </>
  )
}
