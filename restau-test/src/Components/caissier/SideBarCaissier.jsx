import React from "react";
import { Link } from "react-router-dom";
import { Home, FileText, CreditCard, Settings } from "lucide-react";

const SideBarCaissier = () => {
  return (
    <div className="w-64 h-full bg-white shadow p-4">
      <nav className="flex flex-col gap-4">
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
          <Home /> Accueil
        </a>
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
          <FileText /> Historique
        </a>
        <Link to="/caissier/tickets"><CreditCard /> Paiements</Link>
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
          <Settings /> Paramètres
        </a>
      </nav>
    </div>
  );
};

export default SideBarCaissier;
