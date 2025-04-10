import React from "react";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom"; 



const LivreurSide = () => {
  const {id} = useParams();  
      const [orders, setOrders] = useState([]);
      const [selectedOrder, setSelectedOrder] = useState(null);
      const navigate = useNavigate(); 

    
   useEffect(() => {
          const fetchOrders = async () => {
              try {3
                  const response = await fetch("http://localhost:5000/api/orders/encours")
                  const data = await response.json()
                  const deliveryOrders = data.filter(order => 
                      order.deliveryOption === "delivery" && (
                          (order.status === "prêt à servir") || 
                          (order.status === "en cours" && order.livreurId === id))
                  );
                  
                  setOrders(deliveryOrders)
              } catch (error) {
                  console.error("Erreur lors de la récupération des commandes :", error)
              }
          }
  
          fetchOrders()
      }, [id])
     
      
  
      const handleOrderClick = (order) => {
        navigate(`/livreur/${id}/ticket-details-livrée`, { state: { order } }); 
      };
  
      const updateOrderStatus = async (orderId, newStatus) => {
          try {
              const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ status: newStatus }),
              });
  
              if (response.ok) {
                  const updatedOrder = await response.json();
                  setOrders(orders.map(order =>
                      order._id === orderId ? updatedOrder.order : order
                  ));
                  if (selectedOrder && selectedOrder._id === orderId) {
                      setSelectedOrder(updatedOrder.order);
                  }
              } else {
                  console.error("Erreur lors de la mise à jour du statut :", response.statusText);
              }
          } catch (error) {
              console.error("Erreur lors de la mise à jour du statut :", error);
          }
      };
  
      const acceptOrder = async (orderId) => {
          try {
              const response = await fetch(`http://localhost:5000/api/orders/${orderId}/accept`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ livreurId: id, status: "en cours" }),
              });
      
              if (response.ok) {
                  const updatedOrder = await response.json();
      
                  setOrders(prevOrders =>
                      prevOrders.map(order =>
                          order._id === orderId
                              ? { ...order, status: "en cours", livreurId: id }
                              : order
                      )
                  );
              } else {
                  console.error("Erreur lors de l'acceptation de la commande :", response.statusText);
              }
          } catch (error) {
              console.error("Erreur lors de l'acceptation de la commande :", error);
          }
      };

  return (
   <div className=" bg-[#171819] h-screen">
     <div className="bg-black text-white p-6 rounded-md w-full max-w-6xl mx-auto relative top-28">
      <h2 className="text-lg font-semibold mb-4">Mes COMMANDES</h2>
      <div className="overflow-x-auto">
      {orders.length === 0 ? (
                <p>Aucune commande de livraison à afficher.</p>
            ) : (
        <table className="w-full text-left text-sm">
          <thead className="text-gray-400 border-b border-customColor">
            <tr>
              <th className="py-2 px-4">Numéro de Commande</th>
              <th className="py-2 px-4">Client</th>
              <th className="py-2 px-4">Total (MAD)</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
              <th className="py-2 px-4">Ticket Détails</th>
            </tr>
          </thead>
          <tbody>
          {orders.map(order => (
              <tr key={order._id} className="border-b border-customColor hover:bg-gray-800">
                <td className="py-2 px-4">{order.ticket.ticketNumber}</td>
                <td className="py-2 px-4">{order.ticket.clientName}</td>
                <td className="py-2 px-4">{order.ticket.total.toFixed(2)}</td>
                <td className="py-2 px-4">{order.status}</td>
                <td className="py-2 px-4">
                <div className='flex justify-center gap-4'>    
                    <button onClick={() => acceptOrder(order._id)} className='bg-red-600 text-white px-2 py-1 rounded w-40  '>Accepter</button>
                    <button onClick={() => updateOrderStatus(order._id, "livrée")} className="bg-green-500 text-white px-2 py-1 rounded w-40">Livrée</button>
                    </div>
                </td>
                <td className="py-2 px-4 font-semibold"><button onClick={() => handleOrderClick(order)} className="bg-blue-500 text-white px-2 py-1 rounded w-40">Tickets</button></td>
              </tr>
             ))}
          </tbody>
        </table>
            )}

{selectedOrder && (
                <div className="mt-4">
                    <h3 className="text-xl font-bold">Détails de la Commande</h3>
                    <p>Numéro de Commande : {selectedOrder.ticket.ticketNumber}</p>
                    <p>Client : {selectedOrder.ticket.clientName}</p>
                    <p>Total : {selectedOrder.ticket.total.toFixed(2)} MAD</p>
                    <p>Status : {selectedOrder.status}</p>
                    <p>Méthode de Paiement : {selectedOrder.ticket.paymentMethod}</p>
                    <p>Adresse : {selectedOrder.ticket.address}</p>
                    <div className="mt-4">
                        <h4>Historique et Notes Clients</h4>
                        <p>Notes : {selectedOrder.clientNotes || "Aucune note disponible."}</p>
                    </div>
                </div>
            )}
      </div>
    </div>
   </div> 
   
  );
};

export default LivreurSide;
