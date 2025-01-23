import React, { useState, useEffect, useContext } from "react";
import { IRegistryUser, IRegistryFormMsg } from "./IRegistry.tsx";
import { validateUserLastName, validateUserName, validateNickName, validateDescription, validatePassword } from "../Validate/ValidateFunctions.tsx";
import { sendDataObject} from "../Fetch/Fetch.tsx";
import registryStyle from "../styles/registry.module.css";
import axios from 'axios';

function UserForm() {
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [formData, setFormData] = useState<IRegistryUser>({
    user_name: "",
    user_lastName: "",
    user_password: "",
    user_nickname: "",
    user_description: "",
  });

  const [formDataMsg, setFormDataMsg] = useState<IRegistryFormMsg>({
    user_name_msg: " ",
    user_lastName_msg: " ",
    user_password_msg: " ",
    user_nickname_msg: " ",
    user_description_msg: " ",
  });


// Dynamical nickname status display

  useEffect(() => {
     if(validateNickName(formData.user_nickname).state){
       ///tu skonczylem
     }
  },[formData.user_nickname]);

  const checkNickAvibility = async (nick: string) => {
    try {
      const resault = await axios.get(`http://localhost:3000/api/taken/${nick}`, {
        withCredentials: true,
      });
  
      if (resault.data.agree) {
        console.log("Nickname not found (available)");
      } else {
        console.log("Nickname found (not available)");
      }
    } catch (error: any) {
      // Handle errors like 404 here
      if (error.response) {
        console.log(`Error: ${error.response.status} - ${error.response.data.message}`);
        if (error.response.status === 404) {
          alert("Bad request error 404 occured");
        }
      } 
      else {
        alert("Error occured please try again later");
      }
      return false;
    }
  };

  // Sets values and validates them
  const handleChange = (e) => {
    const { name, value } = e.target; // Correctly access name and value
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = async() => {
    let validationResult;
    let isValid: boolean = true; // Initializing a flag to keep track of validation status
    let gatherFormMsg:IRegistryFormMsg = {
        user_name_msg: "",
        user_lastName_msg: "",
        user_password_msg: "",
        user_nickname_msg: "",
        user_description_msg: ""
    };
    
    console.log("Validating form...");
  
    // Validate password
    validationResult = validatePassword(formData.user_password);
    console.log(validationResult.msg);
    gatherFormMsg = {...gatherFormMsg,user_password_msg:validationResult.msg}
    isValid = isValid && validationResult.state; // Keep track of whether all validations pass
  
    // Validate username
    validationResult = validateUserName(formData.user_name);
    console.log(validationResult.msg);
    gatherFormMsg = {...gatherFormMsg,user_name_msg:validationResult.msg}
    isValid = isValid && validationResult.state;
  
    // Validate last name
    validationResult = validateUserLastName(formData.user_lastName);
    console.log(validationResult.msg);
    gatherFormMsg = {...gatherFormMsg,user_lastName_msg:validationResult.msg}
    isValid = isValid && validationResult.state;
  
    // Validate nickname
    validationResult = validateNickName(formData.user_nickname);
    console.log(validationResult.msg);
    gatherFormMsg = {...gatherFormMsg,user_nickname_msg:validationResult.msg}
    isValid = isValid && validationResult.state;
  
    // Validate description
    validationResult = validateDescription(formData.user_description);
    console.log(validationResult.msg);
    gatherFormMsg = {...gatherFormMsg,user_description_msg:validationResult.msg}
    isValid = isValid && validationResult.state;
    
    setFormDataMsg(gatherFormMsg);
    return isValid; // Return true if all validations passed, false if any failed
  }

  // Handle form submission
  const handleSubmit = async (e) => {

    const validationResault = await validateForm();
    console.log("Dsadsadsa "+validationResault);
    setErrorMsg(" ");
    e.preventDefault();

    if (
      validationResault &&
      isNickAvaible
    ) {
      const res = await sendDataObject(formData, "/api/registry");
      if (res === 200) {
        setErrorMsg("User was successfully created");
      } else if (res === 401) {
        setErrorMsg("Cannot create user while logged in");
      } else {
        setErrorMsg("Problems with sending data. Please try later.");
      }
    }
  };

  return (
<form onSubmit={handleSubmit} method="POST">
  {errorMsg} <br />
  <h1>Registry</h1>

  <div className={registryStyle.formGroupConatainer}>
    
    {/* First Name */}
    <div className={registryStyle.formGroup}>
      <label htmlFor="user_name">First Name:</label>
      <input
        type="text"
        name="user_name"
        placeholder="Type your name"
        onChange={handleChange}
        required
      />
    </div>
    <div className={registryStyle.inputMsg}>{formDataMsg.user_name_msg} </div><br />

    <div className={registryStyle.formGroup}>
      <label htmlFor="user_lastName">Last Name:</label>
      <input
        type="text"
        name="user_lastName"
        placeholder="Type your last name"
        onChange={handleChange}
        required
      />
    </div>
    <div className={registryStyle.inputMsg}>{formDataMsg.user_lastName_msg}</div> <br />
    
    <div className={registryStyle.formGroup}>
      <label htmlFor="user_password">Password:</label>
      <input
        type="password"
        name="user_password"
        placeholder="Insert password"
        onChange={handleChange}
        required
      />
    </div>
    <div className={registryStyle.inputMsg}>{formDataMsg.user_password_msg}</div> <br />
    
    <div className={registryStyle.formGroup}>
      <label htmlFor="user_nickname">Nickname:</label>
      <input
        type="text"
        name="user_nickname"
        placeholder="Type your Nickname"
        onChange={handleChange}
        required
      />
    </div>
    <div className={registryStyle.inputMsg}>{formDataMsg.user_nickname_msg}</div> <br />
    
    <div className={registryStyle.formGroup}>
      <label htmlFor="user_description">Description:</label>
      <textarea
        name="user_description"
        rows="4"
        cols="50"
        placeholder="Type your description (OPTIONAL)"
        onChange={handleChange}
        maxLength="300"
      />
    </div>
    <div className={registryStyle.inputMsg}>{formDataMsg.user_description_msg}</div> <br />
  </div>

  <button type="submit" className={registryStyle.submit}>Submit</button>
  <button onClick={(e) => (checkNickAvibility(formData.user_nickname))}>button</button>
</form>
  );
}

export default UserForm;
