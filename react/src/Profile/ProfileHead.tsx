import { useContext, useEffect, useState } from "react";
import axios from "axios";
import profilehead from "../styles/profilehead.module.css";
import { UserIndexContext } from "./MyProfile";
import { data } from "react-router-dom";

export default function ProfileHead(props) {

  const [userIndex,setUserIndex] = useContext(UserIndexContext);
  
 

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
          const answer = await axios.get("/api/profile", {
            withCredentials: true,
          });
          console.log(answer.data);
          if (answer.status === 200) setUserProfile(answer.data);
        } catch (error) {
          if (error.response && error.response.status === 401)
            alert("You need to be logged in to access this data");
          else alert(`Error ${error.response ? error.response.status : ''} occurred, please try again later.`);         
        }};

        const getProfile = async () => {
            try {
              const answer = await axios.get(`/api/profile/${props.nickname}`, {
                withCredentials: true,
              });
              if (answer.status === 200) setUserProfile(answer.data);
            } catch (error) {
              if (error.response && error.response.status === 401)
                alert("You need to be logged in to access this data");
              else alert(`Error ${error.response ? error.response.status : ''} occurred, please try again later.`);         
            }};

        useEffect(() => {
            if(props.nickname === null) getMyProfile();
            else getProfile();
          }, []);

    useEffect(() =>{
      setUserIndex(userProfile.user_id);
    },[userProfile])

  return (
    <> 
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
    </>
  );
}


ProfileHead.defaultProps = {
    nickname:null
}