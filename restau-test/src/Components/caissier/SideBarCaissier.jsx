import React from "react";
import { Link } from "react-router-dom";
import { Home, FileText, CreditCard, Settings } from "lucide-react";
import restaurantLogo from "../../assets/logoRestaurant.png";


const SideBarCaissier = () => {
  return (
    <div className="w-64 h-full bg-white shadow p-4">
      <nav className="flex flex-col gap-4">
        <img src={restaurantLogo} alt="" />
        <Link to="/caissier" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
          <Home /> Accueil
        </Link>
        <Link to="" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
          <FileText /> Historique
        </Link>
        <Link to="/caissier/tickets" className="flex items-center gap-2 text-gray-700 hover:text-blue-500"><CreditCard /> Paiements</Link>
        <Link to="" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
          <Settings /> Paramètres
        </Link>
      </nav>
    </div>
  );
};

export default SideBarCaissier;
