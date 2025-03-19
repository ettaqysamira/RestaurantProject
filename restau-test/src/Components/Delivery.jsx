import React from 'react';

const Delivery = () => {
  return (
    
    <>
    <div className="flex justify-center gap-5">
      <div className="flex flex-col items-center text-center p-5 border border-gray-300 rounded-md">
        <div className="text-4xl mb-2">🍽️</div>
        <h3 className="text-lg font-medium">Dine-In</h3>
        <p>Enjoy your meal in our cozy restaurant</p>
      </div>
      <div className="flex flex-col items-center text-center p-5 border border-gray-300 rounded-md">
        <div className="text-4xl mb-2">🥡</div>
        <h3 className="text-lg font-medium">Takeout</h3>
        <p>Pick up your order at the counter</p>
      </div>
      <div className="flex flex-col items-center text-center p-5 border border-gray-300 rounded-md">
        <div className="text-4xl mb-2">🚚</div>
        <h3 className="text-lg font-medium">Delivery</h3>
        <p>We'll bring your order right to your door</p>
      </div>
    </div>
    </>
  )
}

export default Delivery;
