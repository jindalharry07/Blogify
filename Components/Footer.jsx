import { assets } from "@/Assets/Assets";
import Image  from "next/image";
import React from "react";
const Footer = () => {
    return (
        <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-gray-100 py-5 itemscenter">
            <Image src={assets.blogify} alt='' width={120} />
            <p className="text-sm">All right reserved. Copyright @blogify</p>
            <div className="flex">
                <Image src={assets.facebook_icon} alt="" width={40}/>
                <Image src={assets.twitter_icon} alt="" width={40}/>
                <Image src={assets.googleplus_icon} alt="" width={40}/>
            </div>
        </div>
    )
}
export default Footer;