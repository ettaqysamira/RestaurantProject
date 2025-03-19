import React from 'react';
import '../App.css'
import backgroundImage from "../assets/contactUs.jpg";

const Reservation = () => {
    return (
        <div className="relative">
            <div 
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="bg-black opacity-50 w-full h-full"></div>
            </div>

            <div className="relative z-10 flex justify-center items-center m-8 gap-16 py-14">
                <div className="w-[40%] box-border">
                    <h1 className="text-white">Réservez Maintenant</h1>
                </div>
                
                <div className="w-[30%] border flex flex-wrap justify-center gap-5 py-12 bg-[#E1DDD9] ">
                    <h1 className="font-libre-caslon font-normal text-[36px] leading-[45px] text-[#1B1B1B]">Faites une Réservation</h1>
                </div>
            </div>
        </div>
    );
}

export default Reservation;
