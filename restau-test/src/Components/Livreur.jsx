import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

const Livreur = () => {
    const { livreurId } = useParams();  
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);



    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/orders")
                const data = await response.json()
                const deliveryOrders = data.filter(order => 
                    (order.deliveryOption === "delivery" && order.status === "prêt à servir") || 
                    (order.livreurId === livreurId)  
                );
                setOrders(deliveryOrders)
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes :", error)
            }
        }

        fetchOrders()
    }, [livreurId])
   
    

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
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
                body: JSON.stringify({ livreurId }) 
            });
    
            if (response.ok) {
                const acceptedOrder = await response.json();
    
                setOrders(orders.map(order =>
                    order._id === orderId ? acceptedOrder.order : order
                ));
            } else {
                console.error("Erreur lors de l'acceptation de la commande :", response.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de l'acceptation de la commande :", error);
        }
    }
    

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold  text-center mb-9">Commandes de Livraison</h2>
            {orders.length === 0 ? (
                <p>Aucune commande de livraison à afficher.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border">Numéro de Commande</th>
                            <th className="py-2  border ">Client</th>
                            <th className="py-2 px-4 border">Total (MAD)</th>
                            <th className="py-2 px-4 border">Statut</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="border-b">
                                <td className="py-2 px-4">{order.ticket.ticketNumber}</td>
                                <td className="py-2 px-4 flex justify-center mt-6">{order.ticket.clientName}</td>
                                <td className="py-2 pl-20 pr-8">{order.ticket.total.toFixed(2)}</td>
                                <td className="py-2 px-4 flex justify-center">{order.status}</td>
                                <td className="py-2 px-4">
                                    <div className='flex justify-center gap-4'>
                                        <button onClick={() => handleOrderClick(order)} className="bg-blue-500 text-white px-2 py-1 rounded w-40">
                                            Prendre en charge
                                        </button>
                                        <button onClick={() => acceptOrder(order._id)} className='bg-red-600 text-white px-2 py-1 rounded w-40'>
                                            Accepter
                                        </button>
                                    </div>

                                    <div className="flex justify-center gap-4 items-center mt-2">
                                        <button onClick={() => updateOrderStatus(order._id, "en cours")} className="bg-yellow-500 text-white px-2 py-1 rounded w-40">
                                            En cours
                                        </button>
                                        <button onClick={() => updateOrderStatus(order._id, "livrée")} className="bg-green-500 text-white px-2 py-1 rounded w-40">
                                            Livrée
                                        </button>
                                    </div>
                                </td>
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
    );
}

export default Livreur;
