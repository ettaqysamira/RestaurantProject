import React, { useState } from "react"
import axios from "axios"

const AdminAddToMenu = () => {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [dietaryRestrictions, setDietaryRestrictions] = useState("")
  const [allergens, setAllergens] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [available, setAvailable] = useState(true)
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("type", type)
    formData.append("description", description)
    formData.append("price", parseFloat(price))
    formData.append("ingredients", ingredients.split(",").map((i) => i.trim()))
    formData.append("dietaryRestrictions", dietaryRestrictions.split(",").map((i) => i.trim()))
    formData.append("allergens", allergens.split(",").map((i) => i.trim()))
    formData.append("available", available)
    
    if (imageFile) {
      formData.append("image", imageFile)
    }

    try {
      await axios.post("http://localhost:5000/api/menu", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setName("")
      setType("")
      setDescription("")
      setPrice("")
      setIngredients("")
      setDietaryRestrictions("")
      setAllergens("")
      setImageFile(null)
      setAvailable(true)
      setSuccessMessage("Plat ajouté au menu avec succès !")
    } catch (error) {
      console.error("Erreur lors de l'ajout du plat :", error)
      setSuccessMessage("Erreur lors de l'ajout du plat. Veuillez réessayer.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md z-20 mt-28">
      <h2 className="text-lg font-bold mb-4">Ajouter un plat au menu</h2>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <input
        type="text"
        placeholder="Nom du plat"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="">Sélectionner une catégorie</option>
        <option value="entrée">Entrée</option>
        <option value="plat principal">Plat Principal</option>
        <option value="dessert">Dessert</option>
        <option value="boisson">Boisson</option>
      </select>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        type="number"
        placeholder="Prix"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        type="text"
        placeholder="Ingrédients (séparés par des virgules)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        type="text"
        placeholder="Restrictions alimentaires (séparées par des virgules)"
        value={dietaryRestrictions}
        onChange={(e) => setDietaryRestrictions(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        type="text"
        placeholder="Allergènes (séparés par des virgules)"
        value={allergens}
        onChange={(e) => setAllergens(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
          className="mr-2"
        />
        Disponible
      </label>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Ajouter au menu
      </button>
    </form>
  )
}

export default AdminAddToMenu
