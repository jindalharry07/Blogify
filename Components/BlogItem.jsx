import { assets, blog_data } from "@/Assets/Assets"
import Image from "next/image"
import React from "react"
import Link from "next/link"

const BlogItem = ({title, description, category, image, id}) => {
    return (
        <div className="max-w-[330px] sm:max-w-[300px] bg-white border 
    transition-transform duration-300 ease-in-out 
    hover:scale-105 hover:shadow-[0px_0px_15px_#000000]">
            <Link href={`/blogs/${id}`}><Image src={image} alt="" width={400} height={400} className="border-b border-black"/></Link>
            <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">{category}</p>
            <div className="p-5">
                <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">{title}</h5>
                <p className="mb-3 text-small tracking-tight text-gray-700">{description}</p>
                <div className="inline-flex items-center py-2 font-semibold text-center">
                    <Link href={`/blogs/${id}`} className="inline-flex items-center py-2 font-semibold text-center">Read more<Image src={assets.arrow} className='ml-2' alt=""  width={12}/></Link>
                </div>
            </div>


        </div>
    )
}
export default BlogItem