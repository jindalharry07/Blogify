import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";
import { useState } from "react";

const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await axios.post("/api/email", formData);

      toast.success(response.data.msg);
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28 ">
      <div className="flex justify-between items-center ">
        <Image
          src={assets.blogify}
          width={180}
          alt="Logo"
          className="w-[130px] sm:w-auto"
        />
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 text-white cursor-pointer bg-pink-400 hover:shadow-[0px_0px_15px_#000000]">
          Get Started <Image src={assets.arrow} alt="" />{" "}
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">
          Write. Share. Inspire.
        </h1>
        <p className="mt-10 max-w-[740px] m-auto text-s sm:test-base">
          Whether it's a story, an idea, or a spark of inspiration, your words
          deserve to be heard. Start writing today and make your mark on the
          world.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black "
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none"
          />
          <button
            type="submit"
            className="border-l border-black py-1 px-4 sm:py-4 sm:px-8 cursor-pointer text-white bg-pink-400 active:bg-fuchsia-800 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
