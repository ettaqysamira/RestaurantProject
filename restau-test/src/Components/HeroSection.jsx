import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Info } from "lucide-react"; 
import { Tickets } from 'lucide-react';
import { ChefHat } from 'lucide-react';
import '../ticket.css'
import { useParams } from "react-router-dom";


const HeroSection = () => {
  const { id } = useParams();
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");


  return (
    <div className="relative flex flex-col md:flex-row items-center bg-black text-white min-h-screen">
     
      <div className="md:w-1/2 w-full">
        <img
          src="https://img.freepik.com/photos-gratuite/chef-cuisinant-dans-cuisine-portant-tenue-professionnelle_23-2151208288.jpg?t=st=1742336851~exp=1742340451~hmac=4ab2f217c2840cb2f1e5a1a58c58fa71be3047b7848172a02e6f7efa09eaa3e4&w=740" 
          alt="Pasta Dish"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="md:w-1/2 w-full p-10 relative">
        <h1 className="absolute text-[250px] font-bold text-white/10 left-0 top-0 -z-10">
          C
        </h1>

        <h2 className="text-4xl font-light uppercase tracking-wide">L'Art de Cuisine avec {name} </h2>
        <p className="mt-4 text-gray-400">
        Maîtrisez chaque ingrédient, perfectionnez chaque plat et offrez une expérience inoubliable.  
        Ici, la passion et le savoir-faire se rencontrent pour sublimer chaque assiette.
        </p>

        <button className=" mt-4 px-2 py-2 border border-customColor text-white  hover:bg-customColor  w-56 text-xs font-noah uppercase tracking-[0.3em] font-semibold">
          Tickets
        </button>
      </div>

      <div className="absolute top-20 right-10 flex flex-col space-y-3 ">
        <button className=" besoin flex items-center ">
          <ChefHat size={18} className="mr-2" />
          Besoin d’ingrédients
        </button>

       
        <Link to={`/cuisinier/${userId}/tickets`} >
        <button className=" ticket flex items-center  text-black ">
          <Tickets size={18} className="mr-2" />
          Ticket du commande
        </button>
        </Link>
        
      </div>
      
    </div>
  )
}

export default HeroSection;
