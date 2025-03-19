import React from 'react';

const Notification = ({ message, type, onClose }) => {
  const typeStyles = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
  };

  return (
    <div className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg ${typeStyles[type]} transition-all duration-300`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-lg font-bold">
          &times;
        </button>
      </div>
    </div>
  )
}

export default Notification;
