import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../App.tsx";
import CheckAuth from "./CheckAuth.tsx";

const useRedirectLogout = () => {
  const [isLogged] = useContext(AuthContext); // Access isLogged from AuthContext
  const navigate = useNavigate();
  CheckAuth();

  useEffect(() => {
    if (!isLogged) {
      // If the user is not logged in, redirect to login page
      navigate('/login');
    }
  }, [isLogged, navigate]); // Ensure the effect re-runs when isLogged changes

};

export default useRedirectLogout;