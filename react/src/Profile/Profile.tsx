import {useEffect, useState} from 'react';
import { getDataObject, sendDataObject } from '../Fetch/Fetch';
import { validateDescription,validateNickName,validateUserLastName,validateUserName } from '../Validate/ValidateFunctions';

export default function Profile(){

    const [userProfile,setUserProfile] = useState({
        user_name: "Loading",
        user_lastName: "Loading",
        user_password: "Loading",
        user_nickname: "Loading",
        user_description: "Loading",
      });

      const [userEdit,setUserEdit] = useState(userProfile);

    const [isEdited,setIsEdited] = useState<boolean>(false);
    
    const getProfile = async () => {
        try {
            const answer = await getDataObject("/api/profile");
            if(answer.status == 200){
                setUserProfile(answer.object);
                setUserEdit(answer.object);
            }
            console.log("Profile data:", answer); // Log the result
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    useEffect(()=>{
      getProfile();
    },[])

    const goToEdit = () => {
        setIsEdited(true);
        setUserEdit(userProfile);
    }

    const cancleEdit = () => {
        setIsEdited(false);
    }

    const sendData = () => {
        if(validateUserName(userEdit.user_name).state &&
           validateUserLastName(userEdit.user_lastName).state&&
           validateNickName(userEdit.user_nickname).state &&
           validateDescription(userEdit.user_description).state
        ){
            console.log("dane zgodne");
        }

        else{  
            let errorText =""
            console.log("dane nie zgodne");
            errorText+= validateUserName(userEdit.user_name).msg;
            if(errorText == "") errorText+= validateUserLastName(userEdit.user_lastName).msg;
            if(errorText == "") errorText+= validateNickName(userEdit.user_nickname).msg;
            if(errorText == "") errorText+= validateDescription(userEdit.user_description).msg;
            setSysMsg(errorText);
        }
    }

    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setUserEdit({...userEdit, [name]:value});
    } 

    const [sysMsg,setSysMsg] = useState<string>("system message");

    return(
        <> 
           <div className="nword">
            <div className="profileFrame">
             <div className="profilePic"></div>
             <div className="userText"> 
                   {!isEdited &&(
                    <>
                     <button onClick={goToEdit}>Edit</button>
                     <p>{userProfile.user_name}  {userProfile.user_lastName}</p>
                     <p>{userProfile.user_nickname}</p>
                     <p>{userProfile.user_description}</p> 
                    </>
                   )}

                   {isEdited &&(
                     <>
                     <button onClick={sendData}>send</button><button onClick={cancleEdit}>Cancel</button>
                     <p><input type="text" value={userEdit.user_name} onChange={handleChange} name="user_name"/>  <input type="text" value={userEdit.user_lastName} onChange={handleChange} name="user_lastName"/></p>
                     <p><input type="text" value={userEdit.user_nickname} onChange={handleChange} name="user_nickname"/></p>
                     <p><input type="text" value={userEdit.user_description} onChange={handleChange} name="user_description"/></p> 
                    </>
                   )
                   } 

                   {sysMsg}
             </div>
             </div>
             <hr></hr>
           </div>
        </>
    );
}