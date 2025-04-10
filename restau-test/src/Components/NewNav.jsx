import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AlignLeft, CircleX } from "lucide-react";
import { FaMapMarkerAlt, FaClock, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import restaurantLogo from "../assets/logoRestaurant.png";
import { useNavigate } from "react-router-dom"; 



const NewNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const navigate = useNavigate(); 


  useEffect(() => {
    const handleScroll = () => {
      setShowTopBar(window.scrollY <= 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

        const handleLogout = () => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("email");
          localStorage.removeItem("name");
      
          navigate("/login");
        };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 text-white">
        <div
          className={`bg-black bg-opacity-60 text-sm transition-all duration-500 ease-in-out overflow-hidden ${
            showTopBar ? "max-h-40 py-2 opacity-100" : "max-h-0 py-0 opacity-0"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 w-full">
            <div className="flex flex-wrap items-center gap-4 px-4 md:px-16">
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-gold" />
                <span>Rue kadi Lass, Maarif, Grand Casablanca, Maroc</span>
              </div>
              <div className="flex items-center gap-1">
                <FaClock className="text-gold" />
                <span>Horaire : 10.00 am à 10.00 pm</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 px-4 md:px-16">
              <div className="flex items-center gap-1">
                <FaPhoneAlt className="text-gold" />
                <span>+2125 28 54 62 48</span>
              </div>
              <div className="flex items-center gap-1">
                <MdEmail className="text-gold" />
                <span>bistrorestaurant@gmail.com</span>
              </div>
            </div>
          </div>
          <hr className="border-gray-600 w-full mt-2" />
        </div>

        <div className="bg-black bg-opacity-80 px-4 md:px-16 h-[5rem] grid grid-cols-3 items-center shadow-md transition-all duration-300">
          <div className="flex justify-start">
            <button onClick={() => setMenuOpen(true)}>
              <AlignLeft size={30} className="text-white" />
            </button>
          </div>

          <div className="flex justify-center">
            <img src={restaurantLogo} alt="logo" className="w-24" />
          </div>

          <div className="flex justify-end gap-4">
            <Link to="/login">
              <button className="box-border border border-customColor px-6 py-2 text-sm hover:bg-customColor hover:text-black transition">
                Login
              </button>
            </Link>
            <Link to="/Panier">
              <button className="bg-gold text-black px-6 py-2 font-semibold hover:bg-opacity-80 transition">Commander</button>
            </Link>
          </div>
        </div>
      </nav>

      <div
  className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ${
    menuOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <div className="flex justify-center items-center p-4">
    <img src={restaurantLogo} alt="Logo" className="w-20 mb-5" />
    <button
      onClick={() => setMenuOpen(false)}
      className="absolute top-4 right-4"
    >
    <CircleX size={24} />
    </button>
  </div>

  <nav className="flex flex-col gap-4 p-6 text-sm font-semibold">
    <hr className="border-gray-600" />
    <Link to="/"  className="relative hover:pl-6 hover:text-gold transition-all duration-300 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rotate-45 before:bg-gold before:opacity-0 hover:before:opacity-100 font-poppins ">HOME</Link>
    <hr className="border-gray-600" />
 <Link to="/menucategorie" className=" relative hover:pl-6 hover:text-gold transition-all duration-300 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rotate-45  before:bg-gold before:opacity-0 hover:before:opacity-100  font-poppins">MENU</Link>
<hr className="border-gray-600" />
    <Link to="/reservation"  className="relative hover:pl-6 hover:text-gold transition-all  font-poppins duration-300 before:content-[''] before:absolute before:left-0 before:top-1/2  before:-translate-y-1/2 before:w-2 before:h-2 before:rotate-45 before:bg-gold before:opacity-0 hover:before:opacity-100">RESERVATION</Link>
<hr className="border-gray-600" />
    <Link to="/about" className="relative hover:pl-6 hover:text-gold  font-poppins transition-all duration-300  before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rotate-45  before:bg-gold before:opacity-0 hover:before:opacity-100">ABOUT US</Link>
    <hr className="border-gray-600"/>
    <Link to="/Panier" className="relative hover:pl-6 hover:text-gold  font-poppins transition-all duration-300 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rotate-45   before:bg-gold before:opacity-0 hover:before:opacity-100">COMMANDE</Link>
    <hr className="border-gray-600" />

    <Link to="/contact"  className="relative hover:pl-6 hover:text-gold  font-poppins transition-all duration-300  before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rotate-45   before:bg-gold before:opacity-0 hover:before:opacity-100">CONTACT</Link>
    <hr className="border-gray-600" />

    <button  className="text-left relative hover:pl-6 hover:text-gold  font-poppins transition-all duration-300  before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rotate-45   before:bg-gold before:opacity-0 hover:before:opacity-100"  onClick={handleLogout} >LOGOUT</button>
    <hr className="border-gray-600" />
  </nav>
</div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default NewNav;
