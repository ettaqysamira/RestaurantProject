import React from "react";
import { Check, Printer } from "lucide-react";

const TicketCaissier = ({ _id, items, total,ticket }) => {

  const handlePaiement = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${_id}/pay`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "payé" }),
      });

      if (response.ok) {
        alert("Le statut de la commande a été mis à jour !");
      } else {
        alert("Erreur lors de la mise à jour du statut.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur serveur.");
    }
  };
  return (
    <div className="w-full p-4 bg-white shadow-md rounded-2xl mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">#{ticket.ticketNumber}</h3>
        <span className="text-sm text-gray-500">{new Date(ticket.timestamp).toLocaleString() || "Heure inconnue"}</span>
      </div>

      <p className="text-gray-700">
        Client : <strong>{ticket.clientName || "Inconnu"}</strong>
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
          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1"  onClick={handlePaiement}>
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
