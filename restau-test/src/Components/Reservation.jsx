import React from 'react';
import { useState } from "react";
import { IoStar } from "react-icons/io5";
import { FaBellConcierge } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import backgroundImage from "../assets/contactUs.jpg";


const Reservation = () => {

    const [selected, setSelected] = useState( "Persons")
      const [open, setOpen] = useState(false)
    
      const [selectedTime, setSelectedTime] = useState("Time")
      const [openTime, setOpenTime] = useState(false)
    
      const options = [
        { value: "1", label: "Person", disabled: true } ,
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
      ]



    return(
        <>
         <div
                className="fixed inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})`, zIndex: -1 }}
              />
              
             
              <div className="fixed inset-0 bg-black opacity-50 z-0" />
        <div className="flex justify-center items-center  gap-16  py-28  z-10"        
        >
        
        {/*div1*/}
        <div className="w-[40%] box-border z-20">
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
        
         <div className="w-[30%] border flex flex-wrap justify-center gap-5 py-12 bg-[#E1DDD9]  z-20">
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
                      setSelected(option.label)
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
                          setSelectedTime(option.label)
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
          </div>

          
        </>
    )
}


export default Reservation