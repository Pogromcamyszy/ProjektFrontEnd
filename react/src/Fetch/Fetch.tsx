

const sendData = async (sendData: JSON,url: string): Promise<object> => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON format
        },
        body: JSON.stringify(sendData), // Convert data to JSON string
        credentials: "include", // Include cookies (session)
      });
      let data = await res.json(); 
      console.log(data); 
      return data;
    } catch (error) {
      console.log("Error:", error);
      return {"message":"Critical error"};
    }
  };

  const getData = async (url:string) => {
    try {
      const response = await fetch(url, {
        credentials: "include", 
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
      return {"message":"Critical error"};
    }
  };