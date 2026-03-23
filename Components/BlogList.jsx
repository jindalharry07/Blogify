import React, { useState, useEffect } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const response = await axios.get("/api/blog");
        setBlogs(response.data.blogs);
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    const categories = ["All", "Technology", "Startup", "Lifestyle"];
    
    // Split blogs: first one is featured, rest are in grid
    const filteredBlogs = blogs.filter((item) => menu === "All" ? true : item.category === menu);
    const featuredBlog = filteredBlogs[0];
    const remainingBlogs = filteredBlogs.slice(1);

    return (
        <div className="w-full px-5 sm:px-10 lg:px-12 py-16 bg-[#fdfdfb]">
            <div className="max-w-[1700px] mx-auto">
            
            {/* Editorial Category Filter */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-20">
                <p className="cursive text-2xl text-gray-800">Browse the blog :</p>
                <div className="flex flex-wrap items-center justify-center gap-8">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setMenu(cat)}
                            className={`cursor-pointer text-sm tracking-[0.3em] uppercase font-bold transition-all duration-300 ${
                                menu === cat
                                    ? "text-black border-b border-black pb-1"
                                    : "text-gray-400 hover:text-black"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Post (Overlapping Layout) */}
            {menu === "All" && featuredBlog && (
                <div className="relative mb-32 group">
                    <div className="relative w-full md:w-[70%] aspect-[16/9] overflow-hidden">
                        {/* Featured Badge */}
                        <div className="absolute top-10 left-10 z-20 w-28 h-28 bg-zinc-900 rounded-full flex items-center justify-center text-center p-4 shadow-xl">
                            <p className="text-white text-[10px] tracking-widest uppercase font-bold leading-tight">
                                Read the<br/>latest
                            </p>
                        </div>
                        <Image 
                            src={featuredBlog.image} 
                            alt={featuredBlog.title} 
                            fill 
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                    </div>
                    
                    {/* Overlapping Info Card */}
                    <div className="md:absolute md:top-1/2 md:-translate-y-1/2 md:right-0 w-full md:w-[50%] bg-white p-10 lg:p-20 shadow-2xl shadow-gray-100 z-10">
                        <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 mb-6 font-montserrat">
                            {featuredBlog.category}
                        </p>
                        <h2 className="serif text-4xl lg:text-7xl font-medium leading-[1.1] mb-8">
                            {featuredBlog.title}
                        </h2>
                        <p className="text-gray-500 text-base lg:text-xl leading-relaxed mb-10 line-clamp-3"
                           dangerouslySetInnerHTML={{ __html: featuredBlog.description }}
                        />
                        <Link 
                            href={`/blogs/${featuredBlog._id}`}
                            className="inline-block py-5 px-14 bg-gray-50 text-[19px] tracking-[0.2em] uppercase font-bold hover:bg-gray-100 transition-colors font-montserrat"
                        >
                            Read Post
                        </Link>
                    </div>
                </div>
            )}

            {/* Main Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
                {(menu === "All" ? remainingBlogs : filteredBlogs).map((item, index) => (
                    <BlogItem 
                        key={index} 
                        id={item._id} 
                        image={item.image} 
                        title={item.title} 
                        description={item.description} 
                        category={item.category} 
                    />
                ))}
            </div>
            </div>
            
            {filteredBlogs.length === 0 && (
                <div className="text-center py-40 border-t border-gray-100">
                    <p className="cursive text-3xl text-gray-300">No stories found in this journal.</p>
                </div>
            )}
        </div>
    )
}

export default BlogList;