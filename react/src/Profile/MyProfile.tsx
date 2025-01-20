import {useEffect, useState} from 'react';
import { checkIfNickAvaible, getDataObject, patchObject, sendDataObject } from '../Fetch/Fetch';
import { validateDescription,validateNickName,validateUserLastName,validateUserName } from '../Validate/ValidateFunctions';

export default function MyProfile(){

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

    const sendData = async() => {
        if(validateUserName(userEdit.user_name).state &&
           validateUserLastName(userEdit.user_lastName).state&&
           validateNickName(userEdit.user_nickname).state &&
           validateDescription(userEdit.user_description).state
        ){  
            let progText;
            const answer = await checkIfNickAvaible(userEdit.user_nickname)
                if(answer.status == 200){

                    if(answer.avaible){
                        const answer = await patchObject(userEdit,"/api/profile");
                        if(answer == 200){
                            progText = "User updated sucefuly";
                            setUserProfile(userEdit);
                            setUserEdit(userProfile);
                            setIsEdited(false);
                        } 
                        else progText = "Something gone wrong please try again later";
                    }
  
                    else progText = "Nick jest zajety";
                }
                else progText = "Couldnt send data please try again later";
            setSysMsg(progText);
        }

        else{  
            let errorText;   
            if(!validateUserName(userEdit.user_name).state) errorText= validateUserName(userEdit.user_name).msg;
            else if(!validateUserLastName(userEdit.user_lastName).state) errorText= validateUserLastName(userEdit.user_lastName).msg;
            else if(!validateNickName(userEdit.user_nickname).state) errorText= validateNickName(userEdit.user_nickname).msg;
            else if(!validateDescription(userEdit.user_description).state) errorText= validateDescription(userEdit.user_description).msg;
            else errorText = "";
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