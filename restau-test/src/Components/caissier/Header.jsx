import React from "react";

const HeaderCaissier = () => {
  return (
    <div className="w-full flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className="text-2xl font-bold text-gray-800">Espace Caissier</h1>
      <div className="flex gap-4 items-center">
        <span className="text-gray-600">Bienvenue, Samira</span>
        <button className="text-red-500 hover:underline">Déconnexion</button>
      </div>
    </div>
  );
};
export default HeaderCaissier;
