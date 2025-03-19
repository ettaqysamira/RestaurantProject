import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../TesterMenu.css"; 
import backgroundImage from "../assets/contactUs.jpg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button 
    className="absolute left-[-60px] top-1/2  transform -translate-y-1/2 border border-[#c19d60]  rounded-none z-10 w-12 h-12 flex justify-center items-center rotate-[50deg]" 
    onClick={onClick}
  >
    <IoIosArrowBack size={24} className="text-customColor rotate-[-49deg]"/>

  </button>
  
  )
}

 const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button 
      className="absolute right-[-61px] top-1/2 transform -translate-y-1/2   p-2 border border-[#c19d60]  z-10 rounded-none  flex justify-center items-center rotate-[50deg] w-12 h-12 " 
      onClick={onClick}
    >
     <IoIosArrowForward size={24} className="text-customColor rotate-[-49deg]"  />

    </button>
  )
}

const TesterMenu = () => {
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/menu")
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des plats :", error))
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  }

  return (
    <>
      <div className="fixed inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`, zIndex: -1 }} />
      <div className="fixed inset-0 z-0" />
      
      <section className="relative text-white px-6 py-12 mt-16 z-10 bg-transparent w-screen h-screen">
        <h2 className="text-center text-4xl  mb-6 font-libre-caslon">Best Specialties</h2>
        <div className="mx-auto max-w-6xl">
          <Slider {...settings}>
            {menuItems.map((item) => (
              <div key={item._id} className="p-4">
                <div className="group perspective">
                  <div className="relative w-full h-[27rem] flip-card">
                    
                    <div className="absolute inset-0 flip-card-front bg-black  overflow-hidden shadow-lg">
                      <img 
                        src={`http://localhost:5000/restoreImage/${item.image}`} 
                        alt={item.name} 
                        className="w-full h-[18rem] object-cover"
                      />
                      <div className="p-4 text-center">
                        <h3 className="text-lg font-bold text-white">{item.name}</h3>
                        <p className="text-gray-400 text-sm mt-2">{item.ingredients.slice(0, 6).join(", ")}{item.ingredients.length > 4 ? "..." : ""}</p>
                        <p className="text-[#c19d60] font-bold text-lg my-4">{item.price} MAD</p>
                      </div>
                    </div>

                    <div className="absolute inset-0 flip-card-back bg-white flex justify-center flex-wrap items-center ">
                       <h5>Current Menu</h5>
                       <p className="">{item.name}</p>
                       <p>{item.description}</p>
                      <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded">Make an Order</button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  )
}

export default TesterMenu;
