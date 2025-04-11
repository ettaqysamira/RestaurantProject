import React, { useState } from "react";
import axios from "axios";
import './AddMenu.css'

const AddToMenu = () => {
    
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [allergens, setAllergens] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [available, setAvailable] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("price", parseFloat(price));
    formData.append("ingredients", ingredients.split(",").map((i) => i.trim()));
    formData.append("dietaryRestrictions", dietaryRestrictions.split(",").map((i) => i.trim()));
    formData.append("allergens", allergens.split(",").map((i) => i.trim()));
    formData.append("available", available);
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.post("http://localhost:5000/api/menu", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      
      setName("");
      setType("");
      setDescription("");
      setPrice("");
      setIngredients("");
      setDietaryRestrictions("");
      setAllergens("");
      setImageFile(null);
      setAvailable(true);
      setSuccessMessage("Plat ajouté au menu avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du plat :", error);
      setSuccessMessage("Erreur lors de l'ajout du plat. Veuillez réessayer.");
    }
  };

  return (
    <div className=" py-9 flex justify-center items-center min-h-screen bg-[#161e2d]">
     <form 
  onSubmit={handleSubmit} 
  className="w-full max-w-3xl p-8 bg-[#111827] text-white shadow-lg rounded-xl border border-gray-700"
>
  <h2 className="text-2xl font-bold text-center text-white mb-6">Ajouter Plat</h2>

  {successMessage && (
    <p className="text-green-500 text-center mb-4">{successMessage}</p>
  )}

  <div className="grid grid-cols-2 gap-4">
    <input 
      type="text" 
      placeholder="Nom du plat" 
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
      required
    />

    <select 
      value={type} 
      onChange={(e) => setType(e.target.value)}
      className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
      required
    >
      <option value="">Type de plat</option>
      <option value="entrée">Entrée</option>
      <option value="plat principal">Plat Principal</option>
      <option value="dessert">Dessert</option>
    </select>

    <input 
      type="number" 
      placeholder="Prix" 
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
      required
    />

    <input 
      type="file" 
      accept="image/*"
      onChange={(e) => setImageFile(e.target.files[0])}
      className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 text-white"
    />
  </div>

  <textarea 
    placeholder="Description" 
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 placeholder-gray-400 text-white w-full mt-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
  />

  <input 
    type="text" 
    placeholder="Ingrédients (séparés par des virgules)" 
    value={ingredients}
    onChange={(e) => setIngredients(e.target.value)}
    className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 text-white w-full mt-4"
  />

  <input 
    type="text" 
    placeholder="Restrictions alimentaires" 
    value={dietaryRestrictions}
    onChange={(e) => setDietaryRestrictions(e.target.value)}
    className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 text-white w-full mt-4"
  />

  <input 
    type="text" 
    placeholder="Allergènes"
    value={allergens}
    onChange={(e) => setAllergens(e.target.value)}
    className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 text-white w-full mt-4"
  />

  <label className="flex items-center gap-2 mt-4 text-sm">
    <input 
      type="checkbox" 
      checked={available}
      onChange={(e) => setAvailable(e.target.checked)}
      className="accent-[#808000]"
    />
    Disponible
  </label>

  <button 
    type="submit"
    className="w-full mt-6 bg-customColor text-black font-semibold py-3 rounded-lg hover:bg-customColor transition"
  >
    Ajouter Plat
  </button>
</form>

    </div>
  )
}

export default AddToMenu;
