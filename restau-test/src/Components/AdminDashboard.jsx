import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); 
    } else {
      axios
        .get("http://localhost:5000/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data); 
        })
        .catch((err) => {
          if (err.response?.status === 403) {
            setError("Vous n'êtes pas autorisé à accéder à cette page.");
          } else {
            setError("Erreur de connexion.");
          }
        });
    }
  }, [navigate]); 

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>Dashboard Admin</h2>
    </div>
  );
}

export default AdminDashboard;
