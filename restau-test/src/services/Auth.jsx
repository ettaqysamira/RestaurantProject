export const login = async (email, password) => {
    const response = await fetch("http://localhost:5000/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
    }
    return data;
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };
  