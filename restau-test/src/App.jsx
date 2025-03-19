import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './Components/NavBar';
import HeroSlider from './Components/NavTest';
import RestaurantSection from './Components/AboutUs';
import Footer from './Components/Footer';
import ContactSection from './Components/ContactSection';
import Reservation from './Components/Reservation';
import Localisation from './Components/Localisation';
import Horaire from './Components/Horaire';
import MenuCategorie from './Components/MenuCategorie';
import TesterPlat from './Components/TesterPlat';
import Panier from './Components/Panier';
import Confirmation from './Components/Confirmation';
import Delivery from './Components/Delivery';
import TicketsList from './Components/TicketsList';
import Checkout from './Components/TicketTest';
import HeroSection from './Components/HeroSection';
import { useState } from "react";

function App() {
  const [orderItems, setOrderItems] = useState([]);

  // Ajouter un plat à la commande
  const addToOrder = (item) => {
    setOrderItems((prevOrder) => [...prevOrder, item]);
  };

  return (
    <BrowserRouter>
      <Layout orderItems={orderItems} addToOrder={addToOrder} />
    </BrowserRouter>
  );
}

function Layout({ orderItems, addToOrder }) {
  const location = useLocation(); // Utilisation de useLocation

  return (
    <>
      {/* Affiche NavBar sauf si la route est '/cuisinier' */}
      { !location.pathname.startsWith('/cuisinier') && <NavBar orderItems={orderItems} /> }      
      <Routes>
        <Route path='/' element={
          <>
            <HeroSlider />
            <RestaurantSection />
            <ContactSection />
            <Localisation />
            <Reservation />
            <Horaire />
            <Footer />
          </>
        } />
        <Route path='/menucategorie' element={<MenuCategorie addToOrder={addToOrder} />} />
        <Route path='/contact' element={<ContactSection />} />
        <Route path='/about' element={<RestaurantSection />} />
        <Route path='/reservation' element={<Reservation />} />
        <Route path='/menuu' element={<TesterPlat />} />
        <Route path='/Panier' element={<Panier />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path='/ticketcarte' element={<Checkout />} />
        <Route path='/cuisinier' element={<HeroSection />}/>
            <Route path='/cuisinier/tickets' element={<TicketsList />} />
        
      </Routes>
    </>
  );
}

export default App;
