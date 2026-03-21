"use client"
import { assets } from '@/Assets/Assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const router = useRouter();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', data);
      if (response.data.success) {
        toast.success(response.data.msg);
        router.push('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error logging in");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 py-10 px-5 md:px-12 lg:px-28">
      <ToastContainer theme="dark" />
      <div className="flex justify-between items-center mb-10">
        <Link href="/">
          <Image src={assets.blogify} width={180} alt="Logo" className="w-[130px] sm:w-auto" />
        </Link>
      </div>

      <div className="bg-white p-10 border border-black shadow-[-8px_8px_0px_#000000] w-full max-w-lg mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Email Address</label>
            <input 
              name="email" 
              type="email" 
              placeholder="Enter your email"
              value={data.email} 
              onChange={onChangeHandler}
              required 
              className="px-4 py-3 border border-black outline-none focus:ring-2 focus:ring-pink-200 transition-all font-medium"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="Enter your password"
              value={data.password} 
              onChange={onChangeHandler}
              required 
              className="px-4 py-3 border border-black outline-none focus:ring-2 focus:ring-pink-200 transition-all font-medium"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-4 bg-pink-400 text-white text-xl font-bold border border-black shadow-[-4px_4px_0px_#000000] hover:bg-pink-500 active:bg-pink-600 transition-all active:shadow-none translate-y-0 active:translate-y-1"
          >
            LOGIN
          </button>
        </form>
        <p className="mt-8 text-center text-lg font-medium">
          New here? <Link href="/signup" className="text-pink-600 hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
