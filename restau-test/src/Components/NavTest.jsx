import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import home1 from "../assets/home1.jpg";
import home2 from "../assets/home2.jpg";
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Bienvenue au Bistro Restaurant",
    subtitle: "Des plats élaborés avec passion et créativité",
    address: "Rue kadi Lass, Maarif, Grand Casablanca, Maroc",
    buttonText: "CHECK OUR MENU",
    background: home1,
  },
  {
    id: 2,
    title: "Savourez notre cuisine d'exception",
    subtitle: "Expérience gastronomique",
    address: "Rue kadi Lass, Maarif, Grand Casablanca, Maroc",
    buttonText: "CHECK OUR MENU",
    background: home2,
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAnimationKey((prev) => prev + 1);
      AOS.refresh();
    }, 100);
  }, [currentSlide])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, []);

  return (
    <div className="relative h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${slides[currentSlide].background})` }}
      >
        <div className="absolute inset-0 z-10" />
      </div>

      <div className="relative z-20 flex flex-col justify-center items-center text-white text-center h-full px-6">
        <div data-aos="fade-up" key={`${animationKey}-title`}>
          <h1 className="text-5xl font-bold">{slides[currentSlide].title}</h1>
        </div>
        <div data-aos="fade-up" key={`${animationKey}-subtitle`}>
          <h2 className="text-2xl text-[#c9a26a] mt-2">
            {slides[currentSlide].subtitle}
          </h2>
        </div>
        <div data-aos="fade-up" key={`${animationKey}-address`}>
          <p className="mt-2 text-lg">{slides[currentSlide].address}</p>
        </div>
        <div data-aos="fade-up" key={`${animationKey}-button`}>
          
          <button className="mt-6 px-6 py-2 border border-[#808000] hover:bg-[#808000] hover:text-black transition">
          <Link to="/menucategorie">
            {slides[currentSlide].buttonText}
            </Link>
          </button>
         
          
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-[#c9a26a]" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
