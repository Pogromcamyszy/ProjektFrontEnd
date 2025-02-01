import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App"; // Import AuthContext

const Logout = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useContext(AuthContext); // Access the AuthContext

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Make the logout request to the backend
        await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
        
        // Update the context and set isLogged to false
        setIsLogged(false);
        
        // After updating the context, navigate to login page
        navigate("/login");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    logoutUser();
  }, [navigate, setIsLogged]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;