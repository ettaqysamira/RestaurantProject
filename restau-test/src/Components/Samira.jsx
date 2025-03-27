import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../ticket.css'; 

const Samira = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        if (response.ok) {
          const orders = await response.json();
          
          // Affichez la réponse de l'API pour vérifier la structure des données
          console.log(orders);

          // Vérifiez si les commandes ont un champ ticket
          const filteredTickets = orders.filter(order => order.ticket);

          // Affichez les tickets filtrés pour vérifier qu'ils existent
          console.log("Tickets filtrés:", filteredTickets);

          // Assurez-vous que les tickets existent
          if (filteredTickets.length === 0) {
            console.log("Aucun ticket trouvé.");
          }

          const sortedTickets = filteredTickets.sort((a, b) => {
            const orderPriority = {
              "en attente": 1,
              "en préparation": 2,
              "prêt à servir": 3,
            };

            return orderPriority[a.status] - orderPriority[b.status];
          });

          setTickets(sortedTickets);
        } else {
          console.error("Erreur lors de la récupération des tickets.");
        }
      } catch (error) {
        console.error("Erreur serveur :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        setTickets(prevTickets =>
          prevTickets.map(ticket =>
            ticket._id === orderId ? { ...ticket, status: newStatus } : ticket
          )
        );
        setAlert(`Le statut de la commande a été changé en : ${newStatus}`);
        setTimeout(() => setAlert(""), 3000);
      } else {
        console.error("Erreur lors de la mise à jour du statut.");
        setAlert("Erreur lors de la mise à jour du statut.");
        setTimeout(() => setAlert(""), 3000);
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
      setAlert("Erreur serveur lors de la mise à jour du statut.");
      setTimeout(() => setAlert(""), 3000);
    }
  };

  if (loading) return <p>Chargement des tickets...</p>;

  return (
    <div className="bg-[#1b1b1b] h-full">
      <div className="container mx-auto p-6 bg-[#1b1b1b]">
        <h2 className="text-3xl font-libre-caslon mb-4 text-center p-5 text-white font-light uppercase tracking-wide">Tickets des Commandes</h2>
        {alert && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg mb-4 z-50">
            <p>{alert}</p>
          </div>
        )}
        {tickets.length === 0 ? (
          <p>Aucun ticket disponible.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-y-12">
            {tickets.map((order) => (
              <div key={order._id} className="card">
                <div className="content">
                  <div className="front shadow-lg p-4 bg-[#e1ddd9]">
                    <div className="flex gap-x-11">
                      <div className="mb-4">
                        <span className="font-semibold text-black text-sm">BISTRO restaurant</span>
                        <p className="font-semibold text-black text-xs">Rue kadi Lass, Maarif</p>
                        <p className="font-semibold text-black text-xs">Maroc</p>
                      </div>
                      <div className="flex justify-center h-9">
                        <p
                          className={`text-xs font-semibold flex items-center rounded-md w-28 justify-center
                            ${order.status === "prêt à servir" ? "bg-[#808000] text-black" : ""}
                            ${order.status === "en préparation" ? "bg-blue-950 text-black" : ""}
                            ${order.status === "en attente" ? "bg-[#610816] text-black" : ""}
                            ${!order.status ? "bg-gray-400 text-white" : ""}`}
                        >
                          {order.status || "Non défini"}
                        </p>
                      </div>
                    </div>

                    {order.ticket && (
                      <>
                        <label className="block text-black font-bold text-sm mb-2">TICKET #{order.ticket.ticketNumber}</label>
                        
                        <div className="flex flex-col">
                          <div className="mb-4 flex items-center gap-2">
                            <span className="font-semibold text-black text-sm">Table :</span>
                            <p className="font-semibold text-black text-xs">{order.ticket.tableNumber || "N/A"}</p>
                          </div>
                          <hr className="border-t border-customColor" />
                          <div className="mb-4 flex items-center gap-2">
                            <span className="font-semibold text-black text-sm">Client :</span>
                            <p className="font-semibold text-black text-xs">{order.ticket.clientName}</p>
                          </div>
                          <hr className="border-t border-customColor" />
                          <div className="mb-4 flex items-center gap-2">
                            <span className="font-semibold text-black text-sm">Statut de paiement :</span>
                            <p className="font-semibold text-black text-xs">{order.ticket.paymentStatus}</p>
                          </div>
                          <hr className="border-t border-customColor" />
                          <div className="mb-4 flex items-center gap-2">
                            <span className="font-semibold text-black text-sm">Date :</span>
                            <p className="font-semibold text-black text-xs">{new Date(order.ticket.timestamp).toLocaleString()}</p>
                          </div>
                          <hr className="border-t border-customColor" />
                          <div className="mb-4 flex items-center gap-2">
                            <span className="font-semibold text-black text-sm">Type de Commande :</span>
                            <p className="font-semibold text-black text-xs">{order.ticket.deliveryOption}</p>
                          </div>
                          <h3 className="text-sm font-bold uppercase">Détails du ticket</h3>
                          <h4 className="font-bold mt-2">Plats commandés :</h4>
                          <ul className="list-disc ml-4">
                            {order.ticket.items.slice(0, 2).map((item, index) => (
                              <li key={item.id || index} className="text-xs">{item.name} x {item.quantity} - {item.total} MAD</li>
                            ))}
                            {order.ticket.items.length > 2 && <li className="text-xs font-semibold">...</li>}
                          </ul>
                          
                          <div className="bg-customColor p-3 flex justify-between items-center mt-4">
                            <span className="text-white text-lg font-bold">Total Prix:</span>
                            <span className="text-white text-xl font-bold">{order.ticket.total} MAD</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="back flex flex-col justify-center items-center p-4  text-white">
                    <h3 className="text-xl font-semibold mb-4 text-[#1b1b1b]">L'état du commande</h3>
                    <Link to={`/order-details/${order._id}`}>
                    <button className="px-3 py-2 border border-[#1b1b1b] text-white hover:bg-[#1b1b1b] w-56 text-xs font-noah uppercase tracking-[0.3em] font-semibold h-[3.2rem] mb-3">
                      Détails
                    </button>
                    </Link>
                    
                    <button className="px-2 py-2 border border-[#1b1b1b] text-white hover:bg-[#1b1b1b] w-56 text-xs font-noah uppercase tracking-[0.3em] font-semibold h-[3.2rem]" onClick={() => updateOrderStatus(order._id, "en préparation")}>
                      en Préparation
                    </button>
                    <button className="mt-3 px-2 py-2 border border-[#1b1b1b] text-white hover:bg-[#1b1b1b] w-56 text-xs font-noah uppercase tracking-[0.3em] font-semibold h-[3.2rem]" onClick={() => updateOrderStatus(order._id, "prêt à servir")}>
                      Prêt à servir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Samira;
