import { useEffect, useState } from "react";
import axios from "axios";
import profilehead from "../styles/profilehead.module.css";
import { IRegistryUser, IRegistryFormMsg } from "./IRegistry.tsx"; // Assuming this interface is reused
import { validateUserLastName, validateUserName, validateNickName, validateDescription, validatePassword } from "../Validate/ValidateFunctions.tsx";
import { checkNickAvibility } from "../Fetch/Fetch.tsx";
import { useNavigate } from "react-router-dom";

export default function ProfileHeadEdit() {
  const navigate = useNavigate();

  const [loadedData,setLoadedData] = useState<IRegistryUser>({
    user_name: "",
    user_lastName: "",
    user_nickname: "",
    user_description: "",
  })

  const [formData, setFormData] = useState<IRegistryUser>({
    user_name: "",
    user_lastName: "",
    user_nickname: "",
    user_description: "",
  });

  const [formDataMsg, setFormDataMsg] = useState<IRegistryFormMsg>({
    user_name_msg: " ",
    user_lastName_msg: " ",
    user_nickname_msg: " ",
    user_description_msg: " ",
  });

  const [isNickAvaible, setIsNickAvaible] = useState<boolean>(false);

  const getMyProfile = async () => {
    try {
      const answer = await axios.get("/api/profile", {
        withCredentials: true,
      });
      if (answer.status === 200) {
        setFormData(answer.data);
        setLoadedData(answer.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401)
        alert("You need to be logged in to access this data");
      else
        alert(
          `Error ${error.response ? error.response.status : ""} occurred, please try again later.`
        );
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  useEffect(() => {
    if (validateNickName(formData.user_nickname).state) {
      const checkNick = async () => {
        const res = await checkNickAvibility(formData.user_nickname);
        setIsNickAvaible(res);
        setFormDataMsg((prev) => ({
          ...prev,
          user_nickname_msg: res
            ? "Nick is available"
            : "Nick is already in use",
        }));
      };
      checkNick();
    } else {
      setFormDataMsg((prev) => ({
        ...prev,
        user_nickname_msg: " ",
      }));
    }
  }, [formData.user_nickname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const validateForm = async() => {
    let validationResult;
    let isValid: boolean = true; 
    let gatherFormMsg:IRegistryFormMsg = {
        user_name_msg: "",
        user_lastName_msg: "",
        user_nickname_msg: "",
        user_description_msg: ""
    };
    
    console.log("Validating form...");
  
    validationResult = validateUserName(formData.user_name);
    console.log(validationResult.msg);
    gatherFormMsg = {...gatherFormMsg,user_name_msg:validationResult.msg}
    isValid = isValid && validationResult.state;
  
    validationResult = validateUserLastName(formData.user_lastName);
    console.log(validationResult.msg);
    gatherFormMsg = {...gatherFormMsg,user_lastName_msg:validationResult.msg}
    isValid = isValid && validationResult.state;
  
    validationResult = validateNickName(formData.user_nickname);
    console.log(validationResult.msg);
    gatherFormMsg = {...gatherFormMsg,user_nickname_msg:validationResult.msg}
    isValid = isValid && validationResult.state;

    validationResult = validateDescription(formData.user_description);
    console.log(validationResult.msg);
    gatherFormMsg = {...gatherFormMsg,user_description_msg:validationResult.msg}
    isValid = isValid && validationResult.state;
    
    setFormDataMsg(gatherFormMsg);
    return isValid; 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isNickAvaible);
    const validationResault = await validateForm();
    console.log(validationResault);
    if (validationResault && isNickAvaible &&(loadedData !== formData)) {
      try {
        const response = await axios.put("http://localhost:3000/api/profile", formData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          alert("Profile updated successfully!");
          navigate("/myprofile");
        }
      } catch (error) {
        alert(`Error occurred while saving profile data: ${error.message}`);
      }
    }
  };


  return (
    <form onSubmit={handleSubmit} method="POST">
      <div className={profilehead.container}>
        <div className={profilehead.profpicture}></div>
        <div className={profilehead.userInfo}>
          <h1>Edit Profile</h1>
          <div className={profilehead.formGroup}>
            <label htmlFor="user_name">First Name:</label>
            <input
              type="text"
              name="user_name"
              placeholder="Type your name"
              onChange={handleChange}
              value={formData.user_name}
              required
            />
            <div className={profilehead.inputMsg}>{formDataMsg.user_name_msg}</div>
          </div>

          <div className={profilehead.formGroup}>
            <label htmlFor="user_lastName">Last Name:</label>
            <input
              type="text"
              name="user_lastName"
              placeholder="Type your last name"
              onChange={handleChange}
              value={formData.user_lastName}
              required
            />
            <div className={profilehead.inputMsg}>{formDataMsg.user_lastName_msg}</div>
          </div>

          <div className={profilehead.formGroup}>
            <label htmlFor="user_nickname">Nickname:</label>
            <input
              type="text"
              name="user_nickname"
              placeholder="Type your Nickname"
              onChange={handleChange}
              value={formData.user_nickname}
              required
            />
            <div className={profilehead.inputMsg}>{formDataMsg.user_nickname_msg}</div>
          </div>

          <div className={profilehead.formGroup}>
            <label htmlFor="user_description">Description:</label>
            <textarea
              name="user_description"
              rows="4"
              placeholder="Type your description (OPTIONAL)"
              onChange={handleChange}
              value={formData.user_description}
              maxLength="300"
            />
            <div className={profilehead.inputMsg}>{formDataMsg.user_description_msg}</div>
          </div>

          <div className={profilehead.buttons}>
            <button type="submit" className={profilehead.submit}>Save</button>
          </div>
        </div>
      </div>
    </form>
  );
}