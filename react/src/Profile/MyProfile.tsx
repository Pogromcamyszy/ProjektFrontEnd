import {useEffect, useState,useContext, createContext} from 'react';
import { useParams } from "react-router-dom";
import ProfileHead from './ProfileHead';
import RedirLogout from "../Auth/RedirLogout.tsx";

export const UserIndexContext = createContext<[number, React.Dispatch<React.SetStateAction<number>>] | undefined>(undefined);

export default function Profile(props){
    
    const [userIndex,setUserIndex] = useState<number>();

    RedirLogout();
    
    return(
      <UserIndexContext.Provider value={[userIndex,setUserIndex]}>
            <ProfileHead/>
      </UserIndexContext.Provider>
    );
}