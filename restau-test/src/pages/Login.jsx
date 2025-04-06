import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email et mot de passe sont requis");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/signin", { email, password });

      const { token, role, isPredefined } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (isPredefined) {
        navigate(`/${role}/dashboard`); 
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la connexion");
    }
  };

  return (
    <>
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
        <button type="submit">Se connecter</button>
      </form>
      <p>
        Pas encore de compte ? <a href="/signup">S'inscrire</a>
      </p>
    </div>
    </>
    
  );
}

export default SignIn;
