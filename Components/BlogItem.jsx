import { assets } from "@/Assets/Assets"
import Image from "next/image"
import React from "react"
import Link from "next/link"

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="group flex flex-col bg-transparent overflow-hidden transition-all duration-300">
      <div className="relative mb-6 flex">
        {/* Vertical Category Label */}
        <div className="flex items-center justify-center pt-2">
            <p className="[writing-mode:vertical-lr] rotate-180 text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 whitespace-nowrap">
                {category}
            </p>
        </div>
        
        {/* Image Container */}
        <Link href={`/blogs/${id}`} className="relative block w-full aspect-[4/5] overflow-hidden ml-4">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
      </div>
      
      <div className="pl-10 flex flex-col flex-grow">
        <h3 className="mb-6 text-4xl sm:text-5xl font-medium serif leading-[1.05] text-gray-900 group-hover:opacity-60 transition-opacity duration-300">
          {title}
        </h3>
        
        <p className="mb-6 text-gray-600 text-base lg:text-lg leading-relaxed line-clamp-2" 
          dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
        />
        
        <Link 
          href={`/blogs/${id}`} 
          className="inline-flex items-center text-gray-900 font-bold italic serif text-lg gap-2 transition-all hover:gap-4"
        >
          Read More 
          <span className="font-light text-2xl">
             ⟶
          </span>
        </Link>
      </div>
    </div>
  )
}

export default BlogItem