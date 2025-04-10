import React from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";

const TicketLivree = () => {
  const location = useLocation();
  const { order: selectedOrder } = location.state || {};

  if (!selectedOrder) {
    return <p className="text-black">Aucune commande sélectionnée.</p>;
  }

  const generatePDF = () => {
    const element = document.getElementById("order-details");
    const opt = {
      margin: 0.5,
      filename: `commande_${selectedOrder.ticket.ticketNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="bg-[#171819] h-screen">
        <div className="container mx-auto p-4 relative top-28 ">
      <div id="order-details">
        <div className="bg-yellow-50 shadow-lg  p-4">
          <label className="block text-black font-bold text-sm mb-2">
            BISTRO Restaurant
          </label>
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="font-semibold text-black text-sm">Commande :</span>
              <p className="font-semibold text-black text-xs">Ticket #{selectedOrder.ticket.ticketNumber}</p>
              <p className="font-semibold text-black text-xs">Client : {selectedOrder.ticket.clientName}</p>
              <p className="font-semibold text-black text-xs">Adresse : {selectedOrder.ticket.address}</p>
              <p className="font-semibold text-black text-xs">Statut : {selectedOrder.status}</p>
              <p className="font-semibold text-black text-xs">
                Méthode de Paiement : {selectedOrder.ticket.paymentMethod}
              </p>
              <p className="font-semibold text-black text-xs">
                Notes client : {selectedOrder.clientNotes || "Aucune note disponible."}
              </p>
            </div>

            <hr className="border-t border-customColor" />

            <div className="mb-4">
              <span className="font-semibold text-black text-sm">Plats commandés :</span>
              <ul className="list-disc ml-4">
                {selectedOrder.ticket.items.map((item, index) => (
                  <li key={index} className="text-xs">
                    {item.name} x {item.quantity} - {item.total.toFixed(2)} MAD
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-customColor  p-4 flex justify-between items-center">
          <label className="text-white text-xl font-bold">
            Total : {selectedOrder.ticket.total.toFixed(2)} MAD
          </label>
          <button
            onClick={generatePDF}
            className="bg-[#808000] flex justify-center items-center text-black  px-6 h-9 shadow-md hover:bg-[#808000] transition duration-200"
          >
            Télécharger Ticket
          </button>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default TicketLivree;
