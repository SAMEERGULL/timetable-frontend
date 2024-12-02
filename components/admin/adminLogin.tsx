"use client"
import React, { useState } from 'react';

interface AdminLogin {
  email: string;
  password: string;
}

const AdminLogin = ({ setShowForgotPassword }: any) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [status, setStatus] = useState<string>('');
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const loginData: AdminLogin = {
        email,
        password,
      };
  
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin-login/`;
      console.log('API URL:', apiUrl); // Log the API URL
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to login');
        }
  
        const data = await response.json();
        setStatus(data.message); 
        window.location.href = '/admin/dashboard';
        localStorage.setItem('Admin_id', data.user_id);
        localStorage.setItem('Institute_id', data.institute_id);
        localStorage.setItem('role', data.role);
        console.log('User  ID:', data.user_id); // Example of handling user ID
  
      } catch (error) {
        setStatus('Error: ' + (error as Error).message); // Set error message
      }
    };
  

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                    Admin Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-2 block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-2 block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {status && <p className="text-red-500 text-sm">{status}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Forgot your password?
                    </button>
                    <a
                        href="/admin/register"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Register Here
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AdminLogin;