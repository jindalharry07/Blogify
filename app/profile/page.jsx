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

  if (loading) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 py-10 px-5 md:px-12 lg:px-28">
      <ToastContainer theme="dark" />
      <div className="flex justify-between items-center mb-10">
        <Link href="/">
          <Image src={assets.blogify} width={180} alt="Logo" className="w-[130px] sm:w-auto" />
        </Link>
      </div>

      <div className="bg-white p-10 border border-black shadow-[-8px_8px_0px_#000000] w-full max-w-lg mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-8 text-center">Update Profile</h2>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Display Name</label>
            <input 
              name="name" 
              type="text" 
              placeholder="Your name"
              value={data.name} 
              onChange={onChangeHandler}
              required 
              className="px-4 py-3 border border-black outline-none focus:ring-2 focus:ring-pink-200 transition-all font-medium"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Email Address</label>
            <input 
              name="email" 
              type="email" 
              placeholder="Your email"
              value={data.email} 
              onChange={onChangeHandler}
              required 
              className="px-4 py-3 border border-black outline-none focus:ring-2 focus:ring-pink-200 transition-all font-medium"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Password (Leave blank to keep same)</label>
            <input 
              name="password" 
              type="password" 
              placeholder="Enter new password"
              value={data.password} 
              onChange={onChangeHandler}
              className="px-4 py-3 border border-black outline-none focus:ring-2 focus:ring-pink-200 transition-all font-medium"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-4 bg-pink-400 text-white text-xl font-bold border border-black shadow-[-4px_4px_0px_#000000] hover:bg-pink-500 active:bg-pink-600 transition-all active:shadow-none translate-y-0 active:translate-y-1"
          >
            UPDATE PROFILE
          </button>
        </form>
        <p className="mt-8 text-center text-lg font-medium">
          <Link href="/" className="text-black hover:underline">Go Back Home</Link>
        </p>
      </div>
    </div>
  );
}
