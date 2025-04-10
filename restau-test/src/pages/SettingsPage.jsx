import Header from "../components/structure/Header";
import LogOutCompo from "../Components/settings/LogOutCompo";
import Profile from "../components/settings/Profile";
import Security from "../components/settings/Security";

const SettingsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Settings' />
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Profile />
				<Security />
				<LogOutCompo />
			</main>
		</div>
	);
};
export default SettingsPage;
