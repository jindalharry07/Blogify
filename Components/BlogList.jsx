import React, { useState } from "react";
import { blog_data } from "@/Assets/Assets";
import BlogItem from "./BlogItem";
const BlogList = () => {

    const [menu, setMenu] = useState("All");

    return (
        <div>
            <div className=" w-fit mx-auto flex justify-center gap-4 flex-wrap my-10 pl-15 pr-15 pt-3 pb-3 border  rounded-full border-pink-200">
                <button onClick={() => setMenu('All')} className={menu==="All"? "bg-pink-600 text-white font-medium py-2 px-6  rounded-full shadow-md hover:bg-pink-600  transition-all duration-300" : ""}>
                    All
                </button>
                <button onClick={() => setMenu('Technology')} className={menu==="Technology"? "bg-pink-600 text-white font-medium  py-2 px-6 cursor-pointer  rounded-full shadow-md hover:bg-pink-600  transition-all duration-300" : ""}>
                    Technology
                </button>
                <button onClick={() => setMenu('Startup')} className={menu==="Startup"? "bg-pink-600 text-white font-medium py-2 px-6 cursor-pointer  rounded-full shadow-md hover:bg-pink-600  transition-all duration-300" : ""}>
                    Startup
                </button>
                <button onClick={() => setMenu('Lifestyle')} className={menu==="Lifestyle"? "bg-pink-600 text-white font-medium py-2 px-6  cursor-pointer rounded-full shadow-md hover:bg-pink-600  transition-all duration-300" : ""}>
                    Lifestyle
                </button>
            </div>
            <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24 ">
                {blog_data.filter((item) => menu==="All" ? true : item.category === menu).map((item,index) => {
                    return <BlogItem key={index} id = {item.id} image = {item.image} title={item.title} description={item.description} category={item.category} />
                })}
            </div>
        </div>
    )
}
export default BlogList;