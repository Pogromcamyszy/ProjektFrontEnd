import { useState } from "react";
import User from "./ILogin.tsx";

export default function Login() {
  const [user, setUser] = useState<User>({ user_nickname: "", user_password: "" });

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, user_nickname: e.target.value });
  };

  const handleUserPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, user_password: e.target.value });
  };

  const sendUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON format
        },
        body: JSON.stringify(user), // Convert data to JSON string
        credentials: "include", // Include cookies (session)
      });

      const data = await res.json(); // Parse the JSON response
      console.log(data); // This will return the response from the server
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user", {
        credentials: "include", 
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the data received
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <input
        type="text"
        value={user.user_nickname}
        onChange={handleUserNameChange}
      />
      <br />
      <input
        type="password"
        value={user.user_password}
        onChange={handleUserPasswordChange}
      />
      <br />
      <button onClick={sendUser}>Send</button>
      <button onClick={fetchData}>Show</button>
      <br />
      {user.user_nickname} {user.user_password}
    </>
  );
}