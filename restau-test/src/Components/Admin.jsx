import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const res = await axios.get('http://localhost:5000/api/reservations');
    setReservations(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/reservations/${id}`, { status });
    fetchReservations();
  };

  const deleteReservation = async (id) => {
    await axios.delete(`http://localhost:5000/api/reservations/${id}`);
    fetchReservations();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Espace Administrateur</h1>
      {reservations.map(r => (
        <div key={r._id} className="border p-2 mb-2">
          <div>{r.date} {r.time} - {r.name} ({r.people} pers.)</div>
          <div>Email: {r.email}</div>
          <div>Status: <strong>{r.status}</strong></div>
          <div className="flex gap-2 mt-2">
            <button onClick={() => updateStatus(r._id, 'confirmée')} className="bg-blue-500 text-white px-2 py-1 rounded">Confirmer</button>
            <button onClick={() => updateStatus(r._id, 'annulée')} className="bg-yellow-500 text-white px-2 py-1 rounded">Annuler</button>
            <button onClick={() => deleteReservation(r._id)} className="bg-red-600 text-white px-2 py-1 rounded">Supprimer</button>
          </div>
        </div>
      ))}
    </div>
  );
}
