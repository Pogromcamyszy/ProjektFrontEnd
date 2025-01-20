

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

const getDataObject = async (url: string): Promise<object> => {
    let status;
    try {
      const res = await fetch("http://localhost:3000"+url, {
        credentials: "include", // Include cookies or authentication tokens
      });
      const data = await res.json(); 
      status = await res.status;
      if (res.ok) {
        // Try to parse JSON res
        console.log("Fetched data:", data.status);
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

  const checkIfNickAvaible = async (nick: string) => {  
    const statment = {
      avaible: false,
      status: 404
    };

    try {
      console.log("Checking if nickname is available for: ", nick);

      // Fetch data from API
      const response = await fetch('http://localhost:3000/api/taken/' + nick);
      console.log('Response status: ', response.status); // Log the status code
      
      if (response.ok) {
        const result = await response.json();
        statment.avaible = result.agree;
      } 
      statment.status = response.status;
    }finally {
      console.log(statment);
      return statment;
    }
  };

//auth user if logged
const getAuth = async() => {
   try{
    const res = await fetch("http://localhost:3000/api/auth",{
      credentials: "include", // Include cookies or authentication tokens
    });
    return res.status;
   }catch(error){
    console.log("somethingwrong")
   }
}

  export {sendDataObject,getDataObject,checkIfNickAvaible,getAuth}