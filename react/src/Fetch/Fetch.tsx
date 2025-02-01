import axios from "axios";

// function to check if nick is avaible return true if is avaible or false if is taken used in registry and edit profile 
  const checkNickAvibility = async (nick: string) => {
    try {
      const resault = await axios.get(`http://localhost:3000/api/taken/${nick}`, {
        withCredentials: true,
      });
  
      if (resault.data.agree) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      if (error.response) {
        console.log(`Error: ${error.response.status} - ${error.response.data.message}`);
        if (error.response.status === 404) {
          alert("Bad request error 404 occured");
        }
      } 
      else {
        alert("Error occured please try again later");
      }
    }
  };

//auth user if logged
const getAuth = async() => {
   try{
    const res = await axios.get("http://localhost:3000/api/auth",{
      withCredentials:true, // Include cookies or authentication tokens
    });
    return res.status;
   }catch(error){
    return error.status;
   }
}

  export {checkNickAvibility,getAuth}