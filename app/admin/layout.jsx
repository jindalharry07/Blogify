import { assets } from "@/Assets/Assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
  import { ToastContainer } from 'react-toastify';
import Link from "next/link";
 
export default function Layout({children}) {
    return (
        <>
        <div className="flex ">
            <ToastContainer theme="dark"/>  
            <Sidebar />
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black"> 
                    <div className="flex items-center gap-4">
                        <Link href='/' className="text-sm font-semibold px-4 py-1 border border-black hover:bg-black hover:text-white transition-all">Back to Home</Link>
                        <h3 className="font-medium">Admin Panel</h3>
                    </div>
                    <Image src={assets.profile_icon} width={40} alt='' />
                </div>
                {children}
            </div>
        </div>

        </>
    )
}