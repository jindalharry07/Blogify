"use client"
import { assets } from '@/Assets/Assets'
import Image from "next/image"
import React from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            const res = await axios.get('/api/auth/logout');
            if(res.data.success) {
                router.push('/login');
                toast.success('Logged out successfully');
            }
        } catch(error) {
            toast.error('Error logging out');
        }
    }

    const menuItems = [
        { href: '/admin/addProduct', label: 'Add blogs', icon: assets.add_icon },
        { href: '/admin/blogList', label: 'Blog List', icon: assets.blog_icon },
        { href: '/admin/subscriptions', label: 'Subscriptions', icon: assets.email_icon }
    ];

    return (
        <div className='flex flex-col bg-white border-r border-gray-100 w-20 sm:w-80 min-h-screen transition-all duration-300'>
            <div className='px-10 py-12 flex flex-col items-center sm:items-start gap-12'>
                <Link href="/">
                    <Image src={assets.blogify} width={150} alt="Logo" className="hidden sm:block opacity-100" />
                </Link>
                <Link 
                    href="/" 
                    className="hidden sm:flex items-center gap-4 px-8 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-[10px] tracking-[0.3em] uppercase text-gray-500 hover:text-black hover:border-gray-200 transition-all shadow-sm active:scale-95"
                >
                    Return Home
                </Link>
            </div>
            
            <div className='flex flex-col gap-5 px-6 py-6 flex-grow'>
                <p className='hidden sm:block text-[10px] tracking-[0.4em] uppercase font-bold text-gray-300 mb-2 px-4 font-montserrat'>Journal Controls</p>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link 
                            key={item.href}
                            href={item.href} 
                            className={`flex items-center gap-4 px-6 py-5 rounded-3xl transition-all duration-300 group ${
                                isActive 
                                    ? 'bg-black text-white shadow-xl shadow-gray-200' 
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                            }`}
                        >
                            <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-zinc-800' : 'bg-transparent'}`}>
                                <Image src={item.icon} alt={item.label} width={22} className={isActive ? 'invert' : 'opacity-60'} />
                            </div>
                            <span className='hidden sm:block font-bold text-[12px] tracking-wider uppercase font-montserrat'>{item.label}</span>
                        </Link>
                    )
                })}
            </div>

            <div className='p-10 mt-auto border-t border-gray-50'>
                <button 
                    onClick={handleLogout} 
                    className='w-full flex items-center justify-center sm:justify-start gap-4 px-6 py-5 rounded-3xl text-red-500 hover:bg-red-50 transition-all font-bold text-[12px] tracking-wider uppercase font-montserrat'
                >
                    <span className="hidden sm:block">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar