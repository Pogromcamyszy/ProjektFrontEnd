import { useState, useEffect } from "react";
import ProfileHeadEdit from "./ProfileHeadEdit";
import RedirLogout from "../Auth/RedirLogout.tsx";
import styles from "../styles/profile.module.css"; 
import ProfileHead from "./ProfileHead.tsx";
import ReadUsersPosts from "../Posts/ReadUsersPosts.tsx";
import axios from "axios";  // Make sure axios is imported if you're using it to fetch data

export default function Profile() {
  // Corrected type for userIndex (number or null)
  const [userIndex, setUserIndex] = useState<number | null>(null);

  const [isIndexLoaded, setIsIndexLoaded] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const handleEditButton = () => {
    setIsEdited(!isEdited);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getMyID", {
          withCredentials: true,  
        });
        
        if (response.data && response.data.userId) {
          setUserIndex(response.data.userId);  
        } else {
          console.error("No user ID found in the response.");
        }
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    };

    fetchUserId();  
  }, []);  

  useEffect(() => {
    if (userIndex !== null) {
      setIsIndexLoaded(true);  
    } else {
      setIsIndexLoaded(false);  
    }
    console.log(userIndex);
  }, [userIndex]);  

  return (
    <>
      <div className={styles.container}>
        {isEdited ? <ProfileHeadEdit /> : <ProfileHead />}
        
        <button className={styles.fullWidthButton} onClick={handleEditButton}>
          {isEdited ? "Cancel" : "Edit profile"}
        </button>
      </div>
      
      {isIndexLoaded ? (
        <ReadUsersPosts userId={userIndex} />
      ) : (
        <p>No user found.</p>
      )}
    </>
  );
}