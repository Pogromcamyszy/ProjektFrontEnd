
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../App.tsx";
import CheckAuth from "./CheckAuth.tsx";

//if user is logout redirect to login page and set AuthContext to false;
const useRedirectLogout = () => {
  const [isLogged] = useContext(AuthContext);
  const navigate = useNavigate();
  CheckAuth();
  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    }
  }, [isLogged]);
};

export default useRedirectLogout;