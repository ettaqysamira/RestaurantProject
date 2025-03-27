import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircleCheckBig } from 'lucide-react';


const LivraisonDetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [phone, setPhone] = useState("")
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [province, setProvince] = useState("")
    const [city, setCity] = useState("")
    const [neighborhood, setNeighborhood] = useState("")

    const [paymentMethod, setPaymentMethod] = useState("paiment à la livraison")

    const [currentStep, setCurrentStep] = useState(1)
    const handleCancel = () => {
        navigate("/panier")
    }
    const handleSubmit = async () => {
        const { cartItems, subtotal } = location.state

        if (currentStep === 1) {
            if (!name || !surname || !phone || !country || !address || !province || !city || !neighborhood) {
                alert("Veuillez remplir toutes les informations !")
                return
            }
            setCurrentStep(2)
            return
        }

        if (currentStep === 2) {
            const ticketNumber = `TICKET-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`;
            const clientName = `${name} ${surname}`
            const paymentStatus = "À payer"

            const newTicket = {
                ticketNumber,
                clientName,
                items: cartItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    total: parseFloat((item.price * item.quantity).toFixed(2)),
                })),
                total: parseFloat(subtotal.toFixed(2)),
                paymentStatus,
                timestamp: new Date().toLocaleString(),
                deliveryOption: "delivery",
                paymentMethod,
                address,
                phone,
                country,
                province,
                city,
                neighborhood
            }

            try {
                const response = await fetch("http://localhost:5000/api/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        items: cartItems,
                        total: parseFloat(subtotal.toFixed(2)),
                        ticket: newTicket,
                        deliveryOption: "delivery",
                        paymentMethod,
                        address,
                        phone,
                        country,
                        province,
                        city,
                        neighborhood
                    })
                })

                if (response.ok) {
                    const data = await response.json();
                    alert("Commande passée avec succès !");
                    localStorage.removeItem("cartItems");
                    localStorage.removeItem("subtotal");
                    navigate("/confirmation", { state: { _id: data._id } });
                } else {
                    alert("Erreur lors de la validation de la commande.");
                }
            } catch (error) {
                console.error("Erreur lors de l'envoi de la commande :", error);
                alert("Erreur serveur.");
            }
        }
    }

    return (
        <div className="p-6 mt-20">
            
            {currentStep === 1 && (
                <>
               
                    <h2 className="text-2xl font-bold mb-4">1. Informations Personnelles</h2>
                    <div className="mb-4">
                        <label className="block mb-2">Nom</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Entrez votre nom"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Prénom</label>
                        <input
                            type="text"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Entrez votre prénom"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Téléphone</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Entrez votre numéro de téléphone"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Pays</label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Entrez votre pays"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Adresse</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Entrez votre adresse"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Province</label>
                        <input
                            type="text"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Entrez votre province"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Ville</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Entrez votre ville"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Quartier</label>
                        <input
                            type="text"
                            value={neighborhood}
                            onChange={(e) => setNeighborhood(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Entrez votre quartier"
                            required
                        />
                    </div>
                   
                    <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
                        Suivant
                    </button>
                    <button  onClick={handleCancel} className="bg-blue-500 text-white py-2 px-4 rounded">
                       Annuler
                    </button>
                    <h2 className="text-2xl font-bold mb-4">2. Méthode de Paiement</h2>
                </>
            )}
            {currentStep === 2 && (
                <>  
                    <div className="">
                    <CircleCheckBig />
                    <h2 className="text-2xl font-bold mb-4">Informations Personnelles</h2>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4">2. Méthode de Paiement</h2>
                    <div className="flex flex-col mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio"
                                name="paymentMethod"
                                value="paiment à la livraison"
                                checked={paymentMethod === "paiment à la livraison"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span className="ml-2">Paiement à la livraison</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio"
                                name="paymentMethod"
                                value="credit"
                                checked={paymentMethod === "credit"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span className="ml-2">Paiement par carte de crédit</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio"
                                name="paymentMethod"
                                value="paypal"
                                checked={paymentMethod === "paypal"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span className="ml-2">Paiement via PayPal</span>
                        </label>
                    </div>
                    <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
                        Passer la commande
                    </button>
                </>
            )}
        </div>
    )
}

export default LivraisonDetails;
