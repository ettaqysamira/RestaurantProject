import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './AddMenu.css';

const EditMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState({
    name: "",
    type: "",
    description: "",
    price: "",
    ingredients: "",
    dietaryRestrictions: "",
    allergens: "",
    available: false,
    image: null
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/menu/${id}`)
      .then((res) => res.json())
      .then((data) => setMenuItem(data))
      .catch((err) => console.error("Erreur lors de la récupération du plat :", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMenuItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in menuItem) {
      formData.append(key, menuItem[key]);
    }
    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/menu/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          title: "Modifié !",
          text: "Le plat a été modifié avec succès.",
          icon: "success",
          background: "#1e293b",
          color: "#f8fafc",
        });
        navigate("/menu");
      } else {
        throw new Error();
      }
    } catch (error) {
      Swal.fire({
        title: "Erreur",
        text: "Erreur lors de la modification du plat.",
        icon: "error",
        background: "#1e293b",
        color: "#f8fafc",
      });
    }
  };

  return (
        <div>
             <div className=" relative top-5 py-9 flex justify-center items-center min-h-screen bg-[#161e2d] ">
      <form
        onSubmit={handleSubmit}
        className="  w-full max-w-3xl p-8 bg-[#111827] text-white shadow-lg rounded-xl border border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">Modifier le Plat</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nom du plat"
            value={menuItem.name}
            onChange={handleChange}
            className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <select
            name="type"
            value={menuItem.type}
            onChange={handleChange}
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
            name="price"
            placeholder="Prix"
            value={menuItem.price}
            onChange={handleChange}
            className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 text-white"
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={menuItem.description}
          onChange={handleChange}
          className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 placeholder-gray-400 text-white w-full mt-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <input
          type="text"
          name="ingredients"
          placeholder="Ingrédients (séparés par des virgules)"
          value={menuItem.ingredients}
          onChange={handleChange}
          className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 text-white w-full mt-4"
        />

        <input
          type="text"
          name="dietaryRestrictions"
          placeholder="Restrictions alimentaires"
          value={menuItem.dietaryRestrictions}
          onChange={handleChange}
          className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 text-white w-full mt-4"
        />

        <input
          type="text"
          name="allergens"
          placeholder="Allergènes"
          value={menuItem.allergens}
          onChange={handleChange}
          className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 text-white w-full mt-4"
        />

        <label className="flex items-center gap-2 mt-4 text-sm">
          <input
            type="checkbox"
            name="available"
            checked={menuItem.available}
            onChange={handleChange}
            className="accent-yellow-500"
          />
          Disponible
        </label>

        <button
          type="submit"
          className="w-full mt-6 bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition"
        >
          Modifier le Plat
        </button>
      </form>
    </div>
        </div>
   
  );
};

export default EditMenu;
