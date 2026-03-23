import Sidebar from "@/Components/AdminComponents/Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import { assets } from "@/Assets/Assets";

export default function Layout({children}) {
    return (
        <div className="flex min-h-screen bg-[#fdfdfb]">
            <ToastContainer theme="colored"/>  
            <Sidebar />
            <div className="flex flex-col w-full">
                <header className="flex items-center justify-between w-full py-6 px-10 border-b border-gray-100 bg-white/50 backdrop-blur-md"> 
                    <div className="flex items-center gap-6">
                        <h1 className="serif text-3xl font-medium tracking-tight text-gray-900 italic">Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-400 font-montserrat">Moderator Access</p>
                            <p className="text-[11px] font-bold text-gray-900 font-montserrat">Admin Panel</p>
                        </div>
                        <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 shadow-sm transition-transform hover:scale-105">
                            <Image src={assets.profile_icon} width={56} height={56} alt="Admin" className="object-cover" />
                        </div>
                    </div>
                </header>
                <main className="p-8 lg:p-12">
                    {children}
                </main>
            </div>
        </div>
    )
}