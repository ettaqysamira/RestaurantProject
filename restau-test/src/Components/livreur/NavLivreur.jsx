import React from "react";
import { Bell, Settings, Grid, Calendar, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 


const NavLivreur = () => {
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("userId");
      const navigate = useNavigate(); 
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("userId");
    
        navigate("/login");
      };
  return (
    <nav className="bg-black h-16 w-full flex justify-end items-center px-6 shadow-md fixed top-0 z-50">
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-white">
          <Settings className="w-5 h-5 cursor-pointer" />
          <div className="relative">
            <Link to="livreurcompo"><Mail className="w-5 h-5 cursor-pointer"  /></Link>
            
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </div>
          <Link to={`/livreur/${userId}`} className="hover:text-[#808000]"> <Grid className="w-5 h-5 cursor-pointer hover:bg-[]" /></Link>
         
          <Bell className="w-5 h-5 cursor-pointer" />
          <img
            src="https://flagcdn.com/us.svg"
            alt="Lang"
            className="h-5 w-5 rounded-sm object-cover"
          />
          <button className="bg-[#c19d60]/50 text-white text-sm px-3 py-1 rounded-md hover:bg-[#3A4A6A]" onClick={handleLogout}> 
            LOGOUT
          </button>
        </div>

        <div className="flex items-center gap-2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/007/787/059/non_2x/delivery-rider-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg"
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-white text-xs leading-tight">
            <p className="font-semibold">{name || "Livreur"}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavLivreur;
