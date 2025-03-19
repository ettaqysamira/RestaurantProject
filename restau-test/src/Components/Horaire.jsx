import React from 'react';
import backgroundImage from "../assets/contactUs.jpg";

const Horaire = () => {
    return (
        <>
         
              <div
                className="fixed inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})`, zIndex: -1 }}
              />
              
              <div className="fixed inset-0  z-0" />
        
      <section className=" px-6 py-12 relative z-10 bg-transparent w-screen h-screen  ">
        
        <div className="bg-[#19191a] text-white px-8 py-11 max-w-md float-right mr-36  ">
      <h2 className="text-4xl font-libre-caslon font-normal text-white  leading-[45px] text-center">Heures d'ouverture</h2>
      <div className="mt-4 flex justify-between pb-4">
        <div className="text-center">
          <h3 className="text- font-noah">De dimanche à mardi</h3>
          <p className="text-2xl mt-1 font-libre-caslon text-[#6c6a62]">10:00</p>
          <p className="text-2xl font-libre-caslon text-[#6c6a62]">22:00</p>
        </div>
        <div className="border-l border-gray-700 h-16 mx-4"></div>
        <div className="text-center">
          <h3 className="text-lg font-medium">De vendredi à samedi</h3>
          <p className="text-2xl mt-1 font-libre-caslon text-[#6c6a62]">12:00</p>
          <p className="text-2xl font-libre-caslon text-[#6c6a62]">19:00</p>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button className="px-6 py-2 border border-customColor text-white mb-4  hover:bg-[#808000]">
          FAIRE UNE RESERVATION
        </button>
      </div>
      <p className="mt-4 text-center text-sm text-[#6c6a62]">
      
      Vous pouvez aussi appeler:<span className="text-customColor font-medium"> 05 28 54 62 48</span> pour faire une réservation.
      </p>
      <p className="mt-2 text-center text-sm flex justify-center items-center text-[#6c6a62]">
        Rue kadi Lass, Maarif, Grand Casablanca, Maroc
      </p>
    </div>
        </section>
           
        </>
    )
}



export default Horaire;