import { assets } from "@/Assets/Assets";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isSpecificBlog = pathname.startsWith('/blogs/');

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get('/api/auth/me');
        if (response.data.success) {
          setIsLoggedIn(true);
          setUserRole(response.data.user.role);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      setIsLoggedIn(false);
      setShowMenu(false);
      toast.success("Logged out successfully");
      router.refresh(); 
      router.push('/');
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await axios.post("/api/email", formData);
      toast.success(response.data.msg);
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="bg-[#fdfdfb]">
      {/* Editorial Navigation */}
      <nav className="flex justify-between items-center py-6 px-5 sm:px-10 lg:px-16 border-b border-gray-100">
        <Link href="/" className="transition-opacity hover:opacity-70">
          <Image
            src={assets.blogify}
            width={160}
            alt="Logo"
            className="w-[120px] sm:w-[150px]"
          />
        </Link>
        <div className="flex items-center gap-8 font-medium text-xs tracking-[0.2em] uppercase text-gray-500">
          {isLoggedIn ? (
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 group transition-transform active:scale-95"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                  <Image src={assets.profile_icon} width={48} height={48} alt="Profile" className="object-cover" />
                </div>
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-4 w-52 bg-white border border-gray-100 py-4 z-[100] shadow-xl rounded-2xl">
                    <Link href="/profile" className="block px-8 py-3 hover:bg-gray-50 text-black font-bold text-[10px] tracking-widest uppercase font-montserrat">Profile Settings</Link>
                    {userRole === 'admin' && (
                      <Link href="/admin" className="block px-8 py-3 hover:bg-gray-50 text-black font-bold text-[10px] tracking-widest uppercase font-montserrat">Admin Dashboard</Link>
                    )}
                    <div className="h-px bg-gray-50 my-2" />
                    <button onClick={handleLogout} className="w-full text-left px-8 py-3 hover:bg-gray-50 text-red-500 font-bold text-[10px] tracking-widest uppercase font-montserrat">Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            isSpecificBlog ? (
              <Link href="/" className="px-8 py-3 bg-white border border-gray-100 rounded-full font-bold transition-all hover:bg-gray-50 active:scale-95 shadow-sm text-gray-400 hover:text-black">Return Home</Link>
            ) : (
              <Link href="/login" className="px-8 py-3 bg-brand text-black rounded-full font-bold transition-all hover:opacity-80 active:scale-95 shadow-sm">Sign In</Link>
            )
          )}
        </div>
      </nav>

      {/* Smoky Editorial Hero */}
      <div className="relative min-h-[500px] w-full bg-black flex flex-col items-center justify-center text-center px-5 py-20 overflow-hidden">
        {/* Smoky background effect using CSS gradients */}
        <div className="absolute inset-0 opacity-60">
           <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-transparent to-gray-800 animate-pulse transition-opacity duration-1000" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
        </div>
        
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <h1 className="text-white text-6xl sm:text-8xl serif tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            THE BLOG
          </h1>
          <div className="w-12 h-px bg-white/30 mx-auto mb-8" />
          <p className="text-white/60 text-[10px] sm:text-xs tracking-[0.3em] uppercase leading-widest mb-12">
            Stay up to date on tips, tricks, & trends<br/>for your digital life & lifestyle
          </p>

          {/* Minimalist Subscription Form */}
          <form 
            onSubmit={onSubmitHandler}
            className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto scale-90 sm:scale-100"
          >
            <input 
              type="email" 
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="w-full bg-transparent border-b border-white/20 py-2 text-white text-xs tracking-[0.2em] outline-none focus:border-white transition-colors text-center sm:text-left placeholder:text-white/30"
            />
            <button 
              type="submit"
              className="cursor-pointer text-[10px] tracking-[0.4em] uppercase font-bold text-white border border-white/30 hover:bg-white hover:text-black px-8 py-3 transition-all duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
