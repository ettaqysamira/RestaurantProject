import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../ticket.css";

const TicketsList2 = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState("");
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders")
        if (response.ok) {
          const orders = await response.json();
          const filteredTickets = orders.filter((order) => order.ticket)
          const sortedTickets = filteredTickets.sort((a, b) => {
            const orderPriority = {
              "en attente": 1,
              "en préparation": 2,
              "prêt à servir": 3,
            };
            return orderPriority[a.status] - orderPriority[b.status];
          })

          setTickets(sortedTickets);
        } else {
          console.error("Erreur lors de la récupération des tickets.")
        }
      } catch (error) {
        console.error("Erreur serveur :", error)
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrders((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }))
  }

  if (loading) return <p>Chargement des tickets...</p>;

  return (
    <div className="bg-[#1b1b1b] h-full">
      <div className="container mx-auto p-6 bg-[#1b1b1b]">
        <h2 className="text-3xl font-libre-caslon mb-4 text-center p-5 text-white font-light uppercase tracking-wide">
          Tickets des Commandes
        </h2>
        {alert && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg mb-4 z-50">
            <p>{alert}</p>
          </div>
        )}
        {tickets.length === 0 ? (
          <p className="text-white text-center">Aucun ticket disponible.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-y-12">
            {tickets.map((order) => {
              const isExpanded = expandedOrders[order._id];
              const itemsToShow = isExpanded
                ? order.ticket.items
                : order.ticket.items.slice(0, 2);

              return (
                <div key={order._id} className="card">
                  <div className="content">
                    {/* front div */}
                    <div className="front shadow-lg p-4 bg-[#e1ddd9]">
                      <label className="block text-black font-bold text-sm mb-2">
                        TICKET #{order.ticket.ticketNumber}
                      </label>
                      <div className="flex flex-col">
                        <div className="mb-4 flex items-center gap-2">
                          <span className="font-semibold text-black text-sm">
                            Table :
                          </span>
                          <p className="font-semibold text-black text-xs">
                            {order.ticket.tableNumber || "N/A"}
                          </p>
                        </div>
                        <hr className="border-t border-customColor" />
                        <div className="mb-4 flex items-center gap-2">
                          <span className="font-semibold text-black text-sm">
                            Client :
                          </span>
                          <p className="font-semibold text-black text-xs">
                            {order.ticket.clientName}
                          </p>
                        </div>
                        <hr className="border-t border-customColor" />
                        <div className="mb-4 flex items-center gap-2">
                          <span className="font-semibold text-black text-sm">
                            Statut de paiement :
                          </span>
                          <p className="font-semibold text-black text-xs">
                            {order.ticket.paymentStatus}
                          </p>
                        </div>
                        <hr className="border-t border-customColor" />
                        <div className="mb-4 flex items-center gap-2">
                          <span className="font-semibold text-black text-sm">
                            Date :
                          </span>
                          <p className="font-semibold text-black text-xs">
                            {new Date(order.ticket.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <hr className="border-t border-customColor" />
                        <h3 className="text-sm font-bold uppercase">
                          Détails du ticket
                        </h3>
                        <h4 className="font-bold mt-2">Plats commandés :</h4>
                      </div>

                      <ul className="list-disc ml-4">
                        {itemsToShow.map((item, index) => (
                          <li key={index} className="text-xs">
                            {item.name} x {item.quantity} - {item.total} MAD
                          </li>
                        ))}
                      </ul>

                      {order.ticket.items.length > 2 && (
                        <button
                          onClick={() => toggleExpand(order._id)}
                          className="text-blue-500 text-xs mt-2 underline"
                        >
                          {isExpanded ? "Voir moins" : "Voir plus"}
                        </button>
                      )}

                      <div className="bg-customColor p-3 flex justify-between items-center mt-4">
                        <span className="text-white text-lg font-bold">
                          Total Prix:
                        </span>
                        <span className="text-white text-xl font-bold">
                          {order.ticket.total} MAD
                        </span>
                      </div>
                    </div>

                    {/* back div*/}
                    <div className="back flex flex-col justify-center items-center p-4 text-white bg-[#333]">
                      <h3 className="text-xl font-semibold mb-4 text-white">
                        État de la commande
                      </h3>
                      <p className="text-sm text-white">{order.status}</p>
                      <Link
                        to={`/order-details/${order._id}`}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                      >
                        Voir détails
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default TicketsList2;
