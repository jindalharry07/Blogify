"use client";
import { assets } from "@/Assets/Assets";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Footer from "@/Components/Footer";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [commentData, setCommentData] = useState({
    comment: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const onCommentChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCommentData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/auth/profile");
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log("Not logged in");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to comment");
      return;
    }
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      const response = await axios.post("/api/comments", {
        blogId: id,
        userId: user._id.toString(),
        name: user.name,
        comment: commentData.comment
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        setCommentData({ comment: "" });
        await fetchBlogData();
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Failed to post comment");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };



  const handleDeleteComment = async (commentId) => {
    if (!user || user.role !== "admin") {
      toast.error("Unauthorized");
      return;
    }
    if (isSaving) {
      return;
    }

    try {
      const response = await axios.delete("/api/comments", {
        data: { blogId: id, commentId: commentId.toString() }
      });
      if (response.data.success) {
        toast.success("Comment deleted");
        await fetchBlogData();
      }
    } catch (error) {
      console.error(error);
    }
  };


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
    if (id) {
        fetchBlogData();
        fetchUser();
    }
  }, [id]);

  return data ? (
    <div className="bg-[#fdfdfb] min-h-screen">
      {/* Editorial Navigation */}
      <nav className="flex justify-between items-center py-6 px-5 sm:px-10 lg:px-16 border-b border-gray-100 bg-white/50 backdrop-blur-md sticky top-0 z-[100]">
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

      <div className="max-w-6xl mx-auto px-5">
        <article 
          className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-relaxed blog-content mb-20" 
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        <div className="my-20 pt-10 border-t border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 font-montserrat tracking-tight">
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

        {/* Improved Comments Section - 2 Columns */}
        <div className="mt-32 pt-20 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left: Comments List */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-3xl font-bold text-gray-900 serif tracking-tight">Community Thoughts</h3>
                <span className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {data.comments?.length || 0} Comments
                </span>
              </div>

              {/* Scrollable Area */}
              <div className="max-h-[800px] overflow-y-auto pr-6 custom-scrollbar space-y-8 pb-10">
                {data.comments && data.comments.length > 0 ? (
                  data.comments.map((c, index) => (
                    <div 
                      key={c._id || index} 
                      className="group bg-white p-8 rounded-[2.5rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50 transition-all hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.1)] hover:border-indigo-100/50 animate-in fade-in slide-in-from-bottom-6 duration-500"
                    >
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-5">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-serif text-xl shadow-lg shadow-indigo-200">
                               {c.name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-4 border-white rounded-full"></div>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-base mb-0.5">{c.name}</p>
                            <div className="flex items-center gap-2">
                               <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                 {new Date(c.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                               </p>
                               <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                               <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Verified Reader</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {user?.role === "admin" && (
                            <button 
                              onClick={() => handleDeleteComment(c._id)}
                              className="p-2.5 rounded-xl hover:bg-red-50 text-red-200 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                              title="Delete comment"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed text-base mb-8 font-medium italic opacity-90 selection:bg-indigo-100">"{c.comment}"</p>
                      

                    </div>
                  ))
                ) : (
                  <div className="text-center py-32 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200/50 flex flex-col items-center">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-gray-200/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                    </div>
                    <p className="text-gray-400 font-bold text-sm tracking-tight">Be the first to shape the discussion.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Comment Form */}
            <div className="w-full lg:w-96 sticky top-32 h-fit">
               <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 border border-indigo-50/50">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Add your voice</h4>
                  <p className="text-gray-400 text-xs mb-8">Respectful conversations welcome.</p>
                  
                  {user ? (
                    <form onSubmit={handleCommentSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 mb-6 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-indigo-100">
                             {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest mb-1">Authenticated User</p>
                            <p className="text-sm font-bold text-indigo-900">{user.name}</p>
                          </div>
                        </div>
                        <textarea 
                          rows="6" 
                          name="comment"
                          value={commentData.comment}
                          onChange={onCommentChange}
                          placeholder="What's your take on this story?" 
                          className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white focus:outline-none transition-all text-sm leading-relaxed"
                          required
                        />
                      </div>
                      <button 
                        type="submit"
                        disabled={isSaving}
                        className={`w-full bg-black text-white py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-indigo-100 ${isSaving ? "opacity-50 cursor-not-allowed bg-gray-400 font-montserrat" : "hover:bg-indigo-600 cursor-pointer"}`}
                      >
                        {isSaving ? "Saving..." : "Publish Thought"}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium mb-8">Join our community to participate in the discussion.</p>
                      <Link 
                        href="/login"
                        className="inline-block w-full bg-black text-white py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all hover:scale-[1.05] active:scale-95 shadow-xl shadow-gray-200"
                      >
                        Sign in to Comment
                      </Link>
                    </div>
                  )}
               </div>
            </div>
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
