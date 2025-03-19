import React, { useEffect, useState } from "react";
import '../ticket.css'; 

const TicketsList = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch( "http://localhost:5000/api/orders")
        if (response.ok) {
          const orders = await response.json()
          const filteredTickets = orders.filter(order => order.ticket)
          setTickets(filteredTickets)
        } else {
          console.error("Erreur lors de la récupération des tickets.")
        }
      } catch (error) {
        console.error("Erreur serveur :", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  if (loading) return <p>Chargement des tickets...</p>

  return (
    <div className="bg-[#1b1b1b] h-full">
    <div className="container mx-auto p-6 bg-[#1b1b1b]">
      <h2 className="text-3xl font-libre-caslon mb-4 text-center p-5 text-white font-light uppercase tracking-wide">Tickets des Commandes</h2>
      { tickets.length === 0 ? (
        <p>Aucun ticket disponible.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-y-12">
          { tickets.map((order) => (
            <div key={order._id} className="card">
              <div className="content">
                <div className="front  shadow-lg p-4 bg-[#e1ddd9]">
                  <div className="mb-4">
                    <span className="font-semibold text-black text-sm">BISTRO restaurant</span>
                    <p className="font-semibold text-black text-xs">Rue kadi Lass, Maarif</p>
                    <p className="font-semibold text-black text-xs">Maroc</p>
                  </div>
                  <label className="block text-black font-bold text-sm mb-2">TICKET #{order.ticket.ticketNumber}</label>
                  <div className="flex flex-col">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="font-semibold text-black text-sm">Table :</span>
                      <p className="font-semibold text-black text-xs">{order.ticket.tableNumber || "N/A"}</p>
                    </div>
                    <hr className="border-t border-customColor " />
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
                      <span className="font-semibold text-black text-sm">Mode de livraison :</span>
                      <p className="font-semibold text-black text-xs">{order.ticket.deliveryOption}</p>
                    </div>
                    <h3 className="text-sm  font-bold uppercase">Détails du ticket</h3>
                  <h4 className="font-bold mt-2">Plats commandés :</h4>
                  <ul className="list-disc ml-4">
                    {order.ticket.items.map((item, index) => (
                      <li key={index} className="text-xs">{item.name} x {item.quantity} - {item.total} MAD</li>
                    ))}
                  </ul>
                    <div className="bg-customColor p-3 flex justify-between items-center mt-4">
                      <span className="text-white text-lg font-bold">Total Prix:</span>
                      <span className="text-white text-xl font-bold">{order.ticket.total} MAD</span>
                    </div>
                  </div>
                </div>

                <div className="back flex flex-col justify-center items-center p-4 bg-gray-900 text-white ">
                  <h3 className="text-xl font-semibold mb-4 text-[#1b1b1b] ">L'état du commande</h3>
                  <button className="px-2 py-2 border border-[#1b1b1b] text-white  hover:bg-[#1b1b1b]  w-56 text-xs font-noah uppercase tracking-[0.3em] font-semibold h-[3.2rem]">
                        en Préparation 
                    </button>
                    <button className="mt-3 px-2 py-2 border border-[#1b1b1b] text-white  hover:bg-[#1b1b1b]  w-56 text-xs font-noah  uppercase tracking-[0.3em] font-semibold h-[3.2rem]">
                        Prêt à servir
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) }
    </div>
    </div>
    
  )
}

export default TicketsList;
