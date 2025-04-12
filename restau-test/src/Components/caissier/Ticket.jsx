import React from "react";
import { Check, Printer } from "lucide-react";

const TicketCaissier = ({ _id, time, name, items, total }) => {
  return (
    <div className="w-full p-4 bg-white shadow-md rounded-2xl mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">Ticket #{_id?.slice(-6)}</h3>
        <span className="text-sm text-gray-500">{time || "Heure inconnue"}</span>
      </div>

      <p className="text-gray-700">
        Client : <strong>{name || "Inconnu"}</strong>
      </p>

      <ul className="my-2 text-gray-800 list-disc list-inside">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item, index) => (
            <li key={index}>
              {item.name} x {item.quantity} — {item.price} DH
            </li>
          ))
        ) : (
          <li>Aucun article</li>
        )}
      </ul>

      <div className="flex justify-between items-center mt-3">
        <span className="font-bold text-green-600">Total : {total} DH</span>
        <div className="flex gap-2">
          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1">
            <Check size={16} /> Payé
          </button>
          <button className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 flex items-center gap-1">
            <Printer size={16} /> Imprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCaissier;
