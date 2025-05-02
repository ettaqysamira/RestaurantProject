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
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Réservation en ligne</h1>
      <form onSubmit={handleSubmit} className="grid gap-2">
        <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} required />
        <input name="phone" placeholder="Téléphone" value={form.phone} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="time" type="time" value={form.time} onChange={handleChange} required />
        <input name="people" type="number" min="1" value={form.people} onChange={handleChange} required />
        <input name="preferences" placeholder="Préférences (ex: sans gluten, terrasse...)" value={form.preferences} onChange={handleChange} />
        <TableSelector form={form} setForm={setForm} />


        <button type="submit" className="bg-green-600 text-white py-2 rounded">Réserver</button>
      </form>

      <h2 className="text-xl mt-6">Réservations existantes</h2>
      <ul className="mt-2">
        {reservations.map((r) => (
          <li key={r._id} className="border-b py-1">
            {r.date} {r.time} - {r.name} ({r.people} pers.) [Table {r.tableNumber !== undefined ? r.tableNumber : 'non assignée'}] [{r.status}]
          </li>
        ))}
      </ul>
    </div>
  );
}
