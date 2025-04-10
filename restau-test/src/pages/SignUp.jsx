import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css'
import restaurantLogo from "../assets/logoRestaurant.png";



function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Tous les champs sont requis");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        name,
        email,
        password,});
        
      alert(response.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#1a1a1a] overflow-y-auto">
      <div className="login relative top-14 z-10 bg-[rgba(6,5,7,0.25)] backdrop-blur-[38px] shadow-[0_40px_30px_rgba(0,0,0,0.1)] rounded-[40px] py-[24px] px-[32px] w-[380px] flex flex-col items-center justify-center text-center my-10">
        <img src={restaurantLogo} className="w-[74px] mb-[32px]" alt="Logo" />
        <h2 className="text-customColor">INSCRIPTION</h2>
        <h3 className="text-white" >Bienvenue dans Bistro Restaurant</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
  
        <form className="form" onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Name</label>
          </div>
          <div className="textbox">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-[#251930] text-white rounded-md outline-none focus:ring-2 focus:ring-[#a240ff]"
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
          <button type="submit">
            <p className="mr-2">S'inscrire</p>
          </button>
        </form>
  
        <p className="text-sm  mt-4">
          <span>Déjà un compte? </span><a href="/login"><span className="text-white"> Se connecter</span></a>
        </p>
      </div>
    </div>
  );
  
}


export default SignUp;
