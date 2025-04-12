import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import OrderDistribution from './OrderDistribution'; 
import { Trash2 } from 'lucide-react';


const OrdersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredOrders, setFilteredOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [tickets, setTickets] = useState([]);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await fetch('http://localhost:5000/api/orders')
				if (!response.ok) {
					throw new Error('Failed to fetch orders')
				}
				const data = await response.json()
				setFilteredOrders(data)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		};

		const fetchTickets = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders')
                if (response.ok) {
                    const orders = await response.json();
                    const filteredTickets = orders.filter(order => order.ticket)
                    setTickets(filteredTickets);
                } else {
                    console.error("Erreur lors de la récupération des tickets.")
                }
            } catch (error) {
                console.error("Erreur serveur :", error)
            }
        }

        const fetchData = async () => {
            setLoading(true); 
            await Promise.all([fetchOrders(), fetchTickets()]);
            setLoading(false); 
        }

        fetchData();
	}, [])

	const calculateOrderStatusDistribution = (orders) => {
		const statusCounts = {
			Pending: 0,
			Processing: 0,
			Shipped: 0,
			Delivered: 0,
		}

		orders.forEach(order => {
			if (order.status in statusCounts) {
				statusCounts[order.status]++;
			}
		})

		return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
	}

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		
		const filtered = filteredOrders.filter(
			(order) => order.id.toLowerCase().includes(term) || order.customer.toLowerCase().includes(term)
		);
		setFilteredOrders(filtered);
	};

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>

	const orderStatusDistribution = calculateOrderStatusDistribution(filteredOrders);

	return (
		<motion.div>
			<motion.div
				className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
			>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-semibold text-gray-100'>Liste des Commandes</h2>
					<div className='relative'>
						<input
							type='text'
							placeholder='Search orders...'
							className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={searchTerm}
							onChange={handleSearch}
						/>
						<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
					</div>
				</div>

				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-700'>
						<thead>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>N° de Ticket</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Client</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Total</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Status</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Date</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Actions</th>
							</tr>
						</thead>

						<tbody className='divide divide-gray-700'>
							{filteredOrders.map((order) => (
								<motion.tr
									key={order._id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>{order.ticket.ticketNumber}</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>{order.ticket.clientName}</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>{order.total.toFixed(2)} MAD</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
										<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											order.status === "livrée" ? "bg-green-100 text-green-800 w-24 flex justify-center" :
											order.status === "en préparation" ? "bg-yellow-100 text-yellow-800 w-24 flex justify-center" :
											order.status === "prêt à servir" ? "bg-blue-100 text-blue-800 w-24 flex justify-center" :
											"bg-red-100 text-red-800 w-24 flex justify-center"
										}`}>{order.status}</span>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{new Date(order.ticket.timestamp).toLocaleString()}</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
										<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
											<Trash2  size={18} />
										</button>
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.div>

			<OrderDistribution data={orderStatusDistribution} />
		</motion.div>
	)
}

export default OrdersTable
