import { useContext, useEffect, useState } from "react";
import axios from "axios";
import profilehead from "../styles/profilehead.module.css";

export default function ProfileHead({ nickname }: { nickname?: string }) {


  console.log("Nickname from URL:", nickname);

  const [userProfile, setUserProfile] = useState({
    user_name: "Loading",
    user_lastName: "Loading",
    user_password: "Loading",
    user_nickname: "Loading",
    user_description: "Loading",
    user_id: "Loading"
  });

  const getMyProfile = async () => {
    try {
      const response = await axios.get("/api/profile", { withCredentials: true });
      if (response.status === 200) setUserProfile(response.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(`/api/profile/${nickname}`, { withCredentials: true });
      if (response.status === 200) setUserProfile(response.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error: any) => {
    if (error.response?.status === 401) {
      alert("You need to be logged in to access this data");
    } else {
      alert(`Error ${error.response?.status || ""} occurred, please try again later.`);
    }
  };

  useEffect(() => {
    if (!nickname) {
      getMyProfile();
    } else {
      getProfile();
    }
  }, [nickname]); 


  return (
    <div className={profilehead.container}>
      <div className={profilehead.profpicture}></div>
      <div className={profilehead.userInfo}>
        <div className={profilehead.name}>
          <span>{userProfile.user_name} {userProfile.user_lastName}</span>
        </div>
        <div className={profilehead.additionalInfo}>
          <div><strong>Nickname:</strong> {userProfile.user_nickname}</div>
          <div><strong>Description:</strong> {userProfile.user_description}</div>
        </div>
      </div>
    </div>
  );
}

ProfileHead.defaultProps = {
  nickname: undefined, // ✅ Default to `undefined`
};