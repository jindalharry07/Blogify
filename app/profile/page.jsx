"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { assets } from '@/Assets/Assets';

export default function Profile() {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/auth/profile');
        if (response.data.success) {
          setData(prev => ({ 
            ...prev, 
            name: response.data.user.name, 
            email: response.data.user.email 
          }));
        }
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/auth/profile', data);
      if (response.data.success) {
        toast.success(response.data.msg);
        setData(prev => ({ ...prev, password: '' })); // clear password field
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error updating profile");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdfdfb]">
      <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
    </div>
  );

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
          Return Home
        </Link>
      </nav>

      <div className="flex-grow flex items-center justify-center p-5 py-10">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-2xl shadow-gray-200/50 border border-gray-100/50">
            <div className="text-center mb-16">
              <span className="cursive text-3xl text-gray-400 block mb-4">Manage your Account</span>
              <h2 className="serif text-5xl lg:text-6xl font-medium text-gray-900 tracking-tight leading-tight">Profile Settings</h2>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-400 ml-1">Display Name</label>
                <input 
                  name="name" 
                  type="text" 
                  placeholder="Your Name"
                  value={data.name} 
                  onChange={onChangeHandler}
                  required 
                  className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-transparent outline-none focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all font-medium text-gray-900 placeholder:text-gray-300"
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
                  className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-transparent outline-none focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all font-medium text-gray-900 placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-400 ml-1">New Password</label>
                <input 
                  name="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={data.password} 
                  onChange={onChangeHandler}
                  className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-transparent outline-none focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all font-medium text-gray-900 placeholder:text-gray-300"
                />
                <p className="text-[10px] text-gray-400 ml-1 italic font-medium">Leave blank to keep current password</p>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-5 bg-brand text-black text-[11px] tracking-[0.3em] uppercase font-bold rounded-2xl shadow-xl shadow-gray-200 transition-all hover:opacity-80 hover:scale-[1.02] active:scale-95 mt-4"
              >
                Update Profile
              </button>
            </form>
          </div>
          
          <p className="mt-12 text-center text-gray-400 text-[10px] tracking-widest uppercase font-bold opacity-50">
            &copy; {new Date().getFullYear()} Blogify Journal Security
          </p>
        </div>
      </div>
    </div>
  );
}
