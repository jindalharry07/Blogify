"use client";
import { assets } from "@/Assets/Assets";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Footer from "@/Components/Footer";
import axios from "axios";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("/api/blog", {
        params: { id: id },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching blog data", error);
    }
  };

  useEffect(() => {
    if (id) fetchBlogData();
  }, [id]);

  return data ? (
    <div className="bg-[#fdfdfb] min-h-screen">
      {/* Editorial Navigation */}
      <nav className="flex justify-between items-center py-6 px-5 sm:px-10 lg:px-16 border-b border-gray-100 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="transition-opacity hover:opacity-70">
          <Image
            src={assets.blogify}
            width={160}
            alt="Logo"
            className="w-[120px] sm:w-[150px]"
          />
        </Link>
        <Link 
          href="/" 
          className="px-8 py-3 bg-white border border-gray-100 rounded-full font-bold text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-black hover:border-gray-200 transition-all shadow-sm active:scale-95"
        >
          Return Home
        </Link>
      </nav>

      <div className="max-w-[1700px] mx-auto">
      <div className="max-w-4xl mx-auto px-5 pt-24 pb-12 text-center">
        <span className="inline-block py-2 px-6 rounded-full bg-black text-white text-[10px] font-bold tracking-[0.3em] uppercase mb-10 font-montserrat">
          {data.category}
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium serif text-gray-900 leading-[1.1] mb-12">
          {data.title}
        </h1>
        
        <div className="flex items-center justify-center gap-5 mb-16">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
            <Image
              src={data.authorImg}
              width={64}
              height={64}
              alt={data.author}
              className="object-cover"
            />
          </div>
          <div className="text-left">
            <p className="text-gray-900 font-bold text-sm leading-none mb-1 font-montserrat">{data.author}</p>
            <p className="text-gray-400 text-xs tracking-widest uppercase font-bold font-montserrat opacity-60">Published Recently</p>
          </div>
        </div>
      </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 mb-16">
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl shadow-gray-200">
           <Image
            src={data.image}
            fill
            alt={data.title}
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5">
        <article 
          className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-relaxed blog-content" 
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        <div className="my-20 pt-10 border-t border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Share this story
          </h3>
          <div className="flex gap-4">
            {[
              { icon: assets.facebook_icon, label: 'Facebook' },
              { icon: assets.twitter_icon, label: 'Twitter' },
              { icon: assets.googleplus_icon, label: 'Google+' }
            ].map((social, index) => (
              <button 
                key={index}
                className="cursor-pointer w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center transition-all hover:bg-indigo-50 hover:-translate-y-1 hover:shadow-lg shadow-indigo-100"
                aria-label={social.label}
              >
                <Image src={social.icon} alt={social.label} width={24} className="grayscale hover:grayscale-0 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Page;
