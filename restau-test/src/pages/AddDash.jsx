import React from 'react';
import AddToMenu from '../Components/add-menu/AddMenu';
import Header from '../Components/structure/Header';

const AddDash = () => {
    return (
        <div className='flex-1 relative z-10 overflow-auto'>
			<Header title={"Add to Menu"} />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <AddToMenu/>
            </main>

            </div>
    )
}



export default AddDash;