"use client";
import { assets, blog_data } from "@/Assets/Assets";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Footer from "@/Components/Footer";

const Page = ({ params }) => {
  const { id } = React.use(params);
  const [data, setData] = useState(null);

  const fetchBlogData = () => {
    for (let i = 0; i < blog_data.length; i++) {
      if (Number(id) === blog_data[i].id) {
        setData(blog_data[i]);
        console.log(blog_data[i]);
        break;
      }
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.blogify}
              alt=""
              width={180}
              className="w-[130px] sm-w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:p-3 sm:px-6 border border-black text-white bg-pink-400">
            Get Started <Image src={assets.arrow} alt="" />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            src={data.author_img}
            width={60}
            height={60}
            alt=""
            className="mx-auto mt-6 border border-black rounded-full"
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-2 border-black"
          src={data.image}
          width={1280}
          h={780}
          alt=""
        />
        <h1 className="my-8 text-[26px] font-semibold">Introduction : </h1>
        <p>{data.description}</p>
        <h3 className="my-5 text-[18px] font-semibold">Hello World!</h3>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
          maxime sint ad, repellendus ea ipsam dignissimos accusantium, illo eum
          velit architecto eius, exercitationem ut reiciendis. Perspiciatis eum
          accusantium laudantium odio?
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
          maxime sint ad, repellendus ea ipsam dignissimos accusantium, illo eum
          velit architecto eius, exercitationem ut reiciendis. Perspiciatis eum
          accusantium laudantium odio?
        </p>

        <h3 className="my-5 text-[18px] font-semibold">Hello World!</h3>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
          maxime sint ad, repellendus ea ipsam dignissimos accusantium, illo eum
          velit architecto eius, exercitationem ut reiciendis. Perspiciatis eum
          accusantium laudantium odio?
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
          maxime sint ad, repellendus ea ipsam dignissimos accusantium, illo eum
          velit architecto eius, exercitationem ut reiciendis. Perspiciatis eum
          accusantium laudantium odio?
        </p>

        <h3 className="my-5 text-[18px] font-semibold">Hello World!</h3>
        <p className="my-3 ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
          maxime sint ad, repellendus ea ipsam dignissimos accusantium, illo eum
          velit architecto eius, exercitationem ut reiciendis. Perspiciatis eum
          accusantium laudantium odio?
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
          maxime sint ad, repellendus ea ipsam dignissimos accusantium, illo eum
          velit architecto eius, exercitationem ut reiciendis. Perspiciatis eum
          accusantium laudantium odio?
        </p>

        <h3 className="my-5 text-[18px] font-semibold">Conclusion</h3>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
          maxime sint ad, repellendus ea ipsam dignissimos accusantium, illo eum
          velit architecto eius, exercitationem ut reiciendis. Perspiciatis eum
          accusantium laudantium odio?
        </p>

        <div className="my-24">
          <p className="text-black font-semibold my-4">
            {" "}
            Share this article on social media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} alt="" width={50} />
            <Image src={assets.twitter_icon} alt="" width={50} />
            <Image src={assets.googleplus_icon} alt="" width={50} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default Page;
