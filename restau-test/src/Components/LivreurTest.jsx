import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LivreurTest = () => {
  const { livreurId } = useParams(); 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        const data = await response.json();
        
        const deliveryOrders = data.filter(
          (order) =>
            order.deliveryOption === 'delivery' &&
            order.livreurId === livreurId 
        );
        setOrders(deliveryOrders);
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
      }
    };

    fetchOrders();
  }, [livreurId]); 

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Commandes de Livraison</h2>
      {orders.length === 0 ? (
        <p>Aucune commande de livraison trouvée pour ce livreur.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Numéro de Commande</th>
              <th className="py-2 px-4 border">Client</th>
              <th className="py-2 px-4 border">Total (MAD)</th>
              <th className="py-2 px-4 border">Statut</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="py-2 px-4">{order.ticket.ticketNumber}</td>
                <td className="py-2 px-4">{order.ticket.clientName}</td>
                <td className="py-2 px-4">{order.total.toFixed(2)}</td>
                <td className="py-2 px-4">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LivreurTest;
