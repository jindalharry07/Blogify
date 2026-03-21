import { assets } from "@/Assets/Assets";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get('/api/auth/me');
        if (response.data.success) {
          setIsLoggedIn(true);
          setUserRole(response.data.user.role);
        } else {
          setIsLoggedIn(false);
          setUserRole("");
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUserRole("");
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
    <div className="py-5 px-5 md:px-12 lg:px-28 ">
      <div className="flex justify-between items-center ">
        <Link href="/">
          <Image
            src={assets.blogify}
            width={180}
            alt="Logo"
            className="w-[130px] sm:w-auto"
          />
        </Link>
        <div>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
               <div className="relative">
                  <div 
                    onClick={() => setShowMenu(!showMenu)}
                    className="cursor-pointer border-2 border-black rounded-full overflow-hidden hover:scale-110 transition-all shadow-sm"
                  >
                    <Image src={assets.profile_icon} width={45} height={45} alt="Profile" />
                  </div>

                  {showMenu && (
                    <div className="absolute right-0 top-full mt-3 w-48 bg-white border-2 border-black shadow-[-5px_5px_0px_#000000] py-2 z-50">
                        <Link 
                          href="/profile" 
                          onClick={() => setShowMenu(false)}
                          className="block px-4 py-2 text-sm text-black hover:bg-gray-100 font-bold"
                        >
                          Edit Profile
                        </Link>
                        <hr className="my-1 border-black" />
                        {userRole === 'admin' && (
                          <>
                            <Link 
                              href="/admin" 
                              onClick={() => setShowMenu(false)}
                              className="block px-4 py-2 text-sm text-black hover:bg-gray-100 font-bold"
                            >
                              Admin Panel
                            </Link>
                            <hr className="my-1 border-black" />
                          </>
                        )}
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold"
                        >
                          Logout
                        </button>
                    </div>
                  )}
               </div>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="flex items-center gap-2 font-semibold py-2 px-4 sm:py-3 sm:px-6 text-white cursor-pointer bg-black hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 rounded-full shadow-md"
            >
              Login <Image src={assets.arrow} alt="" className="invert" />
            </Link>
          )}
        </div>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">
          Write. Share. Inspire.
        </h1>
        <p className="mt-10 max-w-[740px] m-auto text-s sm:test-base">
          Whether it's a story, an idea, or a spark of inspiration, your words
          deserve to be heard. Start writing today and make your mark on the
          world.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black "
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none"
          />
          <button
            type="submit"
            className="border-l border-black py-1 px-4 sm:py-4 sm:px-8 cursor-pointer text-white bg-pink-400 active:bg-fuchsia-800 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
