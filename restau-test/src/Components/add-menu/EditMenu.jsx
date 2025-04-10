import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './AddMenu.css'
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
                Swal.fire({
                    title: "Erreur",
                    text: "Échec de la modification.",
                    icon: "error",
                    background: "#1e293b",
                    color: "#f8fafc",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Erreur",
                text: "Erreur réseau.",
                icon: "error",
                background: "#1e293b",
                color: "#f8fafc",
            });
        }
    };

    return (
        <div className="bg-black bg-opacity-50 backdrop-blur-md shadow-lg p-6 border border-gray-700 mt-10 w-[50%]  mx-auto  overflow-auto">
            <h2 className="text-xl font-semibold text-gray-100">Modifier le Plat</h2>
            <form onSubmit={handleSubmit} className="mt-4 ">
                <input
                    type="text"
                    name="name"
                    placeholder="Nom"
                    value={menuItem.name}
                    onChange={handleChange}
                    className="my-input w-full p-3 border-[1px] border-white bg-[#1a1b1c] text-white"
                    required
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    value={menuItem.type}
                    onChange={handleChange}
                    className="my-input w-full p-3 border-[1px] border-white bg-[#1a1b1c] text-white mt-4"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={menuItem.description}
                    onChange={handleChange}
                    className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Prix"
                    value={menuItem.price}
                    onChange={handleChange}
                    className="my-input w-full p-3 border-[1px] border-white bg-[#1a1b1c] text-white mt-4"
                    required
                />
                <input
                    type="text"
                    name="ingredients"
                    placeholder="Ingrédients (séparés par des virgules)"
                    value={menuItem.ingredients}
                    onChange={handleChange}
                    className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4"
                />
                <input
                    type="text"
                    name="dietaryRestrictions"
                    placeholder="Restrictions alimentaires (séparées par des virgules)"
                    value={menuItem.dietaryRestrictions}
                    onChange={handleChange}
                    className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4"
                />
                <input
                    type="text"
                    name="allergens"
                    placeholder="Allergènes (séparés par des virgules)"
                    value={menuItem.allergens}
                    onChange={handleChange}
                    className="my-input w-full p-3 border border-white bg-[#1a1b1c] text-white  mt-4"
                />
                

                
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="my-input w-full p-3 border border-white bg-black text-white mt-4"
                />

                <label className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        name="available"
                        checked={menuItem.available}
                        onChange={handleChange}
                        className="mr-2 mt-4"
                    />
                    <span className="mt-4">Disponible</span>
                   
                </label>
                <button type="submit" className="button w-full mt-8">
                    <div className="text w-full" >Modifier</div>
                </button>
            </form>
        </div>
    );
};

export default EditMenu;
