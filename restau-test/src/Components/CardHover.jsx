import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import backgroundImage from "../assets/contactUs.jpg";
import '../CardHover.css';

const TesterMenu = () => {
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/menu")
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des plats :", error))
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <button className="text-white bg-gray-700 p-2 rounded-full absolute left-0 z-10">{'<'}</button>,
    nextArrow: <button className="text-white bg-gray-700 p-2 rounded-full absolute right-0 z-10">{'>'}</button>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, zIndex: -1 }}
      />
      <div className="fixed inset-0 z-0" />

      <section className="relative text-white px-6 py-12 mt-16 z-10 bg-transparent w-screen h-screen">
        <h2 className="text-center text-3xl font-bold mb-6">Best Specialties</h2>
        <div className="mx-auto max-w-6xl">
          <Slider {...settings}>
            {menuItems.map((item) => (
              <div key={item._id} className="p-4">
                <div className="card">
                  <div className="content">
                    <div className="front">
                      <img 
                        src={`http://localhost:5000/restoreImage/${item.image}`} 
                        alt={item.name} 
                        className="w-full h-60 object-cover rounded-lg"
                      />
                    </div>
                    <div className="back flex flex-col justify-center items-center p-4 bg-gray-900 text-white rounded-lg">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="text-gray-400 text-sm text-center">{item.description}</p>
                      <p className="text-yellow-400 font-bold mt-2">{item.price} MAD</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default TesterMenu;
