import React, { useState } from "react";
import { IRegistryUser, IRegistryFormMsg } from "./IRegistry.tsx";
import {validateLength, validateNotEmpty, validatePassword, validateMaxLength, validateMinLength}from "../Validate/ValidateFunctions.tsx";

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
    const { id, value } = e.target; // Correctly access id and value
    setFormData({ ...formData, [id]: value }); // set inserted data into FormData

    if(id == "user_password")     validatePasswordLocal(value);
    else if(id == "user_name")  validateUserName(value);
    else if(id == "user_lastName") validateUserLastName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log("Form Submitted:", formData.user_password);
  };
  
  const validatePasswordLocal = (pass:string) => {

    if(!validatePassword(pass)){
        if(!validateNotEmpty(pass)) setFormDataMsg({...formDataMsg,["user_password_msg"]:"Password cannot be empty "});
        else if(!validateMinLength(pass,8)) setFormDataMsg({...formDataMsg,["user_password_msg"]:"Password should be at least 8 characters long"});
        else if(!validateMaxLength(pass,32)) setFormDataMsg({...formDataMsg,["user_password_msg"]:"Password should be 32 characters long"});
        else setFormDataMsg({...formDataMsg,["user_password_msg"]:"Password have to contain at least one special character and one uppercase character"});
    }
    else setFormDataMsg({...formDataMsg,["user_password_msg"]:""});
  };

  const validateUserName= (name:string) =>{
     if(!validateNotEmpty(name)) setFormDataMsg({...formDataMsg,["user_name_msg"]:"Youre name cannot be empty"});
     else if(!validateMinLength(name,3)) setFormDataMsg({...formDataMsg,["user_name_msg"]:"Youre name need to have at least 3 characters "});
     else if(!validateMaxLength(name,32)) setFormDataMsg({...formDataMsg,["user_name_msg"]:"youre name shouldn't be longer than 32 characters"});
     else setFormDataMsg({...formDataMsg,["user_name_msg"]:""});
  }

  const validateUserLastName= (lastname:string) =>{
    if(!validateNotEmpty(lastname)) setFormDataMsg({...formDataMsg,["user_lastName_msg"]:"Youre last name cannot be empty"});
    else if(!validateMinLength(lastname,3)) setFormDataMsg({...formDataMsg,["user_lastName_msg"]:"Youre last name need to have at least 3 characters "});
    else if(!validateMaxLength(lastname,32)) setFormDataMsg({...formDataMsg,["user_lastName_msg"]:"youre last name shouldn't be longer than 32 characters"});
    else setFormDataMsg({...formDataMsg,["user_lastName_msg"]:""});
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
      />
      <br /> {formDataMsg.user_description_msg} <br/>

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
