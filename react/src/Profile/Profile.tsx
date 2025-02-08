import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/profile.module.css"; 
import ProfileHead from "./ProfileHead.tsx";
import ReadUsersPosts from "../Posts/ReadUsersPosts.tsx";
import UserAlbums from "../Album/ShowUserAlbums.tsx"; 
import axios from "axios";
import useRedirectLogout from "../Auth/RedirLogout.tsx";

export default function Profile() {
  useRedirectLogout();
  // Custom hook to get the last path segment from the URL
  const useLastPathSegment = () => {
    const location = useLocation();
    const pathArray = location.pathname.split('/').filter(Boolean); 
    return pathArray.pop() || ""; 
  };

  const [userIndex, setUserIndex] = useState<number | null>(null);
  const [isIndexLoaded, setIsIndexLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPosts, setShowPosts] = useState<boolean>(true); 

  const nickname = useLastPathSegment();

  useEffect(() => {
    console.log(nickname);

    const fetchUserId = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getID/${nickname}`, {
          withCredentials: true,  
        });

        if (response.data && response.data.userId) {
          setUserIndex(response.data.userId);  
        } else {
          console.error("No user ID found in the response.");
        }
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();  
  }, []);  

  useEffect(() => {
    setIsIndexLoaded(userIndex !== null);
  }, [userIndex]);  

  const toggleView = () => {
    setShowPosts((prev) => !prev);
  };

  if (loading) {
    return <p>Loading user information...</p>;
  }

  return (
    <>
      <div className={styles.container}>
        <ProfileHead nickname={nickname}/>
      </div>
      
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