import React, { useState, useEffect, useContext } from "react";
import { IRegistryUser, IRegistryFormMsg } from "./IRegistry.tsx";
import { validateUserLastName, validateUserName, validateNickName, validateDescription, validatePassword } from "../Validate/ValidateFunctions.tsx";
import { sendDataObject, checkIfNickAvaible } from "../Fetch/Fetch.tsx";
import registryStyle from "../styles/registry.module.css";

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
  const [isNickAvaible, setIsNickAvaible] = useState<boolean>(false);

  useEffect(() => {
    checkNick();
  }, [formData.user_nickname]);

  const checkNick = async (string:nick) => {
     const checkAvibility = await axios.post(`localhost:3000/api/taken/${nick}`,formData.user_nickname,{

     });
    }
  };

  // Sets values and validates them
  const handleChange = (e) => {
    const { id, value } = e.target; // Correctly access id and value
    setFormData({ ...formData, [id]: value });
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
        checkNick();
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
      <label htmlFor="user_name">First Name:</label>
      <input
        type="text"
        id="user_name"
        placeholder="Type your name"
        onChange={handleChange}
        required
      />
      <br />{formDataMsg.user_name_msg} <br />

      <label htmlFor="user_lastName">Last Name:</label>
      <input
        type="text"
        id="user_lastName"
        placeholder="Type your last name"
        onChange={handleChange}
        required
      />
      <br />{formDataMsg.user_lastName_msg} <br />

      <label htmlFor="user_password">Password:</label>
      <input
        type="password"
        id="user_password"
        placeholder="Insert password"
        onChange={handleChange}
        required
      />
      <br />{formDataMsg.user_password_msg} <br />

      <label htmlFor="user_nickname">Nickname:</label>
      <input
        type="text"
        id="user_nickname"
        placeholder="Type your Nickname"
        onChange={handleChange}
        required
      />
      <br />{formDataMsg.user_nickname_msg} <br />

      <label htmlFor="user_description">Description:</label>
      <textarea
        id="user_description"
        rows="4"
        cols="50"
        placeholder="Type your description (OPTIONAL)"
        onChange={handleChange}
        maxLength="300"
      />
      <br /> {formDataMsg.user_description_msg} <br />

      <button type="submit" className={registryStyle.submit}>Submit</button>
    </form>
  );
}

export default UserForm;
