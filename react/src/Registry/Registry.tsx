import React, { useState } from "react";
import { IRegistryUser, IRegistryFormMsg } from "./IRegistry.tsx";
import { validateNotEmpty, validateMaxLength, validateMinLength, validateAtLeastOneUpper , validateNoSpaces , validateOneSpecialCharacter} from "../Validate/ValidateFunctions.tsx";
import { sendDataObject } from "../Fetch/Fetch.tsx";

function UserForm() {

  const [formData, setFormData] = useState<IRegistryUser>({
    user_name: "",
    user_lastName: "",
    user_password: "",
    user_nickname: "",
    user_description: ""
  });

  const [formDataMsg, setFormDataMsg] = useState<IRegistryFormMsg>({
    user_name_msg: "",
    user_lastName_msg: "",
    user_password_msg: "",
    user_nickname_msg: "",
    user_description_msg: ""
  })


  const handleChange = (e) => {
    const { id, value} = e.target; // Correctly access id and value
    setFormData({ ...formData, [id]: value }); // set inserted data into FormData
    
    switch (id) {
      case "user_password":
        validatePassword(value);
        console.log(validatePassword(value));
        break;
    
      case "user_name":
        validateUserName(value);
        console.log(validateUserName(value));
        break;
    
      case "user_lastName":
        validateUserLastName(value);
        console.log(validateUserLastName(value));
        break;
    
      case "user_nickname":
        validateNickName(value);
        console.log(validateNickName(value));
        break;
      
      case "user_description":
        validateDescription(value);
        console.log(validateDescription(value));
        break;

      default:
        console.log(value.length);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    // Validate form data
    if (
      validateNickName(formData.user_nickname) &&
      validatePassword(formData.user_password) &&
      validateDescription(formData.user_description) &&
      validateUserName(formData.user_name) &&
      validateUserLastName(formData.user_lastName)
    ) {
      console.log("Form data: ", formData);
  
      // Check if nickname is available
      const checkIfNickAvaible = async (nick: string): Promise<object> => {  
        const statment = {
          avaible: false,
          error: false,
        };
  
        try {
          console.log("Checking if nickname is available for: ", nick);
  
          // Fetch data from API
          const response = await fetch('http://localhost:3000/api/taken/' + nick);
          console.log('Response status: ', response.status); // Log the status code
          
          if (response.ok) {
            const result = await response.json();
            console.log('API Response:', result); // Log the response data
            statment.avaible = result.agree;
          } else {
            console.log('Server error, try again later');
            statment.error = true;
          }
        } catch (err) {
          console.log('Network error occurred');
          statment.error = true;
        } finally {
          return statment;
        }
      };
  
      // Await the availability check result
      const awa = await checkIfNickAvaible(formData.user_nickname);
      console.log('Availability check result:', awa);
    
    } else {
      console.log("Form validation failed");
    }
  };
  
  const validatePassword = (pass:string) => {

        if(!validateNotEmpty(pass)) setFormDataMsg({...formDataMsg,["user_password_msg"]:"Password cannot be empty "});
        else if(!validateMinLength(pass,8)) setFormDataMsg({...formDataMsg,["user_password_msg"]:"Password should be at least 8 characters long"});
        else if(!validateMaxLength(pass,32)) setFormDataMsg({...formDataMsg,["user_password_msg"]:"Password should be 32 characters long"});
        else if(!validateNoSpaces(pass)) setFormDataMsg({...formDataMsg,["user_password_msg"]:"Password cannot contain blank spaces"});
        else if(!validateAtLeastOneUpper(pass)) setFormDataMsg({...formDataMsg,["user_password_msg"]:"Password needs to contain at least one uppercase character"});
        else if(!validateOneSpecialCharacter(pass)) setFormDataMsg({...formDataMsg,["user_password_msg"]:"Password needs to contain at least special character"});
        else {
        setFormDataMsg({...formDataMsg,["user_password_msg"]:""}) 
        return true;
        }
        return false;
  };

  const validateUserName= (name:string) =>{
     if(!validateNotEmpty(name)) setFormDataMsg({...formDataMsg,["user_name_msg"]:"Youre name cannot be empty"});
     else if(!validateMinLength(name,3)) setFormDataMsg({...formDataMsg,["user_name_msg"]:"Youre name need to have at least 3 characters "});
     else if(!validateMaxLength(name,32)) setFormDataMsg({...formDataMsg,["user_name_msg"]:"youre name shouldn't be longer than 32 characters"});
     else{
      setFormDataMsg({...formDataMsg,["user_name_msg"]:""});
      return true;
     } 
     return false;
  }

  const validateUserLastName= (lastname:string) =>{
    if(!validateNotEmpty(lastname)) setFormDataMsg({...formDataMsg,["user_lastName_msg"]:"Youre last name cannot be empty"});
    else if(!validateMinLength(lastname,3)) setFormDataMsg({...formDataMsg,["user_lastName_msg"]:"Youre last name need to have at least 3 characters "});
    else if(!validateMaxLength(lastname,32)) setFormDataMsg({...formDataMsg,["user_lastName_msg"]:"youre last name shouldn't be longer than 32 characters"});
    else{
      setFormDataMsg({...formDataMsg,["user_lastName_msg"]:""});
      return true;
    } 
    return false;
 } 

 const validateNickName = (nickname:string) =>{
   if(!validateNotEmpty(nickname)) setFormDataMsg({...formDataMsg,["user_nickname_msg"]:"Youre nickname cannot be empty"});
   else if(!validateNoSpaces(nickname)) setFormDataMsg({...formDataMsg,["user_nickname_msg"]:"Youre nickname cannot contain blank spaces"});
   else if(!validateMinLength(nickname,8)) setFormDataMsg({...formDataMsg,["user_nickname_msg"]:"Youre nickname should contains at least 8 characters"});
   else if(!validateMaxLength(nickname,14)) setFormDataMsg({...formDataMsg,["user_nickname_msg"]:"Youre nickname should contains maximum of 14 characters"});
   else{ 
    setFormDataMsg({...formDataMsg,["user_nickname_msg"]:""});
    return true;
   }
   return false;
 }

 const validateDescription =(description:string) => {
   if(!validateMaxLength(description,300)){
     setFormDataMsg({...formDataMsg,["user_description_msg"]:"Youre description cannot be bigger than 300 characters"});
     return false;
   } 
   else{
     setFormDataMsg({...formDataMsg,["user_description_msg"]:""});
     return true;
   }
 }

  return (
    <form onSubmit={handleSubmit} method="POST">
      <label htmlFor="user_name">First Name:</label><br/>
      <input
        type="text"
        id="user_name"
        name="userName"
        placeholder="Type youre name"
        onChange={handleChange}
        required
      />
      <br />{formDataMsg.user_name_msg} <br/>

      <label htmlFor="user_lastName">Last Name:</label><br/>
      <input
        type="text"
        id="user_lastName"
        name="userLastName"
        placeholder="Type youre last name"
        onChange={handleChange}
        required
      />
      <br />{formDataMsg.user_lastName_msg}<br/>

      <label htmlFor="user_password">Password:</label><br/>
      <input
        type="password"
        id="user_password"
        name="userPassword"
        placeholder="insert password"
        onChange={handleChange}
        required
      />
      <br />{formDataMsg.user_password_msg} <br/>

      <label htmlFor="user_nickname">Nickname:</label><br/>
      <input
        type="text"
        id="user_nickname"
        name="userNickname"
        placeholder="Type youre Nickname (user name)"
        onChange={handleChange}
        required
      />
      <br />{formDataMsg.user_nickname_msg} <br/>

      <label htmlFor="user_description">Description:</label><br/>
      <textarea
        id="user_description"
        name="userDescription"
        rows="4"
        cols="50"
        placeholder="Type youre description (OPTIONAL)"
        onChange={handleChange}
        maxLength="300"
      />
      <br /> {formDataMsg.user_description_msg} <br/>

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
