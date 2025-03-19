import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoFastFood } from "react-icons/io5";

const RestaurantSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://img.freepik.com/photos-gratuite/homme-debout-devant-plaque-legumes_417767-135.jpg?t=st=1741180646~exp=1741184246~hmac=2e084b895b54726d409815950541fce3a4a5ec7545d9a7653acd271a2f41e36f&w=740')`, zIndex: -1 }}
      />

      <div className="fixed inset-0  opacity-80 z-0" />

      <section className=" px-6 py-12 relative z-10 bg-white w-screen h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
         
          <div data-aos="fade-up">
            <p className="text-sm text-customColor uppercase tracking-widest">
              Bistro Restaurant
            </p>
            <h2 className="text-4xl font-libre-caslon my-4">About Us</h2>
            <p className="text-gray-600">
              Bistro restaurant propose une expérience culinaire raffinée avec une attention particulière aux détails. Nos plats sont préparés avec soin pour offrir une harmonie parfaite de saveurs et de textures. Chaque bouchée est une invitation à un voyage gustatif unique, mettant en valeur des ingrédients frais et de qualité.
            </p>
            <p className="text-gray-600 mt-4">
              Notre engagement envers l'excellence se reflète dans chaque assiette. Nos chefs talentueux sélectionnent les meilleurs produits pour créer des plats savoureux et équilibrés. Que ce soit pour un dîner romantique, un repas entre amis ou une occasion spéciale, notre restaurant vous garantit une expérience inoubliable.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="text-customColor text-3xl"><IoFastFood /></div>
              <p className="text-xl font-libre-caslon10 ">+2125 28 54 62 48</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              data-aos="zoom-in"
              src="https://img.freepik.com/photos-gratuite/homme-debout-devant-plaque-legumes_417767-135.jpg?t=st=1741180646~exp=1741184246~hmac=2e084b895b54726d409815950541fce3a4a5ec7545d9a7653acd271a2f41e36f&w=740"
              alt="Food"
              className="rounded-lg shadow-lg mt-16"
            />
            <img
              data-aos="zoom-in"
              src="https://img.freepik.com/photos-gratuite/chef-cuisinant-dans-cuisine-portant-tenue-professionnelle_23-2151208288.jpg?t=st=1741178317~exp=1741181917~hmac=f26b022362d93f305e6092daf9c4db0fc709291c7db2563f2bc26c65e6aa9d7b&w=740"
              alt="Chef"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default RestaurantSection;
