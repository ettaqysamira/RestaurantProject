import React, { useState, useEffect } from "react";
import axios from "axios";
import { Diamond } from 'lucide-react';

const MenuCategorie = ({ addToOrder }) => {
  const [menuItems, setMenuItems] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [showAll, setShowAll] = useState(false)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems")
    return savedCart ? JSON.parse(savedCart) : [];
  })

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((response) => setMenuItems(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des plats :", error)
      );
  }, [])

  const filteredMenuItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.type === activeCategory);

  const displayedItems = showAll ? filteredMenuItems : filteredMenuItems.slice(0, 6);

  const handleAddToOrder = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id)

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      alert(`Ajouté au panier : ${item.name}, Quantité : ${updatedCart[existingItemIndex].quantity}`);
    } else {
      const updatedCart = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      alert(`Ajouté au panier : ${item.name}`);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 text-xs sm:text-lg uppercase border-b border-customColor pb-4 mt-20">
        {["all", "entrée", "plat principal", "dessert", "boisson"].map((category, index, array) => (
          <React.Fragment key={category}>
            <button
              className={`px-2 sm:px-4 py-1 ${
                activeCategory === category ? "text-white" : "text-gray-400"
              }`}
              onClick={() => {
                setActiveCategory(category)
                setShowAll(false)
              }}
            >
              {category === "all" ? "Tous" : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
            {index < array.length - 1 && <Diamond size={10} className="text-customColor hidden sm:inline-block mt-4" />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-36 sm:gap-y-8 mt-6 sm:mt-8 mx-4 sm:mx-10 relative">
        <div className="hidden sm:block absolute inset-y-0 left-1/2 w-[1px] bg-customColor"></div>
        {displayedItems.map((item) => (
          <div key={item._id} className="flex flex-col sm:flex-row items-center p-4 rounded-lg">
            <img
              src={`http://localhost:5000/restoreImage/${item.image}`}
              alt={item.name}
              className="w-28 h-28 sm:w-20 sm:h-20 rounded-lg object-cover"
            />
            <div className="mt-3 sm:ml-4 sm:flex-1 text-center sm:text-left">
              <h3 className="text-base font-semibold">{ item.name}</h3>
              {item.label && (
                <span className="mt-1 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                  {item.label}
                </span>
              )}
              <p className="text-[#c19d60] font-semibold mt-1 float-right">{item.price} MAD</p>
              <p className="text-gray-400 text-xs mt-2 h-auto sm:h-9">{item.description}</p>
              <button
                className="mt-3 px-4 py-2 border border-customColor text-white hover:bg-customColor hover:text-black w-full sm:w-auto"
                onClick={() => handleAddToOrder(item)}
              >
                Commander
              </button>
            </div>
          </div>
        ))}
      </div>

      {!showAll && filteredMenuItems.length > 6 && (
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-3 text-white font-semibold hover:bg-[#808000] border border-[#808000] hover:text-black w-48"
            onClick={() => setShowAll(true)}
          >
            Voir tout le menu
          </button>
        </div>
      )}
    </div>
  )
}

export default MenuCategorie;
