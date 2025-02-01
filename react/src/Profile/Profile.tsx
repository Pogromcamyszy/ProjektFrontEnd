import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/profile.module.css"; 
import ProfileHead from "./ProfileHead.tsx";
import ReadUsersPosts from "../Posts/ReadUsersPosts.tsx";
import axios from "axios";

export default function Profile() {

  // Custom hook to get the last path segment from the URL
  const useLastPathSegment = () => {
    const location = useLocation();
    const pathArray = location.pathname.split('/').filter(Boolean); 
    return pathArray.pop() || ""; 
  };

  const [userIndex, setUserIndex] = useState<number | null>(null);
  const [isIndexLoaded, setIsIndexLoaded] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);  // Loading state for the user fetch

  const handleEditButton = () => {
    setIsEdited(!isEdited);
  };

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
        setLoading(false);  // Stop loading when the API call is done
      }
    };

    fetchUserId();  
  }, []);  // Empty dependency array ensures this runs once when component mounts

  // Update the loaded state based on the userIndex value
  useEffect(() => {
    if (userIndex !== null) {
      setIsIndexLoaded(true);  
    } else {
      setIsIndexLoaded(false);  
    }
    console.log(userIndex);
  }, [userIndex]);  

  // Show loading message while fetching the user ID
  if (loading) {
    return <p>Loading user information...</p>;
  }

  return (
    <>
      <div className={styles.container}>
        <ProfileHead nickname={nickname}/>
      </div>
      
      {isIndexLoaded ? (
        <ReadUsersPosts userId={userIndex} />
      ) : (
        <p>No user found.</p>
      )}
    </>
  );
}