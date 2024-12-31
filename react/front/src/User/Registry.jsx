import React, { useState } from 'react';

function Registry(){

    const [newUser,setNewUser] = useState({"user_name":"","user_password":""});

    const [ regError,setRegError ] = useState("");

    function tryCreate(){
        const nick = document.getElementsByName("nick")[0].value;
        const pass = document.getElementsByName("pass")[0].value;
        if(validate(nick,pass)){
            console.log("zdal");
        }

    }

    function validate(nick,pass){
        let state = true;
       if(nick === "" && pass === ""){
        return ;
       }
       
       if(error !== "") document.getElementsByName("")
    }

    return(
      <>
         <div className="registry_Form">
                <input type="text" name="nick"></input> <br/>
                <input type="password" name="pass"></input> <br/>
                <button onClick={tryCreate}></button>
                <div className='com'>com</div>
         </div>
      </>
    );
}

export default Registry;