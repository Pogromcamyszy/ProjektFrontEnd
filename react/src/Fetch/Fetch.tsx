

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
    try {
      const res = await fetch("http://localhost:3000"+url, {
        credentials: "include", // Include cookies or authentication tokens
      });
  
      if (res.ok) {
        // Try to parse JSON res
        const data = await res.json(); 
        console.log("Fetched data:", data);
        return data;
      } else {
        console.error(`Error fetching data. Status: ${res.status}`);
        return { message: `Error: ${res.statusText}` };
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      return { message: "Critical error", error: error instanceof Error ? error.message : "Unknown error" };
    }
  };


  const checkIfNickAvaible = async (nick: string) => {  
    const statment = {
      avaible: false,
      error: false,
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
      } else {
        statment.error = true;
      }
      statment.status = response.status;
    } catch (err) {
      statment.error = true;
    } finally {
      console.log(statment);
      return statment;
    }
  };

  export {sendDataObject,getDataObject,checkIfNickAvaible}