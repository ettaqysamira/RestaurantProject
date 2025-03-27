import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircleCheckBig } from 'lucide-react';
import '../Livreur.css'
const LivraisonDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("paiment à la livraison");
    const [currentStep, setCurrentStep] = useState(1);
    const [successMessage, setSuccessMessage] = useState("");

    const handleCancel = () => {
        navigate("/panier");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentStep === 1) {
            if (!name || !surname || !phone || !country || !address || !province || !city || !neighborhood) {
                alert("Veuillez remplir toutes les informations !");
                return;
            }
            setCurrentStep(2);
            return;
        }

        if (currentStep === 2) {
            const { cartItems, subtotal } = location.state;
            const ticketNumber = `TICKET-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`;
            const clientName = `${name} ${surname}`;
            const paymentStatus = "À payer";

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
            };

            try {
                const response = await fetch("http://localhost:5000/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newTicket)
                });

                if (response.ok) {
                    setSuccessMessage("Commande passée avec succès !");
                    localStorage.removeItem("cartItems");
                    localStorage.removeItem("subtotal");
                    navigate("/confirmation");
                } else {
                    alert("Erreur lors de la validation de la commande.");
                }
            } catch (error) {
                console.error("Erreur lors de l'envoi de la commande :", error);
                alert("Erreur serveur.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black text-white p-8 pt-36">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl p-8 bg-[#1a1b1c] shadow-lg border border-gray-700">
                {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
                
                {currentStep === 1 && (
                    <>                
                    <h2 className="text-3xl font-semibold text-center mb-6">01. Informations Personnelles</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4"  />
                            <input type="text" placeholder="Prénom" value={surname} onChange={(e) => setSurname(e.target.value)} required className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4" />
                            <input type="tel" placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4 " />
                            <input type="text" placeholder="Pays" value={country} onChange={(e) => setCountry(e.target.value)} required className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4" />
                            <input type="text" placeholder="Adresse" value={address} onChange={(e) => setAddress(e.target.value)} required className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4" />
                            <input type="text" placeholder="Province" value={province} onChange={(e) => setProvince(e.target.value)} required className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4" />
                            <input type="text" placeholder="Ville" value={city} onChange={(e) => setCity(e.target.value)} required className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4" />
                            <input type="text" placeholder="Quartier" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} required className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4" />
                        </div>
                        <button type="submit" className="btn-primary mt-4 px-6 py-2 border border-[#808000] hover:bg-[#808000] hover:text-black transition">Suivant</button>
                        <button type="button" onClick={handleCancel} className="btn-secondary mt-4 ml-2  px-6 py-2 border border-[#808000] hover:bg-[#808000] hover:text-black transition">Annuler</button>
                        <h2 className="text-3xl font-semibold text-center my-6 opacity-40">02. Adresses</h2>
                    </>
                )}
                
                {currentStep === 2 && (
                    <>
                    <div className="flex items-center gap-3 mb-6" >
                    < CircleCheckBig className="text-green-500" />
                    <h2 className="text-3xl font-semibold text-center">01. Informations Personnelles</h2>
                    </div>
                    <hr className="" />
                    
                        <div className="flex items-center gap-4 mb-6">
                            
                            <h2 className="text-2xl font-bold">Méthode de Paiement</h2>
                        </div>
                        <div className="flex flex-col mb-4">
                            { ['paiment à la livraison', 'credit', 'paypal'].map((method) => (
                                <label key={method} className="inline-flex items-center">
                                    <input type="radio" className="form-radio" name="paymentMethod" value={method} checked={paymentMethod === method} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <span className="ml-2">{method.charAt(0).toUpperCase() + method.slice(1)}</span>
                                </label>
                            ))}
                        </div>
                        <button type="submit" className="mt-6 px-6 py-2 border border-[#808000] hover:bg-[#808000] hover:text-black transition">Passer la commande</button>
                    </>
                )}
            </form>
        </div>
    )
}

export default LivraisonDetails;
