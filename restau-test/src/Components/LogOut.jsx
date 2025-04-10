import { useNavigate } from "react-router-dom"; 
const LogOut = () => {
      const navigate = useNavigate(); 
      const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
    
        navigate("/login");
      };
    
}
export default LogOut ;
