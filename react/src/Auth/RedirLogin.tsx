
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../App.tsx";
import CheckAuth from "./CheckAuth.tsx";

const useRedirectLogin = () => {
  const [isLogged] = useContext(AuthContext);
  const navigate = useNavigate();
  CheckAuth();
  useEffect(() => {
    if (isLogged) {
      navigate('/myprofile');
    }
  }, [isLogged]);
};

export default useRedirectLogin;