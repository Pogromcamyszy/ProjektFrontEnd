import {useEffect, useState,useContext, createContext} from 'react';
import {getDataObject} from '../Fetch/Fetch';
import { useParams } from "react-router-dom";


export const UserIndexContext = createContext([false, () => {}]);

export default function Profile(props){
    
    const [userIndex,setUserIndex] = useState<number>();
    
    return(
      <>dasdas</>
    );
}

