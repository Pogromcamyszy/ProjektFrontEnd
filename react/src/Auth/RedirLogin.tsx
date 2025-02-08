import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App.tsx";
import useAuthUser from "./CheckAuth.tsx"; 

const useRedirectLogin = () => {
  const [isLogged] = useContext(AuthContext);
  const { isAuthChecked } = useAuthUser(); // Get auth check status
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthChecked && isLogged === true) {
      navigate("/myprofile");
    }
  }, [isLogged, isAuthChecked, navigate]);
};

export default useRedirectLogin;