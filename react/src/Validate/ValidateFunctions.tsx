

const validateMinLength = (text:string, min:number): boolean => {
    text = text.trim();
    return text.length >= min;
}

const validateMaxLength = (text:string, max:number ):boolean => {
    text = text.trim();
    return text.length<= max;
}

const validateLength = (text:string, min:number ,max: number): boolean => {
    
    text = text.trim();
    return text.length >= min && text.length <= max;

}

const validateNotEmpty = (text:string): boolean => {

    text = text.trim();
    return text !== ""; 
}

const validateAtLeastOneUpper = (text:string): boolean => {
    const regex = /[A-Z]/;
    return regex.test(text);
}

const validateNoSpaces = (text:string): boolean =>{
    const regex = /^[^\s]*$/;
    return regex.test(text);
}

const validateOneSpecialCharacter = (text:string): boolean =>{
   const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
   return regex.test(text);
}

///Registry
const validatePassword = (pass:string) => {
    let returnData = {
        "state":true,
        "msg":""
     }
    if(!validateNotEmpty(pass)) {returnData.msg = "Password cannot be empty "; returnData.state = false;}
    else if(!validateMinLength(pass,8)) {returnData.msg = "Password should be at least 8 characters long"; returnData.state = false;}
    else if(!validateMaxLength(pass,32)) {returnData.msg = "Password should be 32 characters long"; returnData.state = false;}
    else if(!validateNoSpaces(pass)) {returnData.msg = "Password cannot contain blank spaces"; returnData.state = false;}
    else if(!validateAtLeastOneUpper(pass)) {returnData.msg = "Password needs to contain at least one uppercase character"; returnData.state = false;}
    else if(!validateOneSpecialCharacter(pass)) {returnData.msg =  "Password needs to contain at least special character"; returnData.state = false;}
    return returnData;
};

const validateUserName= (name:string) =>{
 let returnData = {
    "state":true,
    "msg":" "
 }
 if(!validateNotEmpty(name)) {returnData.msg = "Youre name cannot be empty"; returnData.state = false;}
 else if(!validateMinLength(name,3)) {returnData.msg= "Youre name need to have at least 3 characters "; returnData.state = false;}
 else if(!validateMaxLength(name,32)) {returnData.msg = "youre name shouldn't be longer than 32 characters"; returnData.state = false;}
 return returnData;
}

const validateUserLastName= (lastname:string) =>{
    let returnData = {
        "state":true,
        "msg":" "
     }
if(!validateNotEmpty(lastname)) {returnData.msg = "Youre last name cannot be empty"; returnData.state = false;}
else if(!validateMinLength(lastname,3))  {returnData.msg = "Youre last name need to have at least 3 characters "; returnData.state = false;}
else if(!validateMaxLength(lastname,32)) {returnData.msg = "youre last name shouldn't be longer than 32 characters"; returnData.state = false;}
return returnData;
} 

const validateNickName = (nickname:string) =>{
    let returnData = {
        "state":true,
        "msg":" "
     }
if(!validateNotEmpty(nickname)) { returnData.msg = "Youre nickname cannot be empty"; returnData.state = false}
else if(!validateNoSpaces(nickname)) { returnData.msg = "Youre nickname cannot contain blank spaces"; returnData.state = false; }
else if(!validateMinLength(nickname,8)) {returnData.msg = "Youre nickname should contains at least 8 characters"; returnData.state = false;}
else if(!validateMaxLength(nickname,14)) {returnData.msg = "Youre nickname should contains maximum of 14 characters"; returnData.state = false;}
return returnData;
}

const validateDescription =(description:string) => {
    let returnData = {
        "state":true,
        "msg":" "
     }
if(!validateMaxLength(description,300)){returnData.msg = "Youre description cannot be bigger than 300 characters"; returnData.state = false;}
 return returnData;
}

export {validateUserLastName,validateUserName,validateNickName,validateDescription,validatePassword};

