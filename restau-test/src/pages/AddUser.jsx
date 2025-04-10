import React from 'react';
import Header from '../Components/structure/Header';
import AddUser from '../Components/users/AddUsers';
const AddUsers = () => {
    return (
        <>
         <div className='flex-1 relative z-10 overflow-auto'>
                    < Header title={"Add User"} />
                    <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                        <AddUser/>
                    </main>
        
                    </div>
        </>
    )
}


export default AddUsers;