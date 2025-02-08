import { useState, useEffect,createContext } from "react";
import ProfileHeadEdit from "./ProfileHeadEdit";
import styles from "../styles/profile.module.css"; 
import ProfileHead from "./ProfileHead.tsx";
import ReadUsersPosts from "../Posts/ReadUsersPosts.tsx";
import UserAlbums from "../Album/ShowUserAlbums.tsx"; 
import axios from "axios";
import useRedirectLogout from "../Auth/RedirLogout.tsx";

export const isEditedContext = createContext([false, () => {}]);

export default function Profile() {

  useRedirectLogout();

  const [userIndex, setUserIndex] = useState<number | null>(null);
  const [isIndexLoaded, setIsIndexLoaded] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [showPosts, setShowPosts] = useState<boolean>(true); 


  const handleEditButton = () => {
    setIsEdited(!isEdited);
  };

  const toggleView = () => {
    setShowPosts((prev) => !prev);
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
    setIsIndexLoaded(userIndex !== null);
  }, [userIndex]);  

  return (
    <>
    <isEditedContext.Provider value={{ isEdited, setIsEdited }}>
      <div className={styles.container}>
        {isEdited ? <ProfileHeadEdit /> : <ProfileHead />}
        
        
        <button className={styles.fullWidthButton} onClick={handleEditButton}>
          {isEdited ? "Cancel" : "Edit profile"}
        </button>
      </div>
      </isEditedContext.Provider>
      {isIndexLoaded ? (
        <>
          <button className={styles.toggleButton} onClick={toggleView}>
            {showPosts ? "Show Albums" : "Show Posts"}
          </button>

          {showPosts ? (
            <ReadUsersPosts userId={userIndex} />
          ) : (
            <UserAlbums userId={userIndex} />
          )}
        </>
      ) : (
        <p>No user found.</p>
      )}
    </>
  );
}