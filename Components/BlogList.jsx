import React from "react";
import { blog_data } from "@/Assets/Assets";
import BlogItem from "./BlogItem";
const BlogList = () => {
    return (
        <div>
            <div className=" w-fit mx-auto flex justify-center gap-4 flex-wrap my-10 pl-15 pr-15 pt-3 pb-3 border rounded-full border-pink-200">
                <button className="bg-pink-600 text-white font-medium py-2 px-6 rounded-full shadow-md hover:bg-pink-600  transition-all duration-300">
                    All
                </button>
                <button className="text-pink-600 border font-medium py-2 px-6 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300">
                    Technology
                </button>
                <button className="text-pink-600 border font-medium py-2 px-6 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300">
                    Startup
                </button>
                <button className="text-pink-600 border font-medium py-2 px-6 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300">
                    Lifestyle
                </button>
            </div>
            <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
                {blog_data.map((item,index) => {
                    return <BlogItem key={index} image = {item.image} title={item.title} description={item.description} category={item.category} />
                })}
            </div>
        </div>
    )
}
export default BlogList;