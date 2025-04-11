import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const PlatTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const {id}=useParams()
    

    useEffect(() => {
        fetch("http://localhost:5000/api/menu")
            .then((res) => res.json())
            .then((data) => setMenuItems(data))
            .catch((err) => console.error("Erreur lors de la récupération des plats :", err));
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };


    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Êtes-vous sûr ?",
            text: "Cette action est irréversible !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#808000",
            cancelButtonColor: "#808000",
            confirmButtonText: "Oui, supprimer !",
            cancelButtonText: "Annuler",
            background: "#1e293b", 
            color: "#f8fafc", 
        });

        if (!result.isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:5000/api/menu/${id}`, { method: "DELETE" });

            if (response.ok) {
                setMenuItems(menuItems.filter((item) => item._id !== id));
                Swal.fire({
                    title: "Supprimé !",
                    text: "Le plat a été supprimé.",
                    icon: "success",
                    background: "#1e293b",
                    color: "#f8fafc",
                });
            } else {
                Swal.fire({
                    title: "Erreur",
                    text: "Échec de la suppression.",
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

    const filteredItems = menuItems.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.type.toLowerCase().includes(searchTerm)
    );

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Menu</h2>
                <div className="flex gap-4 justify-center items-center">

                    <Link to="/admin/add-menu">
                        <button className="text-green-700 hover:text-red-300 pt-2">
                            <MdAssignmentAdd size={30} />
                        </button>
                    </Link>

                    <input
                        type="text"
                        placeholder="Rechercher un plat..."
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                    <Search className="relative left-[-15.5rem] top-0 text-gray-400" size={18} />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Image
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Nom
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Prix
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Disponibilité
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        { filteredItems.map((item) => (
                            <motion.tr
                                key={item._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                    <img
                                        src={`http://localhost:5000/restoreImage/${item.image}`}
                                        alt={item.name}
                                        className="size-10 rounded-full"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {item.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {item.price.toFixed(2)} MAD
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {item.available ? "Disponible" : "Indisponible"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-3 justify-center items-center mt-2">
                                <Link to={`/admin/edit-menu/${item._id}`}>
    <button className="text-indigo-400 hover:text-indigo-300 mt-1">
        < Edit size={18} />
    </button>
</Link>

                                    <button
                                        className="text-red-400 hover:text-red-300 "
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default PlatTable;
