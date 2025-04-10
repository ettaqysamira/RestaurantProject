import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthUseContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { token, role, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" />
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />
  }

  return children;
};

export default PrivateRoute;
