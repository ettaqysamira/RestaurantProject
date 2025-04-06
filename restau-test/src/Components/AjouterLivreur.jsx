import React, { useState } from 'react';

const AjouterLivreur = () => {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/livreurs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nom, email, telephone }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Livreur ajouté avec succès:", data);
                setNom('');
                setEmail('');
                setTelephone('');
            } else {
                console.error("Erreur lors de l'ajout du livreur");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du livreur:", error);
        }
    };

    return (
        <div className="p-4 mt-20">
            <h2 className="text-2xl font-bold mb-4">Ajouter un Livreur</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Nom du livreur :</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block">Email :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block">Téléphone :</label>
                    <input
                        type="text"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-customColor text-white px-4 py-2 rounded">
                    Ajouter Livreur
                </button>
            </form>
        </div>
    )
}

export default AjouterLivreur;
