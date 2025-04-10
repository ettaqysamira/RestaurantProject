import { Route, Routes } from "react-router-dom";

import Sidebar from "../structure/Sidebar";
import OverviewPage from "../../pages/OverviewPage";
import MenuPage from "../../pages/MenuPage";
import UsersPage from "../../pages/UsersPage";
import AvisPage from "../../pages/AvisPage";
import OrdersPage from "../../pages/OrdersPage";
import AnalyticsPage from "../../pages/AnalyticsPage";
import AddDash from "../../pages/AddDash";
import SettingsPage from "../../pages/SettingsPage";
import AddUsers from "../../pages/AddUser";
import EditMenu from "../add-menu/EditMenu";
function AdminSide() {
	return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
			<Routes>
            <Route path='/' element={<OverviewPage />} />
            <Route path='/users' element={<UsersPage />} />

				<Route path='/menu' element={<MenuPage />} />
				<Route path='add-menu' element={<AddDash />} />
				<Route path="/edit-menu/:id" element={<EditMenu/>} />
				<Route path='/orders' element={<OrdersPage />} />
				<Route path='/add-user' element={<AddUsers />} />
				<Route path='/settings' element={<SettingsPage />} />

			</Routes>
		</div>
	);
}

export default AdminSide;
