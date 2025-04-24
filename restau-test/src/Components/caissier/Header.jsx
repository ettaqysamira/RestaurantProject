import React from "react";
import { useNavigate } from "react-router-dom"; 

const HeaderCaissier = () => {
    const navigate = useNavigate(); 
    const name = localStorage.getItem("name");

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");

    navigate("/login");
  };
  return (
    <div className="w-full flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className="text-2xl font-bold text-gray-800">Caissier</h1>
      <div className="flex gap-4 items-center">
        <span className="text-gray-600">Bienvenue, {name}</span>
        <button className="text-red-500 hover:underline" onClick={handleLogout} >Déconnexion</button>
      </div>
    </div>
  );
};
export default HeaderCaissier;
