import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableSelector from './SelectedTable';

export default function App() {
  const [reservations, setReservations] = useState([]);
  const [availableTables, setAvailableTables] = useState([]);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', date: '', time: '', people: '', preferences: '', tableNumber: ''
  });

  const fetchReservations = async () => {
    const res = await axios.get('http://localhost:5000/api/reservations');
    setReservations(res.data);
  };

  const fetchAvailableTables = async () => {
    if (!form.date || !form.time) return;
    const res = await axios.get(`http://localhost:5000/api/reservations/available-tables?date=${form.date}&time=${form.time}`);
    setAvailableTables(res.data);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    fetchAvailableTables();
  }, [form.date, form.time]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/reservations', form);
      fetchReservations();
      setForm({ name: '', phone: '', email: '', date: '', time: '', people: '', preferences: '', tableNumber: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur serveur');
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="p-4 max-w-6xl mx-auto my-36">
      <h1 className="text-3xl font-bold mb-6 text-center">Réservation en ligne</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input name="phone" placeholder="Téléphone" value={form.phone} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input name="date" type="date" value={form.date} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input name="time" type="time" value={form.time} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input name="people" type="number" min="1" placeholder="Nombre de personnes" value={form.people} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <TableSelector form={form} setForm={setForm} availableTables={availableTables} />
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">
            Réserver
          </button>
        </div>
      </form>

      <h2 className="text-xl mt-10 mb-2 font-semibold">Réservations existantes</h2>
      <ul className="space-y-2">
        {reservations.map((r) => (
          <li key={r._id} className="border p-2 rounded shadow-sm">
            {r.date} {r.time} - {r.name} ({r.people} pers.) [Table {r.tableNumber !== undefined ? r.tableNumber : 'non assignée'}] [{r.status}]
          </li>
        ))}
      </ul>
    </div>
  );
}
