import {useEffect, useState} from 'react';
import {getDataObject} from '../Fetch/Fetch';
import { useParams } from "react-router-dom";

export default function Profile(){

    const [userProfile,setUserProfile] = useState({
        user_name: "Loading",
        user_lastName: "Loading",
        user_password: "Loading",
        user_nickname: "Loading",
        user_description: "Loading",
      });

      const [notFound,setNotFound] = useState<boolean>(false);

      const {nick} = useParams();
    
    const getProfile = async () => {
        try {
            const answer = await getDataObject("/api/profile",nick);
            if(answer.status == 200){
                console.log(answer.object);
                setUserProfile(answer.object);
            }
            else{
              setNotFound(true);
            }     
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    useEffect(()=>{
      getProfile();
    },[])

    return(
        <> 
           <div className="nword">
            {!notFound &&(
                <>
                   <div className="profileFrame">
                 <div className="profilePic"></div>
                <div className="userText"> 
                     <p>{userProfile.user_name}  {userProfile.user_lastName}</p>
                     <p>{userProfile.user_nickname}</p>
                     <p>{userProfile.user_description}</p> 
                 </div>
                 </div>
                 <hr></hr>
               </> 
            )}
            {notFound && (
                <>
                  <h1>User not found</h1>
                </>
            )}
           </div>
        </>
    );
}