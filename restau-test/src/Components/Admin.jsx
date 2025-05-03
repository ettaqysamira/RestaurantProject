import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from 'react-icons/fa';



export default function Admin() {
  const [reservations, setReservations] = useState([]);
  const [tableForm, setTableForm] = useState({ number: '', capacity: '' });
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchReservations();
    fetchTables();
  }, []);

  const fetchReservations = async () => {
    const res = await axios.get('http://localhost:5000/api/reservations');
    setReservations(res.data);
  };

  const fetchTables = async () => {
    const res = await axios.get('http://localhost:5000/api/tables');
    setTables(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/reservations/${id}`, { status });
    fetchReservations();
  };

  const markArrived = async (id) => {
    await axios.put(`http://localhost:5000/api/reservations/${id}`, { arrived: true });
    fetchReservations();
  };

  const deleteReservation = async (id) => {
    await axios.delete(`http://localhost:5000/api/reservations/${id}`);
    fetchReservations();
  };

  const handleTableChange = (e) => {
    setTableForm({ ...tableForm, [e.target.name]: e.target.value });
  };

  const handleAddTable = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tables', tableForm);
      toast.success('Table ajoutée avec succès', {
        icon: <FaCheckCircle color="#065f46" size={20} />,  progressStyle: {
          background: '#ff0000',},
        
        });
      setTableForm({ number: '', capacity: '' });
      fetchTables();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de l\'ajout de la table');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto mt-28">
      <h1 className="text-2xl font-bold mb-6">Espace Administrateur</h1>

      <div className="mb-6 border p-4 rounded shadow bg-gray-100">
        <h2 className="text-lg font-semibold mb-2">Ajouter une nouvelle table</h2>
        <form onSubmit={handleAddTable} className="flex flex-col gap-2">
          <input
            type="number"
            name="number"
            placeholder="Numéro de table"
            value={tableForm.number}
            onChange={handleTableChange}
            required
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacité"
            value={tableForm.capacity}
            onChange={handleTableChange}
            required
          />
          <button type="submit" className="bg-blue-600 text-white py-1 px-4 rounded">Ajouter la table</button>
        </form>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tables existantes</h2>
        <ul className="grid gap-2">
          {tables.map((t) => (
            <li key={t._id} className="bg-white p-2 rounded shadow">
              Table {t.number} - Capacité : {t.capacity}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Réservations</h2>
        {reservations.map(r => (
          <div key={r._id} className="border p-3 mb-3 rounded bg-white shadow">
            <div className="font-semibold">{r.date} {r.time} - {r.name} ({r.people} pers.)</div>
            <div>Email: {r.email}</div>
            <div>Préférences: {r.preferences || 'Aucune'}</div>
            <div>Table: {r.tableNumber !== undefined ? r.tableNumber : 'Non assignée'}</div>
            <div>Status: <strong>{r.status}</strong> | Arrivé : <strong>{r.arrived ? 'Oui' : 'Non'}</strong></div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => updateStatus(r._id, 'confirmée')} className="bg-blue-500 text-white px-2 py-1 rounded">Accepter</button>
              <button onClick={() => updateStatus(r._id, 'annulée')} className="bg-yellow-500 text-white px-2 py-1 rounded">Annuler</button>
              <button onClick={() => markArrived(r._id)} className="bg-green-500 text-white px-2 py-1 rounded">Arrivé</button>
              <button onClick={() => deleteReservation(r._id)} className="bg-red-600 text-white px-2 py-1 rounded">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="light" 
    toastStyle={{
    backgroundColor: '#c19d60',
    color: '#065f46',           
    borderRadius: '8px',
    fontWeight: '500',
  }}
  progressStyle={{
    background: '#065f46' 
  }}
/>
    </div>
  );
}
