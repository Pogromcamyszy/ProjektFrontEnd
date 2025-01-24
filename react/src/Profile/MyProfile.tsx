import {useEffect, useState,useContext, createContext} from 'react';
import {getDataObject} from '../Fetch/Fetch';
import { useParams } from "react-router-dom";
import ProfileHead from './ProfileHead';

export const UserIndexContext = createContext<[number, React.Dispatch<React.SetStateAction<number>>] | undefined>(undefined);

export default function Profile(props){
    
    const [userIndex,setUserIndex] = useState<number>();
    
    return(
      <UserIndexContext.Provider value={[userIndex,setUserIndex]}>
            <ProfileHead></ProfileHead>
      </UserIndexContext.Provider>
    );
}