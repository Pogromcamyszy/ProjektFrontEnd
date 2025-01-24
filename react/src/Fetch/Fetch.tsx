import axios from "axios";
///to delete
const sendDataObject = async (sendData: object,url: string) => {
    try {
      const res = await fetch("http://localhost:3000"+url,{
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON format
        },
        body: JSON.stringify(sendData), // Convert data to JSON string
        credentials: "include", // Include cookies (session)
      });
      if(res.ok){
      let data = await res.json(); 
      console.log(data); 
      }
      else {
        console.error(`Error fetching data. Status: ${res.status}`);
      }
      return res.status;
    } catch (error) {
      console.log("Error:", error);
    }
  };
/// to delete 
const getDataObject = async (url: string,param?:string): Promise<object> => {
    let status;
    try {
      if(param){
        url+="/"+param;
      }
      const res = await fetch("http://localhost:3000"+url, {
        credentials: "include", // Include cookies or authentication tokens
      });
      const data = await res.json(); 
      status = await res.status;
      if (res.ok) {
        // Try to parse JSON res
        console.log("Fetched data:", status);
        return {status:status,object:data};
      } else {
        console.error(`Error fetching data. Status: ${res.status}`);
        return {status:status, message: `Error: ${res.statusText}` };
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      return { status:status,message: "Critical error", error: error instanceof Error ? error.message : "Unknown error" };
    }
  };

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

const patchObject = async(data,url) =>{
    try {
      const response = await fetch("http://localhost:3000"+url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies if necessary
        body: JSON.stringify(data),
      });
      const answer = await response.status;
      
      return answer;
    } catch (error) {
      console.error("Error updating profile:", error);
      return 404;
    }
  };


  export {sendDataObject,getDataObject,checkNickAvibility,getAuth,patchObject}