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
    <div className="flex justify-center items-center min-h-screen bg-black">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-2xl p-8 bg-black text-white  shadow-lg border border-gray-700 my-5"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">Ajouter un plat</h2>
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <div className="grid grid-cols-2 gap-4 ">
        <input 
  type="text" 
  placeholder="Nom du plat" 
  value={name} 
  onChange={(e) => setName(e.target.value)} 
  required 
  className="my-input w-full p-3 border-[1px] border-white bg-[#1a1b1c] text-white  "
/>


          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            required 
            className="my-input w-full p-3 border border-white bg-black text-white "
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
            required 
            className="my-input w-full p-3 border-[1px] border-white bg-[#1a1b1c] text-white "
          />

          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImageFile(e.target.files[0])} 
            className="my-input w-full p-3 border border-white bg-black text-white "
          />
        </div>

        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4"
        />

        <input 
          type="text" 
          placeholder="Ingrédients (séparés par des virgules)" 
          value={ingredients} 
          onChange={(e) => setIngredients(e.target.value)} 
          required 
          className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4"
        />

        <input 
          type="text" 
          placeholder="Restrictions alimentaires" 
          value={dietaryRestrictions} 
          onChange={(e) => setDietaryRestrictions(e.target.value)} 
          className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4"
        />

        <input 
          type="text" 
          placeholder="Allergènes" 
          value={allergens} 
          onChange={(e) => setAllergens(e.target.value)} 
          className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white mt-4"
        />







<label className="checkbox-container flex items-center mt-4 cursor-pointer">
  <input type="checkbox"  checked={available} 
        onChange={(e) => setAvailable(e.target.checked)} />
  <span className="checkmark "></span>Disponible
</label>



    
       
<button type="submit" className="button w-full mt-8">
  <div className="text w-full" >Add to Menu</div>
</button>



      </form>
    </div>
  )
}

export default AddToMenu;
