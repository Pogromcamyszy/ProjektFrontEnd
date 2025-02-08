import { useContext, useEffect, useState } from "react";
import User from "./ILogin.tsx";
import axios from 'axios';
import login from "../styles/login.module.css";
import { useNavigate } from "react-router-dom";
import RedirLogin from "../Auth/RedirLogin.tsx"
import { AuthContext } from "../App.tsx";


export default function Login() {
  
  ///redirect to my profile if user is logged
  RedirLogin();

  const [isLogged,setIsLogged] = useContext(AuthContext);

  const navigate = useNavigate();

  
  const [user, setUser] = useState<User>({ user_nickname: "", user_password: "" });
  
  const [inCorrectUser,setInCorrectUser] = useState<boolean>(false);

  const [sysMsg,setSysMsg] = useState<string>("");

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, user_nickname: e.target.value });
  };

  const handleUserPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, user_password: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form  reloading the page
    loginUser();
  };

  const loginUser = async() =>{
    try{
       const response = await axios.post('http://localhost:3000/api/login',user,{
        headers: {
          'Content-Type': 'application/json',  
        },
        withCredentials: true, 
       });
       console.log(response.status);
       if(response.status == 200){
        setIsLogged(true);
        navigate("/myprofile");
       }
      }

    catch(error: any){
        if (error.response) {
          if (error.response.status === 401) {
            console.log("dsa");
            setInCorrectUser(true); 
            setSysMsg("User nickname or password are inncorrect");
          } else {
            console.log(`Server error: ${error.response.status}`);
          }
        } 
        else {     
          alert("Something gone wrong please try again later");    
        }
  }
}

  return (
    
     <div className = {login.container}>
       <form className={login.form} onSubmit={handleSubmit}>
          <h1>Login Here</h1>
          <input
          type="text"
          onChange={handleUserNameChange}
          placeholder="Insert youre nickname"
          className={`${login.input} ${inCorrectUser? login.inputError : ""}`}
          required
          />
          <br />
          <input
          type="password"
          onChange={handleUserPasswordChange} 
          placeholder="Insert youre password"
          className={`${login.input} ${inCorrectUser ? login.inputError : ""}`}
          required
           />
           <br />

          <button type="submit" className={login.submit}> Login</button>
          <div className={login.sysMsg}>{sysMsg}</div>
          <br />
        </form>
      </div>

  );

}