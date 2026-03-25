"use client"
import { assets } from '@/Assets/Assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', data);
      if (response.data.success) {
        toast.success(response.data.msg);
        router.push('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error signing up");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fdfdfb] flex flex-col overflow-hidden">
      <ToastContainer theme="colored" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-gray-100 rounded-full blur-3xl opacity-30 -z-10" />

      {/* Navigation */}
      <nav className="flex justify-between items-center py-6 px-5 sm:px-10 lg:px-16 border-b border-gray-100 bg-white/50 backdrop-blur-md">
        <Link href="/" className="transition-opacity hover:opacity-70">
          <Image src={assets.blogify} width={160} alt="Logo" className="w-[120px] sm:w-[150px]" />
        </Link>
        <Link href="/" className="px-8 py-3 bg-white border border-gray-100 rounded-full text-[10px] tracking-[0.3em] uppercase font-bold text-gray-500 hover:text-black hover:border-gray-300 shadow-sm transition-all duration-300">
          Back to Journal
        </Link>
      </nav>

      <div className="flex-grow flex items-center justify-center p-5 py-20">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-2xl shadow-gray-200/50 border border-gray-100/50">
            <div className="text-center mb-12">
               <span className="cursive text-3xl text-gray-400 block mb-4 italic">Join the collective</span>
              <h2 className="serif text-5xl font-medium text-gray-900 tracking-tight leading-tight">Apply for Access</h2>
              <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 mt-6">Share your story with the world</p>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-400 ml-1">Full Name</label>
                <input 
                  name="name" 
                  type="text" 
                  placeholder="John Doe"
                  value={data.name} 
                  onChange={onChangeHandler}
                  required 
                  className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-transparent outline-none focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all font-medium text-gray-900 placeholder:text-gray-300 font-montserrat"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-400 ml-1">Email Address</label>
                <input 
                  name="email" 
                  type="email" 
                  placeholder="name@example.com"
                  value={data.email} 
                  onChange={onChangeHandler}
                  required 
                  className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-transparent outline-none focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all font-medium text-gray-900 placeholder:text-gray-300 font-montserrat"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-400 ml-1">Password</label>
                <input 
                  name="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={data.password} 
                  onChange={onChangeHandler}
                  required 
                  className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-transparent outline-none focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all font-medium text-gray-900 placeholder:text-gray-300 font-montserrat"
                />
              </div>
              
              <button 
                type="submit" 
                className="cursor-pointer w-full py-5 bg-brand text-black text-[11px] tracking-[0.3em] uppercase font-bold rounded-2xl shadow-xl shadow-gray-200 transition-all hover:opacity-80 hover:scale-[1.02] active:scale-95"
              >
                Create Account
              </button>
            </form>

            <div className="mt-12 pt-10 border-t border-gray-50 text-center">
              <p className="text-gray-400 font-bold text-[10px] tracking-[0.2em] uppercase">
                Already registered? <Link href="/login" className="text-gray-800 hover:opacity-60 transition-colors border-b border-gray-100">Log in here</Link>
              </p>
            </div>
          </div>
          
          <p className="mt-12 text-center text-gray-400 text-[10px] tracking-widest uppercase font-bold opacity-30">
            &copy; {new Date().getFullYear()} Blogify Journal Collective
          </p>
        </div>
      </div>
    </div>
  );
}
