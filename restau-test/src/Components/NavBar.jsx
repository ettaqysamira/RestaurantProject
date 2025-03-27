import React, { useState } from "react";
import { Link } from 'react-router-dom';
import restaurantLogo from '../assets/logoRestaurant.png';
import { FaBellConcierge } from "react-icons/fa6";
import { BsTelephone } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = ({ orderItems }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="flex justify-between items-center font-noah fixed z-30 w-full shadow-md text-white bg-[#0e0d0c] h-[5rem] px-6 md:px-8 top-0">
      
      <div className="block md:hidden">
        <img src={restaurantLogo} alt="logo" className="w-20 md:w-28" />
      </div>

      <div className="hidden md:flex items-center justify-center w-full uppercase tracking-[0.3em] font-semibold text-xs ml-4 pl-20">
        <div className="flex gap-8">
          <Link to="/" className="hover:text-customColor">Accueil</Link>
          <Link to="/menucategorie" className="hover:text-customColor">Menu</Link>
          <Link to="/reservation" className="hover:text-customColor">Réservation</Link>
        </div>
        
        <div className="mx-8">
          <img src={restaurantLogo} alt="logo" className="w-24" />
        </div>

        <div className="flex gap-8">
          <Link to="/about" className="hover:text-customColor">À Propos</Link>
          <Link to="/contact" className="hover:text-customColor">Contact</Link>
          <Link to="/Panier" className="hover:text-customColor">Commande</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/panier", { state: { orderItems } })}>
          <FaBellConcierge size={24} />
        </button>
        <button>
          <BsTelephone size={22} />
        </button>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-[5rem] left-0 w-full bg-[#0e0d0c] text-white flex flex-col items-center gap-4 py-4 shadow-lg md:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
          <Link to="/menucategorie" onClick={() => setMenuOpen(false)}>Menu</Link>
          <Link to="/reservation" onClick={() => setMenuOpen(false)}>Réservation</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>À Propos</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/order" onClick={() => setMenuOpen(false)}>Commande</Link>
        </div>
      )}
    </nav>
  )
}

export default NavBar;
