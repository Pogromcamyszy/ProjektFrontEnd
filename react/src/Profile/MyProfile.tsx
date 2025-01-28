import { useState, createContext } from "react";
import ProfileHeadEdit from "./ProfileHeadEdit";
import RedirLogout from "../Auth/RedirLogout.tsx";
import styles from "../styles/profile.module.css"; // Import CSS module
import ProfileHead from "./ProfileHead.tsx";

export const UserIndexContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>] | undefined
>(undefined);

export default function Profile(props) {
  const [userIndex, setUserIndex] = useState<number>();

  RedirLogout();

  return (
    <UserIndexContext.Provider value={[userIndex, setUserIndex]}>
      <div className={styles.container}>
        {/* Profile Head Edit Form */}
        <ProfileHead></ProfileHead>

        {/* Button */}
        <button className={styles.fullWidthButton}>Cancel</button>
      </div>
    </UserIndexContext.Provider>
  );
}