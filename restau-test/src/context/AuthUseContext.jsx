import { createContext, useContext, useEffect, useState } from "react";

const AuthUseContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("name");

    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);
    if (storedUserId) setUserId(storedUserId);
    if (storedUserName) setUserId(storedUserName);

    setIsLoading(false); 
  }, []);

  const login = ({ token, role, userId, name }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
    localStorage.setItem("name", name);
    setToken(token);
    setRole(role);
    setUserId(userId);
    setUserName(name);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setUserId(null);
    setUserName(null);
  };

  return (
    <AuthUseContext.Provider value={{ token, role, userId, login, logout, name, isLoading }}>
      {children}
    </AuthUseContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUseContext);
