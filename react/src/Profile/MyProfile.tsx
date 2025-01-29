import { useState, createContext } from "react";
import ProfileHeadEdit from "./ProfileHeadEdit";
import RedirLogout from "../Auth/RedirLogout.tsx";
import styles from "../styles/profile.module.css"; 
import ProfileHead from "./ProfileHead.tsx";
import ShowPost from "../Posts/ShowPost.tsx";

export const UserIndexContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>] | undefined
>(undefined);

export default function Profile() {
  const [userIndex, setUserIndex] = useState<number>();
  const [isEdited,setIsEdited] = useState<Boolean>(false);

  RedirLogout();

  const handleEditButton = () => {
     setIsEdited(!isEdited);
  }

  return (
    <UserIndexContext.Provider value={[userIndex, setUserIndex]}>
      <div className={styles.container}>
       {isEdited ?<ProfileHeadEdit/>:<ProfileHead/>}

        

        <button className={styles.fullWidthButton} onClick={handleEditButton}>{isEdited ? "Cancel" : "Edit profile"}</button>
      </div>
      <ShowPost postId={1} />
      <ShowPost postId={2} />
      <ShowPost postId={1} />
    </UserIndexContext.Provider>
  );
}