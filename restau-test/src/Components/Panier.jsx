import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Utensils, Package, Truck } from "lucide-react";

const Panier = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems")
    return savedCart ? JSON.parse(savedCart) : location.state?.orderItems || []
  })

  const [ticket, setTicket] = useState(null)
  const [deliveryOption, setDeliveryOption] = useState("dine-in")
  const [paymentMethod, setPaymentMethod] = useState("paiment à la livraison") 

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  }

  const updateItemQuantity = (id, quantity) => {
    setCartItems(cartItems.map((item) => (item._id === id ? { ...item, quantity } : item)));
  };

  const handleOptionClick = (option) => {
    setDeliveryOption(option);
    console.log("Option sélectionnée :", option);
    if (option === "delivery") {
        navigate("/Panier/informations-livraison", { state: { cartItems, subtotal } })
    }
};

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  }

  const generateTicket = () => {
    const ticketNumber = `TICKET-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`;
    const tableNumber = deliveryOption === "dine-in" ? 10 : null;
    const clientName = "Samira ETTAQY";
    const paymentStatus = "À payer";

    return {
      ticketNumber,
      tableNumber,
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
      deliveryOption,
      paymentMethod, 
    }
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Votre panier est vide !")
      return;
    }

    const newTicket = generateTicket()
    setTicket(newTicket)

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
          deliveryOption,
          paymentMethod, 
        })
      })

      if (response.ok) {
        const data = await response.json()
        alert("Commande passée avec succès !")
        setCartItems([]);
        localStorage.removeItem("cartItems");
        navigate("/confirmation", { state: { _id: data._id } })
      } else {
        alert("Erreur lors de la validation de la commande.")
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la commande :", error)
      alert("Erreur serveur.")
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center p-8 bg-[#171819] h-screen">
      <div className="w-full md:w-3/5 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
        <h2 className="text-2xl font-bold mb-4">Ton Panier</h2>
        <div className="flex flex-col md:flex-row justify-center gap-5 mb-4">
          {["dine-in", "takeout", "delivery"].map(option => (
            <div
              key={option}
              className={`flex flex-col items-center text-center p-5 border w-60 border-gray-300 rounded-md cursor-pointer ${deliveryOption === option ? "bg-blue-100" : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              <div className="text-4xl mb-2">
                {option === "dine-in" ? (
                  <Utensils className="w-10 h-10" />
                ) : option === "takeout" ? (
                  <Package className="w-10 h-10" />
                ) : (
                  <Truck className="w-10 h-10" />
                )}
              </div>
              <h3 className="text-lg font-medium">
                {option === "dine-in" ? "Dine-In" : option === "takeout" ? "Takeout" : "Delivery"}
              </h3>
              <p>
                {option === "dine-in"
                  ? "Enjoy your meal in our cozy restaurant"
                  : option === "takeout"
                  ? "Pick up your order at the counter"
                  : "We'll bring your order right to your door"}
              </p>
            </div>
          ))}
        </div>

        {deliveryOption === "delivery" && (
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Méthode de paiement</h3>
            <div className="flex flex-col">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  value="paiment à la livraison"
                  checked={paymentMethod === "paiment à la livraison"}
                  onChange={handlePaymentMethodChange}
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
                  onChange={handlePaymentMethodChange}
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
                  onChange={handlePaymentMethodChange}
                />
                <span className="ml-2">Paiement via PayPal</span>
              </label>
            </div>
          </div>
        )}

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Votre panier est vide.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="flex items-center border-b py-4 flex-col md:flex-row justify-between">
              <img
                src={`http://localhost:5000/restoreImage/${item.image}`}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1 text-center md:text-left">
                <h3 className="font-bold uppercase">{item.description}</h3>
                <p className="text-gray-600 text-sm">{item.name} - {item.size}</p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
                    className="bg-gray-200 p-2 rounded text-lg"
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
                    className="bg-gray-200 p-2 rounded text-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 font-semibold mt-2 md:mt-0"
                >
                  SUPPRIMER
                </button>
                <span className="text-red-500 font-bold">{(item.price * item.quantity).toFixed(2)} MAD</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="w-full md:w-1/3 md:ml-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg">Récapitulatif</h3>
          <div className="flex justify-between py-2 border-b">
            <span>Sous-total</span>
            <span className="font-bold">{subtotal.toFixed(2)} MAD</span>
          </div>
          <button onClick={handleCheckout} className="w-full mt-4 bg-customColor text-white py-2 rounded hover:bg-blue-600 transition">
            Passer la commande
          </button>
        </div>
      </div>
    </div>
  )
}

export default Panier;
