import HeaderCaissier from "./Header";
import SideBarCaissier from "./SideBarCaissier";
import TicketCaissier from "./Ticket";
import { useState, useEffect } from "react";
import axios from "axios";


const CaissierSide = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchTickets = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/orders/caissier'); 
            setTickets(response.data);
            setLoading(false);
          } catch (err) {
            setError('Erreur lors de la récupération des tickets');
            setLoading(false);
          }
        };
    
        fetchTickets();
      }, []);

      if (loading) {
        return <div>Chargement...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }
    return(
        <>
         <div className="h-screen flex">
            <SideBarCaissier />
            <div className="flex-1 flex flex-col">
            <HeaderCaissier />
            <div className="p-6 overflow-auto">
              {tickets.map((ticket) => (
                <TicketCaissier key={ticket._id} {...ticket} />
              ))}

            </div>

            </div>

            </div>
        
        </>
       
    )
}
export default CaissierSide