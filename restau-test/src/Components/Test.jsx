import React from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaBellConcierge } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";


import { FaArrowDown } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { GiSmartphone } from "react-icons/gi";
import { TfiEmail } from "react-icons/tfi";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { FaRegCopyright } from "react-icons/fa";





import backgroundImage from "../assets/contactUs.jpg";

const Test = () => {
  const [selected, setSelected] = useState("Persons")
  const [open, setOpen] = useState(false)

  const [selectedTime, setSelectedTime] = useState("Time")
  const [openTime, setOpenTime] = useState(false)

  const options = [
    { value: "1", label: "Person", disabled: true },
    { value: "1", label: "1 Person" },
    { value: "2", label: "2 People" },
    { value: "3", label: "3 People"},
    { value: "4", label: "4 People" },
    { value: "5", label: "5 People" },
    { value: "6", label: "6 People"},
    { value: "7", label: "7 People" },
  ];

  const times = [
    { value: "", label: "Time", disabled: true },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "14:00", label: "14:00 PM" },
    { value: "18:00", label: "18:00 PM" },
    { value: "20:00", label: "20:00 PM" },
  ];

  return (
    <>
   
   <div
        className="fixed inset-0 bg-cover bg-center top-0 right-0 z-1 "
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70" />
      </div>
   

      <section > 
<div className="sticky top-0">
    <div className=" relative h-screen flex flex-col justify-center items-center text-white text-center">
     
      <div className="relative z-10 pb-9 w-96 flex flex-wrap justify-center items-center">
      <h5 className="text-xs font-noah ml-4 uppercase tracking-[0.9em] font-semibold">Location</h5>

        <h1 className="text-7xl font-libre-caslon p-4 rounded-lg">Contact Us</h1>
        <h2 className="text-3xl font-libre-caslon p-4 rounded-lg text-customColor">
          Get In Touch
        </h2>
      </div>

      <div className="absolute bottom-0 mb-8 flex justify-center items-center border border-b-1 rounded-full w-11 h-11 animate-[bounce_2s_infinite]">
  <FaArrowDown />
</div>
    </div>
    </div>
      </section>
   
      <section >
        <div className="sticky top-0 bg-white py-10">
        <div className="flex justify-center p-28 gap-4 ">
        <div className="w-80  border border-b-2 flex items-center gap-8 p-8 bg-[#E1DDD9]">
            <IoLocationOutline size={50} className="text-[#B3925A]" />
            <div >
            <h1 className="text-2xl font-libre-caslon font-normal text-[#1b1b1b] leading-[30px] mb-2">Address</h1>

            <h2 className="font-noah font-normal text-[#777777] text-[13px] leading-[26px]">Rue kadi Lass, Maarif</h2>
            <h2  className="font-c font-normal text-[#777777] text-[20px] leading-[24px]">Morocco</h2>
            </div>
            
        </div>

        
        <div className="w-80  border border-b-2 flex items-center gap-8 p-8 bg-[#E1DDD9]">
            <GiSmartphone size={50} className="text-[#B3925A]" />
            <div >
            <h1 className="text-2xl font-libre-caslon font-normal text-[#1b1b1b] leading-[30px] mb-2">Phone</h1>
            <h2 className="font-noah font-normal  text-[20px] leading-[26px] text-[#B3925A]">+2125 28 54 62 48</h2>
            </div>
           
        </div>

        <div className="w-80  border border-b-2 flex items-center gap-8 p-8 bg-[#E1DDD9]">
            <TfiEmail size={50} className="text-[#B3925A]" />
            <div >
            <h1 className="text-2xl font-libre-caslon font-normal text-[#1b1b1b] leading-[30px] mb-2">Email</h1>

            <h2 className="font-noah font-normal text-[#777777] text-[13px] leading-[26px]">bistrorestaurant@gmail.com</h2>
            </div>
            
        </div>
    </div>


    <div className="flex justify-center gap-6 m-8 ">
        <div className="w-1/3 h-36 flex flex-wrap ">
            <h5 className="text-xs font-noah ml-4 uppercase tracking-[0.5em] font-semibold text-customColor">Bistro Restaurant</h5>
            <h1 className="text-[48px] font-libre-caslon p-4  " >Get in touch</h1>
            <h4 className="font-noah font-normal text-[#777777] text-[15px] leading-[26px] ml-4">Feel free to contact us?You have a piece of advice or a suggestion that you would like to share with us?</h4>
        </div>
    <div className="w-2/5  bg-[#E1DDD9] flex flex-wrap justify-center gap-5  py-12 z-20">
        <input type="text" placeholder="Name" className="w-2/5 h-[50px] border placeholder-black p-2"/>
        <input type="text" placeholder="Phone" className="w-2/5 h-[50px] border placeholder-black p-2" />
        <input type="email" placeholder="Email" className="w-2/5 h-[50px] border placeholder-black p-2" />
        <input type="text" placeholder="Subject" className="w-2/5 h-[50px] border placeholder-black p-2 " />
        <textarea placeholder="Message" className="border w-[84%] placeholder-black p-2 h-28"></textarea>
        <input type="submit" value="Send Message" className="text-xs font-noah  uppercase tracking-[0.3em] font-semibold bg-customColor text-white w-[84%] h-[48px]"/>
    </div>
    </div>
        </div>

</section>

<section className=""

>

<div className="flex justify-center items-center m-8 gap-16  sticky top-0 py-14">

{/*div1*/}
<div className="w-[40%] box-border">
<div className="flex mb-4 ">
<IoStar size={24} className="text-customColor" />
<IoStar size={24} className="text-customColor" />
<IoStar size={24} className="text-customColor" />
<IoStar size={24} className="text-customColor" />
<IoStar size={24} className="text-customColor" />

</div>
<p className="text-[27px] font-libre-caslon text-white">A modern restaurant with a menu that will make your mouth water.</p>

<div className="flex flex-wrap items-center w-[60%] gap-6 mt-10">
<div><FaBellConcierge  size={50} className="text-customColor"/></div>
<div>
  <h4 className="text-xs font-noah ml-4 uppercase tracking-[0.5em] font-semibold text-customColor">Reservation</h4>
  <h2 className="font-libre-caslon text-[24px] text-white">+2125 28 54 62 48</h2>
</div>
<div className="flex items-center"><MdOutlineDone  className="text-white"/><h5 className="text-white">Call, Us</h5></div>

</div>

</div>

{/*div2*/}

 <div className="w-[30%] border flex flex-wrap justify-center gap-5 py-12 bg-[#E1DDD9] ">
        <div className="mb-6">
        <h1 className="mb-6 font-libre-caslon font-normal text-[36px] leading-[45px] text-[#1B1B1B]">Make a Reservation</h1>
        <hr className="border-customColor w-full" />
        </div>
    
      <div className="flex flex-wrap gap-8 justify-center ">
      <input type="text" placeholder="Your Name" className="placeholder-black h-[50px] p-2 w-[40%] border" />
    <input type="text" placeholder="Phone" className="placeholder-black h-[50px] p-2 w-[40%]" />
    <input type="email" placeholder="Email Address" className="placeholder-black h-[50px] p-2 w-[40%]" />
    <input type="date" placeholder="Date" className="placeholder-black h-[50px] p-2 w-[40%]" />

    <div className="relative w-[40%]">
    <div
      className="border p-2 h-[50px] bg-white cursor-pointer flex justify-between items-center"
      onClick={() => setOpen(!open)}
    >
      <span>{selected}</span>
      <span className="text-gray-500"><IoIosArrowDown /></span>
    </div>

    {open && (
      <ul className="absolute left-0 w-full bg-white border mt-1 shadow-lg z-10">
        {options.map((option) => (
          <li
            key={option.value}
            className={`p-2 cursor-pointer hover:bg-customColor hover:text-white ${option.disabled ? "text-white bg-customColor cursor-not-allowed" : ""}`}

            onClick={() => {
              setSelected(option.label);
              setOpen(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    )}
  </div>



  <div className="relative w-[40%]">
      <div
        className="border p-2 h-[50px] bg-white cursor-pointer flex justify-between items-center"
        onClick={() => setOpenTime(!openTime)}
      >
        <span>{selectedTime}</span>
        <span className="text-gray-500"><IoIosArrowDown /></span>
      </div>

      {openTime && (
        <ul className="absolute left-0 w-full bg-white border mt-1 shadow-lg z-10">
          {times.map((option) => (
            <li
              key={option.value}
              className={`p-2 cursor-pointer hover:bg-customColor hover:text-white ${option.disabled ? "text-white bg-customColor cursor-not-allowed" : ""}`}

              onClick={() => {
                if (!option.disabled) {
                  setSelectedTime(option.label);
                  setOpenTime(false);
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
    <input type="submit" value="Check Availability" className="text-xs font-noah  uppercase tracking-[0.3em] font-semibold bg-customColor text-white w-[87%] h-[48px]"/>
      </div>
  </div>
  
        {/* fin reservation */}
</div>

</section>

<section>
    <div  className="bg-[#1b1b1b] sticky top-0 flex justify-center  gap-8 pt-24 pb-16 flex-wrap">
      <div className="flex justify-center  gap-8  flex-wrap">
      <div className="w-[20%]">
            <h1 className="text-3xl font-libre-caslon text-customColor my-5">About Us</h1>
            <p className="text-[#6c6a62] text-sm font-noah ">The Bistro restaurant provides a warm and inviting ambiance where guests can savor delicious cuisine. Its elegant atmosphere, paired with exceptional service, ensures a memorable dining experience.</p>
        </div>

        <div className="w-[20%] text-start ml-10">
            <h1 className="text-3xl font-libre-caslon text-customColor my-5">Contact Info</h1>
            <p className="text-[#6c6a62]">Rue kadi Lass, Maarif, Morocco</p>
            <h1 className="text-white font-libre-caslon text-2xl my-4">+2125 28 54 62 4</h1>
            <h5 className="text-[#6c6a62] text-[15px]">bistrorestaurant@gmail.com</h5>
            <hr className="w-[75%]"/>
            <div className="text-white flex gap-2 my-4">
              <Link to=""><FaInstagram size={20} /></Link>
              <Link to=""><FaXTwitter size={20} /></Link>
              <Link to=""><CiFacebook size={22} /></Link>
            </div>
        </div>

        <div className="w-[25%]">
            <h1 className="text-3xl font-libre-caslon text-customColor my-5" >Subscribe</h1>
            <p  className="text-[#6c6a62] text-sm font-noah ">Want to be notified when we launch a new template or an udpate. Just sign up and we'll send you a notification by email.</p>

            <div className="flex border border-customColor w-full p-1 h-11 my-5">
        <input type="email" placeholder="Your email"   className="bg-[#1a1a1a] text-white px-2 py-2 outline-none flex-1 placeholder-[#6c6a62]  w-[60%]" />
        <button className="bg-[#c9a26a] text-white font-noah  hover:bg-[#b38b50] w-[32%] text-xs  uppercase tracking-[0.3em] flex items-center justify-center text-[10px]">Subscribe</button>
    </div>
   
        </div>
      </div>
        
        
    <div className="text-[#6c6a62] text-sm font-noah "><hr className="w-screen border-[#6c6a62]"/>
    <div className="flex items-center gap-2 ml-48 mt-11">
    <FaRegCopyright /><h1>Copyright 2025</h1>
    </div>
   </div>
    </div>
    
</section>
    </>
  )
}

export default Test;
