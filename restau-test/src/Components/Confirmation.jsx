import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const _id = location.state?._id
        if (!_id) {
          navigate("/")
          return
        }
  
        const response = await fetch(`/api/orders/${_id}/ticket`)
        if (response.ok) {
          const data = await response.json()
          setTicket(data.ticket)
        } else {
          alert("Erreur lors de la récupération du ticket.")
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du ticket :", error)
        alert("Erreur serveur.")
      }
    }
  
    fetchTicket();
  }, [location.state?._id, navigate])
  

  if (!ticket) {
    return <p>Chargement du ticket...</p>
  }

  return (
    <div className="flex justify-center p-8 bg-gray-100 mt-20">
      <div className="w-3/5 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Ticket de commande</h2>
        <div className="mb-4">
          <p><strong>Numéro de ticket :</strong> {ticket.ticketNumber}</p>
          <p><strong>Table :</strong> {ticket.tableNumber || "N/A"}</p>
          <p><strong>Client :</strong> {ticket.clientName}</p>
          <p><strong>Statut de paiement :</strong> {ticket.paymentStatus}</p>
          <p><strong>Horodatage :</strong> {ticket.timestamp}</p>
          <p><strong>Mode de livraison :</strong> {ticket.deliveryOption}</p>
        </div>

        <h3 className="text-lg font-bold mb-2">Plats commandés :</h3>
        <ul>
          {ticket.items.map((item, index) => (
            <li key={index} className="flex justify-between py-2">
              <span>{item.name} x {item.quantity}</span>
              <span>{item.total} MAD</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Confirmation;
