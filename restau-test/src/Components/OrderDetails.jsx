import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/${id}`)
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch((error) => console.error("Erreur :", error))
  }, [id])

  if (!order) return <p>Chargement des détails...</p>

  const subtotal = order.ticket.items.reduce((acc, item) => acc + item.total, 0)
  const discount = order.discount || 0 
  const tax = order.tax || 0
  const finalTotal = subtotal - discount

  return (
    <div className="container mx-auto p-4 mt-16">
      <div className="bg-yellow-50 shadow-lg rounded-t-lg p-4">
        <label className="block text-black font-bold text-sm mb-2">
          BISTRO Restaurant
        </label>
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="font-semibold text-black text-sm">Commande :</span>
            <p className="font-semibold text-black text-xs">Ticket #{order.ticket.ticketNumber}</p>
            <p className="font-semibold text-black text-xs">Table : {order.ticket.tableNumber || "N/A"}</p>
            <p className="font-semibold text-black text-xs">Client : {order.ticket.clientName}</p>
            <p className="font-semibold text-black text-xs">Statut : {order.status}</p>
          </div>

          <hr className="border-t border-customColor" />

          <div className="mb-4">
            <span className="font-semibold text-black text-sm">MÉTHODE DE PAIEMENT</span>
            <p className="font-semibold text-black text-xs">{order.ticket.paymentMethod || "Non spécifié"}</p>
            <p className="font-semibold text-black text-xs">{order.ticket.paymentStatus}</p>
          </div>

          <hr className="border-t border-customColor" />

          <div className="mb-4">
            <span className="font-semibold text-black text-sm">Plats commandés :</span>
            <ul className="list-disc ml-4">
              {order.ticket.items.map((item, index) => (
                <li key={index} className="text-xs">
                  {item.name} x {item.quantity} - {item.total} MAD
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-t border-customColor" />

          <div className="mb-4">
            <span className="font-semibold text-black text-sm">PAYER</span>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-semibold text-xs">Sous-total :</span>
              <span className="font-semibold text-xs">{subtotal.toFixed(2)} MAD</span>
              <span className="font-semibold text-xs">Réduction :</span>
              <span className="font-semibold text-xs">-{discount.toFixed(2)} MAD</span>
              <span className="font-semibold text-xs">Taxe :</span>
              <span className="font-semibold text-xs">+{tax.toFixed(2)} MAD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#808000] rounded-b-lg p-4 flex justify-between items-center">
        <label className="text-white text-xl font-bold">
          Total : {finalTotal.toFixed(2)} MAD
        </label>
        <Link to="/cuisinier/tickets">
        <button className="bg-black text-white rounded-md px-6 h-9 shadow-md hover:bg-black transition duration-200">
          OK
        </button>
        </Link>
       
      </div>
    </div>
  )
}

export default OrderDetails
