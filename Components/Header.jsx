import {assets} from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <div className='py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Image src={assets.blogify} width={180} alt="Logo" className='w-[130px] sm:w-auto' />
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 text-white bg-pink-400'>Get Started <Image src={assets.arrow} alt=''/> </button>
            </div>
            <div className='text-center my-8'>
                <h1 className='text-3xl sm:text-5xl font-medium'>Write. Share. Inspire.</h1>
                <p className='mt-10 max-w-[740px] m-auto text-s sm:test-base'>Whether it’s a story, an idea, or a spark of inspiration, your words deserve to be heard.
Start writing today and make your mark on the world.</p>
        <form className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black '>
            <input type='email' placeholder='Enter your email' className='pl-4 outline-none'/>
            <button type='submit' className='border-l border-black py-1 px-4 sm:py-4 sm:px-8 text-white bg-pink-400 active:bg-fuchsia-800 active:text-white'>Subscribe</button>

        </form>
            </div>
        </div>
    )
};

export default Header