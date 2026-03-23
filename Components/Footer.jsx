import { assets } from "@/Assets/Assets";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#fdfdfb] border-t border-gray-100 mt-32 py-24 px-5 sm:px-12 lg:px-28">
      <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row justify-between items-center gap-16 text-center md:text-left">
        <div className="flex flex-col gap-8">
          <Image src={assets.blogify} alt="Blogify Logo" width={180} className="mx-auto md:mx-0 opacity-100" />
          <p className="text-[11px] tracking-[0.3em] uppercase font-bold text-gray-400">
            &copy; {new Date().getFullYear()} Blogify Journal All rights reserved
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-10">
          <div className="flex gap-6">
            {[
              { icon: assets.facebook_icon, label: 'Facebook' },
              { icon: assets.twitter_icon, label: 'Twitter' },
              { icon: assets.googleplus_icon, label: 'Google+' }
            ].map((social, index) => (
              <a 
                key={index} 
                href="#" 
                className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center transition-all hover:bg-black hover:invert group shadow-sm bg-white"
                aria-label={social.label}
              >
                <Image src={social.icon} alt={social.label} width={24} className="grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
              </a>
            ))}
          </div>
          <p className="cursive text-gray-400 text-2xl">Thanks for Reading.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;