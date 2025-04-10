import { User } from "lucide-react";
import SettingSection from "./SettingSection";

const Profile = () => {
	return (
		<SettingSection icon={User} title={"Profile"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>
				<img
					src='https://media.licdn.com/dms/image/v2/D4E03AQEzyo6awtdL6g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1719870476494?e=1749686400&v=beta&t=WR5x12hrE_MihRdIdE3qThoVLL45trvtz_COoM6zjmc'
					alt='Profile'
					className='rounded-full w-20 h-20 object-cover mr-4'
				/>

				<div>
					<h3 className='text-lg font-semibold text-gray-100'>Samira ETTAQY</h3>
					<p className='text-gray-400'>ettaqysamira@admin.com</p>
				</div>
			</div>

			<button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
				Editer Profile
			</button>
		</SettingSection>
	);
};
export default Profile;
