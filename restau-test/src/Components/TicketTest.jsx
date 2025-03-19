import React from "react";

const Checkout = () => {
  return (
    <>
    <div className="container mx-auto p-4 mt-16">
      <div className="bg-yellow-50 shadow-lg rounded-t-lg p-4">
        <label className="block text-black font-bold text-sm mb-2">BISTRO Restaurant</label>
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="font-semibold text-black text-sm">Commande</span>
            <p className="font-semibold text-black text-xs">Rue kadi Lass, Maarif</p>
            <p className="font-semibold text-black text-xs">Maroc</p>
          </div>
          <hr className="border-t border-green-700" />
          <div className="mb-4">
            <span className="font-semibold text-black text-sm">PAYMENT METHOD</span>
            <p className="font-semibold text-black text-xs">Visa</p>
            <p className="font-semibold text-black text-xs">**** **** **** 4243</p>
          </div>
          <hr className="border-t border-green-700" />
          <div className="mb-4">
            <span className="font-semibold text-black text-sm">vous avez un code promo?</span>
            <form className="flex">
              <input
                type="text"
                placeholder="Entrer votre code Promo "
                className="flex-1 h-9 px-3 border border-green-700 rounded-md bg-yellow-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-300 transition duration-300"
              />
              <button className="ml-2 bg-green-700 text-white rounded-md px-4 h-9 shadow-md hover:bg-green-600 transition duration-200">
                Entrer
              </button>
            </form>
          </div>
          <hr className="border-t border-green-700" />
          <div className="mb-4">
            <span className="font-semibold text-black text-sm">PAYMENT</span>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-semibold text-xs">Subtotal:</span>
              <span className="font-semibold text-xs">240.00 MAD</span>
              <span className="font-semibold text-xs">réduction:</span>
              <span className="font-semibold text-xs">10.00 MAD</span>
              <span className="font-semibold text-xs">Tax:</span>
              <span className="font-semibold text-xs">30.40 MAD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-500 rounded-b-lg p-4 flex justify-between items-center">
        <label className="text-white text-xl font-bold">280.40 MAD</label>
        <button className="bg-green-600 text-white rounded-md px-6 h-9 shadow-md hover:bg-green-700 transition duration-200">
         OK
        </button>
      </div>
    </div>
    </>
    
  )
}

export default Checkout;
