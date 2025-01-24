import { useContext, useEffect } from "react";
import { AuthContext } from "../App"; // Make sure the path is correct
import { getAuth } from "../Fetch/Fetch"; // Make sure the path is correct

export default function useAuthUser() {
  const [isLogged, setIsLogged] = useContext(AuthContext); // Use context here to get and set the login state

  // Function to check if the user is logged in
  const auth = async () => {
    const res = await getAuth();
    console.log(res);
    if (res === 200) {
      setIsLogged(true); // Set the login status to true
    } else if (res === 401) {
      setIsLogged(false); // Set the login status to false
    }
  };

  // UseEffect to run the authentication check once when the component mounts
  useEffect(() => {
    auth(); // Call the auth function inside useEffect
  }, []); // Empty dependency array to run only once when the component mounts

  return { isLogged, setIsLogged }; // Return values so they can be used in components
}