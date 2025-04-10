import React from 'react';
import Header from '../Components/structure/Header';
import AddUser from '../Components/users/AddUsers';
const AddUsers = () => {
    return (
        <>
         <div className='flex-1 relative z-10 overflow-auto'>
                    < Header title={"Ajouter Utilisateur"} />
                    <main className=''>
                        <AddUser/>
                    </main>
        
                    </div>
        </>
    )
}


export default AddUsers;