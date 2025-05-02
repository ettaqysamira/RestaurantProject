import { useEffect, useState } from "react";
import axios from "axios";
import { FaChair } from "react-icons/fa"; 

export default function TableSelector({ form, setForm }) {
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");

  useEffect(() => {
    const fetchAvailableTables = async () => {
      if (!form.date || !form.time) return;
      const res = await axios.get(
        `http://localhost:5000/api/reservations/available-tables?date=${form.date}&time=${form.time}`
      );
      setAvailableTables(res.data);
    };
    fetchAvailableTables();
  }, [form.date, form.time]);

  const handleSelectTable = (number) => {
    setSelectedTable(number);
    setForm({ ...form, tableNumber: number });
  };

  const allTableNumbers = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-5 gap-4 my-4">
      {allTableNumbers.map((num) => {
        const isAvailable = availableTables.some((t) => t.number === num);
        const isSelected = selectedTable === num;
        return (
          <div
            key={num}
            className={`p-2 rounded-lg cursor-pointer flex flex-col items-center justify-center
              ${!isAvailable ? "bg-gray-400 cursor-not-allowed" : ""}
              ${isSelected ? "bg-orange-500 text-white" : isAvailable ? "bg-green-500" : ""}
            `}
            onClick={() => isAvailable && handleSelectTable(num)}
          >
            <FaChair size={24} />
            <span className="text-sm mt-1">Table {num}</span>
          </div>
        );
      })}
    </div>
  );
}
