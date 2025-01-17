import React, { useState, useEffect } from "react";
import { IRegistryUser, IRegistryFormMsg } from "./IRegistry.tsx";
import {validateUserLastName,validateUserName,validateNickName,validateDescription,validatePassword} from "../Validate/ValidateFunctions.tsx";
import { sendDataObject,checkIfNickAvaible } from "../Fetch/Fetch.tsx";

function UserForm() { 
  
  const [errorMsg,setErrorMsg] = useState<string>("");

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


  const [isNickAvaible,setIsNickAvaible] = useState<boolean>(false);


////Dynamical nickname status display
  //display if nick is avaible or taken 
  useEffect(() => {
    console.log("wykonane")
     checkNick();
  },[formData.user_nickname])

// Async function which fetch checkIfnickAvaible and set IsNickAvaible if nick was validated correcly 
  const checkNick = async() => {
    if(validateNickName(formData.user_nickname).state){
      const res = await checkIfNickAvaible(formData.user_nickname);
      if(res.avaible && res.status){
         setIsNickAvaible(true);
         setFormDataMsg({...formDataMsg,user_nickname_msg: "Nick is available"});
      }
      else if(!res.avaible && res.status){
        setIsNickAvaible(false);
        setFormDataMsg({...formDataMsg, user_nickname_msg: "Unavaible"});
      }
      }
  }



/// sets values and validate them
  const handleChange = (e) => {
    const { id, value } = e.target; // Correctly access id and value
  
    // Update the formData state with the new input
    setFormData({ ...formData, [id]: value });
  
    let validationResult;
  
    // Switch based on the field ID
    switch (id) {
      case "user_password":
        validationResult = validatePassword(value); 
          setFormDataMsg({ ...formDataMsg, user_password_msg: validationResult.msg });
        break;
  
      case "user_name":
        validationResult = validateUserName(value); 
          setFormDataMsg( {...formDataMsg, user_name_msg: validationResult.msg });
        break;
  
      case "user_lastName":
        validationResult = validateUserLastName(value); // Assuming this validates the nickname
          setFormDataMsg({ ...formDataMsg, user_lastName_msg: validationResult.msg });
        break;
  
      case "user_nickname":
        validationResult = validateNickName(value); // Assuming this validates the nickname
          setFormDataMsg((e) => ({ ...formDataMsg, user_nickname_msg: validationResult.msg }));
        break;
  
      case "user_description":
        validationResult = validateDescription(value); // Assuming this validates the description
          setFormDataMsg((e) => ({ ...formDataMsg, user_description_msg: validationResult.msg }));
        break;
  
      default:
        console.log(`Unhandled field with ID: ${id}, Value Length: ${value.length}`);
        break;
    }
  };

/// send post request / registry user
  const handleSubmit = async (e) => {
    setErrorMsg(" ");
    e.preventDefault(); 
  
    // Validate form data
    if (
      validateNickName(formData.user_nickname).state &&
      validatePassword(formData.user_password).state &&
      validateDescription(formData.user_description).state &&
      validateUserName(formData.user_name).state &&
      validateUserLastName(formData.user_lastName).state &&
      isNickAvaible 
    ) {        
              const res = await sendDataObject(formData,"/api/registry");
              console.log("post resault:"+res);
              if(res == 200){
                setErrorMsg("User was sucefuly created");
                checkNick();
              }
              else if(res == 401){
                setErrorMsg("Cannot create user while logged");
              }
              else{             
                setErrorMsg("Problems with sending data plase try later");
              }
      }            
};

  return (
    <form onSubmit={handleSubmit} method="POST">
       {errorMsg} <br/>
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
