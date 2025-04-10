import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [isPredefined, setIsPredefined] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
        password,
        role,
        isPredefined,
      });

      setSuccessMessage(response.data.message);  // Success message from backend
      setName("");
      setEmail("");
      setPassword("");
      setRole("client");
      setIsPredefined(false);
      setErrorMessage("");  // Clear any previous error message
    } catch (error) {
      // Handle error responses
      if (error.response) {
        // API responded with an error
        console.error("Erreur de réponse:", error.response.data);
        setErrorMessage(`Erreur: ${error.response.data.message}`);
      } else if (error.request) {
        // No response from server
        console.error("Pas de réponse du serveur:", error.request);
        setErrorMessage("Aucune réponse du serveur. Veuillez réessayer plus tard.");
      } else {
        // Other errors
        console.error("Erreur:", error.message);
        setErrorMessage(`Erreur: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-2xl p-8 bg-black border border-gray-700 shadow-lg"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">Ajouter un utilisateur</h2>

        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white"
          />
        </div>

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white mt-4"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="my-input w-full p-3 border border-white bg-black text-white mt-4"
        >
          <option value="admin">Admin</option>
          <option value="client">Client</option>
          <option value="cuisinier">Cuisinier</option>
          <option value="caissier">Caissier</option>
          <option value="livreur">Livreur</option>
        </select>

        <label className="flex items-center mt-4 cursor-pointer">
          <input
            type="checkbox"
            checked={isPredefined}
            onChange={(e) => setIsPredefined(e.target.checked)}
            className="mr-2"
          />
          Utilisateur prédéfini
        </label>

        <button type="submit" className="button w-full mt-8">
          <div className="text w-full">Ajouter Utilisateur</div>
        </button>
      </form>
    </div>
  );
};

export default AddUser;
