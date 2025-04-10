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

      setSuccessMessage(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
      setRole("client");
      setIsPredefined(false);
      setErrorMessage("");
    } catch (error) {
      if (error.response) {
        setErrorMessage(`Erreur: ${error.response.data.message}`);
      } else if (error.request) {
        setErrorMessage("Aucune réponse du serveur. Veuillez réessayer plus tard.");
      } else {
        setErrorMessage(`Erreur: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f172a] text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-8 bg-[#111827] border border-gray-700 shadow-xl rounded-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Ajouter Utilisateur</h2>

        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 placeholder-gray-400 text-white w-full mt-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 text-white w-full mt-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="admin">Admin</option>
          <option value="client">Client</option>
          <option value="cuisinier">Cuisinier</option>
          <option value="caissier">Caissier</option>
          <option value="livreur">Livreur</option>
        </select>

        <label className="flex items-center mt-4 text-sm">
          <input
            type="checkbox"
            checked={isPredefined}
            onChange={(e) => setIsPredefined(e.target.checked)}
            className="accent-yellow-500 mr-2"
          />
          Utilisateur prédéfini
        </label>

        <button
          type="submit"
          className="w-full mt-6 bg-customColor text-black font-semibold py-3 rounded-lg hover:bg-customColor transition"
        >
          Ajouter Utilisateur
        </button>
      </form>
    </div>
  );
};

export default AddUser;
