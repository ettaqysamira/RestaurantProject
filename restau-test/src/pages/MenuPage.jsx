import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {Users} from "lucide-react";
import Header from "../components/structure/Header";
import StatCard from "../components/structure/StatCard";
import { LuHandPlatter } from "react-icons/lu";
import { RiUserStarLine } from "react-icons/ri";


import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../Components/plats/SalesTrendChart";
import PlatTable from "../Components/plats/PlatTable";

const MenuPage = () => {
	const [totalPlats, setTotalPlats] = useState(0);
	
	useEffect(() => {
		const fetchTotalPlats = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/menu/count")
				const data = await response.json();
				setTotalPlats(data.count)
			} catch (error) {
				console.error("Erreur lors de la récupération du nombre de plats :", error);
			}
		};

		fetchTotalPlats();
	}, []);

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Menu' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Plats' icon={LuHandPlatter} value={totalPlats} color='#6366F1' />
					<StatCard name='Users' icon={Users} value={89} color='#10B981' />
					<StatCard name='Avis' icon={RiUserStarLine} value={23} color='#F59E0B' />
					<StatCard name='Total Revenue' icon={DollarSign} value={"543,210 MAD"} color='#EF4444' />
				</motion.div>

				<PlatTable />

				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div>
			</main>
		</div>
	);
};

export default MenuPage;
