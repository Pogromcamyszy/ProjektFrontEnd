import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App"; 
import { getAuth } from "../Fetch/Fetch"; 

export default function useAuthUser() {
  const [isLogged, setIsLogged] = useContext(AuthContext);
  const [isAuthChecked, setIsAuthChecked] = useState(false); 

  const auth = async () => {
    const res = await getAuth();
    console.log(res);
    if (res === 200) {
      setIsLogged(true);
    } else if (res === 401) {
      setIsLogged(false);
    }
    setIsAuthChecked(true); 
  };

  useEffect(() => {
    auth();
  }, []);

  return { isLogged, setIsLogged, isAuthChecked }; 
}