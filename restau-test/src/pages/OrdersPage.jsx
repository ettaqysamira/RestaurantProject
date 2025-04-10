import { useEffect, useState } from "react";
import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { HandPlatter } from 'lucide-react';

import Header from "../components/structure/Header";
import StatCard from "../components/structure/StatCard";
import DailyOrders from "../components/orders/DailyOrders";
import OrderDistribution from "../components/orders/OrderDistribution";
import OrdersTable from "../components/orders/OrdersTable";

const OrdersPage = () => {
	const [orderStats, setOrderStats] = useState({
		totalOrders: "0",
		pendingOrders: "0",
		completedOrders: "0",
		totalRevenue: "0.00 MAD",
	});

	useEffect(() => {
		const fetchOrderStats = async () => {
			try {
				const response = await fetch('http://localhost:5000/api/orders/count');
				if (!response.ok) {
					throw new Error('Erreur lors de la récupération des statistiques des commandes');
				}
				const data = await response.json();

				// Mettre à jour l'état avec les données récupérées
				setOrderStats((prevStats) => ({
					...prevStats,
					totalOrders: data.totalCount.toString(),
					pendingOrders: data.preparationCount.toString(),
					completedOrders: (data.totalCount - data.preparationCount).toString(),
					totalRevenue:(data.totalCount * 80).toLocaleString() + " MAD",
				}));
			} catch (error) {
				console.error("Erreur:", error);
			}
		};

		fetchOrderStats();
	}, []);

	return (
		<div className='flex-1 relative z-10 overflow-auto'>
			<Header title={"Orders"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Commandes' icon={HandPlatter} value={orderStats.totalOrders} color='#6366F1' />
					<StatCard name='Commande en Préparation' icon={Clock} value={orderStats.pendingOrders} color='#F59E0B' />
					<StatCard
						name='Commandes terminées'
						icon={CheckCircle}
						value={orderStats.completedOrders}
						color='#10B981'
					/>
					<StatCard name='Total Revenue' icon={DollarSign} value={orderStats.totalRevenue} color='#EF4444' />
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<DailyOrders />
					<OrderDistribution />
				</div>

				<OrdersTable />
			</main>
		</div>
	);
};

export default OrdersPage;
