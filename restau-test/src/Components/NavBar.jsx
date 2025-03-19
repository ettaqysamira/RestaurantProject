import React, { useState } from "react";
import { Link } from 'react-router-dom';
import restaurantLogo from '../assets/logoRestaurant.png';
import { FaBellConcierge } from "react-icons/fa6";
import { BsTelephone } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


const NavBar = ({ orderItems }) => {
    const [showOrders, setShowOrders] = useState(false)
    const navigate = useNavigate()

    const totalPrice = orderItems.reduce((total, item) => total + item.price, 0)
  return (
    <nav className="flex justify-center items-center font-noah fixed z-30 w-full shadow-md text-white bg-[#0e0d0c] h-[5rem] px-8 top-0">
      
      <div className="flex gap-8 items-center uppercase tracking-[0.3em] font-semibold text-xs">
        <Link to="/" className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-customColor after:transition-all after:duration-300 hover:after:w-full">accueil</Link>
        <Link to="/menucategorie"  className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-customColor after:transition-all after:duration-300 hover:after:w-full">menu</Link>
        <Link to="/reservation"  className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-customColor after:transition-all after:duration-300 hover:after:w-full">reservation</Link>
        <img src={restaurantLogo} alt="logo" className="w-32" />
        <Link to="/about "  className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-customColor after:transition-all after:duration-300 hover:after:w-full">à propos</Link>
        <Link to="/contact"   className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-customColor after:transition-all after:duration-300 hover:after:w-full">Contact</Link>
        <Link to="/order"  className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-customColor after:transition-all after:duration-300 hover:after:w-full">Commande</Link>
      </div>

     <div className="absolute right-8 flex gap-2">
      <button onClick={() => navigate("/panier", { state: { orderItems } })}>
          <FaBellConcierge size={24} />
        </button>
        <button>
          <BsTelephone size={22} />
        </button>
      </div>

      {showOrders && (
        <div className="absolute top-[4rem] right-8 bg-gray-800 text-white p-4 rounded-lg shadow-md w-64">
          <h3 className="text-lg font-semibold border-b pb-2">Votre Commande</h3>
          {orderItems.length === 0 ? (
            <p className="text-gray-400">Aucun plat sélectionné.</p>
          ) : (
            <ul className="mt-2">
              {orderItems.map((item, index) => (
                <li key={index} className="flex justify-between py-2 border-b">
                  <span>{item.name}</span>
                  <span className="text-yellow-400">{item.price} MAD</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-2 text-right font-semibold">
            Total : <span className="text-yellow-500">{totalPrice} MAD</span>
          </div>
        </div>
      )}
      
    </nav>
  )
}

export default NavBar
