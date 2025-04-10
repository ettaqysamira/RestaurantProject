import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../Components/structure/Header";
import StatCard from "../Components/structure/StatCard";
import UsersTable from "../Components/users/UsersTable";
import UserGrowthChart from "../Components/users/UserGrowthChart";
import UserActivityHeatmap from "../Components/users/UserActivityHeatmap";
import UserDemographicsChart from "../Components/users/UserDemographicsChart";
import axios from "axios";
import { useEffect, useState } from "react";



const UsersPage = () => {
	const [totalUtilisateurs, setTotaltotalUtilisateurs] = useState(0);


	useEffect(() => {
	const fetchTotalUtilisateurs = async () => {
		try {
			const res = await  fetch("http://localhost:5000/api/users/count");
			const data = await res.json();			
			setTotaltotalUtilisateurs(data.totalUtilisateurs)
		} catch (error) {
			console.error("Erreur :", error);
		}
	};

	fetchTotalUtilisateurs();
}, []);



	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Utilisateurs' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Utilisateurs'
						icon={UsersIcon}
						value={totalUtilisateurs.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard name='Nouveaux utilisateurs' icon={UserPlus} value={0} color='#10B981' />
					<StatCard
						name='Active Utilisateurs'
						icon={UserCheck}
						value={0}
						color='#F59E0B'
					/>
					<StatCard name='Taux de Retour' icon={UserX} value={0} color='#EF4444' />
				</motion.div>

				<UsersTable />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
					<UserGrowthChart />
					<UserActivityHeatmap />
					<UserDemographicsChart />
				</div>
			</main>
		</div>
	);
};
export default UsersPage;
