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
import Panier from './Components/Panier';
import TicketsList from './Components/TicketsList';
import HeroSection from './Components/HeroSection';
import { useState } from "react";
import TicketsList2 from './Components/Teckets1';
import OrderDetails from './Components/OrderDetails';
import Samira from './Components/Samira';
import Livreur from './Components/Livreur';
import LivraisonDetails from './Components/LivraisonDetails';
import AjouterLivreur from './Components/AjouterLivreur';
import LivreurTest from './Components/LivreurTest';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from './Components/PrivateRoute';
import AdminSide from './Components/admin/AdminSide';
import TesterMenu from './Components/TesterMenu';
import NewNav from './Components/NewNav';
import LivreurSide from './Components/livreur/LivreurSide';
import TicketLivree from './Components/livreur/TicketLivree';
import NavLivreur from './Components/livreur/NavLivreur';
import { AuthProvider } from './context/AuthUseContext';
import CaissierSide from './Components/caissier/CaissierSide';

function App() {
  const [orderItems, setOrderItems] = useState([]);

  const addToOrder = (item) => {
    setOrderItems((prevOrder) => [...prevOrder, item]);
  };

  return (
    <BrowserRouter>
    <AuthProvider>
      <Layout orderItems={orderItems} addToOrder={addToOrder} />
      </AuthProvider>
    </BrowserRouter>
  );
}

function Layout({ orderItems, addToOrder }) {
  const location = useLocation()
  const HideNavBar = location.pathname.startsWith('/cuisinier') || location.pathname.startsWith('/livreur') || location.pathname.startsWith('/signup') || location.pathname.startsWith('/login') ||  location.pathname.startsWith('/admin') ||  location.pathname.startsWith('/menucategorie') ||  location.pathname.startsWith('/Panier') || location.pathname.startsWith('/Panier/informations-livraison') || location.pathname.startsWith('/caissier')
  


  return (
    <>
       {!HideNavBar && <NewNav />}
       
      <Routes>
        <Route path='/' element={
          <>
            <HeroSlider />
            <RestaurantSection />
            <TesterMenu/>
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
        <Route path='/Panier' element={<Panier />} />
            <Route path='/cuisinier/:id/tickets' element={<TicketsList />} />
            <Route path='/tick' element={<TicketsList2 />} />
            <Route path="/cuisinier/:id/tickets/order-details/:id" element={<OrderDetails />} />
            <Route path="/samira" element={<Samira />} />
            <Route path="/ajouter-livreur" element={ <AjouterLivreur />} />




           
          <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

          <Route
            path="/admin/*"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminSide />
              </PrivateRoute>
            }
          />

          <Route
            path="/livreur/:id/*"
            element={
              <PrivateRoute requiredRole="livreur">
                <> <NavLivreur/> <LivreurSide /></>
              </PrivateRoute>
            }
          />
         <Route
            path="/cuisinier/:id/*"
            element={
              <PrivateRoute requiredRole="cuisinier">
                <> <HeroSection/></>
              </PrivateRoute>
            }
          />
         <Route
            path="/caissier/*"
            element={
              <PrivateRoute requiredRole="caissier">
                <> <CaissierSide/></>
              </PrivateRoute>
            }
          />

            <Route path="/Panier/informations-livraison" element={<LivraisonDetails />} />
            <Route path="/livreur/:id/ticket-details-livrée" element={<><NavLivreur/>< TicketLivree/></>} />



      </Routes>
    </>
  );
}

export default App;
