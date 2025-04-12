import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogIn } from 'lucide-react';
import './Login.css';
import restaurantLogo from "../assets/logoRestaurant.png";
import { useAuth } from "../context/AuthUseContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email et mot de passe sont requis");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/signin", { email, password });

      const { token, role, userId, name } = response.data;

      login({ token, role, userId, name });

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "cuisinier") {
        navigate(`/cuisinier/${userId}`);
      } else if (role === "livreur") {
        navigate(`/livreur/${userId}`);
        
      } else if (role === "caissier") {
        navigate(`/caissier`);
        
      }
      else {
        navigate("/");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la connexion");
    }
  };

  return (
    <div className="div min-h-screen w-full flex items-center justify-center overflow-auto bg-cover bg-center" >
      <div className="login relative z-10 bg-[rgba(6,5,7,0.25)] backdrop-blur-[38px] shadow-[0_40px_30px_rgba(0,0,0,0.1)] rounded-[40px] py-[24px] px-[32px] w-[380px] flex flex-col items-center justify-center text-center">
        < img src={restaurantLogo} className="w-[74px] mb-[32px]" alt="Logo du restaurant" />
        <h2 className="text-customColor">CONNEXION</h2>
        <h3>Bienvenue dans Bistro Restaurant</h3>

        <form className="form" onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <div className="textbox">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button type="submit">
            <p>Login</p>
            <span><LogIn /></span>
          </button>
        </form>

        <a className="text-customColor">Forgot password?</a>
        <p>Not a member yet? <a href="/signup">Sign up!</a></p>
      </div>
    </div>
  );
}

export default SignIn;
