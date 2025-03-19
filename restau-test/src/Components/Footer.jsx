import React from 'react';
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
   return( 
      <footer className="bg-[#1b1b1b] py-10 px-5">
        <div className="flex flex-col md:flex-row justify-center gap-8 flex-wrap text-center md:text-left">
          <div className="w-full md:w-[30%]">
            <h1 className="text-3xl font-libre-caslon text-customColor my-5">About Us</h1>
            <p className="text-[#6c6a62] text-sm font-noah ">The Bistro restaurant provides a warm and inviting ambiance where guests can savor delicious cuisine. Its elegant atmosphere, paired with exceptional service, ensures a memorable dining experience.</p>
          </div>

          <div className="w-full md:w-[30%]">
            <h1 className="text-3xl font-libre-caslon text-customColor my-5">Contact Info</h1>
            <p className="text-[#6c6a62]">Rue kadi Lass, Maarif, Morocco</p>
            <h1 className="text-white font-libre-caslon text-2xl my-4">+2125 28 54 62 4</h1>
            <h5 className="text-[#6c6a62] text-[15px]">bistrorestaurant@gmail.com</h5>
            <hr className="w-[75%] mx-auto md:mx-0"/>
            <div className="text-white flex justify-center md:justify-start gap-2 my-4">
              <Link to=""><FaInstagram size={20} /></Link>
              <Link to=""><FaXTwitter size={20} /></Link>
              <Link to=""><CiFacebook size={22} /></Link>
            </div>
          </div>

          <div className="w-full md:w-[30%]">
            <h1 className="text-3xl font-libre-caslon text-customColor my-5">Subscribe</h1>
            <p className="text-[#6c6a62] text-sm font-noah">Want to be notified when we launch a new template or an update? Just sign up and we'll send you a notification by email.</p>
            <div className="flex border border-customColor w-full p-1 h-11 my-5">
              <input type="email" placeholder="Your email" className="bg-[#1a1a1a] text-white px-2 py-2 outline-none flex-1 placeholder-[#6c6a62]" />
              <button className="bg-[#c9a26a] text-white font-noah hover:bg-[#b38b50] w-[32%] text-xs uppercase tracking-[0.3em] flex items-center justify-center">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="text-[#6c6a62] text-sm font-noah text-center mt-8">
          <hr className="w-full border-[#6c6a62]"/>
          <div className="flex justify-center items-center gap-2 mt-5">
            <FaRegCopyright /><h1>Copyright 2025</h1>
          </div>
        </div>
      </footer>
   )
}

export default Footer
