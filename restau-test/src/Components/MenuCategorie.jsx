import React, { useState, useEffect } from "react";
import axios from "axios";

const MenuCategorie = ({ addToOrder }) => {
  const [menuItems, setMenuItems] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [showAll, setShowAll] = useState(false)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems")
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((response) => setMenuItems(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des plats :", error)
      );
  }, []);

  const filteredMenuItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.type === activeCategory);

  const displayedItems = showAll ? filteredMenuItems : filteredMenuItems.slice(0, 6);

  const handleAddToOrder = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);

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
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-center space-x-4 text-lg uppercase border-b border-gray-700 pb-4 mt-24">
        {["all", "entrée", "plat principal", "dessert", "boisson"].map(
          (category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md ${
                activeCategory === category
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-700 text-gray-400"
              }`}
              onClick={() => {
                setActiveCategory(category);
                setShowAll(false); 
              }}
            >
              {category === "all" ? "Tous" : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          )
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {displayedItems.map((item) => (
          <div key={item._id} className="flex items-center bg-gray-900 p-4 rounded-lg">
            <img
              src={`http://localhost:5000/restoreImage/${item.image}`}
              alt={item.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="ml-4 flex-1">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                {item.label && (
                  <span className="ml-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                    {item.label}
                  </span>
                )}
                <span className="ml-auto text-yellow-400 font-semibold">
                  {item.price} MAD
                </span>
              </div>
              <div className="h-9">
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
              
              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                onClick={() => handleAddToOrder(item)} 
              >
                Make an Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {!showAll && filteredMenuItems.length > 6 && (
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600"
            onClick={() => setShowAll(true)}
          >
            View All Menu
          </button>
        </div>
      )}
    </div>
  )
}

export default MenuCategorie;
