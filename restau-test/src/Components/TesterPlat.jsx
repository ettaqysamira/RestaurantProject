import React from 'react';

const TesterPlat = () => {
    const menuItems = [
        {
          name: "Greek Salad",
          description: "Tomatoes, green bell pepper, sliced cucumber onion, olives, and feta cheese.",
          price: "$25.50",
          image: "/images/greek-salad.jpg",
        },
        {
          name: "Lasagne",
          description: "Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices.",
          price: "$40.00",
          image: "/images/lasagne.jpg",
          label: "SEASONAL",
        },
        {
          name: "Butternut Pumpkin",
          description: "Typesetting industry lorem Lorem Ipsum is simply dummy text of the priand.",
          price: "$10.00",
          image: "/images/butternut-pumpkin.jpg",
        },
        {
          name: "Tokusen Wagyu",
          description: "Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices.",
          price: "$39.00",
          image: "/images/tokusen-wagyu.jpg",
          label: "NEW",
        },
        {
          name: "Olivas Rellenas",
          description: "Avocados with crab meat, red onion, crab salad stuffed red bell pepper and green bell pepper.",
          price: "$25.00",
          image: "/images/olivas-rellenas.jpg",
        },
        {
          name: "Opu Fish",
          description: "Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices.",
          price: "$49.00",
          image: "/images/opu-fish.jpg",
        },
      ]
    return (
        
        <>
         <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-center space-x-6 text-lg uppercase border-b border-gray-700 pb-4">
        <a href="#" className="text-yellow-500 border-b-2 border-yellow-500">Morning</a>
        <a href="#">Weekday Lunch</a>
        <a href="#">Dinner</a>
        <a href="#">Wines</a>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {menuItems.map((item, index) => (
          <div key={index} className="flex items-center bg-gray-900 p-4 rounded-lg">
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
            <div className="ml-4 flex-1">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                {item.label && (
                  <span className="ml-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                    {item.label}
                  </span>
                )}
                <span className="ml-auto text-yellow-400 font-semibold">{item.price}</span>
              </div>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
        </>
    )
}



export default TesterPlat;