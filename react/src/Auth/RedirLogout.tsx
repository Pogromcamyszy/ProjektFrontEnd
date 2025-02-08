import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App.tsx";
import useAuthUser from "./CheckAuth.tsx"; 

const useRedirectLogout = () => {
  const [isLogged] = useContext(AuthContext);
  const { isAuthChecked } = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthChecked && isLogged === false) {
      navigate("/login");
    }
  }, [isLogged, isAuthChecked, navigate]);
};

export default useRedirectLogout;